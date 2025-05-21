import ReactDOM from "react-dom";

import { LAYOUT_CHILD } from "@/types/component"

const Portal = ({children} : LAYOUT_CHILD) => {
    return ReactDOM.createPortal(
        children,
        document.getElementById("portal-root")!
    )
}

export default Portal