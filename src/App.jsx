import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { zeroCounter, addQuizOptions, randomChoice, newGameMode } from './reducers/quizGameSlice';

import { Grid, Box } from '@mui/material'; // use MUI component library

import HeaderBlock from './components/HeaderBlock';
import RoundDisplayBlock from './components/RoundDisplayBlock';
import ModeButtonRow from './components/ModeButtonRow';
import PaintingAndSliderBlock from './components/PaintingAndSliderBlock';
import ShowDetaisBlock from './components/ShowDetaisBlock';
import PainterButtonArray from './components/PainterButtonArray';

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
        <Box className="myContainer">   
            <Grid container className="myGridContainer">
                <Grid item xs={12} className="centerContent" >
                    <HeaderBlock/>
                </Grid>
                <Grid item xs={12} >
                    {(gameMode === 'quiz') && (<RoundDisplayBlock mode={'round'} />)}
                    {(gameMode !== 'quiz') &&
                        (<ModeButtonRow buttonFunction={handleModeChange} />
                    )}
                </Grid>
                <Grid item xs={12} className={`painting-section`}>
                    {(gameMode === 'finish') && (<RoundDisplayBlock mode={'result'} />)}
                    {(gameMode !== 'finish' && imagesLoaded) && (<PaintingAndSliderBlock
                        gameMode={gameMode}
                        preloadedImages={preloadedImages} />
                    )}

                </Grid>
                <Grid item xs={12} >
                    {(gameMode === 'practice' && imagesLoaded) && (
                        <ShowDetaisBlock
                            paintingNames={paintingNames}
                            painters={painters.map(painter => painter.nameFull)}
                        />)}
                    {(gameMode === 'quiz') && (
                        <PainterButtonArray
                            painters={painters.map(painter => painter.nameShort)}
                            wrongOptionOpacity={wrongOptionOpacity}
                            setWrongOptionOpacity={setWrongOptionOpacity}
                            quizNextRound={quizNextRound}
                        />)}                                                                     
                </Grid>
            </Grid>
        </Box>                      
    );
};

export default App;