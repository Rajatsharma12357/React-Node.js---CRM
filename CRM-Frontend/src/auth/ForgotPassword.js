import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { handleForgotPassword } from '../store/slices/authSlice';
import { ForgotPasswordSchema } from '../schemas/ForgotPasswordSchema';
import { useFormik } from 'formik';

const initialValues = {
    email: ""
}
const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [disable, setDisable] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [error, setError] = useState('');

    const { values, handleBlur, touched, handleChange, errors, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ForgotPasswordSchema,
        onSubmit: async (values, action) => {
            // eslint-disable-next-line eqeqeq
            if (values?.email != '' && values?.password != "") {
                setSuccessMsg("");
                setError("");
                setDisable(true);
                try {
                    const response = await dispatch(handleForgotPassword(values));
                    console.log("response => ", response);
                    if (response?.payload?.status === 'success') {
                        action.resetForm();
                        setError("");
                        console.log(response.payload.message)
                        setSuccessMsg(response.payload.message);
                        setDisable(false);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    }
                    if (response?.error?.message === "Rejected") {
                        console.log(response?.payload);
                        setError(response?.payload);
                        setSuccessMsg("")
                    }
                    setDisable(false);
                } catch (error) {
                    console.log("error: " + error, error.message);
                    setDisable(false);
                }
            } else {
                alert("Please Enter Your Email ");
            }
        }
    });
    // console.log("error", errors);

    useEffect(() => { }, [])
    return (
        <>
            <div className='account-page'>
                <div className="main-wrapper">
                    <div className="account-content">
                        <div className="login-wrapper account-bg forgot-bg">
                            <div className="login-content">
                                <form onSubmit={handleSubmit}>
                                    <div className="login-user-info">
                                        <div className="login-logo">
                                            <img src="images/logo.svg" className="img-fluid" alt="Logo" />
                                        </div>
                                        <div className="login-heading">
                                            <h4>Forgot Password?</h4>
                                            <p>If you forgot your password, well, then we’ll email you instructions to reset your
                                                password.</p>
                                        </div>

                                        <div className="form-wrap">
                                            <label className="col-form-label">Email Address</label>
                                            <div className="form-wrap-icon">
                                                <input 
                                                    type="email"
                                                    name='email'
                                                    onChange={handleChange} onBlur={handleBlur}
                                                    className={errors.email && touched.email ? (
                                                        "form-control error-border"
                                                    ) : "form-control "} />
                                                <i className="ti ti-mail"></i>
                                            </div>
                                            {errors.email && touched.email ? (
                                                <span className="text-danger">* {errors.email}</span>
                                            ) : null}
                                            {error === "" ? (
                                                null
                                            ) : <span className="text-danger">* {error}*</span>}
                                            {successMsg === "" ? (
                                                null
                                            ) : <span className="text-success"> {successMsg}</span>}
                                        </div>
                                        <div className="form-wrap">
                                            <button type="submit" disabled={disable} className="btn btn-primary" >Submit</button>
                                        </div>
                                        <div className="login-form text-center">
                                            <h6>Return to<Link to="/signin" className="hover-a"> Log In</Link></h6>
                                        </div>
                                        {/* <div className="form-set-login or-text">
                                            <h4>OR</h4>
                                        </div>
                                        <div className="login-social-link">
                                            <ul className="nav">
                                                <li>
                                                    <Link to="#" className="facebook-logo">
                                                        <img src="images/facebook-logo.svg" alt="Facebook" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <img src="images/google-logo.svg" alt="Google" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#" className="apple-logo">
                                                        <img src="images/apple-logo.svg" alt="Apple" />
                                                    </Link>
                                                </li>
                                            </ul>
                                            <div className="copyright-text">
                                                <p>Copyright &copy;2024 - CRMS</p>
                                            </div>
                                        </div> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;