import { useEffect, useState } from 'react';
import { Card, Form, message } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import SiteInfo from './components/SiteInfo';
import Seo from './components/Seo';
import Other from './components/Other';
import { getSettings, setSettings } from '@/services/settings';

const tabList = [
  {
    key: 'tab1',
    tab: '网站信息',
  },
  {
    key: 'tab2',
    tab: 'SEO三要素',
  },
  {
    key: 'tab3',
    tab: '其他设置',
  },
];

const Websites = () => {
  const [key, setKey] = useState('tab1');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getSettings();
      if (res.code === 1) {
        const resData = JSON.parse(res.data.option_value || null);
        setData(resData);
        form.setFieldsValue(resData);
        // console.log('seoForm', seoForm);
        // seoForm?.setFieldsValue(resData);
      } else {
        message.error(res.msg);
      }
      setLoading(false);
    };
    fetchData();
  }, [form]);

  const onFinish = async (value: any) => {
    const formData = { ...data, ...value };
    setData(formData);
    formData.open_registration = formData.open_registration ? 1 : 0;
    delete formData.status;
    setLoading(true);
    const res: any = await setSettings(formData);
    if (res.code === 1) {
      message.success(res.msg);
    } else {
      message.error(res.msg);
    }
    setLoading(false);
  };

  const contentList = {
    tab1: <SiteInfo form={form} onFinish={onFinish} />,
    tab2: <Seo form={form} onFinish={onFinish} />,
    tab3: <Other form={form} onFinish={onFinish} />,
  };

  function onTabChange(tab: any) {
    setKey(tab);
  }

  return (
    <PageContainer loading={loading}>
      <Card
        tabList={tabList}
        activeTabKey={key}
        onTabChange={(tab) => {
          onTabChange(tab);
        }}
      >
        {contentList[key]}
      </Card>
    </PageContainer>
  );
};

export default Websites;
