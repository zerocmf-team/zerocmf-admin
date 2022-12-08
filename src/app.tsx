import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { MenuDataItem, Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from '@/services/user';
import { getAdminMenu } from '@/services/adminMenu';
import { message } from 'antd';

import 'antd/dist/antd.css';
import '@zerocmf/antd-form/dist/style.css';
import { createRef } from 'react';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

export const layoutActionRef = createRef<{ reload: () => void }>();

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

const Icon = (props: any) => {
  let { icon } = props;
  if (!icon) icon = 'iconsetting';
  return (
    <span className="anticon">
      <i className={`iconfont ${icon}`} />
    </span>
  );
};

const loopMenuItem: any = (menus: MenuDataItem[] | { icon: any; children: any }[]) => {
  return menus.map(({ icon = '', children, ...item }) => {
    return {
      ...item,
      icon: <Icon icon={icon} />,
      children: children && loopMenuItem(children),
    };
  });
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchMenus?: () => any;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      console.log('error', error);
      history.push(loginPath);
    }
    return undefined;
  };

  const fetchMenus = async () => {
    layoutActionRef.current?.reload();
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      fetchMenus,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }: any) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: false,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: { location: { pathname: string | string[] } }) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    actionRef: layoutActionRef,
    menu: {
      params: {
        userId: initialState?.currentUser?.id,
      },
      request: async (params = {}) => {
        // initialState.currentUser 中包含了所有用户信息
        const { userId } = params;
        if (userId) {
          const result = await getAdminMenu();
          if (result.code === 1) {
            setInitialState((s: any) => ({ ...s, menus: result.data }));
            return result.data;
          }
          message.error(result.msg);
        }
      },
    },
    menuDataRender: (menuData: MenuDataItem[]) => loopMenuItem(menuData),
    ...initialState?.settings,
  };
};

const authHeaderInterceptor = (url: string, options: RequestConfig) => {
  if (options.token) {
    let token: any = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token);
      options.headers = {
        Authorization: `Bearer ${token.access_token}`,
      };
    }
  }
  return {
    url,
    options,
  };
};

export const request: RequestConfig = {
  requestInterceptors: [authHeaderInterceptor],
  errorHandler(error) {
    const { response } = error;
    if (response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText;
      const { status, url } = response;
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    } else if (!response) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }

    return response;
  },
};
