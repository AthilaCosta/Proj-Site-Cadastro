/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react-hooks/exhaustive-deps */


import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { deleteUser, putUser } from "../Service/Request"
import Input from "../components/Input"
import './Style.css'

export default function Inicio() {

    //Hook desativar e ativar input
    const [enable, setEnable] = useState(true)

    //Hook transformar senha em texto
    const [show, setShow] = useState("password")

    //Hook sumir e aparecer botão cancelar edição
    const [cancelarEdit, setCancelarEdit] = useState(false)


    //Estado de dados
    const [user, setUser] = useState({ name: "", age: "", email: "", password: "" })

    const onChange = (object) => {
        const dadosUser = { ...user }
        dadosUser[object.name] = object.value
        setUser({ ...user, ...dadosUser })
    }

    let navigate = useNavigate()
    function navigateToCadastro() {
        navigate('/', { replace: true })
    }

    function editar() {
        setCancelarEdit(true)
        setEnable(false)
        setShow("text")
    }

    function cancelEdit() {
        if (!user.name || !user.age || !user.email || !user.password) {
            alert("Não é possível cancelar a edição")
        }
        else {
            setCancelarEdit(false)
            setEnable(true)
            window.location.reload()
        }

    }

    useEffect(() => {
        let usuario = localStorage.getItem("user")
        usuario = usuario ? JSON.parse(usuario) : user
        if (usuario.id) {
            setUser(usuario)
        }
    }, [])


    //Função gravar com requisição
    function gravar() {
        if (!user.name || !user.age || !user.email || !user.password) {
            alert("É preciso preencher os campos corretamente")
        } else {
            putUser(user).then((response) => {
                const { usuario } = response.data
                localStorage.setItem("user", JSON.stringify(usuario))
                setUser(usuario)
                setEnable(true)
                setCancelarEdit(false)
                setShow("password")
            })

        }
    }

    function deletar() {
        deleteUser(user).then((response) => {
            const { usuario } = response.data
            localStorage.setItem("user", JSON.stringify(usuario))
            navigateToCadastro()
        })
    }

    //Array com todas as caracteristicas do input
    const field = [
        { key: 1, type: "text", label: "NOME", name: "name", value: user?.name, id: "inputName", role: "nome" },
        { key: 2, type: "number", label: "IDADE", name: "age", value: user?.age, id: "inputIniAge", role: "idade" },
        { key: 3, type: "email", label: "EMAIL", name: "email", value: user?.email, id: "inputIniEmail", role: "email" },
        { key: 4, type: show, label: "SENHA", name: "password", value: user?.password, id: "inputIniPassword" }
    ]


    return (
        <div>
            <button type="submit" id="logoff" onClick={deletar} >LOG-OFF</button>
            <section>
                <div>
                    <legend id="legendaIni">DADOS DO USUÁRIO</legend>
                    <form id="forminicio" onSubmit={gravar}>
                        {field.map(field => (<Input key={field.key} name={field.name} //Map para setar as caracteristicas do array
                            label={field.label} type={field.type} id={field.id} className="inputIni"
                            disabled={enable} value={field.value} onChange={onChange} autoComplete={field.autoComplete} role={field.role} />))}
                    </form>
                    <button type="submit" role="editar" onClick={editar}>EDITAR</button>
                    <button type="submit" id="botaoSave" role="salvar" onClick={gravar}
                        disabled={enable} > SALVAR </button>
                    {cancelarEdit && //Fazendo o botão desaparecer 
                        <button type="submit" id="botaoCancel" role="cancelarEdit" onClick={cancelEdit}>CANCELAR EDIÇÃO</button>
                    }
                </div>
            </section>
        </div>
    )

}


 // if (!user.name || !user.age || !user.email || !user.password) {
        //     alert("É necessário preencher os campos corretamentes")
        // }
        // else {
        //putUser(user)
        // window.location.reload()
        //}
