import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, message, Row, Select, Switch } from 'antd';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { getMobilelogin, setMobilelogin } from '@/services/settings';

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

const Detail = (props: any) => {
  const platformData = [
    {
      label: '请选择',
      value: '',
    },
    {
      label: '阿里短信',
      value: 'dy',
    },
  ];

  const [form] = Form.useForm();

  const [state, setState] = useImmer({
    form: {
      platform: 'dy',
    },
  });

  const featchData = async () => {
    const res = await getMobilelogin();
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
                const res = await setMobilelogin(values);
                if (res.code == 1) {
                  message.success(res.msg);
                }
              }}
              form={form}
              {...formItemLayout}
              initialValues={state.form}
              autoComplete="off"
            >
              <Form.Item
                label="短信平台"
                name="platform"
                rules={[
                  {
                    required: true,
                    message: '短信平台不能为空',
                  },
                ]}
              >
                <Select options={platformData} />
              </Form.Item>
              <Form.Item
                label="accessKeyId"
                name="access_key_id"
                rules={[
                  {
                    required: true,
                    message: 'accessKeyId不能为空',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="accessKeySecret"
                name="access_key_secret"
                rules={[
                  {
                    required: true,
                    message: 'accessKeySecret不能为空',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="短信签名"
                name="sign_name"
                rules={[
                  {
                    required: true,
                    message: '短信签名不能为空',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="短信模板"
                name="template_code"
                rules={[
                  {
                    required: true,
                    message: '短信模板不能为空',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="参数变量"
                name="template_param"
                rules={[
                  {
                    required: true,
                    message: '参数变量不能为空',
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
export default Detail;
