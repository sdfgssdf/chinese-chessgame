import {batchActions} from 'redux-batched-actions';

import { connect } from 'react-redux'
import Square from '../components/Square'
import { activate, move, flip , CANCEL_ACTIVATE ,firstFlip, winner,AI} from '../actions/actions'

const mapStateToProps = (state, ownProps) => {
    let action , curChess , activateChess;

    curChess = state.chessBoardState[ownProps.y-1][ownProps.x-1];
    activateChess = state.activate && state.chessBoardState[state.activate.y-1][state.activate.x-1];

//分配action 背面棋子被激活
    if(state.activate && activateChess.type === 'back'){
      switch(curChess.type)
      {
        case 'empty':
          action = {type:CANCEL_ACTIVATE};
          break;
        case 'front':
          if(curChess.group === state.group) {
            action = activate(ownProps.x , ownProps.y);
          }
          else{
            action = {type:CANCEL_ACTIVATE};
          }
          break;
        case 'back':
          if(state.activate.x===ownProps.x && state.activate.y===ownProps.y){
            action = state.group ? batchActions([flip(ownProps.x , ownProps.y),{type:AI}]) :
              batchActions([firstFlip(ownProps.x , ownProps.y),{type:AI}]) ;
          }else{
            action = activate(ownProps.x , ownProps.y);
          }
      }
    }
 //分配action正面棋子被激活
    else if(state.activate && activateChess.type === 'front'){
      switch(curChess.type)
      {
        case 'empty':
          action =Math.abs(state.activate.x+state.activate.y-ownProps.x-ownProps.y)===1
                          ?  batchActions([move( state.activate.x , state.activate.y , ownProps.x , ownProps.y), {type:AI}])
                          : null;
          break;
        case 'front':
          if(curChess.group === state.group) {
            action =activate(ownProps.x , ownProps.y);
          }
          else if(Math.abs(state.activate.x+state.activate.y-ownProps.x-ownProps.y)!==1){
            action = null;
          }
          else if( curChess.chessnum === 6 &&(activateChess.chessnum === 0 || activateChess.chessnum === 6) ){
            action =winner(activateChess.group ,state.activate.x , state.activate.y , ownProps.x , ownProps.y);
          }
          else if((curChess.chessnum === 0 && activateChess.chessnum === 6)||(curChess.chessnum > activateChess.chessnum) ){
            action = null;
          }else{
            action = batchActions([move( state.activate.x , state.activate.y , ownProps.x , ownProps.y), {type:AI}])
          }
          break;
        case 'back':
          action = activate(ownProps.x , ownProps.y);
      }
    }
  //分配action没有棋子被激活
    else{
      switch(curChess.type)
      {
        case 'empty':
          action = null;
          break;
        case 'front':
          if(curChess.group === state.group) {
            action = activate(ownProps.x , ownProps.y);
          }
          else{
            action = null;
          }
          break;
        case 'back':
          action =activate(ownProps.x , ownProps.y);
      }
    }
  return {
    curchess:{...curChess,
                 active : state.activate && state.activate.x===ownProps.x && state.activate.y===ownProps.y
              },
    winner:state.winner,
    action
  }
};

const SquareContainer = connect(mapStateToProps)(Square);

export default SquareContainer