import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫 번째 게시글',
    img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
  }],
};

const Home = () => {
  return (
    <div>
      {dummy.isLoggedIn && <PostForm />}
      {dummy.mainPosts.map((c) => {
        return (
          <PostCard key={c} post={c} />
        );
      })}
    </div>
  );
};
//리액트 조건문, 리액트 반복문, 리액트 폼들은 주로 component를 분리해야한다!!!**** 
//ex) PostCard(반복문) PostForm(조건문)
export default Home;