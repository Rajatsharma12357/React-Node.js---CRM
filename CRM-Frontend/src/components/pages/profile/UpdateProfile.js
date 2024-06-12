"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/Sidebar';
import Header from '../../common/Header'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleUpdateProfile } from '../../../store/slices/profileSlice';
import { handleLoadUser } from '../../../store/slices/authSlice';
import { Country, State, City } from 'country-state-city';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import ProfileSidebar from '../../common/ProfileSidebar';
import ProfileHeader from '../../common/ProfileHeader';

const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    number: "",
    userAddress: {
        address: "",
        country: "",
        state: "",
        city: "",
    },
    postalCode: ""
}

// eslint-disable-next-line no-undef
const UpdateProfile = () => {
    const user = useSelector((state) => state.auth);

    const { isUpdated, userInfo } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated, userToken } = user;
    const [disable, setDisable] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const [successMsg, setSuccessMsg] = useState('');
    const [error, setError] = useState("");
    const [imageError, setImageError] = useState("");

    const { values, handleBlur, touched, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        onSubmit: async (values, action) => {
            console.log("values => ", values);
            // alert(JSON.stringify(values, null, 2));
            setDisable(true)
            setError('');
            // setSuccessMsg('');
            const _id = user?.auth?._id
            try {
                const response = await dispatch(handleUpdateProfile({ _id, ...values }));
                if (response?.payload?.status === 'success') {
                    action.resetForm();
                    setSuccessMsg(response.payload.message);
                    dispatch(handleLoadUser({ _id }));
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2000);
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
            } catch (error) {
                console.log("error: " + error, error.message);
                setDisable(false);
            }
        }
    });
    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (file) {
            // Get the file extension
            const extension = file.name.split('.').pop().toLowerCase();

            // Check if the file extension is allowed
            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                setImageError('Please upload only .jpg and .png images.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result;
                setImageSrc(imageData);
                localStorage.setItem('savedImage', imageData);
            };
            reader.readAsDataURL(file);
            setImageError("");
        }
    };

    useEffect(() => {
        if (user && user.auth) {
            setFieldValue("firstName", user.auth?.firstName);
            setFieldValue("lastName", user.auth?.lastName);
            setFieldValue("userName", user.auth?.userName);
            setFieldValue("number", user.auth?.number);
            setFieldValue("email", user.auth?.email);
            setFieldValue("userAddress.address", user.auth?.userAddress?.address);
            setFieldValue("userAddress.country", user.auth?.userAddress?.country);
            setFieldValue("userAddress.state", user.auth?.userAddress?.state);
            setFieldValue("userAddress.city", user.auth?.userAddress?.city);
            setFieldValue("postalCode", user.auth?.postalCode);
        }

        const savedImage = localStorage.getItem('savedImage');
        if (savedImage) {
            setImageSrc(savedImage);
        }

    }, [user]);

    const countries = Country.getAllCountries();
    const states = values?.userAddress?.country
        ? State.getStatesOfCountry(values?.userAddress?.country)
        : [];
    const cities = values?.userAddress?.state
        ? City.getCitiesOfState(values?.userAddress?.country, values?.userAddress?.state)
        : [];

    return (
        <>
            <div className="main-wrapper">
                <div className="header">
                    <Header />
                    <Sidebar />
                    <div className="page-wrapper">
                        <div className="content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-header">
                                        <div className="row align-items-center">
                                            <div className="col-sm-4">
                                                <h4 className="page-title">Settings</h4>
                                            </div>
                                            <div className="col-sm-8 text-sm-end">
                                                <div className="head-icons">
                                                    <Link to="profile.html" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Refresh"><i className="ti ti-refresh-dot"></i></Link>
                                                    <Link to="/" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header"><i className="ti ti-chevrons-up"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ProfileHeader/>

                                    <div className="row">

                                        <ProfileSidebar />
                                        <div className="col-xl-9 col-lg-12">

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="settings-header">
                                                        <h4>Profile Settings</h4>
                                                    </div>
                                                    <div className="settings-form">
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="settings-sub-header">
                                                                <h6>Employee Information</h6>
                                                                <p>Provide the information below</p>
                                                            </div>
                                                            {error === "" ? (
                                                                null
                                                            ) : <span className="text-danger">* {error}*</span>}
                                                            {successMsg === "" ? (
                                                                null
                                                            ) : <div className="p-2 text-center bg-success text-light"> {successMsg}</div>}

                                                            <div className="form-wrap">
                                                                <div className="profile-upload">
                                                                    <div className="profile-upload-img">
                                                                        <span><i className="ti ti-photo"></i></span>
                                                                        <img id="ImgPreview"
                                                                            src={imageSrc}
                                                                            alt="Profile Image" />
                                                                        <button type="button" id="removeImage1" className="profile-remove">
                                                                            <i className="feather-x"></i>
                                                                        </button>
                                                                    </div>

                                                                    <div className="profile-upload-content">
                                                                        <label className="profile-upload-btn">
                                                                            <i className="ti ti-file-broken"></i> Upload File
                                                                            <input type="file" id="imag"
                                                                                // accept="image/png, image/jpeg image/jpg"
                                                                                className="input-img" onChange={handleImageUpload} />
                                                                        </label>
                                                                        <p>JPG, GIF or PNG. Max size of 800K</p>
                                                                        {imageError === "" ? (
                                                                            null
                                                                        ) : <span className="text-danger">* {imageError}*</span>}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="profile-details">
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <div className="form-wrap">
                                                                            <label className="col-form-label">
                                                                                First Name <span className="text-danger">*</span>
                                                                            </label>
                                                                            <input type="text" className="form-control"
                                                                                autoComplete='off'
                                                                                name='firstName'
                                                                                value={values.firstName}
                                                                                onChange={handleChange} onBlur={handleBlur}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="form-wrap">
                                                                            <label className="col-form-label">
                                                                                Last Name <span className="text-danger">*</span>
                                                                            </label>
                                                                            <input type="text"
                                                                                className="form-control"
                                                                                name='lastName'
                                                                                autoComplete='off'
                                                                                value={values?.lastName}
                                                                                onChange={handleChange} onBlur={handleBlur}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="form-wrap">
                                                                            <label className="col-form-label">
                                                                                User Name <span className="text-danger">*</span>
                                                                            </label>
                                                                            <input type="text" name='email' className="form-control"
                                                                                autoComplete='off'
                                                                                value={values?.email}
                                                                                onChange={handleChange} onBlur={handleBlur}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="form-wrap">
                                                                            <label className="col-form-label">
                                                                                Phone Number <span className="text-danger">*</span>
                                                                            </label>
                                                                            <input type="text" name='number' className="form-control"
                                                                                autoComplete='off'
                                                                                value={values?.number}
                                                                                onChange={handleChange} onBlur={handleBlur}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="form-wrap">
                                                                            <label className="col-form-label">
                                                                                Email <span className="text-danger">*</span>
                                                                            </label>
                                                                            <input className="form-control"
                                                                                autoComplete='off'
                                                                                value={values?.email}
                                                                                onChange={handleChange} onBlur={handleBlur}
                                                                                id='email'
                                                                                name="email" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="profile-address">
                                                                <div className="settings-sub-header">
                                                                    <h6>Address</h6>
                                                                    <p>Please enter the address details</p>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="form-wrap">
                                                                            <label className="col-form-label">
                                                                                Address <span className="text-danger">*</span>
                                                                            </label>
                                                                            <input type="text" className="form-control"
                                                                                name='userAddress.address'
                                                                                autoComplete='off'
                                                                                id='userAddress.address'
                                                                                value={values?.userAddress?.address}
                                                                                onChange={handleChange} onBlur={handleBlur}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-3 col-md-6">
                                                                        <div className="form-wrap">
                                                                            <label className="col-form-label">
                                                                                Country <span className="text-danger">*</span>
                                                                            </label>
                                                                            <div className="select-drop w-100">
                                                                                <select className="form-select"
                                                                                    id="userAddress.country"
                                                                                    name="userAddress.country"
                                                                                    value={values?.userAddress?.country}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}       >
                                                                                    <option value="">--Select Country--</option>
                                                                                    {
                                                                                        countries?.map((val, idx) => (
                                                                                            <option key={idx} value={val?.isoCode}>{val?.name}</option>
                                                                                        ))
                                                                                    }
                                                                                    {/* {touched.country && errors.country ? (
                                                                                        <div>{errors?.country}</div>
                                                                                    ) : null} */}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-6">
                                                                        <div className="form-wrap">
                                                                            <label className="col-form-label">
                                                                                State / Province <span className="text-danger">*</span>
                                                                            </label>
                                                                            <div className="select-drop w-100">
                                                                                <select className="form-select"
                                                                                    id="userAddress.state"
                                                                                    name="userAddress.state"
                                                                                    value={values?.userAddress?.state}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                // disabled={values?.userAddress?.country} 
                                                                                >
                                                                                    <option value="">--Select State--</option>
                                                                                    {
                                                                                        states?.map((val, idx) => (
                                                                                            <option key={idx} value={val?.isoCode}>{val?.name}</option>
                                                                                        ))
                                                                                    }
                                                                                </select>
                                                                                {/* {touched.state && errors.state ? (
                                                                                    <div>{errors.state}</div>
                                                                                ) : null} */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-6">
                                                                        <div className="form-wrap">
                                                                            <label className="col-form-label">
                                                                                City <span className="text-danger">*</span>
                                                                            </label>
                                                                            <div className="select-drop w-100">
                                                                                <select className="form-select"
                                                                                    id='userAddress.city'
                                                                                    name='userAddress.city'
                                                                                    value={values?.userAddress?.city}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                // disabled={values?.userAddress?.cities} 
                                                                                >
                                                                                    <option value="">-- Select City--</option>
                                                                                    {
                                                                                        cities?.map((val, idx) => (
                                                                                            <option key={idx} value={val?.isoCode}>{val?.name}</option>
                                                                                        ))
                                                                                    }
                                                                                </select>
                                                                                {/* {touched.city && errors.city ? (
                                                                                    <div>{errors.city}</div>
                                                                                ) : null} */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-6">
                                                                        <div className="form-wrap">
                                                                            <label className="col-form-label">
                                                                                Postal Code <span className="text-danger">*</span>
                                                                            </label>
                                                                            <input type="text"
                                                                                name='postalCode'
                                                                                autoComplete='off'
                                                                                id='postalCode'
                                                                                value={values?.postalCode}
                                                                                onChange={handleChange} onBlur={handleBlur}
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="submit-button">
                                                                <Link to="/dashboard" className="btn btn-light">Cancel</Link>
                                                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default UpdateProfile;