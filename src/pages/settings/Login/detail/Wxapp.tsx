import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, message, Row, Switch } from 'antd';
import { useImmer } from 'use-immer';
import { getWxappLogin, setWxappLogin } from '@/services/settings';
import { useEffect } from 'react';

const formItemLayout = {
  labelCol: {
    xs: { span: 22 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const buttonWrapperCol = {
  xs: {
    offset: 0,
  },
  md: {
    span: 16,
    offset: 4,
  },
};

const Wechat = () => {
  const [form] = Form.useForm();
  const featchData = async () => {
    const res = await getWxappLogin();
    if (res.code == 1) {
      form.setFieldsValue(res.data);
    }
  };

  useEffect(() => {
    featchData();
  }, []);

  return (
    <PageContainer>
      <Card>
        <Row>
          <Col xs={24} md={12}>
            <Form
              onFinish={async (values: any) => {
                if (values.status) values.status = 1;
                else values.status = 0;
                const res = await setWxappLogin(values);
                if (res.code == 1) {
                  message.success(res.msg);
                }
              }}
              form={form}
              {...formItemLayout}
              autoComplete="off"
            >
              <Form.Item
                label="appId"
                name="appId"
                rules={[
                  {
                    required: true,
                    message: 'appId不能为空',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="appSecret"
                name="appSecret"
                rules={[
                  {
                    required: true,
                    message: 'appSecret不能为空',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="token"
                name="token"
                rules={[
                  {
                    required: true,
                    message: 'token不能为空',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="状态"
                name="status"
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: '状态不能为空',
                  },
                ]}
              >
                <Switch />
              </Form.Item>
              <Form.Item wrapperCol={buttonWrapperCol}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};
export default Wechat;
