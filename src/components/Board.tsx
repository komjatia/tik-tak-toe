import React, { FC, useEffect, useState } from "react";

import styled from "styled-components";
import { Cell, CellValue } from "./Cell";
import useLocalStorage from "./useLocalStorage";

type BoardProps = {
  onGameEnd(winner: Winner): void;
  boardSize: string;
  numberOfCells: number;
  gridLayout: string;
  winningLines: number[][];
  player1: string;
  player2: string
  num: number
};

export type Winner = CellValue | "Dontelen";

const StyledBoardContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`


const Board: FC<BoardProps> = ({ onGameEnd, boardSize, winningLines, gridLayout, numberOfCells, player1, player2, num }) => {

  //styles
  const StyledBoard = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: ${gridLayout};
    grid-template-rows: ${gridLayout};
    column-gap: 5px;
    row-gap: 5px;
    background-color: #a7a7a7;
  `;

  const [cells, setCells] = useState<CellValue[]>(Array(numberOfCells).fill(undefined));
  const [localCell, setLocalCell] = useLocalStorage('cell', cells)
  const [wins, setWins] = useLocalStorage('wins', [
    {
     player: 'x',
     num: 0,
     cell: 999999
    },
    {
      player: 'o',
      num: 0,
      cell: 999999
     },
    
  ])

 
  const current: CellValue = cells.filter((c) => c).length % 2 ? (num % 2) === 1 ? 'x' : 'o' : (num % 2) === 0 ? 'x' : 'o';

  const toggleCell = (index: number) => {
    setCells((cells) => cells.map((cell, i) => (i === index ? current : cell)));
  };

  const winningLogic = winningLines.find((con) => {
    const line = con.map((lineIndex) => cells[lineIndex]);
    return line[0] && line.every((cellValue) => cellValue === line[0]);
  });

  const winningCondition = winningLogic ? cells[winningLogic[0]] : undefined;

  const tie = cells.filter((c) => c).length === 9;

  useEffect(() => {
    if (winningCondition) {
      return onGameEnd(winningCondition);
    }
    if (tie) {
      return onGameEnd("Dontelen");
    }
  }, [winningCondition, tie, onGameEnd]);

  useEffect(() => {
  if(cells.every(cellValue => cellValue === undefined)){
    setCells(localCell)
    return
  }else{
    setLocalCell(cells)
  }
  }, [cells]);
  
  useEffect(() => {
    const winArr = [...wins]
    console.log(localCell.filter(x => x==='x').length)
    if(winningCondition === 'x'){
      winArr.filter(player => {
        if(player.player === player2){
         player.num++
         player.cell = localCell.filter(x => x==='x').length < player.cell ? localCell.filter(x => x==='x').length : player.cell
        }else if(player.player !== player1){
          winArr.push({
            player: player2,
            num: player.num++,
            cell: localCell.filter(x => x==='x').length
          })
        }
      })
    }else if(winningCondition === 'o'){
      winArr.filter(player => {
        if(player.player === player1){
          player.num++
          player.cell = localCell.filter(x => x==='o').length < player.cell ? localCell.filter(x => x==='o').length : player.cell
        }else if(player.player !== player2){
          winArr.push({
            player: player1,
            num: 1,
            cell: localCell.filter(x => x==='o').length
          })
        }
      })
    }
    setWins(winArr)
  }, [winningCondition, cells]);
  return (
   <StyledBoardContainer>
   <p>Következő: {current === 'x' ? player2 : current === 'o' ? player1 : null }</p>
    <StyledBoard>
      {localCell ? localCell.map((cell, i) => (
        <Cell key={i} value={cell} toggle={toggleCell} index={i} />
      )) : cells.map((cell, i) => (
        <Cell key={i} value={cell} toggle={toggleCell} index={i} />
      ))}
    </StyledBoard>
   </StyledBoardContainer>
  );
};

export default Board;
