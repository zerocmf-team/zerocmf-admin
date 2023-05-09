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
    // redirect: '/workspace',
  },
  {
    name: 'workspace',
    path: '/workspace',
    hideInMenu: true,
    layout: false,
    component: './workspace',
  },
  {
    path: '/:siteId',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        name: 'settings',
        path: '/:siteId/settings',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/:siteId/settings/websites',
            access: 'rbac',
          },
          {
            name: 'websites',
            path: '/:siteId/settings/websites',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/settings/websites/detail',
                access: 'rbac',
              },
              {
                name: 'detail',
                path: '/:siteId/settings/websites/detail',
                component: './settings/Websites',
                hideInMenu: true,
                access: 'rbac',
              },
            ],
          },
          {
            name: 'upload',
            path: '/:siteId/settings/upload',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/settings/upload/detail',
                access: 'rbac',
              },
              {
                name: 'detail',
                path: '/:siteId/settings/upload/detail',
                component: './settings/Upload',
                hideInMenu: true,
                access: 'rbac',
              },
            ],
          },
          {
            name: 'assets',
            path: '/:siteId/settings/assets',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/settings/assets/list',
                access: 'rbac',
              },
              {
                name: 'list',
                path: '/:siteId/settings/assets/list',
                component: './settings/Assets',
                hideInMenu: true,
                access: 'rbac',
              },
            ],
          },
          {
            name: 'nav',
            path: '/:siteId/settings/nav',
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
            path: '/:siteId/settings/menu',
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
            path: '/:siteId/settings/login',
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
        path: '/:siteId/account',
        name: 'account',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/:siteId/account/user',
            access: 'rbac',
          },
          {
            name: 'user',
            path: '/:siteId/account/user',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/account/user/list',
                hideInMenu: true,
                access: 'rbac',
              },
              {
                name: 'list',
                path: '/:siteId/account/user/list',
                component: './user/AdminUser',
                hideInMenu: true,
                access: 'rbac',
              },
              {
                name: 'add',
                path: '/:siteId/account/user/add',
                component: './user/AdminUser/Add',
                hideInMenu: true,
                access: 'rbac',
              },
              {
                name: 'add',
                path: '/:siteId/account/user/edit/:id',
                component: './user/AdminUser/Edit',
                hideInMenu: true,
                access: 'rbac',
              },
            ],
          },
          {
            name: 'role',
            path: '/:siteId/account/role',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/account/role/list',
                access: 'rbac',
              },
              {
                name: 'list',
                path: '/:siteId/account/role/list',
                component: './user/Role',
                hideInMenu: true,
                access: 'rbac',
              },
              {
                name: 'add',
                path: '/:siteId/account/role/add',
                component: './user/authorize/Add',
                hideInMenu: true,
                access: 'rbac',
              },
              {
                name: 'edit',
                path: '/:siteId/account/role/edit/:id',
                component: './user/authorize/Edit',
                hideInMenu: true,
                access: 'rbac',
              },
            ],
          },
          {
            name: 'department',
            path: '/:siteId/account/department',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/account/department/list',
                access: 'rbac',
              },
              {
                name: 'list',
                path: '/:siteId/account/department/list',
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
        path: '/:siteId/customer',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/:siteId/customer/member',
            access: 'rbac',
          },
          {
            name: 'member',
            path: '/:siteId/customer/member',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/customer/member/list',
                access: 'rbac',
              },
              {
                name: 'list',
                path: '/:siteId/customer/member/list',
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
        path: '/:siteId/portal',
        access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/:siteId/portal/article',
            access: 'rbac',
          },
          {
            name: 'article',
            path: '/:siteId/portal/article',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/portal/article/list',
                access: 'rbac',
              },
              {
                name: 'list',
                path: '/:siteId/portal/article/list',
                component: './portal/Article',
                hideInMenu: true,
                access: 'rbac',
              },
              {
                name: 'add',
                path: '/:siteId/portal/article/add',
                component: './portal/Article/Add',
                access: 'rbac',
                hideInMenu: true,
              },
              {
                name: 'edit',
                path: '/:siteId/portal/article/edit/:id',
                component: './portal/Article/Edit',
                hideInMenu: true,
                access: 'rbac',
              },
            ],
          },
          {
            name: 'category',
            path: '/:siteId/portal/category',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/portal/category/list',
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
            path: '/:siteId/portal/page',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/portal/page/list',
                access: 'rbac',
              },
              {
                name: 'list',
                path: '/:siteId/portal/page/list',
                component: './portal/Page',
                hideInMenu: true,
                access: 'rbac',
              },
              {
                name: 'add',
                path: '/:siteId/portal/page/add',
                component: './portal/Page/Add',
                hideInMenu: true,
                access: 'rbac',
              },
              {
                name: 'edit',
                path: '/:siteId/portal/page/edit/:id',
                component: './portal/Page/Edit',
                hideInMenu: true,
                access: 'rbac',
              },
            ],
          },
          {
            name: 'tag',
            path: '/:siteId/portal/tag',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/portal/tag/list',
                access: 'rbac',
              },
              {
                name: 'list',
                path: '/:siteId/portal/tag/list',
                component: './portal/Tag',
                hideInMenu: true,
                access: 'rbac',
              },
            ],
          },
        ],
      },
      {
        name: 'apps',
        path: '/:siteId/apps',
        routes: [
          {
            name: 'form',
            path: '/:siteId/apps/form',
            routes: [
              {
                path: './',
                redirect: '/:siteId/apps/form/list',
              },
              {
                path: '/:siteId/apps/form/list',
                component: './apps/form/List',
                access: 'rbac',
              },
            ],
          },
          {
            name: 'app',
            path: '/:siteId/apps/app',
            access: 'rbac',
            routes: [
              {
                path: './',
                redirect: '/:siteId/apps/app/list',
              },
              {
                path: '/:siteId/apps/app/list',
                component: './apps/app/List',
                access: 'rbac',
              },
              {
                path: '/:siteId/apps/app/page/:appId',
                component: './apps/app/Page',
                access: 'rbac',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
