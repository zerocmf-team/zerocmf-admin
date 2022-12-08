import { useState, useEffect } from 'react';
import { Tree, Card, Form, Button, message } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getAuthorizes } from '@/services/authorize';
import { getRole } from '@/services/role';
import { getData, editData } from '@/services/authAccess';
import RoleForm from './components/RoleForm';

const Index = (props: any) => {
  const roleId = props.match.params.id;
  const [treeData, setTreeData] = useState([]);
  const [values, setValues] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    async function featchData() {
      const result = await getAuthorizes();
      if (result.code === 1) {
        setTreeData(result.data);
      }

      const roleRes = await getRole(roleId);
      if (roleRes.code === 1) {
        form.setFieldsValue({
          name: roleRes.data.name,
          remark: roleRes.data.remark,
        });
      }

      const accessRes = await getData(roleId);
      if (accessRes.code === 1) {
        setValues(accessRes.data);
      }
    }

    featchData();
  }, [form, roleId]);

  const onCheck = (checkedKeys: any) => {
    const checkeds = checkedKeys.checked;
    setValues(checkeds);
  };

  // 提交
  const onSubmit = async () => {
    const formValues = form.getFieldsValue();
    window.console.log(formValues, values);

    const result = await editData({
      id: roleId,
      ...formValues,
      role_access: values,
    });

    if (result.code === 1) {
      message.success(result.msg);
    }
  };

  return (
    <PageContainer>
      <Card style={{ minHeight: '300px' }}>
        <RoleForm form={form} />
        <div className="mb-3">
          <Tree
            checkable
            checkedKeys={values}
            selectable={false}
            onCheck={onCheck}
            treeData={treeData}
          />
        </div>

        <Button
          onClick={() => {
            onSubmit();
          }}
          className="mr-1"
          type="primary"
        >
          确定
        </Button>
        <Button onClick={() => history.goBack()}>返回</Button>
      </Card>
    </PageContainer>
  );
};

export default Index;
