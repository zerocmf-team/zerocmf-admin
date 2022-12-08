import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from 'umi';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'ZeroCMF团队出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/daifuyang/zerocmf-admin',
          blankTarget: true,
        },
        {
          key: 'ZeroCMF',
          title: 'ZeroCMF Team',
          href: 'https://zerocmf.com',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
