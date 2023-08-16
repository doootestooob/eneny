const express = require('express');
const session = require('express-session');


const router = express.Router();

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/index2', (req, res) => {
    res.render('index2')
});

router.get('/index3', (req, res) => {
    res.render('index3')
});

router.get('/index4', (req, res) => {
    res.render('index4')
});

const checkAuth = (req, res, next) => {
    const hasaccount = req.session.reqemail && req.session.reqpassword;
    if (hasaccount) {
        next();
    } else {
        res.redirect('/index3');
    }
}

router.get('/index5', checkAuth, (req, res) => {
    const recordname = req.session.reqname;
    const recordemail = req.session.reqemail;
    const recordpassword = req.session.reqpassword;
    const recordtime = req.session.reqtime;

    res.render('index5', { recordname, recordemail, recordpassword, recordtime })
})


module.exports = router;