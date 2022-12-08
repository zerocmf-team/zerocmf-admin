import type { FormInstance } from 'antd';
import { Form, Input, Button, Row, Col } from 'antd';

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

const { TextArea } = Input;

interface propsType {
  form?: FormInstance;
  onFinish: (values: any) => void;
}

const Seo = (props: propsType) => {
  const { form, onFinish } = props;
  return (
    <Row>
      <Col xs={24} md={12}>
        <Form onFinish={onFinish} form={form} {...formItemLayout}>
          <Form.Item label="SEO标题" name="site_seo_title">
            <Input placeholder="" />
          </Form.Item>

          <Form.Item label="SEO关键字" name="site_seo_keywords">
            <Input placeholder="" />
          </Form.Item>

          <Form.Item label="SEO描述" name="site_seo_description">
            <TextArea rows={4} />
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

export default Seo;
