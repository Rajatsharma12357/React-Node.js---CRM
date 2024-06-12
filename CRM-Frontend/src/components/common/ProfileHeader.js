import React from 'react'
import { Link } from 'react-router-dom'

const ProfileHeader = () => {
    
    return (
        <>
            <div className="card settings-tab">
                <div className="card-body pb-0">
                    <div className="settings-menu">
                        <ul className="nav">
                            <li>
                                <Link to="profile.html" className="active">
                                    <i className="ti ti-settings-cog"></i> General Settings
                                </Link>
                            </li>
                            <li>
                                <Link to="company-settings.html">
                                    <i className="ti ti-world-cog"></i> Website Settings
                                </Link>
                            </li>
                            <li>
                                <Link to="invoice-settings.html">
                                    <i className="ti ti-apps"></i> App Settings
                                </Link>
                            </li>
                            <li>
                                <Link to="email-settings.html">
                                    <i className="ti ti-device-laptop"></i> System Settings
                                </Link>
                            </li>
                            <li>
                                <Link to="payment-gateways.html">
                                    <i className="ti ti-moneybag"></i> Financial Settings
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileHeader