import React, { useState, useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { incrementRound, incrementPoint, zeroCounter, addQuizOptions, randomChoice, newGameMode } from './reducers/quizGameSlice';

import { Grid, Box, Button, Slider, Typography } from '@mui/material'; // use MUI component library
import CustomButtonGroup from './components/CustomButtonGroup'; // custom button array component
import IntroBlock from './components/IntroBlock'; // instructions are here
import HeaderBlock from './components/HeaderBlock';
import RoundDisplayBlock from './components/RoundDisplayBlock';
import ModeButtonRow from './components/ModeButtonRow';
import PaintingAndSliderBlock from './components/PaintingAndSliderBlock';
import ShowDetaisBlock from './components/ShowDetaisBlock';
import PainterButtonArray from './components/PainterButtonArray';



import './App.css'; 

const answerTimeoutTime = 1200;
const layoutSwitchWidth = 600;

const preloadedImages = [] // array to load and store painting images, defined outside because loading is async 
const { paintingNames, painters } = paintingLoader(); // returns painting and painter names
const maxPaintingIndex = paintingNames.length - 1;
const maxPainterIndex = painters.length - 1;

function paintingLoader() {
    // preloads painting images and populates preloadedImages[thisPaintingNro][thisPainterNro]
    const paintingNames = ['Reflections', 'Chaos and Order', 'Dreamscape', 'Beyond the Horizon', 'Melancholy', 'Inner Depths', 'Metamorphosis', 'Fragmented Memories', 'The Human Condition', 'Parallel Universe', 'Illusionary Worlds', 'Embrace of the Elements', 'Transcendence', 'Enchanted Forests', 'Sensory Overload', 'Timeless Beauty', 'Celestial Journey', 'The Endless Ocean', 'Shadows and Light', 'The Alchemy of Nature'];
    const painters = ['Leonardo da Vinci', 'Michelangelo Buonarroti', 'Vincent van Gogh', 'Pablo Picasso', 'Rembrandt van Rijn', 'Claude Monet', 'Johannes Vermeer', 'Salvador Dali', 'Henri Matisse', 'Paul Cezanne'];
    const stem = 'https://storage.googleapis.com/ai_dev_projects/arthouse/paintings/';
    const middle = '_in_';
    const end = '_style_painting__.jpg';

    paintingNames.forEach((painting, i) => {
        preloadedImages[i] = [];
        painters.forEach((painter, j) => {
            const thisPainting = painting.replace(/ /g, '_');
            const thisPainter = painter.replace(/ /g, '_');
            const totalnamestring = stem + thisPainting + middle + thisPainter + end;
            const image = new Image();
            image.src = totalnamestring;
            preloadedImages[i][j] = image;
        });
    });

    return { paintingNames, painters };
}

const App = () => {

    const [revealAnswer, setRevealAnswer] = useState(false);


    const [borderColorFlash, setborderColorFlash] = useState(''); // state for flashing the correct quiz answer
    const [containerWidth, setContainerWidth] = useState(null); // state for container width
    const appContainerRef = useRef(null);

    const roundNro = useSelector((state) => state.counter[0].roundNro); //round nro

    const gameMode = useSelector((state) => state.counter[0].gameMode); // 'intro' vs 'practice' vs 'quiz' vs 'finish'
    const roundTotal = useSelector((state) => state.counter[0].roundTotal); // total nro rounds
    const points = useSelector((state) => state.counter[0].points); // nro points
  
    const dispatch = useDispatch();

    const nextIntro = () => {
        dispatch(incrementRound());
        dispatch(addQuizOptions(maxPainterIndex))

    };


    const clickInfo = () => { // show introscreen
        dispatch(zeroCounter())
        dispatch(newGameMode('intro'))
    }

    const handleModeChange = (newMode) => {
        dispatch(newGameMode(newMode))
        if (newMode === 'quiz') {
            dispatch(zeroCounter())
            dispatch(randomChoice([maxPaintingIndex, maxPainterIndex]))
            dispatch(addQuizOptions(maxPainterIndex));
        }
    };

    const handleUserGuess = (correctPainterGuess) => { 

        if (correctPainterGuess) { // correct answer
            dispatch(incrementPoint());
            setborderColorFlash('go-green');
        } else {
            setborderColorFlash('go-red');
        }

        setTimeout(() => {
            setRevealAnswer(true)
        }, 200);
        setTimeout(() => {
            setborderColorFlash(''); // stop the flashing
            setRevealAnswer(false)
            dispatch(incrementRound()); // next round
            dispatch(randomChoice([maxPaintingIndex, maxPainterIndex])); // random painting
            dispatch(addQuizOptions(maxPainterIndex)); // make options           
        }, answerTimeoutTime); 
    }

    const handleResize = () => { // updates window width 
        if (appContainerRef.current) {
            const width = appContainerRef.current.getBoundingClientRect().width;
            if (width > layoutSwitchWidth) {
                appContainerRef.current.style.setProperty('--extra-height', '0vh');
            }
            else {
                appContainerRef.current.style.setProperty('--extra-height', '11vh');
            }
            setContainerWidth(width);
        }
    };

    useEffect(() => {
       // window.addEventListener('resize', handleResize); // add event listener for width

        return () => {
         //   window.removeEventListener('resize', handleResize); // remove when element unmounts
        };
    }, []);

    useEffect(() => {
       // handleResize();
    }, []);

    return (
        <>
            <Box className="myContainer">   
                <Grid container spacing={2} className="myGridContainer">
                    <Grid item xs={12} className="centerContent" >
                        <HeaderBlock clickInfo={clickInfo} />
                    </Grid>
                    <Grid item xs={12} >
                        {(gameMode === 'quiz') && (<RoundDisplayBlock />)}
                        {(gameMode !== 'quiz') &&
                            (<ModeButtonRow buttonFunction={handleModeChange} />)}
                    </Grid>
                    <Grid item xs={12} className={`painting-section ${borderColorFlash}`}>
                        {(gameMode === 'finish') && (<RoundDisplayBlock />)}
                        {(gameMode !== 'finish') && (<PaintingAndSliderBlock
                            gameMode={gameMode}
                            preloadedImages={preloadedImages} />)}
                    </Grid>
                    <Grid item xs={12} >
                        {(gameMode === 'practice' || revealAnswer) && (
                            <ShowDetaisBlock
                                paintingNames={paintingNames}
                                painters={painters}
                            />)}
                        {(gameMode === 'quiz' && !revealAnswer) && (
                            <PainterButtonArray
                                buttonFunction={handleUserGuess}
                                painters={painters}
                            />)}                        
                        

                        
                    </Grid>

                </Grid>


            </Box>
            
            <div ref={appContainerRef} className="app-container unselectable"> 
                                                          
                <div className={`painting-section ${borderColorFlash}`}>
                  
                    {(gameMode === 'finish') && (
                        <>
                            <div>
                                <h2>Your score: {points} / {roundTotal}</h2>
                            </div>

                        </>
                    )}
                 
                
                    {(gameMode === 'intro' || gameMode === 'reveal_intro') && (
                        <IntroBlock nextIntro={nextIntro} roundNro={roundNro} />
                    )}

                </div>
                
               
            </div>
        </>
    );
};

export default App;