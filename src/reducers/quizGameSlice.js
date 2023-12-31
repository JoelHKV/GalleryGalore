import { createSlice } from '@reduxjs/toolkit';
import { shuffleFisherYates } from '../utilities/numberCruching';
const initialState = [
    {
        roundIntro: 0,
        roundNro: 0,
        roundTotal: 3,
        points: 0,
        randPainter: 7,
        randPainting: 3,
        gameMode: 'intro',
    }
]

const quizGameReducer = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        randomChoice: (state, maxIndex) => {
            if ( state[0].gameMode !== 'finish') {
                state[0].randPainter = Math.floor(Math.random() * (maxIndex.payload[1] + 1))
                state[0].randPainting = Math.floor(Math.random() * (maxIndex.payload[0] + 1));
            }
        },
        addQuizOptions: (state, maxIndex) => {
            let thesepainters = Array.from({ length: (maxIndex.payload + 1) }, (_, i) => i);
            const correctPainter = state[0].randPainter
            thesepainters = thesepainters.filter(painter => painter !== correctPainter);
            thesepainters = shuffleFisherYates(thesepainters).slice(0, 3)
            thesepainters.push(correctPainter);
            state[0].painterOptions = shuffleFisherYates(thesepainters)

        },
        paintingSliderChoice: (state, newValue) => {
            state[0].randPainting = newValue.payload;
        },
        painterSliderChoice: (state, newValue) => {
            state[0].randPainter = newValue.payload;
        },
        incrementIntro: (state) => {
            state[0].roundIntro += 1;
        },
        incrementRound: (state) => {
            state[0].roundNro += 1;
            if (state[0].roundNro >= state[0].roundTotal) {
                state[0].gameMode = 'finish';
            }

        },
        incrementPoint: (state) => {
            state[0].points += 1;
        },
        newGameMode: (state, newValue) => {
            state[0].gameMode = newValue.payload;
        },
        zeroCounter: (state) => {
            state[0].roundIntro = 1;
            state[0].roundNro = 0;
            state[0].points = 0;
        },
    }

});

export const { incrementIntro, incrementRound, incrementPoint, zeroCounter, addQuizOptions, randomChoice, paintingSliderChoice, painterSliderChoice, newGameMode } = quizGameReducer.actions;
export default quizGameReducer.reducer;