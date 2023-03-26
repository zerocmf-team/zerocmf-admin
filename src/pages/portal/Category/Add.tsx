import { useState, useReducer } from 'react';
import { Card, Form, Row, Col, Button, message } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import { addPortalCategory } from '@/services/portalCategory';
import Basic from './components/Basic';
import Seo from './components/Seo';
import Tpl from './components/Tpl';

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
  const [cardActive, setCardActive] = useState('basic');

  const [formData, dispatch] = useReducer((state: any, action: any) => {
    const tempState = { ...state };
    Object.keys(action).forEach((key) => {
      tempState[key] = action[key];
    });
    return tempState;
  }, {});

  const tabListNoTitle = [
    {
      key: 'basic',
      tab: '基本设置',
    },
    {
      key: 'seo',
      tab: 'SEO设置',
    },
    {
      key: 'tpl',
      tab: '模板设置',
    },
  ];

  // 初始化获取层级关系

  const onFormChange = () => {
    const data = form.getFieldsValue();
    dispatch(data);
  };

  const onSubmit = async () => {
    formData['parent_id'] = Number(formData['parent_id']);
    const result: any = await addPortalCategory(formData);
    if (result.code === 1) {
      message.success(result.msg);
      history.push(`/portal/category/edit/${result.data.id}`);
    } else {
      message.error(result.msg);
    }
  };

  const contentListNoTitle = {
    basic: <Basic onFormChange={onFormChange} pid={pid} form={form} />,
    seo: <Seo onFormChange={onFormChange} form={form} />,
    tpl: <Tpl onFormChange={onFormChange} form={form} />,
  };

  return (
    <PageContainer
      onBack={() => {
        history.push('/portal/category');
      }}
    >
      <Card
        tabList={tabListNoTitle}
        activeTabKey={cardActive}
        onTabChange={(key) => {
          setCardActive(key);
        }}
      >
        {contentListNoTitle[cardActive]}

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
