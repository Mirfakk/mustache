//扫描器类

//es6写法
export default class Scanner {
  constructor(templateStr) {
    //将模板字符串写到实例身上
    this.templateStr = templateStr;
    //指针
    this.pos = 0;
    //尾巴,初始就是模板字符串原文
    this.tail = templateStr;
  }

  //官方提供的两个方法 scan 和 scanUtil
  //scanUtil是扫描走过的元素，而scan则是跳过

  //功能弱，走过指定内容（路过{{}}括号）
  scan(tag) {
    //tag就是双括号的个数，越过去
    if (this.tail.indexOf(tag) == 0) {
      //tag有多长，比如{{ 长度是2，就让指针后移多少位
      this.pos += tag.length;
      //改变尾巴从当前指针这个字符开始，到最后的全部字符
      this.tail = this.templateStr.substring(this.pos);
    }
  }

  //让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
  //参数end是
  scanUtil(stopTag) {
    //记录执行本方法时候的pos值
    const pos_backup = this.pos;

    //等于0表示在开头，-1表示没找到
    //当尾巴的开头不是stopTag的时候，就说明还没有扫描到stopTag
    //写&&很有必要，防止找不到，那么寻找到最后也要停止下来，避免死循环
    while (!this.eos() && this.tail.indexOf(stopTag) != 0) {
      //读取字符串后，指针一直向右移，所以++，当遇见stopTag时，结束循环
      this.pos++;
      //改变尾巴为从当前指针这个字符开始，到最后的全部字符
      //如果指针pos为2,就是指向第二个元素，那么此时尾巴就是包括第二个元素的后续字符串
      this.tail = this.templateStr.substring(this.pos);//substring是截取字符串的方法
    }
    //记录走过的数据，也就是从开始到当前指针的前一位
    return this.templateStr.substring(pos_backup, this.pos);
  }

  //官方写法，借助布尔值
  //指针是否到头，返回布尔值，end of string
  eos() {
    return this.pos >= this.templateStr.length;
  }
}