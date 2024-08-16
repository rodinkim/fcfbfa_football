const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { createUser, authenticateUser } = require('./auth');

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 로그인 및 회원가입 페이지
app.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.render('welcome', { username: req.session.username });
  } else {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  }
});

// 회원가입 처리
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await createUser(username, email, password);
    req.session.loggedIn = true;
    req.session.username = username;
    res.redirect('/');
  } catch (error) {
    res.send('Error creating user: ' + error.message);
  }
});

// 로그인 처리
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userId = await authenticateUser(username, password);

  if (userId) {
    req.session.loggedIn = true;
    req.session.username = username;
    res.redirect('/');
  } else {
    res.send('Invalid username or password');
  }
});

// 로그아웃 처리
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out');
    }
    res.redirect('/');
  });
});

// HTTP 서버 시작
app.listen(PORT, () => {
  console.log(`HTTP server is running on http://localhost:${PORT}`);
});
