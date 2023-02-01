import { message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { editData, getData } from '@/services/user';
import UserForm from './components/form';

const Index = (props: any) => {
  const { id } = props.match.params;

  const onFinish = async (formValues: any) => {
    const result = await editData(id, formValues);
    if (result.code === 1) {
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }
  };

  const fetchData = () => {
    return getData(id);
  };

  return (
    <PageContainer>
      <UserForm request={fetchData} onFinish={onFinish} />
    </PageContainer>
  );
};

export default Index;
