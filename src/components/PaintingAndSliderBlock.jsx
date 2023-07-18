import React from 'react';
import { Slider } from '@mui/material';
import './PaintingAndSliderBlock.css';

import { useDispatch, useSelector } from 'react-redux';
import { randomChoice, paintingSliderChoice, painterSliderChoice } from '../reducers/quizGameSlice';


const PaintingAndSliderBlock = ({ gameMode, preloadedImages }) => {

    const dispatch = useDispatch();

    const maxPaintingIndex = preloadedImages.length -1;  
    const maxPainterIndex = preloadedImages[0].length - 1;

    const thisPainterNro = useSelector((state) => state.counter[0].randPainter); // painter nro
    const thisPaintingNro = useSelector((state) => state.counter[0].randPainting); // painting nro

    const clickPaintingRandom = () => { // shows a random painting after clicking a painting 
        if (gameMode === 'practice') {
            dispatch(randomChoice([maxPaintingIndex, maxPainterIndex]));
        }
    }

    const handleSliderChange = (newValue, whichSlider) => {
        if (whichSlider == 'Painter') {
            dispatch(painterSliderChoice(newValue))
        }
        if (whichSlider == 'Painting') {
            dispatch(paintingSliderChoice(newValue))
        }        
       
    };

    return (
        <div className="PaintingAndSliderBlock centerContent">
            <img style={gameMode === 'practice' ? { cursor: 'pointer' } : {}}
                src={preloadedImages[thisPaintingNro][thisPainterNro].src}
                alt="Image"
                onClick={clickPaintingRandom}
            />

            <div className="painting-slider">
                <Slider
                    value={thisPaintingNro}
                    onChange={(event, newValue) => handleSliderChange(newValue, 'Painting')}
                    min={0}
                    max={maxPaintingIndex}
                    step={1}
                    marks
                />
            </div>
            <div className="painter-slider">
                <Slider
                    value={thisPainterNro}
                    onChange={(event, newValue) => handleSliderChange(newValue, 'Painter')}
                    orientation="vertical"
                    min={0}
                    max={maxPainterIndex}
                    step={1}
                    marks
                />
            </div>
        </div>
    );
};

export default PaintingAndSliderBlock;