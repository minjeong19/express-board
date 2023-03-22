const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'title1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum odio quibusdam porro minima, ex pariatur, velit architecto deserunt harum provident eos! Harum consectetur recusandae aliquid eaque velit asperiores atque accusantium',
  },
  {
    title: 'title2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum odio quibusdam porro minima, ex pariatur, velit architecto deserunt harum provident eos! Harum consectetur recusandae aliquid eaque velit asperiores atque accusantium',
  },
];

// localhost:4000/board

// 글 쓰기
// 글 전체 목록 보여주기
router.get('/', (req, res) => {
  res.render('board', { ARTICLE, articleCounts: ARTICLE.length });
});

// 글 쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('board_write');
});

// 글 추가
router.post('/write', (req, res) => {
  if (req.body.title && req.body.content) {
    const newBoard = {
      title: req.body.title,
      content: req.body.content,
    };

    ARTICLE.push(newBoard);
    res.redirect('/board');
  } else {
    const err = new Error('폼 입력을 확인 하세요.');
    err.statusCode = 400;
    throw err;
  }
});

// 글 수정
// 글 수정 모드로 이동
router.get('/modify/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => req.params.title === article.title,
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_modify', { selectedArticle });
});

router.post('/modify/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => article.title === req.params.title,
    );
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/board');
  } else {
    const err = new Error('폼 입력을 확인 하세요.');
    err.statusCode = 400;
    throw err;
  }
});

// 글 삭제
router.delete('/delete/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title,
  );
  ARTICLE.splice(arrIndex, 1);
  res.send('삭제 완료!');
});

module.exports = router;
