export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/settings/websites',
  },
  {
    name: 'settings',
    path: '/settings',
    access: 'rbac',
    routes: [
      {
        path: './',
        redirect: '/settings/websites',
        access: 'rbac',
      },
      {
        name: 'websites',
        path: '/settings/websites',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/settings/websites/detail',
            access: 'rbac',
          },
          {
            name: 'detail',
            path: '/settings/websites/detail',
            component: './settings/Websites',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
      {
        name: 'upload',
        path: '/settings/upload',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/settings/upload/detail',
            access: 'rbac',
          },
          {
            name: 'detail',
            path: '/settings/upload/detail',
            component: './settings/Upload',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
      {
        name: 'assets',
        path: '/settings/assets',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/settings/assets/list',
            access: 'rbac',
          },
          {
            name: 'list',
            path: '/settings/assets/list',
            component: './settings/Assets',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
      {
        name: 'nav',
        path: '/settings/nav',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: './list',
            access: 'rbac',
          },
          {
            name: 'list',
            path: 'list',
            component: './settings/Nav',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
      {
        name: 'menu',
        path: '/settings/menu',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: './list',
            access: 'rbac',
          },
          {
            name: 'list',
            path: 'list',
            component: './settings/Menu',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
      {
        name: 'login',
        path: '/settings/login',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: './list',
            access: 'rbac',
          },
          {
            name: 'list',
            path: 'list',
            component: './settings/Login',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'detail',
            path: 'detail/mobile',
            component: './settings/Login/detail/Mobile',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'detail',
            path: 'detail/wxapp',
            component: './settings/Login/detail/Wxapp',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
    ],
  },
  {
    path: '/account',
    name: 'account',
    access: 'rbac',
    routes: [
      {
        path: './',
        redirect: '/account/user',
        access: 'rbac',
      },
      {
        name: 'user',
        path: '/account/user',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/account/user/list',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'list',
            path: '/account/user/list',
            component: './user/AdminUser',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'add',
            path: '/account/user/add',
            component: './user/AdminUser/Add',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'add',
            path: '/account/user/edit/:id',
            component: './user/AdminUser/Edit',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
      {
        name: 'role',
        path: '/account/role',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/account/role/list',
            access: 'rbac',
          },
          {
            name: 'list',
            path: '/account/role/list',
            component: './user/Role',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'add',
            path: '/account/role/add',
            component: './user/authorize/Add',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'edit',
            path: '/account/role/edit/:id',
            component: './user/authorize/Edit',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
      {
        name: 'department',
        path: '/account/department',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/account/department/list',
            access: 'rbac',
          },
          {
            name: 'list',
            path: '/account/department/list',
            component: './user/Department',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
    ],
  },
  {
    name: 'customer',
    path: '/customer',
    access: 'rbac',
    routes: [
      {
        path: './',
        redirect: '/customer/member',
        access: 'rbac',
      },
      {
        name: 'member',
        path: '/customer/member',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/customer/member/list',
            access: 'rbac',
          },
          {
            name: 'list',
            path: '/customer/member/list',
            component: './customer/Member',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
    ],
  },
  {
    name: 'portal',
    path: '/portal',
    access: 'rbac',
    routes: [
      {
        path: './',
        redirect: '/portal/article',
        access: 'rbac',
      },
      {
        name: 'article',
        path: '/portal/article',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/portal/article/list',
            access: 'rbac',
          },
          {
            name: 'list',
            path: '/portal/article/list',
            component: './portal/Article',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'add',
            path: '/portal/article/add',
            component: './portal/Article/Add',
            access: 'rbac',
            hideInMenu: true,
          },
          {
            name: 'edit',
            path: '/portal/article/edit/:id',
            component: './portal/Article/Edit',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
      {
        name: 'category',
        path: '/portal/category',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/portal/category/list',
            access: 'rbac',
          },
          {
            name: 'list',
            path: 'list',
            component: './portal/Category',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'add',
            path: 'add',
            component: './portal/Category/Add',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'edit',
            path: 'edit/:id',
            component: './portal/Category/Edit',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
      {
        name: 'page',
        path: '/portal/page',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/portal/page/list',
            access: 'rbac',
          },
          {
            name: 'list',
            path: '/portal/page/list',
            component: './portal/Page',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'add',
            path: '/portal/page/add',
            component: './portal/Page/Add',
            hideInMenu: true,
            access: 'rbac',
          },
          {
            name: 'edit',
            path: '/portal/page/edit/:id',
            component: './portal/Page/Edit',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
      {
        name: 'tag',
        path: '/portal/tag',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/portal/tag/list',
            access: 'rbac',
          },
          {
            name: 'list',
            path: '/portal/tag/list',
            component: './portal/Tag',
            hideInMenu: true,
            access: 'rbac',
          },
        ],
      },
    ],
  },
  {
    name: 'app',
    path: '/app',
    routes: [
      {
        path: './',
        redirect: '/app/list',
      },
      {
        path: '/app/list',
        component: './app/List',
        access: 'rbac',
      },
      {
        path: '/app/page/:appId',
        component: './app/Page',
        access: 'rbac',
      },
    ],
  },
  {
    component: './404',
  },
];
