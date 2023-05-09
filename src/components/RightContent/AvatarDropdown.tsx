import { loginOut } from '@/services/user';
import { AppstoreOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { history, useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const signOut = async (userId: any) => {
  // await loginOut(userId);
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  localStorage.removeItem('token');
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel<any>('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        const userId = initialState.currentUser.id;
        setInitialState((s: any) => ({ ...s, currentUser: undefined }));
        signOut(userId);
        return;
      } else if (key === 'workspace') {
        history.push('/workspace');
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser?.id) {
    return loading;
  }

  const { userLogin, avatar } = currentUser;

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'workspace',
            icon: <AppstoreOutlined />,
            label: '切换站点',
          },
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const getAvatar = (url: string) => {
    let avatarUrl = url;
    if (!url) {
      avatarUrl = '/assets/images/avatar.png';
    }

    return avatarUrl;
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={getAvatar(avatar)} alt="avatar" />
        <span className={`${styles.name} anticon`}>{userLogin}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
