import { redirect } from "next/navigation"

const AccountPageView = async () => {
    return redirect("/account/login")
}

export default AccountPageView