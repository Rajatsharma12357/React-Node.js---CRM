import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogOut } from '../../store/slices/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);

    const handleLogout = () => {
        dispatch(handleLogOut())
        // setTimeout(() => {
            navigate('/');
        // }, 1500)
    }
    useEffect(() => {
        const savedImage = localStorage.getItem('savedImage');
        if (savedImage) {
            setImageSrc(savedImage);
        }
    }, [])

    return (
        <>
            <div className="header">
                <div className="header-left active">
                    <Link to="/" className="logo logo-normal">
                        <img src="images/logo2.jpg" alt="Logo" />
                        <img src="images/logo2.jpg" className="white-logo" alt="Logo" />
                    </Link>
                    <Link to="/" className="logo-small">
                        <img src="images/logo2.jpg" alt="Logo" />
                    </Link>
                    <button id="toggle_btn" className='border-0 bg-transparent'>
                        <i className="ti ti-arrow-bar-to-left"></i>
                    </button>
                </div>

                <Link id="mobile_btn" className="mobile_btn" to="#sidebar">
                    <span className="bar-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </Link>
                <div className="header-user">
                    <ul className="nav user-menu">

                        <li className="nav-item nav-search-inputs me-auto">
                            <div className="top-nav-search">
                                <Link to="/" className="responsive-search">
                                    <i className="fa fa-search"></i>
                                </Link>
                                <form action="#" className="dropdown">
                                    <div className="searchinputs" id="dropdownMenuClickable">
                                        <input type="text" placeholder="Search" />
                                        <div className="search-addon">
                                            <button type="submit"><i className="ti ti-command"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>


                        <li className="nav-item nav-list">
                            <ul className="nav">
                                <li className="dark-mode-list">
                                    <button id="dark-mode-toggle" className="dark-mode-toggle">
                                        <i className="ti ti-sun light-mode active"></i>
                                        <i className="ti ti-moon dark-mode"></i>
                                    </button>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link to="/" className="btn btn-header-list" data-bs-toggle="dropdown">
                                        <i className="ti ti-layout-grid-add"></i>
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-end menus-info">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ul className="menu-list">
                                                    <li>
                                                        <Link to="contacts.html">
                                                            <div className="menu-details">
                                                                <span className="menu-list-icon bg-violet">
                                                                    <i className="ti ti-user-up"></i>
                                                                </span>
                                                                <div className="menu-details-content">
                                                                    <p>Contacts</p>
                                                                    <span>Add New Contact</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="pipeline.html">
                                                            <div className="menu-details">
                                                                <span className="menu-list-icon bg-green">
                                                                    <i className="ti ti-timeline-event-exclamation"></i>
                                                                </span>
                                                                <div className="menu-details-content">
                                                                    <p>Pipline</p>
                                                                    <span>Add New Pipline</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="activities.html">
                                                            <div className="menu-details">
                                                                <span className="menu-list-icon bg-pink">
                                                                    <i className="ti ti-bounce-right"></i>
                                                                </span>
                                                                <div className="menu-details-content">
                                                                    <p>Activities</p>
                                                                    <span>Add New Activity</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="analytics.html">
                                                            <div className="menu-details">
                                                                <span className="menu-list-icon bg-info">
                                                                    <i className="ti ti-analyze"></i>
                                                                </span>
                                                                <div className="menu-details-content">
                                                                    <p>Analytics</p>
                                                                    <span>Shows All Information</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="projects.html">
                                                            <div className="menu-details">
                                                                <span className="menu-list-icon bg-danger">
                                                                    <i className="ti ti-atom-2"></i>
                                                                </span>
                                                                <div className="menu-details-content">
                                                                    <p>Projects</p>
                                                                    <span>Add New Project</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="menu-list">
                                                    <li>
                                                        <Link to="deals.html">
                                                            <div className="menu-details">
                                                                <span className="menu-list-icon bg-info">
                                                                    <i className="ti ti-medal"></i>
                                                                </span>
                                                                <div className="menu-details-content">
                                                                    <p>Deals</p>
                                                                    <span>Add New Deals</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="leads.html">
                                                            <div className="menu-details">
                                                                <span className="menu-list-icon bg-secondary">
                                                                    <i className="ti ti-chart-arcs"></i>
                                                                </span>
                                                                <div className="menu-details-content">
                                                                    <p>Leads</p>
                                                                    <span>Add New Leads</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="companies.html">
                                                            <div className="menu-details">
                                                                <span className="menu-list-icon bg-tertiary">
                                                                    <i className="ti ti-building-community"></i>
                                                                </span>
                                                                <div className="menu-details-content">
                                                                    <p>Company</p>
                                                                    <span>Add New Company</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="tasks.html">
                                                            <div className="menu-details">
                                                                <span className="menu-list-icon bg-success">
                                                                    <i className="ti ti-list-check"></i>
                                                                </span>
                                                                <div className="menu-details-content">
                                                                    <p>Tasks</p>
                                                                    <span>Add New Task</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="campaign.html">
                                                            <div className="menu-details">
                                                                <span className="menu-list-icon bg-purple">
                                                                    <i className="ti ti-brand-campaignmonitor"></i>
                                                                </span>
                                                                <div className="menu-details-content">
                                                                    <p>Campaign</p>
                                                                    <span>Add New Campaign</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to="faq.html" className="btn btn-help">
                                        <i className="ti ti-help-hexagon"></i>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="lead-reports.html" className="btn btn-chart-pie">
                                        <i className="ti ti-chart-pie"></i>
                                    </Link>
                                </li>
                            </ul>
                        </li>


                        <li className="nav-item nav-item-email nav-item-box">
                            <Link to="email.html">
                                <i className="ti ti-message-circle-exclamation"></i>
                                <span className="badge rounded-pill">14</span>
                            </Link>
                        </li>


                        <li className="nav-item dropdown nav-item-box">
                            <Link to="/" className="nav-link" data-bs-toggle="dropdown">
                                <i className="ti ti-bell"></i>
                                <span className="badge rounded-pill">13</span>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end notification-dropdown">
                                <div className="topnav-dropdown-header">
                                    <h4 className="notification-title">Notifications</h4>
                                </div>
                                <div className="noti-content">
                                    <ul className="notification-list">
                                        <li className="notification-message">
                                            <Link to="activities.html">
                                                <div className="media d-flex">
                                                    <span className="avatar flex-shrink-0">
                                                        <img src="images/avatar-02.jpg" alt="Profile" />
                                                        <span className="badge badge-info rounded-pill"></span>
                                                    </span>
                                                    <div className="media-body flex-grow-1">
                                                        <p className="noti-details">Ray Arnold left 6 comments on Isla Nublar SOC2 compliance report</p>
                                                        <p className="noti-time">Last Wednesday at 9:42 am</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="notification-message">
                                            <Link to="activities.html">
                                                <div className="media d-flex">
                                                    <span className="avatar flex-shrink-0">
                                                        <img src="images/avatar-03.jpg" alt="Profile" />
                                                    </span>
                                                    <div className="media-body flex-grow-1">
                                                        <p className="noti-details">Denise Nedry replied to Anna Srzand</p>
                                                        <p className="noti-sub-details">“Oh, I finished de-bugging the phones, but the system's compiling for eighteen minutes, or twenty. So, some minor systems may go on and off for a while.”</p>
                                                        <p className="noti-time">Last Wednesday at 9:42 am</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="notification-message">
                                            <Link to="activities.html">
                                                <div className="media d-flex">
                                                    <span className="avatar flex-shrink-0">
                                                        <img alt="noimage" src="images/avatar-06.jpg" />
                                                    </span>
                                                    <div className="media-body flex-grow-1">
                                                        <p className="noti-details">John Hammond attached a file to Isla Nublar SOC2 compliance report</p>
                                                        <div className="noti-pdf">
                                                            <div className="noti-pdf-icon">
                                                                <span><i className="ti ti-chart-pie"></i></span>
                                                            </div>
                                                            <div className="noti-pdf-text">
                                                                <p>EY_review.pdf</p>
                                                                <span>2mb</span>
                                                            </div>
                                                        </div>
                                                        <p className="noti-time">Last Wednesday at 9:42 am</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="topnav-dropdown-footer">
                                    <Link to="activities.html" className="view-link">View all</Link>
                                    <Link to="/" className="clear-link">Clear all</Link>
                                </div>
                            </div>
                        </li>


                        <li className="nav-item dropdown has-arrow main-drop">
                            <Link to="/" className="nav-link userset" data-bs-toggle="dropdown">
                                <span className="user-info">
                                    <span className="user-letter">
                                        <img 
                                         src={imageSrc || "images/avatar-20.jpg"}
                                        alt="Profile" />
                                    </span>
                                    <span className="badge badge-success rounded-pill"></span>
                                </span>
                            </Link>
                            <div className="dropdown-menu menu-drop-user">
                                <div className="profilename">
                                    <Link className="dropdown-item" to="/">
                                        <i className="ti ti-layout-2"></i> Dashboard
                                    </Link>
                                    <Link className="dropdown-item" to="/profile">
                                        <i className="ti ti-user-pin"></i> My Profile
                                    </Link>
                                    <button className="dropdown-item" onClick={handleLogout} >
                                        <i className="ti ti-lock"></i> Logout
                                    </button>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>

                <div className="dropdown mobile-user-menu">
                    <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></Link>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/">
                            <i className="ti ti-layout-2"></i> Dashboard
                        </Link>
                        <Link className="dropdown-item" to="profile.html">
                            <i className="ti ti-user-pin"></i> My Profile
                        </Link>
                        <button className="dropdown-item" onClick={handleLogout} >
                            <i className="ti ti-lock"></i> Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header