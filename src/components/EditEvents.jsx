import React from 'react'
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Wrap from './Wrap';
import {doc, getFirestore, getDoc, updateDoc, Firestore, collection} from 'firebase/firestore';
import app from '../firebase';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {TiArrowBackOutline} from "react-icons/ti"
import Swal from 'sweetalert2'
import {RiMailSendLine} from "react-icons/ri"

const EditEvents = () => {
  return (
    <div>EditEvents</div>
  )
}

export default EditEvents