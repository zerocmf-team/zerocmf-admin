import React, { useState, useEffect, useReducer } from 'react';
import { Card, Form, Row, Col, Button, message } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import { updatePortalCategory, getPortalCategory } from '@/services/portalCategory';
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

const Edit = (props: any) => {
  const { pid } = props.history.location.query;
  const { id } = props.match.params;
  const [form] = Form.useForm();
  const [cardActive, setCardActive] = useState('basic');

  const [formData, dispatch] = useReducer((state: any, action: any) => {
    const tempState = { ...state };
    Object.keys(action).forEach((key) => {
      const val = action[key];
      tempState[key] = val;
    });
    form.setFieldsValue(tempState);
    return { ...tempState };
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

  // 初始化获取编辑内容
  useEffect(() => {
    const featchData = async () => {
      const result: any = await getPortalCategory(id);
      if (result.code === 1) {
        result.data.parent_id = `${result.data.parent_id}`;
        dispatch(result.data);
      }
    };
    featchData();
  }, []);

  const onFormChange = () => {
    const data = form.getFieldsValue();
    dispatch(data);
  };

  const onSubmit = async () => {
    formData['parent_id'] = Number(formData['parent_id']);
    const result: any = await updatePortalCategory(formData.id, formData);
    if (result.code === 1) {
      message.success(result.msg);
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
              更新
            </Button>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default Edit;
