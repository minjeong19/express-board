const connection = require('./dbConnect');

const userDB = {
  //중복 회원 찾기
  userCheck: (userId, cb) => {
    connection.query(
      `SELECT * FROM mydb.user WHERE USERID = '${userId}';`,
      (err, data) => {
        if (err) throw err;
        console.log(data);
        cb(data);
      },
    );
  },
  // 회원 가입 하기
  registerUser: (newUser, cb) => {
    connection.query(
      `INSERT INTO mydb.user (USERID, PASSWORD) values('${newUser.id}','${newUser.password}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = userDB;

// 데이터를 받아오는 것 까지만 함
