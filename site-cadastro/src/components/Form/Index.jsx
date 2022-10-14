import ListField from "../ListField"

export default function Form({ id, onSubmit, listField }) {
    return (

        <form id={id} onSubmit={onSubmit}>
           <ListField list={listField}/>
        </form>
        
    )

}