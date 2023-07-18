import React from 'react';
import { Typography } from '@mui/material';
import './RoundDisplayBlock.css';
import { useSelector } from 'react-redux';
const RoundDisplayBlock = () => {
const roundNro = useSelector((state) => state.counter[0].roundNro);
const roundTotal = useSelector((state) => state.counter[0].roundTotal);
    return (
        <div className="RoundDisplayBlock centerContent">
            <Typography variant="h5">
                Round: {roundNro + 1} / {roundTotal}
            </Typography>        
        </div>
    );
};

export default RoundDisplayBlock;