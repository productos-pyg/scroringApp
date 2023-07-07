import {doc, getFirestore, getDoc, getDocs, updateDoc, Firestore, collection} from 'firebase/firestore';
import app from '../firebase';

const fireStore = getFirestore(app);

export const getEvents = async()=>{
    const querySnapShot = await getDocs(collection(fireStore, "Events"))
    const dataEvents = [];
    querySnapShot.forEach((doc)=>{
        dataEvents.push(doc.data())
    })
    return dataEvents;
}