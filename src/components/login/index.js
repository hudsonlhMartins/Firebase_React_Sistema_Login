import React, { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebaseConfig'
import { collection, getDoc, setDoc, doc } from 'firebase/firestore'
import { auth } from '../../firebaseConfig'
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'


const Login = ()=>{
    const [User, setUser] = useState({})
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [kindInputSenha, setKindInputSenha] = useState('password')
    const [logado, setLogado] = useState(false)
    const navigate = useNavigate()

    onAuthStateChanged(auth, (correntUser)=>{
        if(correntUser){
            setUser(correntUser)
            navigate('/conteudo')
        }
    })

    const loginIn = async ()=>{
        try{
            const user = await signInWithEmailAndPassword(auth, email, senha).then(async dado =>{
                if(dado._tokenResponse){
                    setLogado(true)
                }else{
                    setLogado(false)
                }
            })
        }catch(error){
           if(error.code === 'auth/user-not-found'){
               alert('user não cadastrado')
           }else if(error.code === 'auth/wrong-password'){
               alert('senha errada')
           }
            console.log(error)
        }
    }


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
    return(
        <div className='container_login_pai'>
            <div className='container_login'>
                <h3>LOGIN</h3>
                <div className='container_input_login'>
                    <input type='email' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <div className='container_input_login_senha'>
                        <input type={kindInputSenha} placeholder='Senha' value={senha} onChange={(e)=> setSenha(e.target.value)} />
                        <i onClick={(e) => open_eye(e.target) } className="fas fa-eye-slash"></i> 
                    </div>
                    
                </div>

                <div className='container_btns_login'>
                    <button onClick={loginIn} className='btn_login'>Login</button>
                    <span className='link_cadastro_span'>Não tem conta! <Link to='/resgistro' className='link_cadastrar'>Cadastrar</Link> </span>
                </div>
            </div>

            {logado &&(
                <div>
                    {navigate ('/conteudo')}
                </div>
            )}
            
        </div>
    )
}

export default Login

// colha aberto:  <i class="fas fa-eye"></i>