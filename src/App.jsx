import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { incrementIntro, zeroCounter, addQuizOptions, randomChoice, newGameMode } from './reducers/quizGameSlice';

import { Grid, Box } from '@mui/material'; // use MUI component library

import HeaderBlock from './components/HeaderBlock';

import InstructionBlock from './components/InstructionBlock';
import PracticeBlock from './components/PracticeBlock';
import QuizBlock from './components/QuizBlock';

import { loadImages } from './utilities/loadImages';

import './App.css'; 

const App = () => {

    const [wrongOptionOpacity, setWrongOptionOpacity] = useState('');
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState([]);
    const [painters, setPainters] = useState([]);
    const [paintingNames, setPaintingNames] = useState([]);

    const gameMode = useSelector((state) => state.counter[0].gameMode); // 'intro' vs 'practice' vs 'quiz' vs 'finish'

    const dispatch = useDispatch();

    useEffect(() => {
        loadImages((loadedImages, loadedPaintingNames, loadedPainters) => {
            setPreloadedImages(loadedImages);
            setPaintingNames(loadedPaintingNames)
            setPainters(loadedPainters)          
            setImagesLoaded(true);
            dispatch(incrementIntro())
        });
    }, []);

    const handleModeChange = (newMode) => {
        dispatch(newGameMode(newMode))
        if (newMode === 'quiz') {           
            dispatch(zeroCounter())
            quizNextRound()
        }
    };

    const quizNextRound = () => {
        dispatch(randomChoice([paintingNames.length - 1, painters.length - 1]))
        dispatch(addQuizOptions(painters.length - 1));      
    };

    return (      
        <Box className="appContainer">   
            <Grid container className="gridContainer">
                <Grid item xs={12} className="first-row centerContent" >
                    <HeaderBlock/>
                </Grid>
                {(gameMode === 'intro') && (
                    <InstructionBlock
                        handleModeChange={handleModeChange}
                        imagesLoaded={imagesLoaded}
                        preloadedImages={preloadedImages}
                        painters={painters}
                        wrongOptionOpacity={wrongOptionOpacity}
                        setWrongOptionOpacity={setWrongOptionOpacity}
                        quizNextRound={quizNextRound}
                    />
                )}
                {(gameMode === 'practice' || gameMode === 'finish') && imagesLoaded && (                                          
                    <PracticeBlock
                        gameMode={gameMode}
                        handleModeChange={handleModeChange}
                        preloadedImages={preloadedImages}
                        paintingNames={paintingNames}
                        painters={painters}
                    />                         
                )}
                {(gameMode === 'quiz') && imagesLoaded && (                 
                    <QuizBlock
                        preloadedImages={preloadedImages}
                        painters={painters}
                        wrongOptionOpacity={wrongOptionOpacity}
                        setWrongOptionOpacity={setWrongOptionOpacity}
                        quizNextRound={quizNextRound }                         
                    />                                           
                )}                                       
            </Grid>
        </Box>                      
    );
};

export default App;