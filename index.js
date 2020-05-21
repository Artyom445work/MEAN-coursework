const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');

const app = express();

const port = process.env.PORT || 8080;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("Успешное подключение к БД");
});

mongoose.connection.on('error', (err) => {
    console.log("Неуспешное подключение к БД: " + err);
});

app.get('/', (req, res) => {
    res.send('Главная страница');
});

app.use('/account', account);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log("Сервер был запущен по порту: " + port);
});