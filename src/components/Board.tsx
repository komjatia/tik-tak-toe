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
     player: player2,
     num: 0,
     win: 'x',
     cell: 999999
    },
    {
      player: player1,
      num: 0,
      win: 'o',
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
    console.log(winArr.some((p, w) => p.player === player2 && p.win === 'x'))
    if(winningCondition === 'x'){
      if(winArr.some((p, w) => p.player === player2 && p.win === 'x')){
      const arr =  winArr.filter(player => player.player === player2 && player.win === 'x' )[0]
     arr.num++
     arr.cell = localCell.filter(x => x==='x').length < arr.cell ? localCell.filter(x => x==='x').length : arr.cell
    }else{
      winArr.push({
        player: player2,
        num: 1,
        win: 'x',
        cell: localCell.filter(x => x==='x').length
      })
    }
    }else if(winningCondition === 'o'){
      if(winArr.some((p, w) => p.player === player1 && p.win === 'o')){
        const arr =  winArr.filter(player => player.player === player1 && player.win === 'o' )[0]
        arr.num++
        arr.cell = localCell.filter(x => x==='o').length < arr.cell ? localCell.filter(x => x==='o').length : arr.cell
    }else{
      winArr.push({
        player: player1,
        num: 1,
        win: 'o',
        cell: localCell.filter(x => x==='o').length
      })
    }
    }
    setWins(winArr)
  }, [winningCondition]);
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