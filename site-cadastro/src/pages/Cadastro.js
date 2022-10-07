import React, { useState} from "react"
import { getUser, postUser } from "../Service/Request"
import "./Style.css"
import { useNavigate } from 'react-router-dom'
import Input from "../components/Input"


export default function Cadastro() {

    //Função para passar para outra pagina

    let navigate = useNavigate()
    function navigateToInicio() {
        navigate('/Inicio', { replace: true })
    }

    //Array com as caracteristicas
    const field = [
        { key: 1, placeholder: "Digite seu nome", type: "text", label: "NOME", name: "name" },
        { key: 2, placeholder: "Digite sua idade", type: "number", label: "IDADE", name: "age" },
        { key: 3, placeholder: "Digite seu email", type: "email", label: "EMAIL", name: "email" },
        { key: 4, placeholder: "Crie uma senha", type: "password", label: "SENHA", name: "password" },
        { key: 5, placeholder: "Confirme a senha", type: "password", label: "CONFIRMAR SENHA", name: "passwordConfirm" }
    ]

    //Estado de dados
    const [user, setUser] = useState({})

    const handleInputChange = (object) => {
        const dadosUser = { ...user }
        dadosUser[object.name] = object.value
        setUser({ ...user, ...dadosUser })
    }


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
                <fieldset>
                    <legend>CADASTRO</legend>
                    <form onSubmit={handleFormSubmit} >
                        {field.map(field => (<Input key={field.key} name={field.name}
                            placeholder={field.placeholder} label={field.label}
                            type={field.type} onChange={handleInputChange} />))}
                    </form>
                </fieldset>

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

