import { Card, Form, message } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addData } from '@/services/user';
import UserForm from './components/form';

const Index = () => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    const formValues = form.getFieldsValue();
    const result = await addData(formValues);
    if (result.code === 1) {
      message.success(result.msg);
      history.push(`/account/user/edit/${result.data.id}`);
    } else {
      message.error(result.msg);
    }
  };

  return (
    <PageContainer>
      <UserForm form={form} onSubmit={onSubmit} />
    </PageContainer>
  );
};

export default Index;
