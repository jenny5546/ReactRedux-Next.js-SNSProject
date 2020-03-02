/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux'; //use Dispatch 로 액션 실행, useSelector로 state 가져오기 

// import { loginAction, logoutAction } from '../reducers/user';


// const dummy = {
//   isLoggedIn: true,
//   imagePaths: [],
//   mainPosts: [{
//     User: {
//       id: 1,
//       nickname: '제로초',
//     },
//     content: '첫 번째 게시글',
//     img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
//   }],
// };

const Home = () => {
  // const dispatch = useDispatch(); //action은 usedispatch로 (setState는 usedispatch로 바뀌었다고 생각해도 된다.)
  const { user, isLoggedIn } = useSelector(state => state.user); //redux state갖다쓰는거는 (useState= useSelector)
  //계속 바뀌면 리렌더링을 해주기 때문에 최대한 잘게 짤라주는게 좋다. 
  const { mainPosts } = useSelector(state => state.post);
  // useEffect(()=>{
  //   dispatch(loginAction);
  //   dispatch(logoutAction);
  //   dispatch(loginAction);
  // }, [])
  return (
    <div>
      {user ? <div>로그인했습니다: { user.nickname }</div> : <div>로그아웃했습니다 </div>}

      {isLoggedIn && <PostForm />}
      {mainPosts.map((c) => {
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


// cf) 리액트 훅스가 없었을 때에는, mapStateToProps를 써서했음. 