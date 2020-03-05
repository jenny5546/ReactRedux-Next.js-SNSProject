const express = require('express');
const morgan = require('morgan'); //morgan : log 남겨주기
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv'); //.env를 읽어준다
const passport = require('passport');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

//app.use는 middleware를 장착해줄때 넣어준다. 
// morgan. cors 등등의 Middleware를 넣어주는 것

app.use(morgan('dev')); //morgan : log 남겨주기
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json()); //json형식을 처리해줄거다라고 써줘야한다. 
app.use(express.urlencoded({ extended: true })); //form처리를 해줄가다라고 선언해줘야한다. 

//cookie에 대한 암호화도 해준다. 그럼 자바스크립트에서 쿠키를 접근못해. 

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false, //보통 false
  saveUninitialized: false, //보통 false
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, // https를 쓸 때 true
  },
  name: 'rnbck',
}));
//express session보다 뒤에 넣어줘야한다. 
app.use(passport.initialize());
app.use(passport.session());

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

app.listen(3065, () => {
  console.log('server is running on http://localhost:3065');
});