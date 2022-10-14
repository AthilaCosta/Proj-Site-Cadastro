import Input from "./Input"
import React from "react"

export default function listField({ list }) {
    return list.map(field => (
        <Input
            key={field.key}
            name={field.name}
            placeholder={field.placeholder}
            label={field.label}
            type={field.type}
            onChange={field.onChange}
            value={field.value}
            disabled={field.disabled}
            role={field.role}
        />
    ))
}