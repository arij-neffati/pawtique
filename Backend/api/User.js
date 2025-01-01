const express = require('express');
const router = express.Router();

const User = require('../models/User');
const UserVerification = require('../models/UserVerification');
const nodemailer=require("nodemailer");

const {v4 :uuidv4} =require("uuid");
require("dotenv").config();


const bcrypt = require('bcrypt');

const path=require("path");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_MAIL, // Environment variable for email address
        pass: process.env.AUTH_PASS // Environment variable for email password
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error); // Log errors if email transport fails to initialize
    } else {
        console.log("Ready for messages");
        console.log(success); // Logs readiness
    }
});

router.post('/signup', (req, res) => {
    let { name, email, password, dateOfBirth } = req.body;

    
    name = name ? name.trim() : "";
    email = email ? email.trim() : "";
    password = password ? password.trim() : "";
    dateOfBirth = dateOfBirth ? dateOfBirth.trim() : "";

   
    if (name === "" || email === "" || password === "" || dateOfBirth === "") {
        return res.json({
            status: "Failed",
            message: "Empty input fields!"
        });
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
        return res.json({
            status: "Failed",
            message: "Invalid name entered!"
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({
            status: "Failed",
            message: "Invalid email entered!"
        });
    } else if (isNaN(new Date(dateOfBirth).getTime())) {
        return res.json({
            status: "Failed",
            message: "Invalid date of birth entered!"
        });
    } else if (password.length < 8) {
        return res.json({
            status: "Failed",
            message: "Password is too short!"
        });
    } else {
        
        User.find({ email }).then(result => {
            if (result.length) {
                return res.json({
                    status: "Failed",
                    message: "User with provided email already exists!"
                });
            } else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        dateOfBirth,
                        verified : false,
                    });
                    newUser.save().then(result => {
                        //verif
                        sendVerificationEmail(result,res);
                    }).catch(err => {
                        res.json({
                            status: "Failed",
                            message: "An error occurred while saving the user!"
                        });
                    });
                }).catch(err => {
                    res.json({
                        status: "Failed",
                        message: "An error occurred while hashing password!"
                    });
                });
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "Failed",
                message: "An error occurred while checking for existing user!"
            });
        });
    }
});

//verif
const sendVerificationEmail = ({ _id, email }, res) => {
    const currentUrl = "http://localhost:3000/";  // Ensure the URL is correct

    const uniqueString = uuidv4() + _id;
    console.log("Generated unique string:", uniqueString);

    bcrypt.hash(uniqueString, 10)
        .then((hashedUniqueString) => {
            console.log("Hashed unique string:", hashedUniqueString);
            
            // Create a new verification record
            const newVerification = new UserVerification({
                userId: _id,
                uniqueString: hashedUniqueString,  // Save the hashed unique string
                createdAt: Date.now(),
                expiresAt: Date.now() + 21600000,  // 6 hours from now
            });

            
            newVerification.save()
                .then(() => {
                    console.log("Verification saved successfully!");
                    
                    const mailOptions = {
                        from: process.env.AUTH_MAIL,
                        to: email,
                        subject: "Verify your email",
                        html: `<p>Verify your email address to complete the signup and login.</p>
                        <p>This link expires in 6 hours.</p>
                        <p>Press <a href=${currentUrl + "user/verify/" + _id + "/" + uniqueString}>here</a> to verify.</p>`
                        
                    };

                    // Send the verification email
                    transporter.sendMail(mailOptions)
                        .then(() => {
                            res.json({
                                status: "Pending",
                                message: "Verification email sent!"
                            });
                        })
                        .catch((error) => {
                            console.log("Error sending email:", error);
                            res.json({
                                status: "Failed",
                                message: "Verification email failed!"
                            });
                        });
                })
                .catch((error) => {
                    console.error("Error saving verification data:", error);
                    res.json({
                        status: "Failed",
                        message: "Could not save verification data!"
                    });
                });
        })
        .catch((error) => {
            console.error("Error hashing unique string:", error);
            res.json({
                status: "Failed",
                message: "An error occurred while hashing the unique string."
            });
        });
};




