import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Col, Input, Menu, Row } from 'antd';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';


const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector(state => state.user);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
        <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>
      <Row gutter={8}> {/* row 간 간격 = gutter */}
      {/* 로그인이 되어있으면, userprofile, 아니면 form 삼항연산자 */}
      {/* xs: mobile md: desktop */}
        <Col xs={24} md={6}> 
          {isLoggedIn
            ? <UserProfile />
            : <LoginForm />}  
        </Col>
        <Col xs={24} md={12}> 
          {children}
        </Col>
        <Col xs={24} md={6}>
          <Link href="https://www.zerocho.com" ><a target="_blank">Made by ZeroCho</a></Link>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node, //rendering 될 수 있는 부분은 node. 
};


export default AppLayout;