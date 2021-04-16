import React, { useState } from "react";

//import 3th party components
import styled from "styled-components";

//import custom components
import GlobalStyle from "./components/GlobalStyle";
import Board, { Winner } from "./components/Board";
import StartScreen from "./Screens/StartScreeen";
import ResetScreen from "./Screens/ResetScreen";
import { motion } from "framer-motion";
import Header from "./components/Header";
import useLocalStorage from "./components/useLocalStorage";
import SorsolasScreen from "./Screens/Sorsolas";

const animations = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  start: {
    opacity: 1,
    scale: 1,
    width: "600px",
    height: "400px",
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
  sorsolas: {
    opacity: 1,
    scale: 1,
    width: "500px",
    height: "500px",
    background: 'transparent',
    border: 'none',
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
  game: {
    opacity: 1,
    scale: 1,
    width: "500px",
    height: "500px",
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
  reset: {
    opacity: 1,
    scale: 1,
    width: "300px",
    height: "300px",
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

// styles
const BoardContainer = styled(motion.div)`
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 5px 10px 30px 4px #292929;
  border: 15px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledBoardContainer = styled.div`
  height: calc(100vh - 4rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type GameState = "start" | 'sorsolas' | "game" | "reset";


function App() {
  const [winner, setWinner] = useState<Winner>();
  const [gameState, setGameState] = useState<GameState>("start");
  const [boardSize, setBoardSize] = useLocalStorage("boardSize", '3x3');
  const [rnum, setrnum] = useLocalStorage('num', 2)
  const [player1, setPlayer1] = useLocalStorage('o', 'o')
  const [allPlayer, setAllPlayer] = useLocalStorage('o', 'a')
  const [player2, setPlayer2] = useLocalStorage('x', 'x')
  const [player1State, setPlayer1State] = useState('o')
  const [player2State, setPlayer2State] = useState('x')
  const [localGameState, setLocalGameState] = useLocalStorage('gameState', 'start')
  const [checkBoardSize, setCheckBoardSize] = useLocalStorage('bs',
   {
     numberOfCells: 9,
     gridLayout: "1fr 1fr 1fr",
     winningLines : [
      // horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // across
      [0, 4, 8],
      [2, 4, 6],
    ]
   }
  );




  const onStart = () => {
    const num:number = Math.round(Math.random() * 100)
    setrnum(num)
    setGameState("sorsolas");
    setLocalGameState('sorsolas')
    setTimeout(()=>{
      setGameState("game");
    setLocalGameState('game')
    },4500)
    
  };



  const onEnd = (winner: Winner) => {
    setLocalGameState('reset')
    setGameState("reset");
    const local: any = localStorage.getItem('winner')
    setWinner(winner);
    switch (winner) {
      case 'x':
        localStorage.setItem('winner', JSON.stringify(player2 + ',' + JSON.parse(local)))
        break;
        case 'o':
        localStorage.setItem('winner', JSON.stringify(player1 + ','  + JSON.parse(local)))
        break;
        case 'Dontelen':
          localStorage.setItem('winner', JSON.stringify('Dontetlen' + ','  + JSON.parse(local)))
          break;
    }
   
    
  };

  const onReset = () => {
    setLocalGameState('start')
    setGameState("start");
    setWinner(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allLocalPlayer = allPlayer
    if(e.target.name === 'o'){
      setPlayer1(e.target.value)
      setPlayer1State(e.target.value)
    }else{
      setPlayer2(e.target.value)
      setPlayer2State(e.target.value)
    }
  }
  const onSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardSize(e.target.value);
    switch (e.target.value) {
      case "3x3":
        setCheckBoardSize({
          numberOfCells: 9,
          gridLayout: "1fr 1fr 1fr",
          winningLines : [
           // horizontal
           [0, 1, 2],
           [3, 4, 5],
           [6, 7, 8],
           // vertical
           [0, 3, 6],
           [1, 4, 7],
           [2, 5, 8],
           // across
           [0, 4, 8],
           [2, 4, 6],
         ]
        });
        break;
      case "4x4":
        setCheckBoardSize({
          numberOfCells: 16,
          gridLayout: "1fr 1fr 1fr 1fr",
          winningLines : [
           // horizontal
           [0, 1, 2],
           [3, 4, 5],
           [6, 7, 8],
           // vertical
           [0, 3, 6],
           [1, 4, 7],
           [2, 5, 8],
           // across
           [0, 4, 8],
           [2, 4, 6],
         ]
        });
        break;
      case "5x5":
        setCheckBoardSize({
          numberOfCells: 25,
          gridLayout: "1fr 1fr 1fr 1fr 1fr",
          winningLines : [
           // horizontal
           [0, 1, 2],
           [3, 4, 5],
           [6, 7, 8],
           // vertical
           [0, 3, 6],
           [1, 4, 7],
           [2, 5, 8],
           // across
           [0, 4, 8],
           [2, 4, 6],
         ]
        });
        break;
      case "6x6":
        setCheckBoardSize({
          numberOfCells: 36,
          gridLayout: "1fr 1fr 1fr 1fr 1fr 1fr",
          winningLines : [
           // horizontal
           [0, 1, 2],
           [3, 4, 5],
           [6, 7, 8],
           // vertical
           [0, 3, 6],
           [1, 4, 7],
           [2, 5, 8],
           // across
           [0, 4, 8],
           [2, 4, 6],
         ]
        });
        break;
      case "7x7":
        setCheckBoardSize({
          numberOfCells: 49,
          gridLayout: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
          winningLines : [
           // horizontal
           [0, 1, 2],
           [3, 4, 5],
           [6, 7, 8],
           // vertical
           [0, 3, 6],
           [1, 4, 7],
           [2, 5, 8],
           // across
           [0, 4, 8],
           [2, 4, 6],
         ]
        });
        break;
      case "8x8":
        setCheckBoardSize({
          numberOfCells: 64,
          gridLayout: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
          winningLines : [
           // horizontal
           [0, 1, 2],
           [3, 4, 5],
           [6, 7, 8],
           // vertical
           [0, 3, 6],
           [1, 4, 7],
           [2, 5, 8],
           // across
           [0, 4, 8],
           [2, 4, 6],
         ]
        });
        break;
      case "9x9":
        setCheckBoardSize({
          numberOfCells: 91,
          gridLayout: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
          winningLines : [
           // horizontal
           [0, 1, 2],
           [3, 4, 5],
           [6, 7, 8],
           // vertical
           [0, 3, 6],
           [1, 4, 7],
           [2, 5, 8],
           // across
           [0, 4, 8],
           [2, 4, 6],
         ]
        });
        break;
    }
  };
const setnum = () => {
  
}
  return (
    <>
      <GlobalStyle />
      <Header />
      <StyledBoardContainer>
        <BoardContainer
          initial="hidden"
          animate={localGameState}
          variants={animations}
        >
          {
            {
              start: (
                <StartScreen onStart={onStart} onSizeChange={onSizeChange} handleChange={handleChange} player1={player1} player2={player2}/>
              ),
              sorsolas: <SorsolasScreen player1State={player1} player2State={player2} num={rnum} />,
              game: (
                <Board
                  onGameEnd={onEnd}
                  boardSize={boardSize}
                  numberOfCells={checkBoardSize.numberOfCells}
                  gridLayout={checkBoardSize.gridLayout}
                  winningLines={checkBoardSize.winningLines}
                  player1={player1} player2={player2}
                  num={rnum}
                />
              ),
              reset: <ResetScreen winner={winner} onReset={onReset} player1={player1} player2={player2}/>,
            }[localGameState]
          }
        </BoardContainer>
      </StyledBoardContainer>
    </>
  );
}

export default App;
