import { useEffect, useState } from 'react';

import { Form, Input, Checkbox, Button, Card } from 'antd';
import { getRoles } from '@/services/role';
import { historyPush } from '@/utils/utils';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const UserForm = (props: any) => {
  const { request, onFinish } = props;

  const [radioData, setRadioData] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchData() {
      const result = await getRoles({ current: 1, pageSize: 999 });

      if (result.code === 1) {
        const { data } = result.data;
        const options: any = [];

        data.forEach((v: any) => {
          options.push({ label: v.name, value: `${v.id}` });
        });

        setRadioData(options);
      }
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    if (form) {
      const res = await request();
      if (res.code == 1) {
        form.setFieldsValue(res.data);
      }
    }
  };

  useEffect(() => {
    if (request) {
      fetchData();
    }
  }, []);

  function onChange(checkedValues: any) {
    window.console.log('checked = ', checkedValues);
  }

  return (
    <Card style={{ minHeight: '300px' }}>
      <Form
        autoComplete="off"
        form={form}
        style={{ maxWidth: '500px' }}
        {...layout}
        onFinish={onFinish}
      >
        <Form.Item
          label="用户名"
          name="user_login"
          rules={[{ required: true, message: '用户名称不能为空!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="密码" name="user_pass">
          <Input.Password placeholder="******" />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="user_email"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="手机号" name="mobile">
          <Input />
        </Form.Item>

        <Form.Item label="真实姓名" name="user_realname">
          <Input />
        </Form.Item>

        <Form.Item
          name="role_ids"
          label="角色"
          rules={[{ required: true, message: '请至少选择一个角色！', type: 'array' }]}
        >
          <Checkbox.Group options={radioData} onChange={onChange} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button htmlType="submit" className="mr-1" type="primary">
            确定
          </Button>
          <Button onClick={() => historyPush('/account/user/list')}>返回</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserForm;
