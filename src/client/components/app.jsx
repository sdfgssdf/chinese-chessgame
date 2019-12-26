import React from 'react'
import Chessboard from './chessboard'
import ButtonContainer from '../containers/buttonContainer'
const App = () => (
  <div className="container">
    <h1>象棋(暗棋)</h1>
    <Chessboard/>
    <ButtonContainer/>
  </div>
);

export default App
