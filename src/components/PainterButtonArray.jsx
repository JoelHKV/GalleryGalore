import React from 'react';
import { Button } from '@mui/material';
import './PainterButtonArray.css';
import { useSelector } from 'react-redux';

const PainterButtonArray = ({ buttonFunction, painters, wrongOptionOpacity  }) => {

    const painterOptions = useSelector((state) => state.counter[0].painterOptions); // multiple choice options
    const thisPainterNro = useSelector((state) => state.counter[0].randPainter);
 
    const buttonData = painterOptions.map((option, index) => {
        const isRightOption = option === thisPainterNro;
        const className = `painter-button-${index} ${isRightOption ? '' : wrongOptionOpacity}`;

        return {
            name: painters[option],
            className: className,
            param: isRightOption,
        };
    });

    const buttons = buttonData.map((button, index) => (
        <div key={index} className={`option-button ${button.className}`}>
            <Button variant="contained" onClick={() => buttonFunction(button.param)}>
                {button.name}
            </Button>
        </div>
    ));

    return (
        <div className="PainterButtonArray centerContent">
            {buttons}
        </div>
    );
};

export default PainterButtonArray;