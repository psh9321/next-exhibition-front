import { cookies } from "next/headers";

const tokenStorageName = process["env"]["NEXT_TOKEN_STORAGE"] as string;
 
export async function setToken(data : string) {
    const cookieStore = await cookies();

    cookieStore.set(tokenStorageName, data)
}

export async function getToken() {
    
    const cookieStore = await cookies();

    return cookieStore.get(tokenStorageName)?.value??"";
}

export async function deleteToken() {
    const cookieStore = await cookies();

    if(!cookieStore.get(tokenStorageName)) return true;
    
    cookieStore.delete(tokenStorageName);
}