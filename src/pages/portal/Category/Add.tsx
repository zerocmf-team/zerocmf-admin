import { useEffect } from 'react';
import { Card, Form, Row, Col, Button, message, Tabs } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { addPortalCategory } from '@/services/portalCategory';
import Basic from './components/Basic';
import Seo from './components/Seo';
import Tpl from './components/Tpl';
import { historyPush } from '@/utils/utils';

const buttonWrapperCol = {
  xs: {
    offset: 0,
  },
  md: {
    offset: 2,
  },
};

const Add = (props: any) => {
  const { pid } = props.history.location.query;
  const [form] = Form.useForm();

  const tabListNoTitle: any = [
    {
      key: 'basic',
      label: '基本设置',
      children: <Basic form={form} />,
      forceRender: true,
    },
    {
      key: 'seo',
      label: 'SEO设置',
      children: <Seo form={form} />,
      forceRender: true,
    },
    {
      key: 'tpl',
      label: '模板设置',
      children: <Tpl form={form} />,
      forceRender: true,
    },
  ];

  useEffect(() => {
    if (pid) {
      form.setFieldValue('parent_id', Number(pid));
    }
  }, [form, pid]);

  const onSubmit = async () => {
    const validate = await form.validateFields();
    if (validate) {
      const formData: any = form.getFieldsValue();
      formData.parent_id = Number(formData.parent_id);
      const result: any = await addPortalCategory(formData);
      if (result.code === 1) {
        message.success(result.msg);
        historyPush(`/portal/category/edit/${result.data.id}`);
      } else {
        message.error(result.msg);
      }
    }
  };

  return (
    <PageContainer
      onBack={() => {
        historyPush('/portal/category');
      }}
    >
      <Card bodyStyle={{ padding: '0 24px 24px' }}>
        <Tabs items={tabListNoTitle} />
        <Row>
          <Col {...buttonWrapperCol}>
            <Button onClick={onSubmit} type="primary">
              保存
            </Button>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default Add;
