type TreeNode = {
  title: string;
  key: string;
  children?: TreeNode[]; // children属性是一个可选的TreeNode数组
};
function isJSON(str:string) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}
function convertInputToTree(input:string) {
  if(isJSON(input.replace(/'/g, '"'))){
    const data = JSON.parse(input.replace(/'/g, '"')); // 将单引号替换为双引号，并解析为对象
    const treeData = [];
    for (const k in data) {   //k为属性名，即键，因树要保证“key”属性的唯一性，所以我们把k赋给"key",把data[k]赋给title 然后显示的时候 treeData.key treeData.title,即把a.a作为树的key 1作为title 
      const node:TreeNode = { title: data[k], key: k };
      if (typeof data[k] === 'object') {  //如果有子节点对子节点进行处理，并把父节点的值显示为空
        node.children = Object.keys(data[k]).map(childKey => ({
          title: data[k][childKey],
          key: childKey,
        }));
        node.title=""
      }
      treeData.push(node);
      
    } 
    return treeData; 
  }

  return [];   //如果不是json格式直接不显示
}




// 测试示例
// const inputData = '{"a":{"a.a":"1","a.b":"2"},"b":"3"}';
// 结果
//[
//   {
//     title: 'a',
//     key: '',
//     children: [
//       {
//         title: 'a.a',
//         key: '1',
//       },
//       {
//         title: 'a.b',
//         key: '2',
//       },
//     ],
//   },
//   {
//     title: 'b',
//     key: '3',
//   },
// ];
export {convertInputToTree};