import { useEffect, useState } from 'react';
import { Card, Form, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { editData, getData } from '@/services/user';
import UserForm from './components/form';

const Index = (props: any) => {
  const { id } = props.match.params;
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);

  const onSubmit = async () => {
    const formValues = form.getFieldsValue();
    const result = await editData(id, formValues);
    if (result.code === 1) {
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(id);
      form.setFieldsValue(result.data);
      if (result.code === 1) {
        form.setFieldsValue({
          role_ids: result.data.roles,
        });
        setRoles(result.data.roles);
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer>
      <UserForm roles={roles} form={form} onSubmit={onSubmit} />
    </PageContainer>
  );
};

export default Index;
