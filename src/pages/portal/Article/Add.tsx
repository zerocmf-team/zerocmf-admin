import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import PostForm from './components/PostForm';
import { historyPush } from '@/utils/utils';

const Add = () => {
  return (
    <PageContainer
      onBack={() => {
        historyPush('/portal/article/list');
      }}
    >
      <Card>
        <PostForm />
      </Card>
    </PageContainer>
  );
};

export default Add;
