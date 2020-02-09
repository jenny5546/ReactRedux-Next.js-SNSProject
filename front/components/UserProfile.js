import { Avatar, Card } from 'antd';
import React from 'react';

const dummy = {
  nickname: '제로초',
  Post: [],
  Followings: [],
  Followers: [],
  isLoggedIn: false,
};

const UserProfile = () => {
  return (
    <Card
      actions={[ //actions 카드 안에 액션 (뭔가 버튼? 칸?)이 추가됨
        <div key="twit">짹짹<br />{dummy.Post.length}</div>,
        <div key="following">팔로잉<br />{dummy.Followings.length}</div>,
        <div key="follower">팔로워<br />{dummy.Followers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
        title={dummy.nickname}
      />
    </Card>
  );
};

export default UserProfile;