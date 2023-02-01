import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Row, Switch } from 'antd';
import { useImmer } from 'use-immer';

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

const Wechat = (props: any) => {
  const [form] = Form.useForm();

  const [state, setState] = useImmer({
    form: {},
  });

  return (
    <PageContainer>
      <Card>
        <Row>
          <Col xs={24} md={12}>
            <Form
              onFinish={async (values: any) => {}}
              form={form}
              {...formItemLayout}
              initialValues={state.form}
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
