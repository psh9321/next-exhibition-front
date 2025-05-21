"use client"

import { Head } from "@/component/(Home)/shared/ClientWrapperHead";
import ExhibitionData from "@/component/(Home)/data/ExhibitionData";

const IndexPageView = () => {

    return (
        <>
            <Head isDualBtn={true} isSearchBtn={true}/>
            <ExhibitionData/>
        </>
    )
}

export default IndexPageView