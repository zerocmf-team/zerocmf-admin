import { message } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { addData } from '@/services/user';
import UserForm from './components/form';
import { historyPush } from '@/utils/utils';

const Index = () => {
  const onFinish = async (formValues: any) => {
    console.log('add formValues', formValues);
    const result = await addData(formValues);
    if (result.code === 1) {
      message.success(result.msg);
      historyPush(`/account/user/edit/${result.data.id}`);
    } else {
      message.error(result.msg);
    }
  };

  return (
    <PageContainer>
      <UserForm onFinish={onFinish} />
    </PageContainer>
  );
};

export default Index;
