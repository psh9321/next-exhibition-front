"use client"

import { Square, SquareCheckBig, Flag, FlagOff } from 'lucide-react';

import { useState } from "react"
import { useFormContext } from 'react-hook-form';

// import check from "@/assets/img/check.svg"


interface CHECK_BOX_PROPS { 
    id : string,
    className? : string,
    activeClassName? : string,
    isChecked? : boolean,
    labelName? : string
}

interface GENDER_CHECK_BOX_INTERFACE extends CHECK_BOX_PROPS { 
    defaultValue : number,
}

export const GenderCheckBox = ({ id, className, defaultValue, activeClassName } : GENDER_CHECK_BOX_INTERFACE) => {

    const { setValue } = useFormContext();

    const [ gender, setGender ] = useState<number>(defaultValue);

    function CheckCallback(e: React.ChangeEvent<HTMLInputElement>){
        const self = e.currentTarget;

        if(!self.checked) return 

        const genderIdx = Number(self.value);

        setGender(genderIdx);
        setValue(id, genderIdx);
    }

    return (
        <>
            <div className={`${className??"checkBox"} ${gender === 0 ? `${activeClassName??"active"}` : ""}`}>
                <label htmlFor="gender0">
                    남
                    <input 
                        type="checkbox" 
                        id="gender0" 
                        className='hidden' 
                        value={0} 
                        onChange={CheckCallback}
                        checked={gender === 0}
                    />
                </label>
            </div>
            <div className={`${className??"checkBox"} ${gender === 1 ? `${activeClassName??"active"}` : ""}`}>
                <label htmlFor="gender1">
                    여
                    <input 
                        type="checkbox" 
                        id="gender1" 
                        className='hidden' 
                        value={1} 
                        onChange={CheckCallback}
                        checked={gender === 1}
                    />
                </label>
            </div>
        </>
    )
}

export const PersonalCheckBox = ({ id, activeClassName } : CHECK_BOX_PROPS) => {

    const { setValue } = useFormContext();

    const [isChk, setIsChk] = useState<boolean>(false);

    function CheckCallback(e: React.ChangeEvent<HTMLInputElement>){
        const self = e.currentTarget;

        const isChecked = self.checked;
        
        setIsChk(isChecked);
        setValue(id, isChecked);
    }

    return (
        <>
            <label htmlFor="isPersonalCheck" className={isChk ? `${activeClassName??"active"}` : ""}>
                {isChk ? <SquareCheckBig/> : <Square/>}
                <p>개인정보 수집 동의</p>
                <span>(필수)</span> 
            </label>
            <input type="checkbox" id='isPersonalCheck' className='hidden' onChange={CheckCallback} />
        </>
    )
}

export const ReceiveEmailCheckBox = ({ id, activeClassName } : CHECK_BOX_PROPS) => {

    const { setValue } = useFormContext();

    const [isChk, setIsChk] = useState<boolean>(false);

    function CheckCallback(e: React.ChangeEvent<HTMLInputElement>){
        const self = e.currentTarget;

        const isChecked = self.checked;
        
        setIsChk(isChecked);
        setValue(id, isChecked);
    }

    return (
        <>
            <label htmlFor="isReceiveEmail" className={isChk ? `${activeClassName??"active"}` : ""}>
                {isChk ? <SquareCheckBig/> : <Square/>}
                
                <p>이메일 알림 수신 동의 </p>
                <span>(선택)</span> 
            </label>
            <input type="checkbox" id='isReceiveEmail' className='hidden' onChange={CheckCallback} />
        </>
    )
}

export const RepresentativeCheckBox = ({id, labelName, className} : CHECK_BOX_PROPS) => {

    const { setValue, watch } = useFormContext();

    function CheckCallback(e: React.ChangeEvent<HTMLInputElement>){
        const self = e.currentTarget;

        const isChecked = self.checked;
        
        setValue(id, isChecked);
    }

    return (
        <>
            <label htmlFor={id}  className={className}>
                {labelName}
                {watch(id) ? <FlagOff/> : <Flag fill='#3C00EE' stroke='#3C00EE'/>} 
                <input 
                    hidden 
                    type="checkbox" 
                    id={id}
                    checked={watch(id)??false}
                    onChange={CheckCallback}
                />
            </label>
        </>
    )
}