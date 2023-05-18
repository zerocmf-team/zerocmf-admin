import { useEffect } from 'react';
import { Card, Form, Row, Col, Button, message, Tabs } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { updatePortalCategory, getPortalCategory } from '@/services/portalCategory';
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

const Edit = (props: any) => {
  const { id } = props.match.params;
  const [form] = Form.useForm();
  // const [formData, dispatch] = useReducer((state: any, action: any) => {
  //   const tempState = { ...state };
  //   Object.keys(action).forEach((key) => {
  //     const val = action[key];
  //     tempState[key] = val;
  //   });
  //   form.setFieldsValue(tempState);
  //   return { ...tempState };
  // }, {});

  // 初始化获取编辑内容
  useEffect(() => {
    const fetchData = async () => {
      const result: any = await getPortalCategory(id);
      if (result.code === 1) {
        form.setFieldsValue(result.data);
      }
    };
    fetchData();
  }, [form, id]);

  const onSubmit = async () => {
    const validate = await form.validateFields();
    if (validate) {
      const formData = form.getFieldsValue();
      formData.parent_id = Number(formData.parent_id);
      const result: any = await updatePortalCategory(Number(formData.id), formData);
      if (result.code === 1) {
        message.success(result.msg);
      } else {
        message.error(result.msg);
      }
    }
  };

  const contentList: any = [
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

  return (
    <PageContainer
      onBack={() => {
        historyPush('/portal/category');
      }}
    >
      <Card bodyStyle={{ padding: '0 24px 24px' }}>
        <Tabs defaultActiveKey="1" items={contentList} />

        <Row>
          <Col {...buttonWrapperCol}>
            <Button onClick={onSubmit} type="primary">
              更新
            </Button>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default Edit;
