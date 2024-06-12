import React from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import ProfileSidebar from '../../common/ProfileSidebar'
import { Link } from 'react-router-dom'
import ProfileHeader from '../../common/ProfileHeader'

const ConnectedApps = () => {

    
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
                                                <Link to="/connected-apps" data-bs-toggle="tooltip" data-bs-placement="top"
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
                                    <ProfileSidebar />
                                    <div className="col-xl-9 col-lg-12">

                                        <div className="card">
                                            <div className="card-body pb-0">
                                                <div className="settings-header">
                                                    <h4>Connected Apps</h4>
                                                </div>
                                                <div className="row">

                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="integration-grid">
                                                            <div className="integration-calendar">
                                                                <img src="images/integration-01.webp" className="iconImg" alt="Icon" />
                                                                <div className="connect-btn">
                                                                    <Link to="/"
                                                                        className="connected">Connected</Link>
                                                                </div>
                                                            </div>
                                                            <div className="integration-content">
                                                                <p>Google Calendar</p>
                                                                <div className="status-toggle">
                                                                    <input id="google_calendar" className="check" type="checkbox"
                                                                        checked />
                                                                    <label htmlFor="google_calendar"
                                                                        className="checktoggle">checkbox</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="integration-grid">
                                                            <div className="integration-calendar">
                                                                <img src="images/integration-02.webp" className="iconImg" alt="Icon" />
                                                                <div className="connect-btn">
                                                                    <Link to="/">Connect</Link>
                                                                </div>
                                                            </div>
                                                            <div className="integration-content">
                                                                <p>Figma</p>
                                                                <div className="status-toggle">
                                                                    <input id="figma" className="check" type="checkbox" checked />
                                                                    <label htmlFor="figma" className="checktoggle">checkbox</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="integration-grid">
                                                            <div className="integration-calendar">
                                                                <img src="images/integration-03.webp" className="iconImg" alt="Icon" />
                                                                <div className="connect-btn">
                                                                    <Link to="/"
                                                                        className="connected">Connected</Link>
                                                                </div>
                                                            </div>
                                                            <div className="integration-content">
                                                                <p>Dropbox</p>
                                                                <div className="status-toggle">
                                                                    <input id="dropbox" className="check" type="checkbox" checked />
                                                                    <label htmlFor="dropbox" className="checktoggle">checkbox</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="integration-grid">
                                                            <div className="integration-calendar">
                                                                <img src="images/integration-04.webp" className="iconImg" alt="Icon" />
                                                                <div className="connect-btn">
                                                                    <Link to="/">Connect</Link>
                                                                </div>
                                                            </div>
                                                            <div className="integration-content">
                                                                <p>Slack</p>
                                                                <div className="status-toggle">
                                                                    <input id="slack" className="check" type="checkbox" checked />
                                                                    <label htmlFor="slack" className="checktoggle">checkbox</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="integration-grid">
                                                            <div className="integration-calendar">
                                                                <img src="images/integration-05.webp" className="iconImg" alt="Icon" />
                                                                <div className="connect-btn">
                                                                    <Link to="/"
                                                                        className="connected">Connected</Link>
                                                                </div>
                                                            </div>
                                                            <div className="integration-content">
                                                                <p>Gmail</p>
                                                                <div className="status-toggle">
                                                                    <input id="gmail" className="check" type="checkbox" checked />
                                                                    <label htmlFor="gmail" className="checktoggle">checkbox</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="integration-grid">
                                                            <div className="integration-calendar">
                                                                <img src="images/integration-06.webp" className="iconImg" alt="Icon" />
                                                                <div className="connect-btn">
                                                                    <Link to="/">Connect</Link>
                                                                </div>
                                                            </div>
                                                            <div className="integration-content">
                                                                <p>Github</p>
                                                                <div className="status-toggle">
                                                                    <input id="github" className="check" type="checkbox" checked />
                                                                    <label htmlFor="github" className="checktoggle">checkbox</label>
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

export default ConnectedApps