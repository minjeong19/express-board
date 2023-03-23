const mongoClient = require('./mongoConnect');
// 리팩토링
const LOGIN_WRONG_MSG =
  '알 수 없는 문제 발생<br><a href="/register">회원 가입으로 이동 </a>';
const UNEXPECTED_MSG =
  '알 수 없는 문제 발생<br><a href="/register">회원 가입으로 이동 </a>';
const DUPLICATED_MSG =
  '동일한 ID를 가지는 회원이 존재합니다.<br><a href="/register">회원 가입으로 이동 </a>';
const SUCCESS_MSG = '회원 가입 성공!<br><a href="/login">로그인으로 이동 </a>';
const LOGIN_NOT_RGISTERD_ID_MSG =
  '해당 ID가 존재 하지 않습니다!<br><a href="/register">회원가입으로 이동</a>';
const LOGIN_WRONG_PW_MSG =
  '비밀번호가 다릅니다!<br><a href="/login">회원가입으로 이동</a>';

// 회원가입하기
const registerUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');

    const duplicatedUser = await user.findOne({ id: req.body.id });
    if (duplicatedUser) return res.status(400).send(DUPLICATED_MSG);

    await user.insertOne(req.body);
    res.status(200).send(SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};
// 로그인하기
const loginUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');

    const findUser = await user.findOne({ id: req.body.id });
    if (!findUser) return res.status(400).send(LOGIN_NOT_RGISTERD_ID_MSG);

    if (findUser.password !== req.body.password)
      return res.status(400).send(LOGIN_WRONG_PW_MSG);

    // 로그인 처리
    req.session.login = true;
    req.session.userId = req.body.id;

    // 쿠키 구우기
    res.cookie('user', req.body.id, {
      maxAge: 1000 * 30,
      httpOnly: true,
      sigined: true,
    });
    // const userCheck = await user.findOne({ password: req.body.password });
    // if (!userCheck) return res.status(400).send(FAILPW_MSG);

    res.status(200);
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(LOGIN_WRONG_MSG);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
// const userDB = {
//   // 중복 회원 찾기
//   userCheck: async (userId) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');
//       const findUser = await user.findOne({ id: userId });
//       return findUser;
//     } catch (err) {
//       console.error(err);
//     }
//   },
//   // 회원 가입 하기
//   registerUser: async (newUser) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');

//       await user.insertOne(newUser);
//       return true;
//     } catch (err) {
//       console.error(err);
//     }
//   },
// };

// module.exports = userDB;
