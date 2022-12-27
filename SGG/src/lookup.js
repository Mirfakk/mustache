/*
  函数功能，可以在dataObj对象中，寻找用连续点符号的keyName属性，
  例如dataOBj
  {
    a:{
        b:{
            b:123
        }
      }
  }
  那么lookup(dataObj,'a.b.c)结果就是123

  思路：给其存临时字符串，当该层为对象时，将当前层暂存起来，然后继续查找，直到查找到普通属性后，将其打印
*/

export default function lookup(dataObj, keyName) {
  //先看keyName有无.符号，注意keyName不能是 . 本身
  if (keyName.indexOf('.') != -1 && keyName != '.') {
    //如果有就拆开
    var keys = keyName.split('.');
    // console.log(names);//m,n,p
    var temp = dataObj; //创建临时变量，用于周转，一层一层找下去。
    for (let i = 0; i < keys.length; i++) {
      //每找一层，就把其设为新的临时变量
      temp = temp[keys[i]];
    }
    return temp;
  }
  //如果没有点符号，直接返回即可
  return dataObj[keyName];
}