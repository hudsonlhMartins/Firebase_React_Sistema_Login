import React, { useState } from 'react'
import { db } from '../../firebaseConfig'
import { collection, getDoc, setDoc, doc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConfig'
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import './style.css'


const Register = ()=>{

    const [nome, setNome] =useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [kindInputSenha, setKindInputSenha] = useState('password')
    const [user, setUser] = useState({})
    const [logado, setLogado] = useState(false)
    const navigate = useNavigate()

    onAuthStateChanged(auth, (currentUser)=>{
        if(currentUser){
            setUser(currentUser)
            setLogado(true)
        }else{
            setLogado(false)
        }
    })

    const open_eye = (e)=>{
        console.log('foi')
        if(e.classList.contains('fa-eye-slash')){
            e.classList.remove('fa-eye-slash')
            e.classList.add('fa-eye')
            setKindInputSenha('text')

        }else{
            e.classList.remove('fa-eye')
            e.classList.add('fa-eye-slash')
            setKindInputSenha('password')
        }
    }


    const registrar = async () =>{
        if(nome !== '' && email !== '' && senha !== '')
        try{
            const data = await createUserWithEmailAndPassword(auth, email, senha).then(async dado =>{
                const dadosUserRef= doc(db, 'users', dado.user.uid)
                await setDoc(dadosUserRef, {nome: nome})
            })
        }catch(error){
            console.log(error)
        }
        else{
            alert('tudo vazio')
        }
    }

    return(
        <div className='container_register_pai'>
        <div className='container_login'>
            <h3>Registro</h3>
            <div className='container_input_login'>

                <input type='text' placeholder='Nome' value={nome} onChange={(e)=> setNome(e.target.value)} required />
                <input type='email' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} required />
                <div className='container_input_login_senha'>
                        <input type={kindInputSenha} placeholder='Senha' value={senha} onChange={(e)=> setSenha(e.target.value)} required />
                        <i onClick={(e) => open_eye(e.target) } className="fas fa-eye-slash"></i> 
                </div>
                    
            </div>

            <div className='container_btns_login'>
                <button onClick={registrar} className='btn_login'>Registrar</button>
                <span className='link_cadastro_span'>Já tem conta! <Link to='/' className='link_cadastrar'>Login</Link> </span>
            </div>

            <h1>seu email é: {user?.email}</h1>
        </div>
        {logado &&(
            <div>
             {navigate ('/conteudo') }
            </div>
        )}
        
        
        
    </div>
    )
}

export default Register