import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { handleLogin } from '../store/slices/authSlice';
import { LoginSchema } from '../schemas/LoginSchema';
import { useFormik } from 'formik';

const initialValues = {
    email: "",
    password: "",
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.auth);
    // console.log("Data => ", data);
    const { isAuthenticated, userToken } = data;

    const [successMsg, setSuccessMsg] = useState('');
    const [error, setError] = useState('');
    const [disable, setDisable] = useState(false);

    const { values, handleBlur, touched, handleChange, errors, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: LoginSchema,
        onSubmit: async (values, action) => {
            if (values?.email != '' && values?.password != "") {
                setSuccessMsg("");
                setDisable(true);
                try {
                    const response = await dispatch(handleLogin(values));
                    console.log("response => ", response);
                    if (response?.payload?.status == 'success') {
                        action.resetForm();
                        setDisable(false);
                        setError("");
                        setSuccessMsg(response.payload.message);

                        setTimeout(() => {
                            navigate('/dashboard');
                            window.location.reload();
                        }, 2000);
                    }
                    if (response?.error?.message == "Rejected") {
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
                alert("Please Enter Email and Password")
            }
        }
    });
    console.log("error", errors);

    useEffect(() => {
        if (isAuthenticated) {
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500)
            localStorage.setItem('token', JSON.stringify(userToken));
        }
    }, [isAuthenticated])


    return (
        <>
            <div className='account-page'>
                <div className="main-wrapper">
                    <div className="account-content">
                        <div className="login-wrapper account-bg">
                            <div className="login-content">
                                <form onSubmit={handleSubmit}>
                                    <div className="login-user-info">
                                        <div className="login-logo">
                                            <img src="images/logo.svg" className="img-fluid" alt="Logo" />
                                        </div>
                                        <div className="login-heading">
                                            <h4>Sign In</h4>
                                            <p>Access the CRMS panel using your email and passcode.</p>
                                        </div>
                                        <div >
                                            {successMsg == "" ? (
                                                null
                                            ) : <div className="p-2 text-center bg-success text-light"> {successMsg}</div>}
                                             {error == "" ? (
                                                null
                                            ) : <div className="p-2 text-center bg-danger text-danger">{error}</div>}
                                        </div>
                                        <div className="form-wrap">
                                            <label className="col-form-label" htmlFor='email'>Email Address</label>
                                            <div className="form-wrap-icon">
                                                <input type="email"
                                                    className={errors.email && touched.email ? (
                                                        "form-control error-border"
                                                    ) : "form-control "}
                                                    name='email'  autoComplete='off'
                                                    id='email'
                                                    value={values.email}
                                                    onChange={handleChange} onBlur={handleBlur} />
                                                <i className="ti ti-mail"></i>
                                            </div>
                                            {errors.email && touched.email ? (
                                                <span className="text-danger">* {errors.email}</span>
                                            ) : null}
                                           
                                        </div>
                                        <div className="form-wrap">
                                            <label className="col-form-label" htmlFor='password'>Password</label>
                                            <div className="pass-group">
                                                <input type="password"
                                                    className={errors.password && touched.password ? (
                                                        "pass-input form-control error-border"
                                                    ) : "pass-input form-control "}
                                                    name='password'
                                                    autoComplete='off'          id='password'
                                                    value={values.password}
                                                    onChange={handleChange} onBlur={handleBlur} />
                                                <span className="ti toggle-password ti-eye-off"></span>
                                            </div>
                                            {errors.password && touched.password ? (
                                                <span className="text-danger">* {errors.password}</span>
                                            ) : null}
                                        </div>
                                        <div className="form-wrap form-wrap-checkbox">
                                            <div className="custom-control custom-checkbox">
                                                <label className="check">
                                                    <input type="checkbox" />
                                                    <span className="box" 
                                                    ></span> Remember Me
                                                </label>
                                            </div>
                                            <div className="text-end">
                                                <Link to="/forgotpassword" className="forgot-link">Forgot Password?</Link>
                                            </div>
                                        </div>
                                        <div className="form-wrap">
                                            <button type="submit" disabled={disable} className="btn btn-primary">Sign In</button>
                                        </div>
                                        <div className="login-form">
                                            <h6>New on our platform?<Link to="/signup" className="hover-a"> Create an account</Link>
                                            </h6>
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

export default Login;