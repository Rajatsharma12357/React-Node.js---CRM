import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "../schemas/ResetPasswordSchema";
import { useDispatch } from "react-redux";
import { handleLogOut, handleResetPassword } from "../store/slices/authSlice";

const initialValues = {
    password: "",
    confirmPassword: "",
}

const Changepass = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const [disable, setDisable] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [error, setError] = useState('');

    const { values, handleBlur, touched, handleChange, errors, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ResetPasswordSchema,
        onSubmit: async (values, action) => {
            // eslint-disable-next-line eqeqeq
            if (values?.password != '' && values?.confirmPassword != "") {
                setSuccessMsg("");
                setError("");
                setDisable(true);
                
                try {
                    const response = await dispatch(handleResetPassword({id, ...values}));
                    console.log("response => ", response);
                    if (response?.payload?.status === 'success') {
                        action.resetForm();
                        setError("");
                        console.log(response.payload.message)
                        setSuccessMsg(response.payload.message);
                        setDisable(false);
                        // await dispatch(handleLogOut())
                        setTimeout(() => {
                            navigate('/signin');
                        }, 2000);
                        setTimeout(() => {
                            window.location.reload()
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
                alert("Please Enter Your New Password ");
            }
        }
    });

    useEffect(() => { }, [])

    return (
        <>
            <div className="account-page">
                <div className="main-wrapper">
                    <div className="account-content">
                        <div className="login-wrapper account-bg ">
                            <div className="login-content">
                                <form onSubmit={handleSubmit}>
                                    <div className="login-user-info">
                                        <div className="login-logo">
                                            <img src="/images/logo.svg" className="img-fluid" alt="Logo" />
                                        </div>
                                        <div className="login-heading">
                                            <h4>Reset Password?</h4>
                                            <p>Enter New Password & Confirm Password to get inside</p>
                                        </div>
                                        {error === "" ? (
                                            null
                                        ) : <span className="text-danger">*{error}</span>}
                                        {successMsg === "" ? (
                                            null
                                        ) : <span className="text-success">{successMsg}</span>}
                                        <div className="form-wrap">
                                            <label className="col-form-label">Password</label>
                                            <div className="pass-group">
                                                <input type="password"
                                                    className={errors.password && touched.password ? (
                                                        "pass-input form-control error-border"
                                                    ) : "pass-input form-control "}
                                                    name='password'
                                                    autoComplete='off' id='password'
                                                    value={values.password}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                />
                                                <span className="ti toggle-password ti-eye-off"></span>
                                            </div>
                                            {errors.password && touched.password ? (
                                                <span className="text-danger">*{errors.password}</span>
                                            ) : null}
                                        </div>
                                        <div className="form-wrap">
                                            <label className="col-form-label">Confirm Password</label>
                                            <div className="pass-group">
                                                <input type="password"
                                                    className={errors.confirmPassword && touched.confirmPassword ? (
                                                        "pass-input form-control error-border"
                                                    ) : "pass-input form-control "}
                                                    name='confirmPassword'
                                                    autoComplete='off' id='confirmPassword'
                                                    value={values.confirmPassword}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                />
                                                <span className="ti toggle-passwords ti-eye-off"></span>
                                            </div>
                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                <span className="text-danger">*{errors.confirmPassword}</span>
                                            ) : null}
                                        </div>
                                        <div className="form-wrap">
                                            <button type="submit" className="btn btn-primary" disabled={disable}>Change Password</button>
                                        </div>
                                        <div className="login-form text-center">
                                            <h6>Return to <Link to="/signin" className="hover-a">Log In</Link></h6>
                                        </div>
                                        {/* <div className="login-social-link">
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
    );
};



export default Changepass;