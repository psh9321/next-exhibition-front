"use client"

import Link from 'next/link';
import { useState } from 'react';

import { Search, LayoutGrid, GalleryVertical } from 'lucide-react';

import BtnTheme from '../../shared/BtnTheme';
import SearchBox from './SearchBox';

import { useListModeStore } from '@/store/useListModeStore';
import { useThemeStore } from '@/store/useThemeStore';

import headStyles from "@/styles/(home)/shared/clientWrapperHead.module.css"

import { LAYOUT_CHILD } from "@/types/component"

interface HEAD_DEFAULT extends LAYOUT_CHILD {
    isDualBtn? : boolean,
    isSearchBtn? : boolean,
    isSearchResult? : boolean
}

export const Head = ({children, isDualBtn, isSearchBtn, isSearchResult} : HEAD_DEFAULT) => {

    

    const { toggleListMode, listMode } = useListModeStore();

    const { theme } = useThemeStore();

    const [isSearch, setIsSearch] = useState<boolean>(false);

    function CloseSearchLayer(){ setIsSearch(false) };
    
    return (
        <>

            {
                isSearch ? <SearchBox closeLayerCallback={CloseSearchLayer}/> : null
            }

            <div className={`${headStyles.head} ${isSearchResult && headStyles["searchResult"]} ${headStyles[theme]}`}>
                {children??null}
                <ul className={headStyles.btnList}>
                    {
                        isDualBtn && 
                        <li>
                            <button className={headStyles.btnViewMode} onClick={toggleListMode}>
                            {listMode === "Dual" ? <LayoutGrid fill='#fff' stroke='#fff'/> : <GalleryVertical  fill='#fff' stroke='#fff' />}
                            </button>
                        </li>

                    }
                    
                    {
                        isSearchBtn &&
                        <li>
                            <button className={headStyles.btnSearch} onClick={() => {
                                setIsSearch(isSearch ? false : true)
                            }}>
                                <Search stroke='#fff'/>
                            </button>
                        </li>
                    }
                    <li className={headStyles.theme}>
                        <BtnTheme className={headStyles.btnTheme} />
                    </li>
                </ul>
            </div>
        </>
    )
}

export const HeadLink = ({ linkName, isDualBtn, isSearchBtn } : { linkName : string, isDualBtn? : boolean, isSearchBtn? : boolean } ) => {

    return (
        <Head isDualBtn={isDualBtn} isSearchBtn={isSearchBtn}>
                <h3>
                    <span>
                        <Link href="/">{linkName}</Link>
                    </span>
                </h3>
        </Head>
    )
}

interface HEAD_IS_CHILDREN extends LAYOUT_CHILD {
    title? : string,
    isDualBtn? : boolean,
    isSearchBtn? : boolean
}

export const HeadTitle = ({ title, children, isDualBtn, isSearchBtn } : HEAD_IS_CHILDREN ) => {
    return (
        <Head isDualBtn={isDualBtn} isSearchBtn={isSearchBtn}>
                <h3>
                    <span>{title}</span>
                    {children}
                </h3>
        </Head>
    )
}

interface HEAD_SEARCH_RESULT extends HEAD_IS_CHILDREN {
    startDate : string,
    endDate : string,
    area? : string,
}

export const HeadSearchResult = ({ title, startDate, endDate, area, children } : HEAD_SEARCH_RESULT ) => {
    return (
        <Head isDualBtn={true} isSearchBtn={true} isSearchResult={true} >
            <dl>
                <dt>
                    <input value={title} type="text" readOnly />
                </dt>
                {area && <dd className='area'>지역 : {area}</dd>}
                <dd>{startDate} ~ {endDate}</dd>
            </dl>
            {children}
        </Head>
    )
}