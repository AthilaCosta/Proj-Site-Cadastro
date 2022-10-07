import React from "react"
//Todas as caracteristicas do input como props
export default function Input({ type, name, placeholder, disabled, onChange, label, value, role }) {

    //Setando os valores
    function setarValor(value) {
        value.preventDefault()
        onChange(value.target)
    }


    return (

        <>
            {/* Passando tudo por props*/}
            <label>{label} </label>
            <input type={type} name={name}
                disabled={disabled} placeholder={placeholder}
                value={value} autoComplete="off" onChange={setarValor} role={role} />

        </>
    )
}