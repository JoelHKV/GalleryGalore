import React from 'react';

import { Button } from '@mui/material';
import './HeaderBlock.css';

const HeaderBlock = ({ clickInfo }) => {

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