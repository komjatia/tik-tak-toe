import React, { FC, useEffect } from 'react'
import { Winner } from '../components/Board'

type ResetScreenProps = {
    onReset(): void;
    winner: Winner;
    player1: string;
    player2: string
}



const ResetScreen: FC<ResetScreenProps> = ({onReset, winner, player1, player2}) => {
    useEffect(() => {
        localStorage.setItem('cell', '')
    }, []);
    return (
        <>
        <h1>{winner === 'x' ? player2 : winner === 'o' ? player1 : 'Dontetlen' }</h1>
        <button onClick={onReset} >Reset</button>
        </>
        
    )
}

export default ResetScreen