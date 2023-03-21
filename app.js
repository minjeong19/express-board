const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
// 위에 써줘야함 순서 매우 중요
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('mj'));
app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  }),
);

const mainRouter = require('./routes');
const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const dbRouter = require('./routes/db');
const dbBoardRouter = require('./routes/dbBoard');
const cookieRouter = require('./routes/cookie');
const registerRoter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/board', boardRouter);
app.use('/db', dbRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/cookie', cookieRouter);
app.use('/register', registerRoter);
app.use('/login', loginRouter);

// 에러 던지기
// 에러가 맨앞에 있으려면 매개변수가 4개 여야함
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message);
});

// 서버 최초 실행
app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번 포트에서 실행 중입니다.`);
});
