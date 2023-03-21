const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

// 로그인 확인용 미들웨어
function isLogin(req, res, next) {
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.status(400);
    res.send(
      '로그인이 필요한 서비스 입니다!<br><a href="/login">로그인 페이지로 이동</a>',
    );
  }
}

// 게시판 페이지 호출
router.get('/', isLogin, (req, res) => {
  boardDB.getAllArticles((data) => {
    // console.log(data);
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    const { userId } = req.session;
    res.render('db_board', { ARTICLE, articleCounts, userId });
  });
});

// 글쓰기 페이지 호출
router.get('/write', isLogin, (req, res) => {
  res.render('db_board_write');
});

// 데이터 베이스에 글쓰기
router.post('/write', isLogin, (req, res) => {
  //   console.log(req.body);
  // USERID --> req.session.userId
  if (req.body.title && req.body.content) {
    const newArticle = {
      // session 로그인 할때 생성
      userId: req.session.userId,
      // 홈으로 body를 보낼 때
      title: req.body.title,
      content: req.body.content,
    };
    boardDB.writeArticle(newArticle, (data) => {
      console.log(data);
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 쓰기 실패');
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다!');
    err.statusCode = 400;
    throw err;
  }
});

// 글 수정 모드로 이동
router.get('/modify/:id', isLogin, (req, res) => {
  boardDB.getArticle(req.params.id, (data) => {
    if (data.length > 0) {
      res.render('db_board_modify', { selectedArticle: data[0] });
    } else {
      const err = new Error('해당 ID 값을 가지는 게시글이 없습니다.');
      err.statusCode = 500;
      throw err;
    }
  });
});
// 글 수정하기
router.post('/modify/:id', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.modifyArticle(req.params.id, req.body, (data) => {
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 수정 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다.');
    err.statusCode = 400;
    throw err;
  }
});

// 글 삭제하기
router.delete('/delete/:id', isLogin, (req, res) => {
  boardDB.deleteArticle(req.params.id, (data) => {
    if (data.affectedRows >= 1) {
      res.status(200).send('삭제성공');
      // res.send('글 삭제 완료');
    } else {
      const err = new Error('글 삭제 실패');
      // err.statusCode = 200;
      throw err;
    }
  });
});

// /getAll 앞에 .찍으면 안돼 상대주소가 되므로 , 경로가 꼬임
router.get('/getAll', (req, res) => {
  boardDB.getAllArticles((data) => {
    res.send(data);
  });
});

module.exports = router;
