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