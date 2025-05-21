interface MESSAGE_PROPS {
    txt : string | undefined,
    _className? : string | undefined
}

export const ErrorMsg = ({txt, _className} : MESSAGE_PROPS) => {
    if(!txt) return null

    return (
        <p className={_className??"errorMsg"}>* {txt}</p>
    )
}

export const SuccessMsg = ({txt, _className} : MESSAGE_PROPS) => {
    if(!txt) return null

    return (
        <p className={_className??"successMsg"}>* {txt}</p>
    )
}