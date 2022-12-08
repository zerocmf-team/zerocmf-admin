import React from 'react';
import { Card } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import PostForm from './components/PostForm';

const Add = () => {
  return (
    <PageContainer
      onBack={() => {
        history.push('/portal/page');
      }}
    >
      <Card>
        <PostForm />
      </Card>
    </PageContainer>
  );
};

export default Add;
