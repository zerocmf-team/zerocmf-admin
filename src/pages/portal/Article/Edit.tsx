import { Card } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import PostForm from './components/PostForm';

const Add = (props: any) => {
  const { id } = props.match.params;

  return (
    <PageContainer
      onBack={() => {
        history.push('/portal/article/list');
      }}
    >
      <Card>
        <PostForm editId={id} />
      </Card>
    </PageContainer>
  );
};

export default Add;
