import React from 'react';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { bot, createGroup, useNumberCase, validateCombin } from '../../utils/utils';

const Square = () => {
    const [cases, setCases, resetCases] = useNumberCase(9)
    const [state, setState] = useState([])
    const [turn, setTurn] = useState('player')

    const handleclick = useCallback((_, index) => {
        if (state !== "Wining" && turn === "player") {
             setCases(index)
             setTurn('bot')
         }  
    })
    
    const resetGame = useCallback(() => {
        resetCases();
    }, [resetCases, state]);
    

    useEffect(() => {
        const result = validateCombin([...cases.morpion])
        setState(result)
       
        if (result[0] !== "Wining" && turn === "bot") {
            setCases(bot(cases.morpion))
            setTurn('player')
        }
    }, [turn, cases.morpion])
    


    const elementsGrouped = useMemo(() => createGroup([...cases.morpion], 3, handleclick), [cases, handleclick]);

    return (
        <div className='container-cases'>
            { state[0] === "Wining" &&  (<div className='state'>VICTOIRE {state[1]}</div>) }
            { state[0] === "Finished" &&  (<div className='state'>Egalité</div>) }
            { state[0] === "Game" &&  (<div className='state'>IN GAME </div>) }

            {
                elementsGrouped[0].map((element, index) => {
                    return <div className='container-group' key={index}>
                        {element}
                    </div>
                })
            }
            <button className='recovered' onClick={resetGame}>Recommencer</button>
        </div>
        
    );
};

export default Square;