"use client"

import accountStyles from "@/styles/account/account.module.css"

const RegisterNav = ({ currentIdx } : { currentIdx : number }) => {


    // function ChapterMove(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) : void {
    //     const self = e.currentTarget;

    //     const id = Number(self.id.replace("chapter-",""));
    // }

    return (
        <ol className={accountStyles.registerNav}>
            <li className={currentIdx >= 0 ? accountStyles.active : ""}>
                1
            </li>
            <li className={currentIdx >= 1 ? accountStyles.active : ""}>
                2
            </li>
            <li className={currentIdx >= 2 ? accountStyles.active : ""}>
                3
            </li>
            <li className={currentIdx >= 3 ? accountStyles.active : ""}>
                4
            </li>
        </ol>   
    )
}

export default RegisterNav