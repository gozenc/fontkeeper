import Auth from "../components"
import Signin from "../components/Signin"
import Signup from "../components/Signup"
import Dashboard from "../components/Dashboard"
import ForgotPassword from "../components/ForgotPassword"
import ResetPassword from "../components/ResetPassword"
import WithAuth from "./withAuth"

export default [
    {
        path: "/login",
        element: <Auth/>,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword/>
    },
    {
        path: "/reset-password",
        element: <ResetPassword/>
    },
    {
        path: "/signin",
        element: <Signin/>,
    },
    {
        path: "/signup",
        element: <Signup/>,
    },
    {
        path: "/dashboard",
        element: <WithAuth route={<Dashboard/>}/>,
    }
]