import {moveToState,flipToState} from './data'

let isWin;
isWin = (group,arr) => arr.some(chess => ((chess&&chess.group===group)&&(chess.chessnum===6))||((chess&&chess.group===group)&&(chess.chessnum===0)));


function isAiBigger(aiNum,myNum) {
  if(aiNum===6&&myNum===0){
    return false;
  }else{
    return aiNum>=myNum;
  }
}


export function aiMove({group,chessBoardState:state,winner,activate}) {
  let aiChessIndex ,myChiefIndexY,myChiefIndexX,aiGroup,isMyChief,chiefFourArr,findAroundChess ,backChessIndex ;
  aiGroup = group ==='black'?'red':'black';
  isMyChief = chess => (chess.group===group)&&(chess.chessnum===6);
  findAroundChess = (x,y) =>  [ state[y][x-1] , state[y][x+1] , state[y-1]&&state[y-1][x] , state[y+1]&&state[y+1][x] ];

  //我方将子坐标
  myChiefIndexY = state.findIndex(arr => arr.some(isMyChief ));
  myChiefIndexX= myChiefIndexY !== -1 && state[myChiefIndexY].findIndex(isMyChief );

  //围绕我方将子的4个棋子
  chiefFourArr =myChiefIndexY !== -1? findAroundChess(myChiefIndexX,myChiefIndexY):null;
  //电脑棋子集合
  aiChessIndex = state.reduce(function (sum,arr,indexY) {
    let curArr;
    curArr = arr.reduce(function (sum,chess,indexX) {
      if(chess.group ===aiGroup){
        sum.push([indexX,indexY]);
        return sum;
      }else{
        return sum;
      }
    },[]);
    return sum.concat(curArr);
  } ,[]);
  //背面棋子集合
  backChessIndex  = state.reduce(function (sum,arr,indexY) {
    let curArr;
    curArr = arr.reduce(function (sum,chess,indexX) {
      if(chess.type ==='back'){
        sum.push([indexX,indexY]);
        return sum;
      }else{
        return sum;
      }
    },[]);
    return sum.concat(curArr);
  } ,[]
  );

  if(chiefFourArr&&isWin(aiGroup,chiefFourArr)) {
    //电脑胜
    let x,y,
      index = chiefFourArr.findIndex(chess => ((chess&&chess.group===aiGroup)&&(chess.chessnum===6))||((chess&&chess.group===aiGroup)&&(chess.chessnum===0)));
    switch (index){
      case 0:x=myChiefIndexX-1;y=myChiefIndexY;break;
      case 1:x=myChiefIndexX+1;y=myChiefIndexY;break;
      case 2:x=myChiefIndexX;y=myChiefIndexY-1;break;
      case 3:x=myChiefIndexX;y=myChiefIndexY+1;
    }
    return {group,chessBoardState:moveToState(state,myChiefIndexX+1,myChiefIndexY+1,x+1,y+1),winner:aiGroup,activate};
  }else if((aiChessIndex.length !== 0))
  {
    let x,y,prex,prey ,aiCanEat,aiCanMove;

    aiCanEat = aiChessIndex.some(
      function (arr) {
        let aiNum =state[arr[1]][arr[0]].chessnum;
        return findAroundChess(arr[0],arr[1]).some(function (chess,index) {
          if(chess&&chess.group===group&&isAiBigger(aiNum,chess.chessnum)){
            prex = arr[0];
            prey = arr[1];
            switch (index){
              case 0:x=arr[0]-1;y=arr[1];break;
              case 1:x=arr[0]+1;y=arr[1];break;
              case 2:x=arr[0];y=arr[1]-1;break;
              case 3:x=arr[0];y=arr[1]+1;
            }
            return true;
          }else {
            return false;
        }
      });
      }
    );

    aiCanMove = !aiCanEat&&aiChessIndex.some(
      function (arr) {
        return findAroundChess(arr[0],arr[1]).some(function (chess,index) {
          if(chess&&chess.type==='empty'){
            prex = arr[0];
            prey = arr[1];
            switch (index){
              case 0:x=arr[0]-1;y=arr[1];break;
              case 1:x=arr[0]+1;y=arr[1];break;
              case 2:x=arr[0];y=arr[1]-1;break;
              case 3:x=arr[0];y=arr[1]+1;
            }
            return true;
          }else {
            return false;
          }
        });
      }
    );

    if( aiCanEat){
      //电脑吃子
      return {group,chessBoardState:moveToState(state,x+1,y+1,prex+1,prey+1),winner,activate};
    }
    else  if(backChessIndex.length !== 0)
    {
      //电脑翻棋
      let index = backChessIndex[Math.floor(backChessIndex.length/2)];
      return {group,chessBoardState:flipToState(state,index[0]+1,index[1]+1),winner,activate};
    }
    else if(aiCanMove){
    //电脑移动
    return {group,chessBoardState:moveToState(state,x+1,y+1,prex+1,prey+1),winner,activate};
  }
    else{
      //死棋
      return {group,chessBoardState:state,winner,activate};
    }

  }
  else if(backChessIndex.length !== 0)
  {
    //电脑翻棋
    let index = backChessIndex[Math.floor(backChessIndex.length/2)];
    return {group,chessBoardState:flipToState(state,index[0]+1,index[1]+1),winner,activate};
  }
  else
  {
    return {group,chessBoardState:state,winner,activate};
  }

}