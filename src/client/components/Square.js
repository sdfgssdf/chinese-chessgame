import React from 'react'
import Chess from './chess'
import {blackChessStr,redChessStr} from '../data'
const Square= ({curchess,action,winner,dispatch}) => {
  let classname , str ,handleClick;
  handleClick =  (e) => {dispatch(action)};
  if(curchess.type === 'empty'){
    classname = 'circle chessnone';
    str = null;
  }else if(curchess.type === 'back'){
    classname = "circle chessback " + (curchess.active?'active':'');
    str = null;
  }else {
    classname = "circle " + curchess.group+(curchess.active?' active':'');
    str = curchess.group === "black"?blackChessStr[curchess.chessnum]:redChessStr[curchess.chessnum];
  }
    return (
  <div className="square">
    <Chess classname ={classname} str = {str} onClick = {action&&!winner?handleClick:null}/>
  </div>
)
};



export default Square