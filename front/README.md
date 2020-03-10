# 프로젝트하면서 배운 점들 


### useCallback (hooks)
> 같은 component에 있으면 id만 input을 바꿔도 모든 폼 부분이 리렌더링 된다. 
> 서로 input 간에 Rerendering 막기 최적화 할수는 있지만 (좀 과하다, 너무시간 오래걸려)
  배열 안에 password, check, term 를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가 될 때마다 함수가 생성됩니다.

  기존의 pw, pwchk, term을 조회해야 하기 때문에 배열안에 넣어줘야.(dependency)

  원칙: props 로 넘겨주는 함수는 useCallback 필수!

  컴포넌트가 리렌더링 될 때마다 이 함수들이 새로 생성됩니다. 
  대부분의 경우에는 이러한 방식이 문제가 되지 않지만, 
  컴포넌트의 렌더링이 자주 발생하거나, 렌더링 해야 할 컴포넌트의 개수가 많아진다면 
  이 부분을 최적화 해주시는 것이 좋다. 

  둘은 같은 함수
        useCallback(() => {
        console.log('hello world!');
        }, [])

        비어있는 배열을 넣게 되면 컴포넌트가 렌더링 될 때 단 한번만 함수가 생성

        useMemo(() => {
        const fn = () => {
            console.log('hello world!');
        };
        return fn;
        }, [])
  
### useEffect 복습

componentDidMount와 componentDidUpdate는 로직이 분리되어 있다. 그래서 만약 위의 카운터에서, 최초 렌더링 시에도 count를 표시하고 싶고, 이 후 스테이트가 업데이트될 때에도 count를 갱신하고 싶으면 두 메서드를 다 사용해야 한다.즉 최초든 업데이트 이후든 렌더링 될 때마다 수행하고 싶은 작업이 있을 때에 기존의 라이프사이클 메서드를 사용하면 중복이 생긴다.

-> useEffect hook은 이거를 해결해준다! 
```javascript
import React, { useState, useEffect } from "react";

const Example = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
};
export default Example;

```

여기서는 useEffect외에도 함수형 컴포넌트 내에서 스테이트를 가질 수 있게 해주는 useState도 사용했다.

useEffect를 사용하면 every render 마다 원하는 작업을 수행할 수 있어 코드를 중복할 필요가 없다.

useEffect를 사용하는 방법은 위 코드처럼, 내가 원하는 effect (여기서는 도큐먼트 타이틀을 바꾸는 것) function을 패스해주면 된다. 여기서는 타이틀을 바꾸는 데 사용했지만, 필수적인 API를 불러오거나 data를 fetch할 때 사용할 수도 있을 것이다.

useState를 사용하여 contents 상태를 업데이트하고, useEffect를 사용해서 리액트는 contents의 변화를 감지한다. contents의 변화가 감지되면 useEffect는 콜백함수를 실행하여 리렌더링하는데, 이 함수의 내용은 textarea의 높이를 자동조절 하는 것이다. textarea의 크기를 조절하는 것은 createRef를 사용해서 DOM 객체에 직접 접근해 변경했다. (textarea의 ref 속성)

### Next.js에서 파일 구조

> 이것들을 만들어 주면 기존에 있던 것을 덮에 씌울 수 있다 . 

#### _document.js
#### _app.js 
#### _error.js  :배포하기 직전에는 customizing 할 필요는 딱히 없다. 


###Grid System (Ant Design에서나 bootstrap 에서나 널리활용)

xs: mobile 화면 
md: 넓은 desktop 화면 

xs: {24}, md={6} 이라고 하면 작은 화면에서는 한 줄 다 차지하게, 
넓은 화면에서는 4개씩 보이게끔 하게 만든 다는 뜻. 


### Redux: State 관리 

    1. State
    {
        isLoggedIn: false, //로그인 여부
        user: {}, //로그인한 사용자
        mainPosts: [], //메인 게시물 
        ...

    }-> 'store'

    store를 그렇다고 다 합칠 필요는 없고, 여러개로 쪼개서 root store를 하나 두어도된다. 
    index.js, post.js, user.js 이렇게 여러개 의 store를 쪼개도 된다.

    하나의 state를 여러 component들에게 분배하는 역할을 하는게 : Redux 
    redux 자체가 state역할을 하기 때문에, 리액트의 state를 대체할 수는 있긴하나 보통 같이 씀. 
    왜냐면 리덕스 state가 복잡해서 간단한건 react state를 쓴다. 

    왜 리덕스 state를 쓰냐? : 안정성 때문. 흩뿌려진 state들을 중앙에 모아서 통제할 수 있어서 통제 용이. 

    2. Action-> state를 바꾸는 행동.  ex) login action
    (setState 같은 것) 직접 수정할 수 없고 action을 통해서만 수정 가능하다. 

    3. Dispatch-> Action을 실행. 그러면 그 state를 바꿀 수가 있음.  ex) login action dispatch
    4. Reducer -> Action의 결과로 state를 어떻게 바꿀지 정의하는 부분.  
    ex) 로그인액션 dispatch시 isLoggedIn state를 true로 바꾸겠다! 선언 

