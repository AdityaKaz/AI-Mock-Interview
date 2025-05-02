/*
    Define Authentication layout :
    1. check if user is authenticated
    2. yes - redirect to home
        no - pass children i.e. sign-in / sign-up
 */
import React,{ReactNode} from 'react'
import {isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";

const AuthLayout = async ({children} :{children: ReactNode}) => {

    const isUserAuthenticated = await isAuthenticated();

    if(isUserAuthenticated) redirect('/');

    return (
        <div className="auth-layout">{children}</div>
    )
}
export default AuthLayout
