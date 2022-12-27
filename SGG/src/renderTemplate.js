/**
 * 函数的功能是让tokens数组变为dom字符串
 * 
 */
import lookup from "./lookup";
import parseArray from "./parseArray";

export default function renderTemplate(tokens, data) {
  //结果字符串
  var resultStr = '';
  //遍历tokens
  for (let i = 0; i < tokens.length; i++) {
    //每一个token元素
    let token = tokens[i];

    //判断类型是什么
    //如果是文字，就把其追加进结果字符串中，token[0]是类型，[1]才是内容
    if (token[0] == 'text') {
      //拼起来
      resultStr += token[1];
    } else if (token[0] == 'name') {
      //如果类型是name，那么就直接使用它的值，要是用lookup
      //因为防止这里是“a.b.c”有逗号的形式
      resultStr += lookup(data, token[1]);
    } else if (token[0] == "#") {
      //如果是#号，就要开始递归自己
      resultStr += parseArray(token, data);
    }
  }
  //循环结束，输出结果
  return resultStr;
}