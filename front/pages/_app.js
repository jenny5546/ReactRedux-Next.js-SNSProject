/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';
import createSagaMiddleware from 'redux-saga';
// page의 공통적인 부분 모아주기
// 중복되는 부분들을 모아줘서 다른 컴포넌트로 분리해서, 계속 리렌더링되는걸 막기
// 최적화하기.

// 모든 component는 App.js를 공유한다. 그래서 리덕스를 여기다가 넣어주면 된다.
const NodeBird = ({ Component, store }) => // Store 는 state, action, reducer를 합친 것. ***
  (
     <Provider store={store}>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  )
;

// propTypes 제대로된 prop을 받았냐 안 받았냐!?
// 올바른 자료형을 받았는지 확인하기
NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired, // MyComponent처럼 jsx아니고 이렇게 받아지는거는 elementType로.
  store: PropTypes.object.isRequired,
};

// 그냥 외우기 . 패턴처럼

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(NodeBird);

// 실제 서비스에서는 __REDUX_DEVTOOLS_EXTENSION__이거 뺴줘야 노출이 안됨.
// 실제 서비스 배포할 때는 NODE_ENV 이런식으로 넣어줘야하는거다.


// Store를 그래서 어떻게 넣어주는지: 이건 외워라 (아래, 항상 똑같이 쓰임)
// export default withRedux((initialState, options) => {

//   //리덕스 데브툴즈 확장 프로그램(state + 액션들 볼 수 있는 프로그램)을 설치하면 저 함수를 쓸 수 있는데 기존 미들웨어에 추가해서 합성했다는 뜻.
//   //그냥 외우면 된다. 리덕스 사가를 쓰겠다 이런식으로 middlewares = [여기 안에] 넣으면 되는거고,,,
//   // const middlewares = []; //리덕스에 없는 기능을 추가하고 싶을 때, Middleware를 쓴다.
//   const enhancer = compose(
//     applyMiddleware(...middlewares),
//     !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
//     //서버인 경우에는 윈도우가 없음
//     );

//   const store = createStore(reducer, initialState, enhancer);
//   //여기에 store customizing 가능.


//   return store;
// })(NodeBird);
