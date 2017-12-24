import React from 'react'
import Chessboard from './chessboard'
import ButtonContainer from '../containers/buttonContainer'
const App = () => (
  <div className="container">
    <h1>象棋(暗棋)</h1>
    <Chessboard/>
    <ButtonContainer/>
    <a href="https://github.com/sdfgssdf/chinese-chessgame">github 地址</a>>
  </div>
);

export default App