const express = require('express');
const path = require('path');
const morgan = require('morgan');

const noteModel = require('./models/noteModel');
const homeRoutes = require('./routes/homeRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 뷰 엔진
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 미들웨어
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Model을 전역처럼 쓰기 위해 locals에 등록
app.locals.noteModel = noteModel;

// 라우터 등록
app.use('/', homeRoutes);
app.use('/notes', noteRoutes);

// 404 핸들러
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Not Found' });
});

// 500 핸들러
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('500', { title: '서버 오류', error: err });
});

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
