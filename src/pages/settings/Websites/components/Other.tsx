import type { FormInstance } from 'antd';
import { Form, Input, Switch, Button, Row, Col } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
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

interface propsType {
  form?: FormInstance;
  onFinish: (values: any) => void;
}

const Other = (props: propsType) => {
  const { form, onFinish } = props;
  return (
    <Row>
      <Col span={12}>
        <Form onFinish={onFinish} form={form} {...formItemLayout}>
          <Form.Item name="open_registration" label="开启登录注册" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item wrapperCol={buttonWrapperCol}>
            <Button htmlType="submit" type="primary">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Other;