-> State 구조 잡는건 경험이 많이 쌓여야 잘 잡을 수 있다. 

> 리덕스를 뷰에도 쓸 수 있고, 서버 node에도 쓸 수가 있음. 리액트와는 별개로 (리액트에서 제일 많이쓰이긴하지만)쓰일 수 있다는 것!

> 단점: 코드가 장황해진다, state, action, reducer 다 정의해야한다. 


> 근데 이제 리액트 context api 가 생겨서 리덕스 안 써도 됨. 나중에 인강듣기 : https://academy.nomadcoders.co/p/antiredux-new-react-context-api


Redux 의 기능을 확장해야한다. 
middleware를 수정해서 비동기 요청도 들어갈 수 있게해준다. 
-> Redux Saga를 쓰자. 

### Redux Saga 

> Redux는 동기적인 요청만 가능, 비동기를 끼워넣기 위해서 쓰는 미들웨어

generator: 함수 실행을 중간에 멈출 수 있고, 다시 재개할 수 있어서 쓴다. 
제네레이터가 너무 어렵다면, 사가도 패턴이 있어서 패턴대로만 하면 된다. 


Redux는 login action이 있으면 바로 실행해버린다.

그런데 saga는 login action이 실행되는지 대기하고 있다가, 비동기동작을 
실행하고, 그게 success인지 failure인지 실행해주는 구조. 

> generator는 함수 실행을 중간에 멈출 수 있고 기존 컴포넌트에 props같은것을 추가할 수 있다. function 옆에 별표하나 찍어주는 것.

#### Generator

```javascript

    function* generator(){
        console.log(1);
        console.log(2);
        yield;
        console.log(3);
    }
    const gen= generator();

    //실행을 할 때는 gen.next()로 실행
    /* output 

    1
    2
    ----또 gen.next() 부르면 
    3
    */
   

```
같은 것: yield 1; yield 2; yield 3; yield 4; === yield [1,2,3,4]

> async await 을 async yield로 하기로 했다. 그러니까 await = yield. 그런데 더 강력하다 yield, 중단하고 재개할 수 있어서 되게 강력. 더 할 수 있는게 많다. yield로 중단점을 만들고 next()로 재개할 수 있는 것. 

```javascript
    function* generator(){
        let i =0; 
        while (true){
            yield i++;
        }
    }
```
> while true 를 썼는데도 yield를 눌러서 무한반복문을 막을 수 있다. 


** SAGA는 알아서 next를 실행해준다. **

참고) 
```javascript
    function* helloSaga(){
        console.log('before saga');
        while (true){
            yield take(HELLO_SAGA);
            console.log('after saga');
        }
    }
```
이 함수에서 component가 HELLO_SAGA를 dispatch해주면 eventlistener처럼 작동한다. 'yield take'은 HELLO_SAGA라는 액션이 들어오면 저거를 재개해준다는 뜻인데, 만약 3번이나 dispatch를 해줘도 한번만 실행되는 이유? while true가 없으면 그냥 끝나버릭기때문. 그래서 저렇게 매번 실행될때마다 하게 해주려면 while true를 넣어줘야한다. 무한히 이 액션을 listen 해주려면 저거를추가해주자!!!!


그런데 항상 while true를 하면 좀 안예뻐보임. 
그래서 takeevery랑 takelatest를 쓰자! 

1. takeEvery 
    yield takeEvery( action , generator 함수) {
        yield delay(1000);
        yield put({
            type: "BYE"
        })
    }
    
2. takeLatest 
    동시에 여러번 액션을 실행하면 마지막꺼만 실행해라, 그래서 takeEvery와 달리 
    bye를 한번만 실행시켜준다. 마지막 액션만, 로그인도 마지막것만 실행하려면 takelatest를 쓰면된다. 

-> 동시에 실행될때 모든게 유효하면 takeEvery, 만약아니라면 takeLatest. 예를 들어 잘못 두번 누르면 마지막만 실행시키는. 그런 느낌. 


##### yield fork, call 의 차이 

> fork는 순서가 상관없을 떄, call은 순서가 상관있을 때, 예를 들어 call은 요청을 서버에 보내서 그게 돌아와야 실행할 수 있을때 call을 쓰고, fork는 그냥 이벤트 리스너처럼 쓸 때 그럴때 주로 쓴다. ! (아예 fork를 안써도 사실 문제없이 돌아감.)

cf) nextRouter로 페이지 이동방법? 
signup.js에서 어떻게 했냐면 

    useEffect(() => {
        if (me) {
        alert('로그인했으니 메인페이지로 이동합니다.');
        Router.push('/'); // Link 말고 이런식으로도 가능
        }
    }, [me && me.id]);

> 이런식으로 Router.push('/')를 해줄 수 있다 