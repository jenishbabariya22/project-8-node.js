const usermodels = require('../models/userModel')

const login = (req, res) => {
    if (res.locals.users) {
        return res.redirect('/index')
    }
    return res.render('login')
}

const register = (req, res) => {
    return res.render('register')
}
const registerform = async (req, res) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        let all = await usermodels.create({
            name: name,
            email: email,
            password: password
        })

        return res.redirect('/admin');

    } catch (err) {
        console.log(err);
        return false
    }
}

const index = (req, res) => {
    return res.render('index')
}

const loginform = (req, res) => {
    return res.redirect('/index')
}
const profile = (req, res) => {
    return res.render('profile')
}
const changeprofile = async (req, res) => {
    try {
        let id = req.body.id;

        let all = await usermodels.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        req.flash('updated', "extracategory successfully Updated")
        return res.redirect('/profile')
    } catch (err) {
        console.log(err);
        return false
    }
}
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log("user not logout");
            return false;
        }

        return res.redirect('/admin');

    })
}

const reset = async (req, res) => {
    return res.render('reset')
}

const forgotmail = async (req, res) => {
    let email = req.body.email

    let otp = Math.floor(Math.random() * 100000)

    try {

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jenishbabariya58@gmail.com',
                pass: 'pzka gpdr woph horl'
            }
        });

        var mailOptions = {
            from: 'jenishbabariya58@gmail.com',
            to: email,
            subject: 'Modernize forgot password using otp',
            html: `<h1>otp here : - ${otp}</h1>`
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.cookie('otp', {
                    email, otp
                })
                return res.redirect('/otp');
            }

        });

    } catch (err) {
        console.log(err);
        return false
    }
}
const newpassword = (req, res) => {
    return res.render('newpassword')
}
const otp = (req, res) => {
    return res.render('otp')
}
const verifyotp = async (req, res) => {
    try {
        let otp = req.body.otp;
        if (otp == req.cookies['otp'].otp) {
            return res.redirect('/newpassword')
        } else {
            console.log("your otp not matched");
        }

    } catch (err) {
        console.log(err);
        return false
    }
}
const forgotpass = async (req, res) => {
    try {
        let email = req.cookies['otp'].email;
        if (req.body.npass == req.body.cpass) {
            let record = await usermodels.findOneAndUpdate({ email, email }, {
                password: req.body.npass
            })
            console.log("password successfully update");
            res.clearCookie('otp');
            return res.redirect('/');
        } else {
            console.log("password are not match");
        }
    } catch (err) {
        console.log(err);
        return false
    }
}

module.exports = {
    login, register, registerform, loginform, index, profile, changeprofile, logout, reset, forgotmail, otp, verifyotp, newpassword, forgotpass
}