/**
 * @description 一维数组转树形结构
 * @param list 一维数组
 * @param id 根据的id
 * @param pid 根据的父id
 * @returns
 */
export function transformTree(list: any[], id: string, pid: string) {
  const tree: any[] = [];
  const map: { [key: string]: any } = {};

  list.forEach((item: any) => {
    map[item[id]] = {
      ...item,
      children: []
    };
  });

  Object.keys(map).forEach((key: string| number) => {
    const node = map[key];    // 找到当前节点
    const parent = map[node[pid]]; // 找到父节点
    if (parent) {
      parent.children.push(node);
    } else {
      tree.push(node);
    }
  });

  return tree;
}