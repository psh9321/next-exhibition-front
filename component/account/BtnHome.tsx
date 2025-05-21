import Link from "next/link"
import { House } from 'lucide-react';


export const BtnNaviHome = ({className} : {className : string}) => {
    return <Link href={"/"} className={className}>
        <House/>
    </Link>
}