
import React, { FC, useEffect, useState} from 'react'
import {motion} from 'framer-motion'


const animations = {
    hidden: {
      y: 160,
      x: -10,
      opacity: 0,
      scale: 0.9,
    },
    hiddenP2: {
      y:-160,
      x: -0,
      opacity: 0,
      scale: 0.9,
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 160,
      x: -5,
     color: 'white',
      transition: {
        yoyo: 10,
        type: "spring",
        duration: 0.5,
      },
    },
    showP2: {
        opacity: 1,
        scale: 1,
        y:-160,
        x: -10,
       color: 'white',
        transition: {
          yoyo: 10,
          type: "spring",
          duration: 0.5,
        },
      },
    set: {
      y: 0,
        opacity: 1,
        scale: 1.5,
       color: 'white',
        transition: {
          type: "spring",
          duration: 0.5,
        },
      },
      getOut: {
        opacity: 0,
        scale: 4,
       color: 'transparent',
        transition: {
          type: "spring",
          duration: 0.5,
        },
      }
}





type SorsolasScreenProps = {
    player1State: string;
    player2State: string;
    num:number
}

type AnimationName = 'player1' | 'player2'

const SorsolasScreen: FC<SorsolasScreenProps> = ({player1State, player2State, num}) => {
    const [animation, setAnimation] = useState<AnimationName>();
    
    useEffect(() => {
        setTimeout(() => {
           
            if(num % 2 ){
               setAnimation('player1')
               console.log('2')
               console.log((num % 2) + 'play1')
              }else{
                setAnimation('player2')
                console.log((num % 2) + 'play2')
              }
        },4000)
    }, [num]);
    return (
        <>
        <motion.h1 initial='hiddenP2' animate={animation ? animation === 'player1' ? 'set' : 'getOut' : 'showP2'} 
        variants={animations}>{player1State}</motion.h1>
        <motion.h1 initial='hidden' animate={animation ? animation === 'player2' ? 'set' : 'getOut' : 'show'} 
        variants={animations}>{player2State}</motion.h1>
      </>
        
    )
}

export default SorsolasScreen