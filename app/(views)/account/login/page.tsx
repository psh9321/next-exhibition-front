import type { Metadata } from "next";

import LoginPageView from "./_view";

export const metadata: Metadata = {
    title: "로그인",
    description: "로그인 페이지",
};

const LoginPageServer = () => <LoginPageView/>

export default LoginPageServer