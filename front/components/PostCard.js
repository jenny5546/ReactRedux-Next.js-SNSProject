import React from 'react';
import { Card, Icon, Button, Avatar } from 'antd';
import PropTypes from 'prop-types';

const PostCard = ({ post }) => {
  return (

    <Card 
      key={+post.createdAt}
      cover={post.img && <img alt="example" src={post.img} />} //&&을 넣는거는 img가 있을 때, 저 div나온다 (tip)
      actions={[
        <Icon type="retweet" key="retweet" />,
        <Icon type="heart" key="heart" />,
        <Icon type="message" key="message" />,
        <Icon type="ellipsis" key="ellipsis" />,
      ]}
      extra={<Button>팔로우</Button>}
    >
      <Card.Meta
        avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
        title={post.User.nickname}
        description={post.content}
      />
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  }),
};
//shape 라는 것을 써서 안에 상세하게 써 줄 수 있음.

export default PostCard;