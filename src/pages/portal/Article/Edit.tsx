import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import PostForm from './components/PostForm';
import { historyPush } from '@/utils/utils';

const Add = (props: any) => {
  const { id } = props.match.params;

  return (
    <PageContainer
      onBack={() => {
        historyPush('/portal/article/list');
      }}
    >
      <Card>
        <PostForm editId={id} />
      </Card>
    </PageContainer>
  );
};

export default Add;
