import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { incrementIntro, zeroCounter, addQuizOptions, randomChoice, newGameMode } from './reducers/quizGameSlice';

import { Grid, Box } from '@mui/material'; // use MUI component library

import HeaderBlock from './components/HeaderBlock';
import RoundDisplayBlock from './components/RoundDisplayBlock';
import ModeButtonRow from './components/ModeButtonRow';
import PaintingAndSliderBlock from './components/PaintingAndSliderBlock';
import ShowDetaisBlock from './components/ShowDetaisBlock';
import PainterButtonArray from './components/PainterButtonArray';
import IntroBlock from './components/IntroBlock';
import ResultBlock from './components/ResultBlock';

import { loadImages } from './utilities/loadImages';

import './App.css'; 

const App = () => {

    const [wrongOptionOpacity, setWrongOptionOpacity] = useState('');
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState([]);
    const [painters, setPainters] = useState([]);
    const [paintingNames, setPaintingNames] = useState([]);

    const gameMode = useSelector((state) => state.counter[0].gameMode); // 'intro' vs 'practice' vs 'quiz' vs 'finish'
    const roundIntro = useSelector((state) => state.counter[0].roundIntro); // intro round nro

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
                <Grid item xs={12} className="second-row centerContent">
                    {(gameMode === 'quiz') && (<RoundDisplayBlock />)}
                    {(gameMode !== 'quiz') &&
                        (<ModeButtonRow buttonFunction={handleModeChange} />
                    )}
                </Grid>
                <Grid item xs={12} className="mainGameWindow">

                    {(imagesLoaded) && (
                        <PaintingAndSliderBlock
                            gameMode={gameMode}
                            preloadedImages={preloadedImages} />          
                    )}
                    {(gameMode === 'intro' && roundIntro < 4) && (
                        <IntroBlock />
                    )}
                    {(gameMode === 'finish') && (
                        <ResultBlock />
                    )}
                </Grid>
                <Grid item xs={12} className="last-row centerContent">
                    {((gameMode === 'practice' || roundIntro === 2 || roundIntro === 4) && imagesLoaded) && (
                        <ShowDetaisBlock
                            paintingNames={paintingNames}
                            painters={painters.map(painter => painter.nameFull)}
                        />
                    )}
                    {((gameMode === 'quiz' || roundIntro === 3) && imagesLoaded) && (
                        <PainterButtonArray
                            painters={painters.map(painter => painter.nameShort)}
                            wrongOptionOpacity={wrongOptionOpacity}
                            setWrongOptionOpacity={setWrongOptionOpacity}
                            quizNextRound={quizNextRound}
                            gameMode={gameMode}
                        />
                    )}                                                                     
                </Grid>
            </Grid>
        </Box>                      
    );
};

export default App;