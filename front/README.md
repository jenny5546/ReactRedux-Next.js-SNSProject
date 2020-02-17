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
    하나의 state를 여러 component들에게 분배하는 역할을 하는게 : Redux 
    redux 자체가 state역할을 하기 때문에, 리액트의 state를 대체할 수는 있긴하나 보통 같이 씀. 
    왜냐면 리덕스 state가 복잡해서 간단한건 react state를 쓴다. 

    왜 리덕스 state를 쓰냐? : 안정성 때문. 흩뿌려진 state들을 중앙에 모아서 통제할 수 있어서 통제 용이. 

    2. Action-> state를 바꾸는 행동.  ex) login action
    (setState 같은 것) 직접 수정할 수 없고 action을 통해서만 수정 가능하다. 

    3. Dispatch-> Action을 실행. 그러면 그 state를 바꿀 수가 있음.  ex) login action dispatch
    4. Reducer -> Action의 결과로 state를 어떻게 바꿀지 정의하는 부분.  
    ex) 로그인액션 dispatch시 isLoggedIn state를 true로 바꾸겠다! 선언 


> 리덕스를 뷰에도 쓸 수 있고, 서버 node에도 쓸 수가 있음. 리액트와는 별개로 (리액트에서 제일 많이쓰이긴하지만)쓰일 수 있다는 것!