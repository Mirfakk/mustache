
//表示折叠
//遇到# 就进栈
//遇到/ 就出栈
//这样就能够实现多层次
/**
 * 函数的功能是折叠tokens，将#和/之间的tokens能够整合起来，作为它的下标为3的项
 */
export default function nestTokens(tokens) {
  //准备结果数组
  var nestedTokens = [];

  //收集器,天生指向nestedTokens结果数组，引用类型值，所以指向的是同一个数组
  var collector = nestedTokens;
  //栈结构，存放着小tokens，栈顶(靠近端口的，最新进入的)tokens数组中当前操作的这个tokens小数组
  var sections = [];//栈

  // console.log(tokens);
  //对原数组进行遍历
  for (let i = 0; i < tokens.length; i++) {
    //判断开头是是否有#或者/
    let token = tokens[i];

    switch (token[0]) {
      case '#':
        //遇到#，收集器放入该token
        collector.push(token);
        sections.push(token);//并且入栈
        //然后更新收集器,给token添加下标为2的项，并且让收集器指向它
        token[2] = [];
        collector = token[2];
        break;
      case '/':
        //遇见斜线就出栈
        sections.pop();
        //改变收集器为栈结构队尾（栈顶）那项下标为2的数组
        //因为栈中不一定都有东西，所以collector不能直接等于sections中下标为sections的length -1的第二项，所以要判断一下，栈里为空就是结果
        collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
        break;
      default:
        //普通情况就直接往收集器push token即可
        collector.push(token);
    }
  }


  return nestedTokens;
}