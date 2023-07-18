import React from 'react';
import { Button } from '@mui/material';
import './PainterButtonArray.css';
import { useSelector } from 'react-redux';


const PainterButtonArray = ({ buttonFunction, painters  }) => {

    const painterOptions = useSelector((state) => state.counter[0].painterOptions); // multiple choice options
    const thisPainterNro = useSelector((state) => state.counter[0].randPainter);
    //buttonData[0].name = painters[painterOptions[0]]

    const buttonData = painterOptions.map((option, index) => {
        return {
            name: painters[option],
            className: `${option}-button`,
            param: option === thisPainterNro,
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