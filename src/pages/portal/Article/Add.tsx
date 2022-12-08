import { Card } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import PostForm from './components/PostForm';

const Add = () => {
  return (
    <PageContainer
      onBack={() => {
        history.push('/portal/index');
      }}
    >
      <Card>
        <PostForm />
      </Card>
    </PageContainer>
  );
};

export default Add;
