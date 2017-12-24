import React from 'react'
import SquareContainer  from '../containers/squareContainer'

import {chessboard} from'../data'

const Chessboard = () => (
  <div className="chessboard">
    {chessboard.map(square => (
      <SquareContainer key={square.join('')} y={square[0]} x={square[1]}/>
    ))}
  </div>
);

export default Chessboard