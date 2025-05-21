"use clinet"

import { Sun, Moon } from 'lucide-react';

import { useThemeStore } from '@/store/useThemeStore';

const BtnTheme = ({className} : {className? : string}) => {

    const { theme } = useThemeStore();

    return (
        <button className={className??"btnTheme"}>
            {theme === "light" && <Sun stroke='#fff'/>}
            {theme === "dark" && <Moon stroke='#fff'/>}
        </button>
    )
}

export default BtnTheme