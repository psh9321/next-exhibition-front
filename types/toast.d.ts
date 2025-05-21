

export interface ALERT_INTER_FACE {
    contents : string,
    cancelCallback : () => void,
    title? : string | TrustedHTML,
    titleIcon? : React.ReactNode | null,
    btnCancelTxt? : string,    
}

export interface ONLY_CANCEL_CALLBACK {
    cancelCallback : () => void
}

export interface CONFIRM_INTER_FACE {
    contents : string,
    cancelCallback : () => void,
    submitCallback : () => void,
    
    title? : string | TrustedHTML,
    titleIcon? : React.ReactNode | null,
    btnCancelTxt? : string,
    btnSubmitTxt? : string,
}

export interface CONFIRM_CALLBACK_INTER_FACE {
    cancelCallback : () => void,
    submitCallback : () => void
}