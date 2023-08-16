const session = require('express-session');

const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config({ path: '../even.env' });


const mongoose = require('mongoose');
const User = require('../models/users');
const Shopcart = require('../models/shopcar');



//註冊
exports.register = async (req, res) => {
    const { name, email, password, passwordconfirm } = req.body;
    if (name == '' | email == '' | password == '' | passwordconfirm == '') {
        return res.render('index4', {
            message: '請輸入完整資料'
        })
    } else if (password != passwordconfirm) {
        return res.render('index4', {
            message: '密碼不一致'
        })
    } else {
        const hasuser = await User.findOne({ email })

        var hashedpassword = await bcrypt.hash(password, 8);
        if (hasuser) {
            return res.render('index4', {
                message: '此信箱已註冊'
            })
        } else {
            const newuser = new User({
                name,
                email,
                password: hashedpassword
            })

            await newuser.save();
            res.redirect('/index3')
        }
    }
}

//登入
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email == '' || password == '') {
            return res.render('index3', {
                message: '請輸入完整資料'
            });
        }
        const hasUser = await User.findOne({ email });

        if (!hasUser) {
            return res.render('index3', {
                message: '此信箱未註冊'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, hasUser.password);

        if (!isPasswordCorrect) {
            return res.render('index3', {
                message: '密碼錯誤'
            });
        }

        const name = hasUser.name;
        req.session.reqname = name;
        req.session.reqemail = email;
        req.session.reqpassword = password;

        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        
        console.log('網路令牌為', token);
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };
        res.cookie('jwt', token, cookieOptions);

        console.log('登入訊息', req.body);
        res.redirect('/index5');
    } catch (error) {
        console.log(error);
    }
};


//登出
exports.logout = (req, res) => {
    req.session.reqname = null;
    req.session.reqemail = null;
    req.session.reqpassword = null;
    res.clearCookie('jwt');
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });

    if (req.session.reqname === null && req.session.reqemail === null && req.session.reqpassword === null) {
        console.log('登出成功');
        return res.redirect('/index3');
    } else {
        // 如果未成功登出，可能需要处理相关错误情况
        console.log('登出失败');
        // 可根据实际情况返回适当的错误页面或重定向
        return res.redirect('/error-page');
    }
};


//點餐
exports.order = async (req, res) => {
    try {
        const name = req.session.reqname;
        const email = req.session.reqemail;

        const omurice = req.body.omuricequantity !== undefined ? req.body.omuricequantity : null;
        const muffin = req.body.muffinquantity !== undefined ? req.body.muffinquantity : null;
        const melaleuca = req.body.melaleucaquantity !== undefined ? req.body.melaleucaquantity : null;
        const pizza = req.body.pizzaquantity !== undefined ? req.body.pizzaquantity : null;
        const pasta = req.body.pastaquantity !== undefined ? req.body.pastaquantity : null;
        const stew = req.body.stewquantity !== undefined ? req.body.stewquantity : null;

        const lefttime = req.body.time;
        const price = req.body.price;

        // Check if the user is logged in
        if (!name || !email) {
            return res.redirect('/index3'); // Redirect to login page if not logged in
        }

        const hasUser = await User.findOne({ email });

        if (!hasUser) {
            return res.redirect('/index3'); // Redirect to login page if user not found
        }

        // Perform your database operations to add the order
        // For example, using Mongoose:

        // Create a new order
        const newOrder = new Shopcart({
            email,
            omurice,
            muffin,
            melaleuca,
            pizza,
            pasta,
            stew,
            price,
            lefttime,
            finish: 0
        });

        // Save the order
        await newOrder.save();

        // Start the countdown and update session variables
        function startCountdown(time, orderId) {
            const countdownInterval = setInterval(async () => {
                time--;

                console.log(time);
                await Shopcart.findByIdAndUpdate(orderId, { $set: { lefttime: time } });

                if (time <= 0) {
                    clearInterval(countdownInterval);
                    console.log('餐點完成');
                    await Shopcart.findByIdAndUpdate(orderId, { $set: { finish: 1 } });
                }
            }, 1000);
        }

        startCountdown(lefttime, newOrder._id); // Start countdown for the new order

        req.session.reqtime = lefttime;
        req.session.reqfinish = 0;

        return res.redirect('/index5');
    } catch (error) {
        console.log(error);
        return res.redirect('/error-page'); // Redirect to an error page on error
    }
}










