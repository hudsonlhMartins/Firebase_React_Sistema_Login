import React, {} from 'react'
import { db } from '../../firebaseConfig'
import { collection, getDoc, setDoc, doc } from 'firebase/firestore'
import Login from '../login'

const Main = ()=>{

    return(
        <div>
            <Login/>
        </div>
    )
}

export default Main