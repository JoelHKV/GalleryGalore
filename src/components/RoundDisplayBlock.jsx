import React from 'react';
import { Typography } from '@mui/material';
import './RoundDisplayBlock.css';
import { useSelector } from 'react-redux';
const RoundDisplayBlock = ({ mode }) => {

    const roundNro = useSelector((state) => state.counter[0].roundNro);
    const roundTotal = useSelector((state) => state.counter[0].roundTotal);
    const points = useSelector((state) => state.counter[0].points); // nro points

    return (
        <div className="RoundDisplayBlock centerContent">
            {(mode === 'round') && (
            <Typography variant="h5">
                Round: {roundNro + 1} / {roundTotal}   
                </Typography>  
            )}
            {(mode === 'result') && (
                <Typography variant="h5">
                    Your Score: {points} / {roundTotal}
                </Typography>
            )}
        </div>
    );
};

export default RoundDisplayBlock;