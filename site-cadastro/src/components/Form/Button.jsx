
export default function Button({ id, onClickConfirm, childrenConfirm, onClickCancel, childrenCancel, extra }) {

    return (
        <>
            <button type="submit" id={id} onClick={onClickConfirm}>{childrenConfirm}</button>
            <button type="submit" id={id} onClick={onClickCancel}>{childrenCancel}</button>
            {extra?.map(btn=> (<button{...btn}></button>))}
        </>
    )
}