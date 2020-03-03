# Back Node.js로 구축하기

Node.js는 서버가 아니라 자바스크립 코드를 실행해주는 런 타임 실행기다. 
Node 는 http module이라는 모듈을 제공해주는데, 이 모듈이 http 요청을 받고 보내주는 기능을 해주는 것(서버의 역할을 해주는 것). 그래서 서버를 돌리는데 Node.js를 쓴다. 

그런데 node.js가 기능도 많이 부족하고 코드도 지저분해져서 프레임워크를 올려서 보통 개발을 하는데, (마치 리액트에 next를 올려서 쓰듯이) 노드 위에 백 엔드용 프레임워크를 올리는데 그 중 제일 유명한게 'express'라는 사실. (간단하면서 코드를 좀 우아하게 짤 수 있음.)

일단 Node.js의 웹 어플리케이션 프레임워크 간판이라고 할 수 있는 express란? 

> Express에는 Web 응용 프로그램을 위한 기본적인 시스템이 구축되어 있으며, 이에 필요한 처리를 추가하는 것이다. Node.js에서만의 구현과 동일하게 이벤트 처리를 통합해 간다는 기본적인 개발 스타일은 변함이 없지만, 준비되어 있는 다양한 객체를 이용하여 아주 쉽게 필요한 처리를 조합할 수 있다.

npm 에서 남들이 만들어 놓은 패키지를 갖고오자. 
#### 백 구축 시 설치 목록: 
1. npm init 
2. npm i express 
3. npm i axios: http 요청보낼때 제일 많이 쓰는 패키지.
4. npm i bcrypt: 비밀번호 암호화하는데 쓸 것
5. npm i cookie-parser: 로그인할 때 쿠키를 씀.
6. npm i express-session: 로그인할 때 세션을 쓸 것.
7. npm i dotenv: 비밀번호 관리 (환경변수)
8. npm i cors (서버랑 프론트랑 주소가 다를 때, 주소가 둘이 다르면 서로 간의 요청을 보낼 때, 보안때문에 제약이 걸리는걸 풀어주는 역할)
9. npm i helmet hpp (보안, 노드와 익스프레스의 보안을 담당)
10. npm i morgan (서버에 로그를 남겨주는 애 -누구한테 요청이 왔고 어떤 응답이 왔는지)
11. npm i multer (이미지 업로드할 때 필요)
12. npm i passport passport-local (로그인 관리, 회원가입 쉽게 처리 가능)
13. npm i sequelize sequelize-cli (db로 mysql을 쓰는데 가장 기본적인 crud를 할 때 postgre, oracle써도 다 똑같은데 sql대신에 sequelize을 쓴다.)
-> sequelize: ORM(SQL문이랑 javascript를 연결해주는 것) 자바스크립트로 sql을 조작할 수 있게 해준다. 
14. npm i -D eslint eslint-config-airbnb
15. npm i -D eslint-plugin-jsx-a11y 
16. npm i -D nodemon : 서버 바뀔 때마다 알아서 재부팅 
17. npm i -g sequelize-cli : g를 붙이면 명령어로 sequelize어쩌고 이렇게 할 수 있게됨.

### nodemon 알아보기 
django로 개발을 했을 때 알아서 재부팅이 안돼서 매우매우매우 귀찮았다. 그런데 Node로 개발을 하면 코드를 건드려서 무언가가 달라졌을 때 그거를 감지하고 재부팅을 알아서 해주는 패키지가 바로 nodemon이다. 

nodemodules라는 디렉토리랑 같은 위치에 nodemon.json을 만들어서 아래의 코드를 넣어주면 된다. 

    {
        "watch":[ -> 이 리스트 안에 있는 파일들을 관찰해서 만약 변화가 감지되면 
            "index.js",
            "routes",
            "config",
            "passport",
            "models",
            "nodemon.json"
        ],
        "exec": "node index.js", -> index.js를 다시 실행한다는 뜻.
        "ext": "js json"
    }

### HTTP REQUEST 정리하기
이미 장고 개발을 하면서 많이 해서 알지만 다시 정리. 
    1. GET: 갖고오기
    2. POST: 생성하기
    3. PUT: 전체 수정 
    4. PATCH: 부분 수정 
    5. DELETE: 삭제하기 
    6. OPTIONS - 콕 찝어보는 역할 (다른 서버에서 요청보냈을떄, cors 문제 해결안하면)

> 참고로 http 뒤에는 80이 숨어져있는 거. https 에는 443이라는 포트가 숨겨져 있다.

페이지에 접속, 새로고침 하는 것은 다 GET이라고 볼 수 있다. 그래서 

```javascript

app.get('/', (req,res)=> {
    res.send('Hello, server');
}
app.get('/about', (req,res)=> {
    res.send('Hello, about');
}

```

### sequelizer 쓰기 

> sql문을 안쓰고 자바스크립트로 db를 컨트롤 하기 위해서 쓴다고 했던 시퀄라이저를 쓰자

