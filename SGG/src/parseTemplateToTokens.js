//scanner在这里使用，生成tokens
import Scanner from "./Scanner.js";
import nestTokens from "./nestTokens.js";

//默认暴露该函数
/*
  将模板字符串变为tokens数组
*/
export default function parseTemplateToTokens(templateStr) {
  var tokens = [];
  //创建扫描器
  var scanner = new Scanner(templateStr);
  var words;
  //让扫描器工作
  while (!scanner.eos()) {
    //收集开始标记出现之前的文字，也就是{{
    words = scanner.scanUtil('{{');
    if (words != '') {
      //尝试去掉空格，智能判断是普通文字的空格还是标签中的空格
      let isInJJH = false;
      //空白字符串
      var _words = '';
      for (let i = 0; i < words.length; i++) {
        //判断是否在标签里
        if (words[i] == '<') {
          isInJJH = true;
        } else if (words[i] == '>') {
          isInJJH = false;
        }

        //如果这项不是空格，拼接上
        if (!/\s/.test(words[i])) {
          _words += words[i];
        } else {
          //如果这项是空格，只有当它在标签内的时候，才拼接上
          if (isInJJH) {
            _words += ' ';
          }
        }
      }
      //将其添加至数组,存起来，去掉空格
      tokens.push(['text', _words]);
    }
    //跳过双大括号
    scanner.scan("{{");
    //找到结束的}}
    words = scanner.scanUtil('}}');
    if (words != '') {
      //words是{{}}中间的东西，判断一下首字符
      if (words[0] == '#') {
        //存起来，从下标为1的项开始存，因为下标为0的项是#
        tokens.push(['#', words.substring(1)]);
      } else if (words[0] == '/') {
        //存起来，从下标为1的项开始存，因为下标为0的项是/
        tokens.push(['/', words.substring(1)]);
      } else {
        tokens.push(['name', words]);
      }
    }
    //过大括号
    scanner.scan('}}');
  }
  //返回折叠收集的tokens
  return nestTokens(tokens);
}