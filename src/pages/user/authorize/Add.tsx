import { useState, useEffect } from 'react';
import { Tree, Card, Form, Button, message } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import { getAuthorizes } from '@/services/authorize';
import { addData } from '@/services/authAccess';
import RoleForm from './components/RoleForm';

const Index = () => {
  const [treeData, setTreeData] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    async function featchData() {
      const result = await getAuthorizes();
      if (result.code === 1) {
        window.console.log(result);
        setTreeData(result.data);
      }
    }
    featchData();
  }, []);

  const [form] = Form.useForm();

  const onCheck: any = (checkedKeys: any, info: { halfCheckedKeys: any }) => {
    const { halfCheckedKeys } = info;
    const checks = checkedKeys.concat(halfCheckedKeys);
    setValues(checks);
  };

  const onSubmit = async () => {
    const formValues = form.getFieldsValue();
    window.console.log(formValues, values);

    const result = await addData({ ...formValues, role_access: values });

    if (result.code === 1) {
      message.success(result.msg);
      history.push(`/account/role/edit/${result.data.id}`);
    }
  };

  return (
    <PageContainer>
      <Card style={{ minHeight: '300px' }}>
        <RoleForm form={form} />

        <div className="mb-3">
          <Tree checkable selectable={false} onCheck={onCheck} treeData={treeData} />
        </div>

        <Button onClick={onSubmit} className="mr-1" type="primary">
          确定
        </Button>
        <Button onClick={() => history.goBack()}>返回</Button>
      </Card>
    </PageContainer>
  );
};

export default Index;
