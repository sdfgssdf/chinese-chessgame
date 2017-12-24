import { connect } from 'react-redux'
import React from 'react'
import {RESTART} from '../actions/actions'

const Button = ({str,winner,dispatch}) => {
  let showWinner;
  showWinner = winner?(<p>{winner}获胜</p>):null;
  return (<div>
            {showWinner}
            <button onClick={()=>dispatch({type:RESTART})}>{str}</button>
          </div>)
};

const mapStateToProps = (state) => {
  return {str:'重新开始',
          winner:state.winner}
};
const ButtonContainer = connect(mapStateToProps)(Button);

export default ButtonContainer;