//verify email
router.get("/verify/:userId/:uniqueString",(req,res)=>{
    let {userId , uniqueString} =req.params;

    UserVerification
    .find({userId})
    .then((result)=> {
        if (result.length>0){
            const {expiresAt} =result[0];
            const hashedUniqueString= result[0].uniqueString;

            if (expiresAt < Date.now()){
                UserVerification.deleteOne({_id : userId})
                .then(()=>{
                    User.deleteOne({_id : userId})
                    .then(()=>{
                        let message="Link has expired try again";
                        res.redirect(`/user/verified?error=true&message=${message}`);

                    })
                    .catch(error =>{
                        let message="Clearing user with expired unique string failed";
                        res.redirect(`/user/verified?error=true&message=${message}`);
   
                    })
                })
                .catch((error)=>{
                    let message="An Error occured while clearing expired user verification";
                    res.redirect(`/user/verified?error=true&message=${message}`);

                });
            }else{
                //valid record 
                //compare

                bcrypt
                .compare(uniqueString,hashedUniqueString)
                .then(result => {
                    if (result){

                        User.updateOne({_id :userId}, {verified :true})
                        .then(()=>{
                            UserVerification.deleteOne({userId})
                            .then(()=>{
                                res.sendFile(path.join(__dirname,"./../view/verified.html"));
                            })
                            .catch((error)=>{
                                console.log(error);
                                let message="An Error occured while finalizing successful verification";
                                res.redirect(`/user/verified?error=true&message=${message}`);

                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            let message="An Error occured while updating user record to verified";
                            res.redirect(`/user/verified?error=true&message=${message}`);

                        })
                    }else{
                        let message="Invalid verification chack your inbox";
                        res.redirect(`/user/verified?error=true&message=${message}`);

                    }
                })
                .catch(error=>{
                    let message="An Error occured while comparing";
                    res.redirect(`/user/verified?error=true&message=${message}`);

                })
            }
        }else {
            let message="account record doesn t exist or already verified";
            res.redirect(`/user/verified?error=true&message=${message}`);

        }
    })
    .catch((error)=>{
        console.log(error);
        let message="An Error occured while while cheking for existing user verification";
        res.redirect(`/user/verified?error=true&message=${message}`);

    })
} );

router.get("/verified",(req,res)=>{
    res.sendFile(path.join(__dirname,"./../view/verified.html"));
})


router.post('/signin', (req, res) => {
    let { email, password } = req.body;

    email = email ? email.trim() : "";
    password = password ? password.trim() : "";

    if (email === "" || password === "") {
        return res.json({
            status: "Failed",
            message: "Empty fields!"
        });
    } else {
        User.find({ email }).then(data => {
            if (data.length) {

                if (!data[0].verified){
                    res.json({
                        status : "Failed",
                        message: "Email hasn t been verified"
                    })
                }else{
                    const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if (result) {
                        res.json({
                            status: "Success",
                            message: "Sign in successful",
                            data: data
                        });
                    } else {
                        res.json({
                            status: "Failed",
                            message: "Invalid password!"
                        });
                    }
                }).catch(err => {
                    res.json({
                        status: "Failed",
                        message: "An error occurred while comparing passwords!"
                    });
                });
                }
                
            } else {
                res.json({
                    status: "Failed",
                    message: "Invalid credentials!"
                });
            }
        }).catch(err => {
            res.json({
                status: "Failed",
                message: "An error occurred while checking for existing user!"
            });
        });
    }
});

router.delete('/deleteUser/:userId', (req, res) => {
    const { userId } = req.params;

    UserVerification.deleteOne({ userId })
        .then(() => {
            User.deleteOne({ _id: userId })
                .then(() => {
                    res.json({
                        status: "Success",
                        message: `User with ID ${userId} and their verification data have been deleted.`
                    });
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                    res.json({
                        status: "Failed",
                        message: "An error occurred while deleting the user."
                    });
                });
        })
        .catch((error) => {
            console.error("Error deleting user verification:", error);
            res.json({
                status: "Failed",
                message: "An error occurred while deleting the verification data."
            });
        });
});



module.exports = router;