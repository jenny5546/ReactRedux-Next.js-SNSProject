import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';

//page의 공통적인 부분 모아주기
// 중복되는 부분들을 모아줘서 다른 컴포넌트로 분리해서, 계속 리렌더링되는걸 막기
// 최적화하기.
const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  );
};

//propTypes 제대로된 prop을 받았냐 안 받았냐!? 
//올바른 자료형을 받았는지 확인하기. 
NodeBird.propTypes = {
  Component: PropTypes.elementType, //MyComponent처럼 jsx아니고 이렇게 받아지는거는 elementType로.
};

export default NodeBird;