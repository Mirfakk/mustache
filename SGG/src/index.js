//这里只需要考虑浏览器的使用

// import Scanner from './Scanner.js';
import parseTemplateToTokens from './parseTemplateToTokens.js'
import renderTemplate from './renderTemplate'
import lookup from './lookup.js';

window.SGG = {
  //接收两个参数，就是index.html定义的模板字符串和数据
  render(templateStr, data) {
    //调用parseTemplateToTokens函数，让模板字符串能够变为tokens数组
    var tokens = parseTemplateToTokens(templateStr);
    //调用renderTemplate函数，让tokens数组变为dom字符串
    var domStr = renderTemplate(tokens, data);

    return domStr;





    //测试
    // lookup({
    //   m: {
    //     n: {
    //       p: 123
    //     }
    //   }
    // }, 'm.n.p')
  }
};

/*
window.SGG = {
  //接收两个参数，就是index.html定义的模板字符串和数据
  render(templateStr, data) {

    //实例化一个扫描器，构造时候接收一个参数：模板字符串
    //这个扫描器就是针对模板字符串工作的
    // var scanner = new Scanner(templateStr);
    // console.log(templateStr);

    // var words = scanner.scanUtil('{{');
    // console.log(scanner.pos);
    // console.log(words);
    // scanner.scan("{{");//scan扫描到{{,就跳过，所以下一行指针就+2
    // console.log(scanner.pos);

    // var word;
    // //当scanner没有到头，就持续工作
    // while (!scanner.eos()) {
    //   //当指针没走完时，不断读取
    //   //1.先收集开大括号
    //   word = scanner.scanUtil('{ {');
    //   console.log(word);
    //   //2.跳过大括号
    //   scanner.scan('{{');
    //   //3.收集闭大括号
    //   word = scanner.scanUtil('}}');
    //   console.log(word);
    //   //4.跳过大括号
    //   scanner.scan('}}');
    // }

    //调用parseTemplateToTokens函数，让模板字符串能够变为tokens数组
    var tokens = parseTemplateToTokens(templateStr);
    console.log(tokens);
  }
};

*/