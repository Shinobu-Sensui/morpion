import React from 'react';

const Case = ({onClick, value}) => {
    return (
        <button className={`case${value === "X" ? " X" : value === "O" ? " O" : ""}`} onClick={onClick}>{value}</button>
    );
};

export default Case;