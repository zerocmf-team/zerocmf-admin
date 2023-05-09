/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

import { treeToList } from './utils/utils';
export default function access(initialState: { currentUser?: any; menus: any } | undefined) {
  const { menus = [] } = initialState ?? {};
  const list = treeToList(menus, 'routes');
  return {
    rbac: (route: any) => {
      for (let index = 0; index < list.length; index++) {
        const item = list[index];
        if (item.path == route.path) {
          return true;
        }
      }
      return true;
    },
  };
}
