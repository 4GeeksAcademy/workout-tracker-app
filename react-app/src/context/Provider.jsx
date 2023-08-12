import React, { createContext, useState, useEffect, useReducer } from 'react';

import { auth } from '../index.js'

export const Context = createContext();

export const actions = {
    FETCH_EXERCISES(exercises) {
        return { type: FETCH_EXERCISES, payload: exercises }
    },

    ADD_EXERCISE(exercises) {
        return { type: ADD_EXERCISE, payload: exercises}
    },

    EDIT_EXERCISE(exercises) {
        return { type: ADD_EXERCISE, payload: exercises}
    },

    DELETE_EXERCISE(exercises) {
        return { type: ADD_EXERCISE, payload: exercises}
    },
}

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const EDIT_EXERCISE = 'EDIT_EXERCISE';
export const DELETE_EXERCISE = 'DELETE_EXERCISE';
export const FETCH_EXERCISES = 'FETCH_EXERCISES';

// check data strucutre
const initialExercises = {
    exercises: []
};
// getdocs ->

const exercisesReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_EXERCISES: {
            return {
                ...state,
                exercises: action.payload
            }
        }
        // case ADD_EXERCISE:
        // return [...state, action.payload];

        // case EDIT_EXERCISE:
        // return state.map(exercise => exercise.id === action.payload.id ? action.payload : exercise);
        
        // case DELETE_EXERCISE:
        // return state.filter(exercise => exercise.id !== action.payload);
        
        default:
            return state;
    }
};



export default function ContextProvider(props) {

    const [user, setUser] = useState({});
    const [state, dispatch] = useReducer(exercisesReducer, initialExercises);


    useEffect(() => {

        auth.onAuthStateChanged(async (user) => {
            console.log('In the onAuthStateChanged function');

            if (user) {

                console.log('User is signed in')

                const res = await fetch(`http://127.0.0.1:5001/fitness-log-app-c3dd9/us-central1/signUpOrSigninUser`, {
                    method: 'post',
                    body: JSON.stringify({ email: user.email }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();

                console.log('data', data);

                setUser(data.data);
            }
            else {

                console.log('User not signed in');
                setUser({});
            }
        })
    }, []);

    return (

        
        <Context.Provider value={{ user, setUser, state, dispatch }}>
            {props.children}
        </Context.Provider>
    )
}