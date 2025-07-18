import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ChevronsUpDown, Check } from 'lucide-react';

import selectBoxStyles from "@/styles/selectBox.module.css"
import { useThemeStore } from '@/store/useThemeStore';

interface SELECT_BOX {
    options : string[];
    children? : React.ReactNode,
    id : string,
    isReadDisabled? : boolean,
    defaultSelectValue? : string,
    className? : string,
    selectListStyle? : React.CSSProperties
    selectListClassName? : string,
}

const SelectBox = ({children, id, options, defaultSelectValue, className, selectListStyle, selectListClassName} : SELECT_BOX) => {

    const { setValue } = useFormContext();

    const { theme } = useThemeStore();

    const [isActive, setIsActive] = useState<boolean>(false);

    const [selectValue, setSelectValue] = useState<string>(defaultSelectValue??"");

    const ref = useRef<HTMLUListElement>(null);

    function ListToggle() { setIsActive(isActive ? false : true) };

    function ClickOrTouchEvent(e: MouseEvent) : void{
        
        const target = e.target;

        if(ref["current"] && !ref["current"].contains(target as Node)) {
            setIsActive(false);
        }
    }

    function OnClickTarget(e : React.MouseEvent<HTMLButtonElement>){

        const self = e.currentTarget;
        setValue(id, self.value)
        
        setSelectValue(self.value);
        setIsActive(false);
    }

    useEffect(() => {

        if(isActive) {
            document.body.addEventListener("click",ClickOrTouchEvent)
        }
        else {
            document.body.removeEventListener("click",ClickOrTouchEvent)
        }

        return () => {
            document.removeEventListener("click", ClickOrTouchEvent)
        }
    },[isActive])

    return (
        <>
            <div className={`${selectBoxStyles.selectBox} ${selectBoxStyles[theme]} ${className??""}`}>
                <button onClick={ListToggle} type="button" className={selectBoxStyles.btnSelect}>{selectValue}
                    <ChevronsUpDown/>
                </button>
                <ul style={selectListStyle} ref={ref} className={`${selectBoxStyles.selectList} ${isActive && selectBoxStyles.active} ${selectListClassName??""}`}>
                {
                        options.map(el => {
                            return (
                                <li key={el}>
                                    <button type='button' onClick={OnClickTarget} value={el}>{el}
                                    {selectValue === el && <Check stroke='#3C00EE'  size={18}/>}
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {children}
        </>   
    )
}

export default SelectBox