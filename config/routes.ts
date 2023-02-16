﻿export default [
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
    routes: [
      {
        path: './',
        redirect: '/settings/websites',
      },
      {
        name: 'websites',
        path: '/settings/websites',
        routes: [
          {
            path: './',
            redirect: "/settings/websites/detail",
          },
          {
            name: 'detail',
            path: '/settings/websites/detail',
            component: './settings/Websites',
            hideInMenu: true
          }
        ]
      },
      {
        name: 'upload',
        path: '/settings/upload',
        routes: [
          {
            path: './',
            redirect: "/settings/upload/detail",
          },
          {
            name: 'detail',
            path: '/settings/upload/detail',
            component: './settings/Upload',
            hideInMenu: true
          }
        ]
      },
      {
        name: 'assets',
        path: '/settings/assets',
        routes: [
          {
            path: './',
            redirect: "/settings/assets/list",
          },
          {
            name: 'list',
            path: '/settings/assets/list',
            component: './settings/Assets',
            hideInMenu: true
          }
        ]
      },
      {
        name: 'menu',
        path: '/settings/menu',
        routes: [
          {
            path: './',
            redirect: './list',
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
        routes: [
          {
            path: './',
            redirect: './list',
          },
          {
            name: 'list',
            path: 'list',
            component: './settings/Login',
            hideInMenu: true,
            // access: 'rbac',
          },
          {
            name: 'detail',
            path: 'detail/mobile',
            component: './settings/Login/detail/Mobile',
            hideInMenu: true,
            // access: 'rbac',
          },
          {
            name: 'detail',
            path: 'detail/wxapp',
            component: './settings/Login/detail/Wxapp',
            hideInMenu: true,
            // access: 'rbac',
          },
        ]
      }
    ],
  },
  {
    path: '/account',
    name: 'account',
    routes: [
      {
        path: './',
        redirect: '/account/user',
      },
      {
        name: 'user',
        path: '/account/user',
        routes: [
          {
            path: './',
            redirect: '/account/user/list',
            hideInMenu: true
          },
          {
            name: 'list',
            path: '/account/user/list',
            component: './user/AdminUser',
            hideInMenu: true
            // access: 'rbac',
          },
          {
            name: 'add',
            path: '/account/user/add',
            component: './user/AdminUser/Add',
            hideInMenu: true
            // access: 'rbac',
          },
          {
            name: 'add',
            path: '/account/user/edit/:id',
            component: './user/AdminUser/Edit',
            hideInMenu: true
            // access: 'rbac',
          },
        ],
        // access: 'rbac',
      },
      {
        name: 'role',
        path: '/account/role',
        // access: 'rbac',
        routes: [
          {
            path: './',
            redirect: '/account/role/list',
          },
          {
            name: 'list',
            path: '/account/role/list',
            component: './user/Role',
            hideInMenu: true
            // access: 'rbac',
          },
          {
            name: 'add',
            path: '/account/role/add',
            component: './user/authorize/Add',
            hideInMenu: true
            // access: 'rbac',
          },
          {
            name: 'edit',
            path: '/account/role/edit/:id',
            component: './user/authorize/Edit',
            hideInMenu: true
            // access: 'rbac',
          },
        ],
      },
      {
        name: 'department',
        path: '/account/department',
        routes: [
          {
            path: './',
            redirect: '/account/department/list',
          },
          {
            name: 'list',
            path: '/account/department/list',
            component: './user/Department',
            hideInMenu: true
            // access: 'rbac',
          }
        ]
      }
    ],
  },
  {
    name: 'customer',
    path: '/customer',
    routes: [
      {
        path: './',
        redirect: '/customer/member',
      },
      {
        name: 'member',
        path: '/customer/member',
        routes: [
          {
            path: './',
            redirect: '/customer/member/list',
          },
          {
            name: "list",
            path: '/customer/member/list',
            component: './customer/Member',
            hideInMenu: true
          }
        ]
      }
    ]
  },
  {
    name: 'portal',
    path: '/portal',
    routes: [
      {
        path: './',
        redirect: '/portal/article',
      },
      {
        name: 'article',
        path: '/portal/article',
        routes: [
          {
            path: './',
            redirect: '/portal/article/list',
          },
          {
            name: 'list',
            path: '/portal/article/list',
            component: './portal/Article',
            access: 'rbac',
            hideInMenu: true
          },
          {
            name: 'add',
            path: '/portal/article/add',
            component: './portal/Article/Add',
            access: 'rbac',
            hideInMenu: true
          },
          {
            name: 'edit',
            path: '/portal/article/edit/:id',
            component: './portal/Article/Edit',
            access: 'rbac',
            hideInMenu: true
          }
        ],
      },
      {
        name: 'category',
        path: '/portal/category',
        routes: [
          {
            path: './',
            redirect: '/portal/category/list',
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
          }
        ],
      },
      {
        name: 'page',
        path: '/portal/page',
        routes: [
          {
            path: './',
            redirect: '/portal/page/list',
          },
          {
            name: 'list',
            path: '/portal/page/list',
            component: './portal/Page',
            hideInMenu: true,
            // access: 'rbac',
          },
          {
            name: 'add',
            path: '/portal/page/add',
            component: './portal/Page/Add',
            hideInMenu: true,
            // access: 'rbac',
          },
          {
            name: 'edit',
            path: '/portal/page/edit/:id',
            component: './portal/Page/Edit',
            hideInMenu: true,
            // access: 'rbac',
          }
        ]
      },
      {
        name: 'tag',
        path: '/portal/tag',
        routes: [
          {
            path: './',
            redirect: '/portal/tag/list',
          },
          {
            name: 'list',
            path: '/portal/tag/list',
            component: './portal/Tag',
            hideInMenu: true,
          }
        ]
      }
    ],
  },
  {
    component: './404',
  },
];
