import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useInput } from '../pages/signup'; //다른 파일에서 함수를 들고 올 수 있다 

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log({
      id, password,
    });
  }, [id, password]);

  return (
    <Form onSubmit={onSubmitForm} style={{ padding: '10px' }}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" value={password} onChange={onChangePassword} type="password" required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </div>
    </Form>
  );
};

export default LoginForm;