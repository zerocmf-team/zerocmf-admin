import { MobileOutlined, WechatOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, List } from 'antd';
import classnames from 'classnames';
import { history } from 'umi';
import styles from './index.less';

const BindingView: React.FC = () => {
  const getData = () => [
    {
      title: '手机登录',
      description: '通过手机验证码登录',
      actions: [
        <a
          onClick={() => {
            history.push('/settings/login/detail/mobile');
          }}
          key="settings"
        >
          设置
        </a>,
      ],
      avatar: <MobileOutlined className={classnames(styles.mobile, styles.icon)} />,
    },
    {
      title: '微信登录',
      description: '通过微信扫一扫登录',
      actions: [
        <a
          onClick={() => {
            history.push('/settings/login/detail/wxapp');
          }}
          key="settings"
        >
          设置
        </a>,
      ],
      avatar: <WechatOutlined className={classnames(styles.wechat, styles.icon)} />,
    },
  ];

  return (
    <PageContainer>
      <Card>
        <List
          className={styles.list}
          itemLayout="horizontal"
          dataSource={getData()}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

export default BindingView;
