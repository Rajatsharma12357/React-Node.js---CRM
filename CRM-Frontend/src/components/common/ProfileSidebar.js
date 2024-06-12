import React from 'react'
import { Link } from 'react-router-dom'

const ProfileSidebar = () => {
    return (
        <>
            <div className="col-xl-3 col-lg-12 theiaStickySidebar">
                <div className="card">
                    <div className="card-body">
                        <div className="settings-sidebar">
                            <h4>General Settings</h4>
                            <ul>
                                <li>
                                    <Link to="/profile" className="active">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/security">Security</Link>
                                </li>
                                <li>
                                    <Link to="/notifications">Notifications</Link>
                                </li>
                                <li>
                                    <Link to="/connected-apps">Connected Apps</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileSidebar