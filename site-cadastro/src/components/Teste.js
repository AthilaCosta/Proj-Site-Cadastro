import React, { useState } from "react"
import './Cadastro.css'
import { useNavigate } from 'react-router-dom'
import Input from "./Input"

export default function Cadastro() {

    let navigate = useNavigate()
    function navigateToInicio() {
        navigate('/Inicio', { replace: true })
    }

    const [nome, setNome] = useState()
    const [idade, setIdade] = useState()
    const [email, setEmail] = useState()

    const dadosUser = {
        nameUser: nome,
        ageUser: idade,
        emailUser: email
    }

    function Gravar(chave, valor) {
        localStorage.setItem(chave, JSON.stringify(valor))
        navigateToInicio()
    }


    return (
        <body>
            <section>
                <div>
                    <fieldset>
                        <legend>CADASTRO</legend>
                        <form>
                            <Input type="name" placeholder="Digite seu nome" onChange={(e) => setNome(e.target.value)} label="NOME" />
                            <Input type="number" placeholder="Digite sua idade" onChange={(e) => setIdade(e.target.value)} label="IDADE" />
                            <Input type="email" placeholder="Digite seu e-mail" onChange={(e) => setEmail(e.target.value)} label="EMAIL" />
                        </form>
                    </fieldset>
                    <button id="cadaster" onClick={() => Gravar('dadosPessoa', dadosUser)}>CADASTRAR</button>
                </div>
            </section>

        </body>
    )
}