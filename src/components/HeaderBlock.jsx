import React from 'react';

import { Button } from '@mui/material';
import './HeaderBlock.css';
import { useDispatch  } from 'react-redux';
import { zeroCounter, newGameMode } from '../reducers/quizGameSlice';

const HeaderBlock = () => {

    const dispatch = useDispatch();


    const clickInfo = () => { // show introscreen
        dispatch(zeroCounter())
        dispatch(newGameMode('intro'))
    }



    return (
        <div className="HeaderBlock">
            <div className="title3">Gallery Galore</div>
            <Button
                variant="contained"
                className="info_button4"
                onClick={() => clickInfo()}
            >
                ?
            </Button>
            
        </div>
    );
};

export default HeaderBlock;