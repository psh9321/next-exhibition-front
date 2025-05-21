import type { Metadata } from "next";

import PwSearchPageView from "./_view";

export const metadata: Metadata = {
    title: "비밀번호 찾기",
    description: "비밀번호 찾기 페이지",
};

const PwSearchPageServer = () => <PwSearchPageView/>

export default PwSearchPageServer