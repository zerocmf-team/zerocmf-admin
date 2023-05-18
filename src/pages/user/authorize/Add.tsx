import { useState, useEffect } from 'react';
import { Tree, Card, Form, Button, message } from 'antd';
import { history, useIntl } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import { getAuthorizes } from '@/services/authorize';
import { addData } from '@/services/authAccess';
import RoleForm from './components/RoleForm';

const Index = () => {
  const [treeData, setTreeData] = useState([]);
  const [values, setValues] = useState([]);

  const intl = useIntl();

  useEffect(() => {
    async function fetchData() {
      const result = await getAuthorizes();
      if (result.code === 1) {
        setTreeData(result.data);
      }
    }
    fetchData();
  }, []);

  const [form] = Form.useForm();

  const onCheck: any = (checkedKeys: any) => {
    setValues(checkedKeys);
  };

  const onSubmit = async () => {
    const validate = await form.validateFields();
    if (validate) {
      const formValues = form.getFieldsValue();
      window.console.log(formValues, values);

      const result = await addData({ ...formValues, role_access: values });

      if (result.code === 1) {
        message.success(result.msg);
        history.push(`/account/role/edit/${result.data.id}`);
      }
    }
  };

  return (
    <PageContainer>
      <Card style={{ minHeight: '300px' }}>
        <RoleForm form={form} />

        <div className="mb-3">
          <Tree
            titleRender={(nodeData: any) => {
              return intl.formatMessage({
                id: nodeData.locale,
              });
            }}
            checkable
            selectable={false}
            onCheck={onCheck}
            treeData={treeData}
          />
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
