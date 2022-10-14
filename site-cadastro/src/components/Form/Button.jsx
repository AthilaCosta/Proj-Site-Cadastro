
export default function groupButton({ id, onClickConfirm, childrenConfirm, onClickCancel, childrenCancel, disabled, extra }) {

    return (
        <>
            <button type="submit" id={id} onClick={onClickConfirm} disabled={disabled}>{childrenConfirm}</button>
            {/* <button type="submit" id={id} onClick={onClickCancel} disabled={disabled}>{childrenCancel}</button> */}
            {extra?.map(btn => (<button{...btn}>btn.text</button>))}
        </>
    )
}