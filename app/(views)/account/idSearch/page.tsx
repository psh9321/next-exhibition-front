import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "아이디 찾기",
    description: "아이디 찾기 페이지",
};

import IdSearchPageView from "./_view"

const IdSearchPageServer = () => <IdSearchPageView/>

export default IdSearchPageServer