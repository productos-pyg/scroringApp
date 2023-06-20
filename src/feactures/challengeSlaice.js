import { createSlice } from '@reduxjs/toolkit'
import { FirebaseApp } from 'firebase/app';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import app from '../firebase';

const fireStore = getFireStore(app);

const initialState  = {
    value: [],
}

export const querySlice = createSlice({
    name:"query",
    initialState,
    reducers:{
        readChallenge: ()=>{}
    },
});