`npm i -g sequelize-cli` 를 치고 ,
`sequelize init`을 하면 config라는 폴더에 config.json이랑 model이라는 폴더에 index.js가 생긴다. 

```javascript
    const Sequelize = require('sequelize');
    const env = process.env.NODE_ENV || 'development';
    const config = require('../config/config')[env];
    const db = {};

    const sequelize = new Sequelize(config.database, config.username, config.password, config);
```
그리고 model이라는 폴더에 'table'을 만들어야한다. 

여기 같은 경우는 comment, hashtag, image, user, post, image (그냥 장고에서 모델 만들었던 거랑 똑같다고 생각하면 된다~)

DB설계 시에는 ERD를 그려보면 좋겠다. Entity Relationship Diagram

> ERD는 이런 model의 필드, 모델 사이의 관계 (1:n, m:n) 를 간단하게 표현한.

NODE의 패턴 분석하기 (장고랑 비슷한데 장고가 더 쉽당)

```javascript
const User = sequelize.define('User', { // 테이블명은 users
      nickname: {
        type: DataTypes.STRING(20), // 20글자 이하
        allowNull: false, // 필수
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true, // 고유한 값
      },
      password: {
        type: DataTypes.STRING(100), // 100글자 이하
        allowNull: false,
      },
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글이 저장돼요
    });
```

```python
class User: 
    nickname = models.CharField() # 이런 식으로 했던 거랑 똑같다!!!!
```

```javascript
User.associate = (db) => {
      db.User.hasMany(db.Post, { as: 'Posts' });
      db.User.hasMany(db.Comment);
      db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
      db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
      db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
};
```
-> 관계들은 이런식으로 써준다. (ManytoMany, Foreignkey, 이렇게 말고!!!)

m:n관계는 belongsToMany로 표현 근데, 특성상 다대다는 중간에 table이 생긴다. 
post-hashtag라는 table이 생김. 그 table 이름을 through 'Like' , 'Hashtag'이런식으로 이름을 짓는다. 
그리고 연결해준 양쪽에다 같은걸 써줘야한다는 것. 

> image라는 모델은 왜 두나. ondemand를 만들때도 내가 Image라는 모델을 하나 더 만들었는데 최신 db에서는 arrayfield도 지원이 가능한데 그래도 원칙적으로는 image모델을 하나 만들어서 연결하는게 더 좋다(나중에 통계내는데 문제가 될 수도 있다고 한다.) 

`db.Post.belongsTo(db.Post, { as: 'Retweet' }); // RetweetId 컬럼 생겨`
이름이 똑같으니까 as라는 애를 추가해서 새로운 칼럼을 만들어준다!! 

- as: 서로 중복되거나 관계가 불분명해질때는 꼭 적어주자 (as라는 이름으로 값을 가져옴)
ex) through도 같을때 follower, following 이런식으로 추가 
- through는 다대다 관계 중간 table 명 

> 정리 ) through는 중간 테이블명, as는 가지고올때의 이름 

> tip: belongsToMany는 다 as를 달아주는게 좋다. as를 넣으면 사용자 정보를 가져올때, Liked에 [{게시글1},{게시글2},..]이런식으로 사용자 입장에서 가져올 수 있는 필드 이름을 설정해주는 과정이다. 데이터를 가져올때도 중요하다는 것!! as를 기준으로 가져온다는 것이다!!

-> 그냥 mysql 을 쓰면 mysql.query('SELECT * FROM User WHERE')... 등등 
실무에서는 너무 어렵기때문에 sequelize를 쓰는거를 추천. knex도 자바스크립트로 편하게 mysql만들어줌. 코드 관리 진짜잘할자신없으면 sequelize를 씁시다.

결국은 knex나 sequelize를 써야함.  


그렇게 모델을 다 만들어준 후, model/index.js에 다 연결을 해준다. 코드를 다 썼던 것을 바탕으로, sql문으로 다 바꿔줌. 

models/index.js에서 
```javascript
db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
``` 
이렇게 나머지 애들을 다 연결해준다. 

그리고 그냥 index.js에다가 

```javascript
const db = require('./models');
db.sequelize.sync();
``` 
이렇게 해주면 알아서 테이블을 생성해준다!!! 


### 백엔드 서버 api 다루기

> back에서는 import export 쓰지말고 require이렇게 쓰자. 

routes라는 폴더로 긴 api.get/post 이런거를 따로 관리하자!!
(django에서 urls.py가 app마다 따로 있어서 따로 관리했듯이 똑같이! 여기선 routes라는 개념으로 사용한다. )

보통 100줄넘어가면 이런식으로 파일을 분리하는 연습을 많이 많이 해두자!!

### 로그인되어있는지 없는지 확인? = 쿠키,세션

> 사용자 정보는 서버의 세션에, 프론트에는 세션을 조회할 수 있는 쿠키를 전달한다. 
