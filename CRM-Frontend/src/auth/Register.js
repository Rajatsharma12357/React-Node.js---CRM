import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { handleRegister } from '../store/slices/authSlice';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/RegisterSchema';

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChecked: false
}
const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.auth);
    const [disable, setDisable] = useState(false);
    const inputRef = useRef(null);
    const { isAuthenticated, userToken } = data;
    const [emailError, setEmailError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const { values, handleBlur, touched, handleChange, errors, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: async (values, action) => {
            if (values?.isChecked) {
                setSuccessMsg("");
                setDisable(true);
                try {
                    const response = await dispatch(handleRegister(values));
                    console.log("response => ", response);
                    if (response?.payload?.status === 'success') {
                        action.resetForm();
                        setDisable(false);
                        setEmailError("");
                        setSuccessMsg(response.payload.message);
                        setTimeout(() => {
                            navigate('/signin');
                        }, 2000);
                    }
                    if (response?.error?.message === "Rejected") {
                        console.log(response?.payload);
                        setEmailError(response?.payload);
                        setSuccessMsg("")
                    }
                    setDisable(false);
                } catch (error) {
                    console.log("error: " + error, error.message);
                    setDisable(false);
                }
            } else {
                alert("Please Agree to terms & condition!")
            }
        }
    });
    console.log("error", errors)
    useEffect(() => {
        if (isAuthenticated) {
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }
    }, []);

    return (
        <>
            <div className='account-page'>
                <div className="main-wrapper">
                    <div className="account-content">
                        <div className="login-wrapper account-bg register-bg">
                            <div className="login-content">
                                <form onSubmit={handleSubmit}>
                                    <div className="login-user-info">
                                        <div className="login-logo">
                                            <img src="images/logo.svg" className="img-fluid" alt="Logo" />
                                        </div>
                                        <div className="login-heading">
                                            <h4>Register</h4>
                                            <span>Create new CRMS account</span>
                                        </div>
                                        <div >
                                            {successMsg === "" ? (
                                                null
                                            ) : <div className="p-2 text-center bg-success text-light"> {successMsg}</div>}
                                        </div>
                                        <div className="form-wrap">
                                            <label className="col-form-label" htmlFor='firstName'>First Name</label>
                                            <div className="form-wrap-icon">
                                                <input type="text"
                                                    className={errors.firstName && touched.firstName ? (
                                                        "form-control error-border"
                                                    ) : "form-control "}
                                                    name="firstName"
                                                    id='firstName'
                                                    autoComplete='off'
                                                    value={values.firstName}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                />
                                                <i className="ti ti-user"></i>
                                            </div>
                                            {errors.firstName && touched.firstName ? (
                                                <span className="text-danger">* {errors.firstName} *</span>
                                            ) : null}
                                        </div>
                                        <div className="form-wrap">
                                            <label className="col-form-label" htmlFor='lastName'>Last Name</label>
                                            <div className="form-wrap-icon">
                                                <input type="text"
                                                    className={errors.lastName && touched.lastName ? (
                                                        "form-control error-border"
                                                    ) : "form-control "}
                                                    name="lastName"
                                                    autoComplete='off'
                                                    id='lastName'
                                                    value={values.lastName}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                />
                                                <i className="ti ti-user"></i>
                                            </div>
                                            {errors.lastName && touched.lastName ? (
                                                <span className="text-danger">* {errors.lastName} *</span>
                                            ) : null}
                                        </div>

                                        <div className="form-wrap">
                                            <label className="col-form-label" htmlFor='email'>Email Address</label>
                                            <div className="form-wrap-icon">
                                                <input type="text" 
                                                className={errors.email && touched.email ? (
                                                    "form-control error-border"
                                                ) : "form-control "}
                                                    name="email"
                                                    autoComplete='off'
                                                    id='email'
                                                    value={values.email}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                />
                                                <i className="ti ti-mail"></i>
                                            </div>
                                            {errors.email && touched.email ? (
                                                <span className="text-danger">* {errors.email} *</span>
                                            ) : null}
                                            {emailError === "" ? (
                                                null
                                            ) : <span className="text-danger">* {emailError}*</span>}
                                        </div>
                                        <div className="form-wrap">
                                            <label className="col-form-label" htmlFor='password'>Password</label>
                                            <div className="pass-group">
                                                <input type="password"
                                                    className={errors.password && touched.password ? (
                                                        "pass-input form-control error-border"
                                                    ) : "pass-input form-control "}
                                                    name='password'
                                                    autoComplete='off'
                                                    id='password'
                                                    value={values.password}
                                                    onChange={handleChange} onBlur={handleBlur} />
                                                <span className="ti toggle-password ti-eye-off"></span>
                                            </div>
                                            {errors.password && touched.password ? (
                                                <span className="text-danger">* {errors.password}</span>
                                            ) : null }
                                        </div>
                                        <div className="form-wrap">
                                            <label className="col-form-label" htmlFor='confirmPassword'>Confirm Password</label>
                                            <div className="pass-group">
                                                <input type="password"
                                                    name="confirmPassword"
                                                    autoComplete='off'
                                                    id='confirmPassword'
                                                    className={errors.confirmPassword && touched.confirmPassword ? (
                                                        "pass-input form-control error-border"
                                                    ) : "pass-input form-control "}
                                                    value={values.confirmPassword}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                />
                                                <span className="ti toggle-passwords ti-eye-off"></span>
                                            </div>
                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                <span className="text-danger">*{errors.confirmPassword}*</span>
                                            ) : null}
                                        </div>
                                        <div className="form-wrap form-wrap-checkbox">
                                            <div className={errors.isChecked && touched.isChecked ? (
                                                "custom-control custom-checkbox error-border"
                                            ) : "custom-control custom-checkbox "}
                                            >
                                                <label htmlFor='isChecked' className="check">
                                                    <input type="checkbox" name='isChecked'
                                                        id='isChecked'
                                                        checked={values.isChecked} value={values.isChecked}
                                                        onChange={handleChange} onBlur={handleBlur} />
                                                    <span className="box"></span>
                                                    I agree to the <Link to="#" className="forgot-link ms-1">Terms &
                                                        Privacy</Link>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-wrap">
                                            <button type="submit" disabled={disable} className="btn btn-primary">Sign Up</button>
                                        </div>
                                        <div className="login-form">
                                            <h6>Already have an account?<Link to="/signin" className="hover-a"> Sign In Instead</Link>
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
                                                <span>Copyright &copy;2024 - CRMS</span>
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

export default Register;