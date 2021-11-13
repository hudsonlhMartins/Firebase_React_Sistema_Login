import React, {useState} from 'react'
import { db } from '../../firebaseConfig'
import { collection, getDoc, setDoc, doc } from 'firebase/firestore'
import Login from '../login'
import { Link, useNavigate,  } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { async } from '@firebase/util'

const Conteudo = ()=>{
    const [user, setUser] = useState({})
    const [logado, setLogado] = useState(false)
    const navigate = useNavigate()

    onAuthStateChanged(auth, (currentUser)=>{
        if(currentUser){
            setUser(currentUser)
            setLogado(true)
        }else{
            setLogado(false)
            navigate('/')
        }
    })

    const Sair = async()=>{
         await signOut(auth).then(console.log)
    }

    return(
        <div>
            ola seu nome é: {user?.email}
            <button onClick={Sair}>Sair</button>
            
        </div>
    )
}

export default Conteudo