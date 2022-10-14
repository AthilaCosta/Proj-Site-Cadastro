/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react-hooks/exhaustive-deps */

import Form from "../components/Form/Index"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { deleteUser, putUser } from "../Service/Request"
import './Style.css'
import Buttons from "../components/Form/Button"

export default function Inicio() {

    //Hook desativar e ativar input
    const [enable, setEnable] = useState(true)

    //Hook transformar senha em texto
    const [showPassword, setShowPassword] = useState("password")

    //Hook sumir e aparecer botão cancelar edição
    const [cancelarEdit, setCancelarEdit] = useState(false)

    //Estado de dados
    const [user, setUser] = useState()

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
        setShowPassword("text")
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
                const { usuario } = response.data.BD
                localStorage.setItem("user", JSON.stringify(usuario))
                setUser(usuario)
                setEnable(true)
                setCancelarEdit(false)
                setShowPassword("password")
            })

        }
    }

    function deletar() {
        deleteUser(user).then((response) => {
            const { usuario } = response.data.BD
            localStorage.setItem("user", JSON.stringify(usuario))
            navigateToCadastro()
        })
    }

    function logoff() {
        localStorage.removeItem("user")
        navigateToCadastro()
    }

    //Array com todas as caracteristicas do input
    const fields = [
        { key: 1, type: "text", label: "NOME", name: "name", value: user?.name, id: "inputName", role: "nome", onChange: onChange, disabled: enable },
        { key: 2, type: "number", label: "IDADE", name: "age", value: user?.age, id: "inputIniAge", role: "idade", onChange: onChange, disabled: enable },
        { key: 3, type: "email", label: "EMAIL", name: "email", value: user?.email, id: "inputIniEmail", role: "email", onChange: onChange, disabled: enable },
        { key: 4, type: showPassword, label: "SENHA", name: "password", value: user?.password, id: "inputIniPassword", onChange: onChange, disabled: enable }
    ]

    const fieldsButton = [
        { key: 1, id: "buttonEdit", onClickConfirm: editar, childrenConfirm: "EDITAR" },
        { key: 2, id: "buttonSave", onClickConfirm: gravar, disabled: enable, childrenConfirm: "SALVAR" }
    ]


    return (
        <div>
            <button type="submit" id="logoff" onClick={deletar} >LOG-OFF</button>
            <section>
                <div>
                    <legend id="legendaIni">DADOS DO USUÁRIO</legend>
                    <Form id="forminicio" onSubmit={gravar} listField={fields} />
                    {fieldsButton.map(field => (
                        <Buttons key={field.key} id={field.id} disabled={field.disabled} onClickConfirm={field.onClickConfirm}
                        childrenConfirm={field.childrenConfirm} type="submit"
                        />
                    ))}
                    {/* <button type="submit" role="editar" onClick={editar}>EDITAR</button>
                    <button type="submit" id="botaoSave" role="salvar" onClick={gravar} */}
                    {/* disabled={enable} > SALVAR </button> */}
                    {cancelarEdit && //Fazendo o botão desaparecer 
                        <button type="submit" id="botaoCancel" role="cancelarEdit" onClick={cancelEdit}>CANCELAR EDIÇÃO</button>
                    }
                </div>
            </section>
        </div>
    )

}
