import type { Metadata } from "next";

import ResigerPageView from "./_view";

export const metadata: Metadata = {
    title: "회원가입",
    description: "회원가입 페이지",
};

const RegisterPageServer = () => <ResigerPageView/>

export default RegisterPageServer