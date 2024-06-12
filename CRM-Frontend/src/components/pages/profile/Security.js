"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/Sidebar';
import Header from '../../common/Header'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileSidebar from '../../common/ProfileSidebar';
import ProfileHeader from '../../common/ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { sendVerifyOtp } from '../../../store/slices/profileSlice';


const Security = () => {
    const user = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();
    const isVerified = Boolean(user?.auth?.verified);
    
    const handleVerify = async () => {
        const email = user?.auth?.email;
        try {
            const response = await sendVerifyOtp({ email: email });
            console.log("response => ", response);
        } catch (error) {
            console.log("error: " + error, error.message);
        }
    }
    useEffect(() => { }, [])


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
                                            <div className="col-8">
                                                <h4 className="page-title">Settings</h4>
                                            </div>
                                            <div className="col-4 text-end">
                                                <div className="head-icons">
                                                    <Link to="security.html" data-bs-toggle="tooltip" data-bs-placement="top"
                                                        data-bs-original-title="Refresh"><i className="ti ti-refresh-dot"></i></Link>
                                                    <Link to="/;" data-bs-toggle="tooltip" data-bs-placement="top"
                                                        data-bs-original-title="Collapse" id="collapse-header">
                                                        <i className="ti ti-chevrons-up"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <ProfileHeader />

                                    <div className="row">
                                        <ProfileSidebar />
                                        <div className="col-xl-9 col-lg-12">
                                            <div className="card">
                                                <div className="card-body pb-0">
                                                    <div className="settings-header">
                                                        <h4>Security Settings</h4>
                                                    </div>
                                                    <div className="settings-form">
                                                        <div className="row">
                                                            <div className="col-lg-4 col-md-6 d-flex">
                                                                <div className="security-grid flex-fill">
                                                                    <div className="security-header">
                                                                        <div className="security-heading">
                                                                            <h5>Password</h5>
                                                                        </div>
                                                                        <div className="security-content">
                                                                            <p>Last Changed 03 Jan 2023, 09:00 AM</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="security-btn security-btn-info">
                                                                        <Link to="/" className="btn btn-light"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#change_password">
                                                                            Change Password
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-6 d-flex">
                                                                <div className="security-grid flex-fill">
                                                                    <div className="security-header">
                                                                        <div className="security-heading">
                                                                            <h5>Phone Number Verification <i
                                                                                className="ti ti-square-rounded-check-filled text-success"></i>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="security-content">
                                                                            <p className="text-success-light">Verified Mobile Number :
                                                                                <span>+99264710583</span></p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="security-btn  security-btn-info">
                                                                        <Link to="/" className="btn btn-light"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#change_phone_number">Change</Link>
                                                                        <Link to="/"
                                                                            className="btn btn-remove">Remove</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-6 d-flex">
                                                                <div className="security-grid flex-fill">
                                                                    <div className="security-header">
                                                                        <div className="security-heading">
                                                                            <h5>Email Verification <i
                                                                                className="ti ti-square-rounded-check-filled text-success"></i>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="security-content">
                                                                            {isVerified ? (
                                                                                <p className="text-success-light">Verified Email : {user?.auth?.email} </p>
                                                                            ) : (<p className="text-danger">Not Verified Email : {user?.auth?.email}</p>)}
                                                                        </div>
                                                                    </div>
                                                                    <div className="security-btn security-btn-info">
                                                                        {isVerified ? (
                                                                            <button className="btn btn-light" disabled>Verified</button>
                                                                        ) : (
                                                                            <Link to="/" className="btn btn-light"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#VerifyEmail" onClick={handleVerify}>Verify</Link>
                                                                        )}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-6 d-flex">
                                                                <div className="security-grid flex-fill">
                                                                    <div className="security-header">
                                                                        <div className="security-heading">
                                                                            <h5>Delete Account</h5>
                                                                        </div>
                                                                        <div className="security-content">
                                                                            <p>Last Changed 13 Mar 2023, 02:40 PM</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="security-btn">
                                                                        <Link to="/" className="btn btn-primary"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#delete_account">Delete Account</Link>
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
                        </div>
                    </div>



                </div>
            </div>

        </>
    )
}
export default Security;