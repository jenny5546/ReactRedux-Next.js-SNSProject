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


