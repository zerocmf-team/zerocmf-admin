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
