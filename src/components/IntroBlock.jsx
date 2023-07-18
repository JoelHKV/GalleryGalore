import React from 'react';
import './IntroBlock.css';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { incrementIntro } from '../reducers/quizGameSlice';

const instructionsText = [
    "Gallery Galore is a collection of AI-generated paintings that help you associate famous painters with their distinct painting styles.",
    "In the practice mode, you can browse through random paintings by clicking on the current painting. Alternatively, you can change the title with the bottom slider and the painter with the right slider. You can try these options now.",
    "In the quiz mode, your task is to guess the painter's name. Who do you think is the author of this painting? Click one of the buttons below. Good luck!",
    "Click on 'PRACTICE' or 'QUIZ' to start!"
];


const IntroBlock = () => {

    const dispatch = useDispatch();

    const nextIntro = () => {
        dispatch(incrementIntro());
        // dispatch(addQuizOptions(maxPainterIndex))

    };

    const roundIntro = useSelector((state) => state.counter[0].roundIntro); // intro round nro


    

    return (
        <div className="IntroBlock centerContent">
            <div className="intro-info-text">
                <Typography variant="h5">
                    {instructionsText[roundIntro]}
                </Typography>
                <div>
                    {(roundIntro < 3) && (
                        <div className="intro_button">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={nextIntro}
                            >
                                {roundIntro < 2 ? 'read more' : 'close'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
         
        </div>
    );
};

export default IntroBlock;