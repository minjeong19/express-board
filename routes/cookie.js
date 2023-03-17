const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('cookie');
});

router.get('/cook', (req, res) => {
  res.cookie('alert', true, {
    maxAge: 1000 * 5,
  });
  res.status(200);
  res.json('쿠키 굽기 성공!');
});

// router.get('/cook', (req, res) => {
//   //쿠키 발행 코드 작성하기!
//   res.cookie('alert', true, {
//     expires: new Date(Date.now() + 1000 * 5),
//     httpOnly: false,
//   });
//   res.render('cookie');
// });
module.exports = router;
// const express = require('express');

// const router = express.Router();

// router.get('/', (req, res) => {
//   res.cookie('alert', true, {
//     expires: new Date(Date.now() + 1000 * 60),
//     httpOnly: true,
//   });
//   console.log(req.cookies);
//   res.render('index');
// });

// module.exports = router;
