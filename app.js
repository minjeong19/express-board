const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
// 위에 써줘야함 순서 매우 중요
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const mainRouter = require('./routes');
const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const dbRouter = require('./routes/db');
const dbBoardRouter = require('./routes/dbBoard');
const cookieRounter = require('./routes/cookie');

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/board', boardRouter);
app.use('/db', dbRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/cookie', cookieRounter);

// 에러 던지기
// 에러가 맨앞에 있으려면 매개변수가 4개 여야함
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.ststusCode);
  res.send(err.message);
});

// 서버 최초 실행
app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번 포트에서 실행 중입니다.`);
});
