import lookup from "./lookup";
import renderTemplate from "./renderTemplate";
/**
 * 处理数组，结合renderTemplate实现递归
 * 注意：参数收的是token，而不是tokens
 * token就是一个项，简单的['#','students',[这里是内部的tokens] ]
 * 
 * 这个函数要递归调用renderTemplate函数，调用次数由data决定
 * 比如data是这样的：
 * var data = {
      students: [
        { 'name': '小明', 'age': 18, 'hobbies': ['游泳', '羽毛球'] },
        { 'name': '小红', 'age': 62, 'hobbies': ['游泳',] },
        { 'name': '小栏', 'age': 18, 'hobbies': ['游泳', '羽毛球', '羽毛球'] },
      ]
    };
    那么parseArray()函数就要递归调用renderTemplate函数3次，因为数组长度是3
 * 
 */

export default function parseArray(token, data) {

  //得到整体数据中这个数组要是用的部分
  var v = lookup(data, token[1]);
  //结果字符串
  var resultStr = '';
  //这个结果字符串需要遍历v来生成
  for (let i = 0; i < v.length; i++) {
    //这里需要补充 " . "的属性
    resultStr += renderTemplate(token[2], {
      //是用展开运算符
      ...v[i],
      '.': v[i]
    });
  }
  return resultStr;
}