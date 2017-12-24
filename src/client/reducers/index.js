import {initBoardState , initChessArray,moveToState,flipToState} from '../data'
import { ACTIVATE, AI , FLIP, MOVE, FIRST_FLIP,WINNER,RESTART} from '../actions/actions'
import { aiMove} from '../ai'
import { combineReducers} from 'redux'


function activate(state = null , action) {
  switch (action.type) {
    case ACTIVATE:
      return {
        x : action.x ,
        y : action.y
      };
    default:
      return null;
  }
}
function chessBoardState(state = initBoardState , action) {
  switch (action.type) {
    case WINNER:
    case MOVE:
      return moveToState(state , action.x,action.y,action.prex,action.prey);
    case  FLIP:
      return flipToState(state , action.x,action.y);
    case  FIRST_FLIP:
      return [
        ...state.slice(0, action.y-1),
        [
          ...state[action.y-1].slice(0, action.x-1),
          {type:'front' , ...initChessArray[(action.y-1)*4+action.x-1] },
          ...state[action.y-1].slice( action.x)
        ],
        ...state.slice(action.y)
      ];
    case  RESTART :
      return initBoardState;
    default:
      return state;
  }
}

function group(state = null , action) {
  switch (action.type) {
    case FIRST_FLIP:
      return initChessArray[(action.y-1)*4+action.x-1].group;
    case  RESTART :
      return null;
    default:
      return state;
  }
}
function winner(state = null , action) {
  switch (action.type) {
    case WINNER:
      return action.group;
    case  RESTART :
      return null;
    default:
      return state;
  }
}
const firstReducer = combineReducers({
  chessBoardState , activate , group,winner
});
const aiReducer = function (state,action) {
  switch (action.type) {
    case  AI :
      return aiMove(state);
    default:
      return state;
  }
};


const topReducer = (state,action) =>{
  const newstate =firstReducer(state,action);
  return aiReducer(newstate,action);
};


export default topReducer
