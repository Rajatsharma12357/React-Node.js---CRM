import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyEmail from "../auth/VerifyEmail";
import ForgotPassword from "../auth/ForgotPassword"
import VerifyEmailByToken from "../auth/VerifyEmailByToken";
import EmailEditor from "../components/email/EmailEditor";
import Dashboard from "../dashboard/Dashboard";
import Home from "../Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Email from "../components/application/Email";
import ErrorPage from "../errorPage";
import ResetPassword from "../auth/ResetPassword";
import UpdateProfile from "../components/pages/profile/UpdateProfile";
import Security from "../components/pages/profile/Security";
import Notifications from "../components/pages/profile/Notifications";
import ConnectedApps from "../components/pages/profile/ConnectedApps";
import Modals from "../components/common/Modals";

const Frontendlayout = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>

                    <Route path='' element={<Home />} />
                    <Route path='/signin' element={<Login />} />
                    <Route path='/signup' element={<Register />} />
                    <Route path='/forgotpassword' element={<ForgotPassword />} />
                    <Route path='/resetpassword/:id' element={<ResetPassword />} />

                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/profile' element={<UpdateProfile />} />
                    <Route path='/security' element={<Security />} />
                    <Route path='/notifications' element={<Notifications />} />
                    <Route path='/connected-apps' element={<ConnectedApps />} />

                    <Route path='/emeaileditor' element={<EmailEditor />} />
                    {/* <Route path='/reset-password'  element={<ResetPassword />} /> */}
                    <Route path='/verifyEmail' element={<VerifyEmail />} />
                    <Route path='/verifyEmail/:id/:token' element={<VerifyEmailByToken />} />

                    <Route path='/email' element={<Email />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
                <Modals />
            </BrowserRouter>
        </>
    )
}
export default Frontendlayout;
