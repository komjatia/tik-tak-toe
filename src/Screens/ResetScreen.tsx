import React, { FC, useEffect } from 'react'
import { Winner } from '../components/Board'
import styled from 'styled-components'

type ResetScreenProps = {
    onReset(): void;
    winner: Winner;
    player1: string;
    player2: string
}

const StyledResetScreenContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`


const StyledRangsorContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: space-between;
align-items: center;

.win,.step{
    width: 50%;
    height: 80%;
    
    p{
        width: 50%;
        padding: 0;
            margin:0;
    }
    .label{
        display: flex;
        text-align: center;
    }
    .data{
        width: 100%;
        height: 80%;
        overflow: scroll;
        text-align: center;
        border: 1px solid #bdbdbd;
        border-radius: 1px;
       div{
           display: flex;
       }
        p{
            height: 1.5rem;
            border: 1px solid #bdbdbd;
            border-radius: 1px;
        }
        .player{
            border-right: none;
        }
        .num{
            border-left: none;
        }
    }
}

`
const local :{} | any = localStorage.getItem('wins')
const localWins = JSON.parse(local)



const ResetScreen: FC<ResetScreenProps> = ({onReset, winner, player1, player2}) => {
    useEffect(() => {
        localStorage.setItem('cell', '')
    }, []);
    return (
        <StyledResetScreenContainer>
             <h1>{winner === 'x' ? player2 + '      Nyert' : winner === 'o' ? player1 + '      Nyert': 'Döntetlen' }</h1>
        <StyledRangsorContainer>
        <div className='win'>
            <div className='label' >
            <p>Játékos</p>
            <p>Nyert meccs</p>
            </div>
            <div className='data' >
            {localWins.filter((n: { num: number }) => n.num !== 0).sort((a: any,b: any) => b.num - a.num ).map((i: any) => {
               return (
                <div>
                <p className='player' >{i.player}</p>
                <p className='num'>{i.num}</p>
                </div>
               )})}
            </div>
        </div>
        <div className='step'>
        <div className='label'>
            <p>Játékos</p>
            <p>Lépesek száma</p>
            </div>
            <div className='data' >
            {localWins.filter((n: { cell: number }) => n.cell !== 999999).sort((a: any,b: any) => a.cell - b.cell ).map((i: any) => {
               return (
                <div>
                <p className='player' >{i.player}</p>
                <p className='num'>{i.cell}</p>
                </div>
               )})}
            </div>
        </div>
        </StyledRangsorContainer>
        <button onClick={onReset} >Újra</button>
        </StyledResetScreenContainer>
        
    )
}

export default ResetScreen