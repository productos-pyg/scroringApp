import React from 'react';
import { useParams } from 'react-router-dom';
import Wrap from './Wrap';
import {doc, getFirestore, getDoc} from 'firebase/firestore';
import app from '../firebase';

const fireStore = getFirestore(app); 

const EditComponents = () => {
  const {id} = useParams();

// Especifica la colección y el ID del documento que deseas obtener
  const collectionName = 'Challenges';
  const documentId = `${id}`;

// Crea una referencia al documento
  const documentRef = doc(fireStore, collectionName, documentId);

// Obtiene el documento
  getDoc(documentRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
      // El documento existe
        const data = docSnapshot.data();
        console.log('Documento encontrado:', data);
      } else {
      // El documento no existe
        console.log('El documento no existe');
      }
    })
    .catch((error) => {
      console.log('Error al obtener el documento:', error);
   });

    console.log(id)
    return (
    <Wrap>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        holi feos {id}
      </div>
    </Wrap>
  );
};

export default EditComponents;