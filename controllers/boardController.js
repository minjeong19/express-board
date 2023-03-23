const { ObjectId } = require('mongodb');

const mongoClient = require('./mongoConnect');

const UNEXPECTED_MSG = '<br><a href="/">메인 페이지로 이동</a>';

const getAllArticles = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');
    // 데이터가 어디있는지 찾을 때
    const allArticleCursor = board.find({});
    // 찾은 데이터를 배열로 만들 때
    const ARTICLE = await allArticleCursor.toArray();

    res.render('db_board', {
      ARTICLE,
      articleCounts: ARTICLE.length,
      userId: req.session.userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 글쓰기
const writeArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    console.log(req.file);

    const newArticle = {
      USERID: req.session.userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
      IMAGE: req.file ? req.file.filename : null,
    };
    await board.insertOne(newArticle);
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 글 수정하기 들어가기
const getArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const selectedArticle = await board.findOne({
      _id: ObjectId(req.params.id),
    });
    res.render('db_board_modify', { selectedArticle });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 글 수정하기
const modifyArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    console.log(req.file);

    const modify = {
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };
    if (req.file) modify.IMAGE = req.file.filename;

    await board.updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: modify,
        // TITLE: req.body.title,
        // CONTENT: req.body.content,
        // IMAGE: req.file ? req.file.filename : orginArticle.IMAGE,
      },
    );
    res.status(200);
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    await board.deleteOne({ _id: ObjectId(req.params.id) });
    res.status(200).json('삭제 성공');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};
module.exports = {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
};

// const boardDB = {
//   // 모든 게시글 가져오기
//   getAllArticles: (cb) => {
//     connection.query('SELECT * FROM mydb.board', (err, data) => {
//       if (err) throw err;
//       console.log(data);
//       cb(data);
//     });
//   },

//   // 게시글 추가하기
//   writeArticle: (newArticle, cb) => {
//     connection.query(
//       `INSERT INTO mydb.board (USERID,TITLE, CONTENT) values('${newArticle.userId}','${newArticle.title}', '${newArticle.content}');`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 특정 ID 값을 가지는 게시글 찾기
//   getArticle: (id, cb) => {
//     connection.query(
//       `SELECT * FROM mydb.board WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 특정 ID를 가지는 게시글을 수정하는 컨트롤러
//   modifyArticle: (id, modifyArticle, cb) => {
//     connection.query(
//       `UPDATE mydb.board SET TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 특정 ID를 가지는 게시글을 삭제하는 컨트롤러
//   deleteArticle: (id, cb) => {
//     connection.query(
//       `DELETE FROM mydb.board WHERE ID_PK = ${id}`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
// };

// module.exports = boardDB;
