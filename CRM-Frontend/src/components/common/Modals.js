import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleChangePassword, handleDeleteUser, handleVerifyOtp } from '../../store/slices/profileSlice';
import { handleLoadUser, handleLogOut } from '../../store/slices/authSlice';
import { useFormik } from 'formik';
import { ChangePasswordSchema } from '../../schemas/ChangePasswordSchema';

const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
}
const Modals = () => {
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = useState('');
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [disable, setDisable] = useState(false);
    const ModalRef = useRef(null);
    const ChangePasswordModalRef = useRef(null);
    const VerifyEmailModalRef = useRef(null);
    const TwoFactorModalRef = useRef(null);

    const handleDelete = async () => {
        const id = user.auth?._id;
        setDisable(true)
        setError("")
        try {
            if (id) {
                const response = await dispatch(handleDeleteUser({ id }));
                console.log("response => ", response)
                if (response.status = "success") {
                    setSuccessMsg(response.payload.message);
                    setTimeout(() => {
                        dispatch(handleLogOut())
                        const modalElement = ModalRef.current;
                        if (modalElement) {
                            setDisable(false)
                            const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                            if (modalInstance) {
                                modalInstance.hide();
                            }
                        }
                        navigate('/')
                    }, 2000)
                }
                if (response?.error?.message === "Rejected") {
                    console.log(response?.payload);
                    setError(response?.payload);
                    setSuccessMsg("")
                    setDisable(false)
                    ModalRef(null)
                }
            }

        } catch (error) {
            console.log("error: " + error, error.message);
            setDisable(false)
        }
    }

    const { values, handleBlur, touched, handleChange, errors, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ChangePasswordSchema,
        onSubmit: async (values, action) => {
            console.log("values ", values);
            const id = user.auth?._id;
            setError()
            if (id) {
                setSuccessMsg("");
                try {
                    const response = await dispatch(handleChangePassword({ id, ...values }));
                    console.log("response => ", response);
                    if (response?.payload?.status === 'success') {
                        action.resetForm();

                        setError("");
                        setSuccessMsg(response.payload.message);

                        setTimeout(() => {
                            dispatch(handleLogOut())
                            const modalElement = ModalRef.current;
                            if (modalElement) {
                                const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                                if (modalInstance) {
                                    modalInstance.hide();
                                }
                            }
                            navigate('/signin');
                        }, 2000)
                    }
                    if (response?.error?.message === "Rejected") {
                        console.log(response?.payload);
                        setSuccessMsg("")
                        setError(response?.payload);
                        ModalRef(null)
                    }
                } catch (error) {
                    console.log("error: " + error, error.message);
                    setError(error?.payload);
                    setSuccessMsg("")
                    ModalRef(null)
                }
            } else {
                alert("Please fill out all the Fields!")
            }
        }
    });
    // console.log("values => ", values)


    const handleOtp = async (e) => {
        const _id = user?.auth?._id
        e.preventDefault();
        try {
            const email = user?.auth?.email;
            const res = await handleVerifyOtp({ email: email,otp:otp });
            // console.log("res => ", res);
            if (res?.status === 'success') {
                setError("");
                setSuccessMsg(res.message);

                setTimeout(() => {
                    setOtp("")
                    const modalElement = VerifyEmailModalRef.current;
                    if (modalElement) {
                        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                        if (modalInstance) {
                            modalInstance.hide();
                        }
                    }
                    dispatch(handleLoadUser({ _id }));
                    window.location.reload();
                }, 2000)
            }
            if (res.status === 'failed') {
                console.log("error: " + error, error.message);
                setError(error?.message);
                setSuccessMsg("");
            }
        } catch (error) {
            console.log("error: " + error);
            setError(error?.payload);
            setSuccessMsg("");
        }

    }

    useEffect(() => {

    }, [])
    return (
        <>
            <div className="modal custom-modal fade" id="change_password" ref={ChangePasswordModalRef} role="dialog" tabIndex="9">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {error === "" ? (
                            null
                        ) : <span className="text-danger">*{error}</span>}
                        {successMsg === "" ? (
                            null
                        ) : <div className="p-2 text-center bg-success text-light"> {successMsg}</div>}
                        <div className="modal-header border-0 m-0 justify-content-end">
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-wrap">
                                    <label className="col-form-label">Current Password <span
                                        className="text-danger">*</span></label>
                                    <input type="password"
                                        className={errors.oldPassword && touched.oldPassword ? (
                                            "pass-input form-control error-border"
                                        ) : "pass-input form-control "}
                                        name='oldPassword'
                                        autoComplete='off'
                                        id='oldPassword'
                                        value={values.oldPassword}
                                        onChange={handleChange} onBlur={handleBlur} />
                                    {errors.oldPassword && touched.oldPassword ? (
                                        <span className="text-danger">* {errors.oldPassword} *</span>
                                    ) : null }
                                </div>
                                <div className="form-wrap">
                                    <label className="col-form-label">New Password <span className="text-danger">*</span></label>
                                    <input type="password"
                                        className={errors.password && touched.password ? (
                                            "pass-input form-control error-border"
                                        ) : "pass-input form-control "}
                                        name='password'
                                        autoComplete='off'
                                        id='password'
                                        value={values.password}
                                        onChange={handleChange} onBlur={handleBlur} />
                                    {errors.password && touched.password ? (
                                        <span className="text-danger">* {errors.password}</span>
                                    ) : null}
                                </div>
                                <div className="form-wrap">
                                    <label className="col-form-label">Confirm Password <span
                                        className="text-danger">*</span></label>
                                    <input type="password" className={errors.confirmPassword && touched.confirmPassword ? (
                                        "pass-input form-control error-border"
                                    ) : "pass-input form-control "}
                                        name='confirmPassword'
                                        autoComplete='off'
                                        id='confirmPassword'
                                        value={values.confirmPassword}
                                        onChange={handleChange} onBlur={handleBlur} />
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                        <span className="text-danger">*{errors.confirmPassword}</span>
                                    ) : null}
                                </div>
                                <div className="modal-btn">
                                    <Link to="#" className="btn btn-light" data-bs-dismiss="modal">Cancel</Link>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal custom-modal fade" id="VerifyEmail" ref={VerifyEmailModalRef} role="dialog" tabIndex="9">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {error === "" ? (
                            null
                        ) : <span className="text-danger">*{error}</span>}
                        {successMsg === "" ? (
                            null
                        ) : <div className="p-2 text-center bg-success text-light"> {successMsg}</div>}
                        <div className="modal-header border-0 m-0 justify-content-end">
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleOtp}>
                                <div className="form-wrap">
                                    <label className="col-form-label text-center" htmlFor="verifyEmail">Verify your Email <span
                                        className="text-danger">*</span></label>
                                    <input
                                        type="number"
                                        onInput={(e) => {
                                            if (e.target.value.length > e.target.maxLength) {
                                                e.target.value = e.target.value.slice(0, e.target.maxLength);
                                            }
                                        }} maxLength="6"
                                        pattern="/^-?\d+\.?\d*$/"
                                        className="pass-input form-control"
                                        placeholder='Please enter the otp which has been sent into your mail'
                                        id='verifyEmail'
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)} />
                                </div>
                                <div className="modal-btn">
                                    <Link to="#" className="btn btn-light" data-bs-dismiss="modal">Cancel</Link>
                                    <button type="submit" className="btn buttonload btn-success">
                                        {/* <i className="fa fa-refresh fa-spin"></i>  */}
                                        Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal custom-modal fade" ref={ModalRef} id="delete_account" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {error === "" ? (
                            null
                        ) : <span className="text-danger">* {error}*</span>}
                        {successMsg === "" ? (
                            null
                        ) : <div className="p-2 text-center bg-success text-light"> {successMsg}</div>}

                        <div className="modal-header border-0 m-0 justify-content-end">
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="success-message text-center">
                                <div className="success-popup-icon">
                                    <i className="ti ti-trash-x"></i>
                                </div>
                                <h3>Delete Account</h3>
                                <p className="del-info">Are you sure want to delete?</p>
                                <div className="col-lg-12 text-center modal-btn">
                                    <Link to="#" className="btn btn-light" data-bs-dismiss="modal">Cancel</Link>
                                    <button onClick={handleDelete} disabled={disable} className="btn btn-danger"
                                    // data-bs-dismiss="modal" aria-label="Close"
                                    >Yes, Delete it</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal custom-modal fade" ref={TwoFactorModalRef} id="delete_two_factor" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0 m-0 justify-content-end">
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="success-message text-center">
                                <div className="success-popup-icon">
                                    <i className="ti ti-trash-x"></i>
                                </div>
                                <h3>Delete Two Factor</h3>
                                <p className="del-info">Are you sure want to delete?</p>
                                <div className="col-lg-12 text-center modal-btn">
                                    <Link to="#" className="btn btn-light" data-bs-dismiss="modal">Cancel</Link>
                                    <button className="btn btn-danger">Yes, Delete it</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modals