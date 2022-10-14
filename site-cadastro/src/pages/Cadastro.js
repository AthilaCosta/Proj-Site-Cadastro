import React, { useState } from "react"
import { getUser, postUser } from "../service/Request"
import "./Style.css"
import { useNavigate } from 'react-router-dom'
import Form from "../components/Form/Index"

export default function Cadastro() {

    //Função para passar para outra pagina

    let navigate = useNavigate()
    function navigateToInicio() {
        navigate('/Inicio', { replace: true })
    }

    //Estado de dados
    const [user, setUser] = useState({})

    const handleInputChange = (object) => {
        const dadosUser = { ...user }
        dadosUser[object.name] = object.value
        setUser({ ...user, ...dadosUser })
    }

    //Array com as caracteristicas
    const fields = [
        { key: 1, placeholder: "Digite seu nome", type: "text", label: "NOME", name: "name", onChange: handleInputChange },
        { key: 2, placeholder: "Digite sua idade", type: "number", label: "IDADE", name: "age", onChange: handleInputChange },
        { key: 3, placeholder: "Digite seu email", type: "email", label: "EMAIL", name: "email", onChange: handleInputChange },
        { key: 4, placeholder: "Crie uma senha", type: "password", label: "SENHA", name: "password", onChange: handleInputChange },
        { key: 5, placeholder: "Confirme a senha", type: "password", label: "CONFIRMAR SENHA", name: "passwordConfirm", onChange: handleInputChange }
    ]

    function handleFormSubmit() {
        if (!user.name || !user.age || !user.email || !user.password || !user.passwordConfirm) {
            alert("É preciso preencher os campos corretamente")
        }
        else if (user.password !== user.passwordConfirm) {
            alert("As senhas não são identicas")
        }
        else {
            postUser(user).then((response) => {
                let id = response.data.id
                getUser(id).then((response) => {
                    let userCreated = response.data
                    localStorage.setItem("user", JSON.stringify(userCreated))
                    navigateToInicio()
                });
            })
        }
    }

    return (
        <section>
            <div>

                <legend>CADASTRO</legend>
                <Form onSubmit={handleFormSubmit} listField={fields} />
                <button type="submit" id="cadaster" onClick={handleFormSubmit}>CADASTRAR</button>

            </div>
        </section>
    )
}






// axios.post('http://localhost:8010/api/v1/cadastroUser', user).then(response => {
//     alert(response.data.dados.length + ' cadastros!');
// })
// }


// useEffect(()=>{fetch("http://localhost:8010/inicio", {
//         method: "GET",
//         headers: {
//             "Content-type": "aplication/json",
//         }
//     })
//     .then((res)=>res.json())
//     .then((data)=>{
//         setUser(data)
//     })},[])