const express = require('express');
const app = express();
const port = 3000;


const dotenv = require('dotenv');

dotenv.config({ path: './even.env' });


const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', (error) => {
    console.log(error)
})
db.once('open', () => {
    console.log('MongoDB連線成功')
})

const session = require('express-session');



app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true
}))



app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use('/auth', express.static('public'))

app.use(express.urlencoded({ extended: false }));

app.use('/', require('./router/pages'))

app.use('/auth', require('./router/auth'))




app.listen(port, () => {
    console.log(`網址運行為 http:/localhost:${port}`)
});