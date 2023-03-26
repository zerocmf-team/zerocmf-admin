// treeToList
export const treeToList = (arr, key = 'children') => {
  let list = [];
  arr.forEach((item) => {
    list.push(item);
    if (item[key]) {
      const children = treeToList(item[key], key);
      list.push(...children);
    }
  });
  return list;
};

// findTreeFirst
export const findTreeFirst = (arr = []) => {
  let path = '';
  for (let index = 0; index < arr.length; index++) {
    const item = arr[index];
    if (item?.routes?.length > 0) {
      path = findTreeFirst(item?.routes);
    } else {
      path = item.path;
    }
    break;
  }
  return path;
};
