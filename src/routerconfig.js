import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Main from './components/main'
import Register from './components/registers'
import Conteudo from './components/conteudo'

const RoutesConfig = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main/>} />
                <Route path='/resgistro' element={<Register/>} />
                <Route path='/conteudo' element={<Conteudo/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesConfig