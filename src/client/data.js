  export const chessboard = createChessboard(4,8);
 export const redChessStr =['兵','仕','象','炮','马','车','帅'];
 export const blackChessStr =['卒','仕','象','炮','马','车','将'];
 let rawchess = Array(5).fill({group:'red',chessnum:0}).concat(Array(5).fill({group:'black',chessnum:0}),Array(2).fill({group:'red',chessnum:1}),
   Array(2).fill({group:'black',chessnum:1}),Array(2).fill({group:'black',chessnum:2}),Array(2).fill({group:'black',chessnum:3}),Array(2).fill({group:'black',chessnum:4}),
   Array(2).fill({group:'black',chessnum:5}),Array(2).fill({group:'red',chessnum:2}),Array(2).fill({group:'red',chessnum:3}),Array(2).fill({group:'red',chessnum:4}),
   Array(2).fill({group:'red',chessnum:5}),Array(1).fill({group:'red',chessnum:6}),Array(1).fill({group:'black',chessnum:6}))
  export const initChessArray =createRandomArray(rawchess);
function createChessboard (y,x) {
  let arr = [];
  for(let i=1;i<x+1;i++){
    for(let p=1;p<y+1;p++ ){
      arr.push([i,p]);
    }
  }
  return arr;
}
  export const initBoardState = [
    [{type:'back'},{type:'back'},{type:'back'},{type:'back'}],
    [{type:'back'},{type:'back'},{type:'back'},{type:'back'}],
    [{type:'back'},{type:'back'},{type:'back'},{type:'back'}],
    [{type:'back'},{type:'back'},{type:'back'},{type:'back'}],
    [{type:'back'},{type:'back'},{type:'back'},{type:'back'}],
    [{type:'back'},{type:'back'},{type:'back'},{type:'back'}],
    [{type:'back'},{type:'back'},{type:'back'},{type:'back'}],
    [{type:'back'},{type:'back'},{type:'back'},{type:'back'}]
  ];
//生成随机数组
function createRandomArray(arr) {
  function getRandomInt(int) {
    return Math.floor(Math.random() * (int + 1));
  }
  let newarr = [];
  for(let i = arr.length;i>0;i-- ){
    let x =  getRandomInt(i-1);
    newarr.push(arr.splice(x,1)[0]);
  }
  return newarr;
}
export function moveToState(state ,x,y,prex,prey)  {
  let xxx = [...state];
  xxx[y-1] = [...xxx[y-1]];
  xxx[y-1][x-1] = state[prey-1][prex-1];
  xxx[prey-1] = [...xxx[prey-1]];
  xxx[prey-1][prex-1] = {type:'empty'};
  return xxx;
}
export function flipToState(state ,x,y) {
  return[
    ...state.slice(0, y-1),
    [
      ...state[y-1].slice(0, x-1),
      {type:'front' , ...initChessArray[(y-1)*4+x-1] },
      ...state[y-1].slice(x)
    ],
    ...state.slice(y)
  ];
}