import Case from "../src/components/Case"
import { useState } from 'react';



export const createGroup = (items, group, handleclick) => {
    const elementsGrouped = items.reduce((acc, val, index) => {
        if (index % group === 0) {
            acc.push([])
        }
        acc[Math.floor(index / group)].push(<Case key={index} value={val} onClick={((e) => handleclick(e, index))} />)
        return acc
    }, [])
    return [elementsGrouped, items]
}

export const useNumberCase = (number) => {
    const [cases, setCases] = useState({
       morpion: Array.from({length: number}), 
       preced: null
    })

    const clicked = (index) => {
        setCases((c) => {
          let response, morpionCopy = [...c.morpion];
          let cible = morpionCopy[index];
          if (cible) return c; // N'exécutez pas la suite si la case est déjà remplie
    
          response = !c.preced || c.preced === "O" ? "X" : "O";
          morpionCopy[index] = response;
          return {
            morpion: morpionCopy,
            preced: response
          };
        });
      };
    
      const resetCases = () => {
        setCases({
           morpion: Array.from({length: number}), 
           preced: null
        });
    };

      return [cases, clicked, resetCases];
    };


export const bot = (array) => {
    const indexs = [...array].reduce((acc, val, index) => !val ? [...acc, index] : acc, []);
    const randomIndex = indexs[Math.floor(Math.random() * indexs.length)]
    return randomIndex
}

export const validateCombin = (morpion) => {
    const winningCombinations = [
        [0, 1, 2], // première ligne
        [3, 4, 5], // deuxième ligne
        [6, 7, 8], // troisième ligne
        [0, 3, 6], // première colonne
        [1, 4, 7], // deuxième colonne
        [2, 5, 8], // troisième colonne
        [0, 4, 8], // première diagonale
        [2, 4, 6]  // deuxième diagonale
    ];
    
    let state = "Game"
    for (let val of winningCombinations) {
        if (morpion[val[0]] === "X" || morpion[val[0]] === "O") {
            const success = val.every((currentValue) => morpion[currentValue] === morpion[val[0]])
            if (success) {
                state = "Wining"
                return [state, morpion[val[0]]]
            } 
        }
    }

    const completed = morpion.filter(x => x).length
    if (completed === 9) {
        state = "Finished"
        return [state]
    }
    return [state]
}