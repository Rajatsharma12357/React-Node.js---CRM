import React from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import { Link } from 'react-router-dom'
import ProfileSidebar from '../../common/ProfileSidebar'
import ProfileHeader from '../../common/ProfileHeader'

const Notifications = () => {
    return (
        <>
            <div className="main-wrapper">
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
                                                <Link to="/notifications" data-bs-toggle="tooltip" data-bs-placement="top"
                                                    data-bs-original-title="Refresh"><i className="ti ti-refresh-dot"></i></Link>
                                                <Link to="/" data-bs-toggle="tooltip" data-bs-placement="top"
                                                    data-bs-original-title="Collapse" id="collapse-header"><i
                                                        className="ti ti-chevrons-up"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <ProfileHeader />

                                <div className="row">
                                    <ProfileSidebar/>
                                    <div className="col-xl-9 col-lg-12">

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="settings-header">
                                                    <h4>Security Settings</h4>
                                                </div>
                                                <div className="settings-form">

                                                    <div className="settings-sub-header">
                                                        <h6>General Notifications</h6>
                                                        <p>Select notifications </p>
                                                    </div>
                                                    <div className="notification-wrap">
                                                        <ul>
                                                            <li>
                                                                <div className="security-checkbox">
                                                                    <label className="checkboxs">
                                                                        <input type="checkbox" checked />
                                                                            <span className="checkmarks"></span>
                                                                            Mobile Push Notifications
                                                                    </label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="security-checkbox">
                                                                    <label className="checkboxs">
                                                                        <input type="checkbox" checked />
                                                                            <span className="checkmarks"></span>
                                                                            Desktop Notifications
                                                                    </label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="security-checkbox">
                                                                    <label className="checkboxs">
                                                                        <input type="checkbox" checked />
                                                                            <span className="checkmarks"></span>
                                                                            Email Notifications
                                                                    </label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="security-checkbox">
                                                                    <label className="checkboxs">
                                                                        <input type="checkbox" checked />
                                                                            <span className="checkmarks"></span>
                                                                            SMS Notifications
                                                                    </label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>


                                                    <div className="settings-sub-header">
                                                        <h6>Custom Notifications</h6>
                                                        <p>Select when you will be notified when the following changes occur
                                                        </p>
                                                    </div>
                                                    <div className="table-responsive notificaion-table">
                                                        <table className="table table-borderless">
                                                            <thead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Push</th>
                                                                    <th>SMS</th>
                                                                    <th>Email</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="custom-table-data">
                                                                <tr>
                                                                    <td>
                                                                        Legendary
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="users4" className="check"
                                                                                checked/>
                                                                                <label htmlFor="users4" className="checktoggle"> </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="users5" className="check"
                                                                                checked/>
                                                                                <label htmlFor="users5" className="checktoggle"> </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="users6" className="check"
                                                                                checked/>
                                                                                <label htmlFor="users6" className="checktoggle"> </label>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Transaction
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user5" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user5" className="checktoggle"> </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user6" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user6" className="checktoggle"> </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user7" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user7" className="checktoggle"> </label>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Email Verification
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user8" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user8" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user9" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user9" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user10" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user10" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        OTP
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user11" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user11" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user12" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user12" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user13" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user13" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Activity
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user14" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user14" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user15" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user15" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user16" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user16" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Account
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user17" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user17" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user18" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user18" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="status-toggle modal-status">
                                                                            <input type="checkbox" id="user19" className="check"
                                                                                checked/>
                                                                                <label htmlFor="user19" className="checktoggle"></label>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
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

export default Notifications