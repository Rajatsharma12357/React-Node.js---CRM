"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const data = useSelector((state) => state.auth);
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => {
        const savedImage = localStorage.getItem('savedImage');
        if (savedImage) {
            setImageSrc(savedImage);
        }
    }, [])

    return (
        <>
            <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li className="clinicdropdown">
                                <Link to="/profile">
                                    <img
                                    src={imageSrc || "images/avatar-14.jpg"}
                                    className="img-fluid" alt="Profile" />
                                    <div className="user-names">
                                        <h5>{data?.auth?.firstName + " " + data?.auth?.lastName || "Adrian Davies"}</h5>
                                        <h6>Tech Lead</h6>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <h6 className="submenu-hdr">Main Menu</h6>
                                <ul>
                                    <li className="submenu">
                                        <Link to="/" className="subdrop active">
                                            <i className="ti ti-layout-2"></i><span>Dashboard</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="/dashboard" className="active">Deals Dashboard</Link></li>
                                            {/* <li><Link to="leads-dashboard.html">Leads Dashboard</Link></li> */}
                                            {/* <li><Link to="project-dashboard.html">Project Dashboard</Link></li> */}
                                        </ul>
                                    </li>
                                    {/* <li className="submenu">
                                        <Link to="/"><i className="ti ti-brand-airtable"></i><span>Application</span><span className="menu-arrow"></span></Link>
                                        <ul>
                                            <li><Link to="chat.html">Chat</Link></li>
                                            <li className="submenu submenu-two">
                                                <Link to="/">Call<span className="menu-arrow inside-submenu"></span></Link>
                                                <ul>
                                                    <li><Link to="video-call.html">Video Call</Link></li>
                                                    <li><Link to="audio-call.html">Audio Call</Link></li>
                                                    <li><Link to="call-history.html">Call History</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link to="calendar.html">Calendar</Link></li>
                                            <li><Link to="/email">Email</Link></li>
                                            <li><Link to="/sms">SMS</Link></li>
                                            <li><Link to="todo.html">To Do</Link></li>
                                            <li><Link to="notes.html">Notes</Link></li>
                                            <li><Link to="file-manager.html">File Manager</Link></li>
                                        </ul>
                                    </li> */}
                                    <li className="submenu">
                                        <Link to="/"><i className="ti ti-brand-airtable"></i><span>Campaigns</span><span className="menu-arrow"></span></Link>
                                        <ul>
                                            <li><Link to="calendar.html">All Campaigns</Link></li>
                                            <li><Link to="/email">Campaign Manager</Link></li>
                                            <li><Link to="/sms">SMS</Link></li>
                                            <li><Link to="/email">Email Marketing</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li aria-disabled="true">
                                <h6 className="submenu-hdr">CRM</h6>
                                <ul>
                                    <li>
                                        <Link className="disabled" to="contacts.html" ><i className="ti ti-user-up"></i><span>Contacts</span></Link>
                                    </li>
                                    <li>
                                        <Link className="disabled" to="companies.html"><i className="ti ti-building-community"></i><span>Companies</span></Link>
                                    </li>
                                    <li>
                                        <Link className="disabled" to="deals.html"><i className="ti ti-medal"></i><span>Deals</span></Link>
                                    </li>
                                    <li>
                                        <Link className="disabled" to="leads.html"><i className="ti ti-chart-arcs"></i><span>Leads</span></Link>
                                    </li>
                                    <li>
                                        <Link className="disabled" to="pipeline.html"><i className="ti ti-timeline-event-exclamation"></i><span>Pipeline</span></Link>
                                    </li>
                                    <li>
                                        <Link className="disabled" to="campaign.html"><i className="ti ti-brand-campaignmonitor"></i><span>Campaign</span></Link>
                                    </li>
                                    <li>
                                        <Link className="disabled" to="projects.html"><i className="ti ti-atom-2"></i><span>Projects</span></Link>
                                    </li>
                                    <li>
                                        <Link className="disabled" to="tasks.html"><i className="ti ti-list-check"></i><span>Tasks</span></Link>
                                    </li>
                                    <li>
                                        <Link className="disabled" to="analytics.html"><i className="ti ti-chart-bar"></i><span>Analytics</span></Link>
                                    </li>
                                    <li>
                                        <Link className="disabled" to="activities.html"><i className="ti ti-bounce-right"></i><span>Activities</span></Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h6 className="submenu-hdr">Reports</h6>
                                <ul>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-file-invoice"></i><span>Reports</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="lead-reports.html">Lead Reports</Link></li>
                                            <li><Link to="deal-reports.html">Deal Reports</Link></li>
                                            <li><Link to="contact-reports.html">Contact Reports</Link></li>
                                            <li><Link to="company-reports.html">Company Reports</Link></li>
                                            <li><Link to="project-reports.html">Project Reports</Link></li>
                                            <li><Link to="task-reports.html">Task Reports</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h6 className="submenu-hdr">CRM Settings</h6>
                                <ul>
                                    <li><Link to="sources.html"><i className="ti ti-artboard"></i><span>Sources</span></Link></li>
                                    <li><Link to="lost-reason.html"><i className="ti ti-message-exclamation"></i><span>Lost Reason</span></Link></li>
                                    <li><Link to="contact-stage.html"><i className="ti ti-steam"></i><span>Contact Stage</span></Link></li>
                                    <li><Link to="industry.html"><i className="ti ti-building-factory"></i><span>Industry</span></Link></li>
                                    <li><Link to="calls.html"><i className="ti ti-phone-check"></i><span>Calls</span></Link></li>
                                </ul>
                            </li>
                            <li>
                                <h6 className="submenu-hdr">User Management</h6>
                                <ul>
                                    <li><Link to="manage-users.html"><i className="ti ti-users"></i><span>Manage Users</span></Link></li>
                                    <li><Link to="roles-permissions.html"><i className="ti ti-navigation-cog"></i><span>Roles & Permissions</span></Link></li>
                                    <li><Link to="delete-request.html"><i className="ti ti-flag-question"></i><span>Delete Request</span></Link></li>
                                </ul>
                            </li>
                            <li>
                                <h6 className="submenu-hdr">Membership</h6>
                                <ul>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-file-invoice"></i><span>Membership</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="membership-plans.html">Membership Plans</Link></li>
                                            <li><Link to="membership-addons.html">Membership Addons</Link></li>
                                            <li><Link to="membership-transactions.html">Transactions</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h6 className="submenu-hdr">Content</h6>
                                <ul>
                                    <li><Link to="pages.html"><i className="ti ti-page-break"></i><span>Pages</span></Link></li>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-map-pin-pin"></i><span>Location</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="countries.html">Countries</Link></li>
                                            <li><Link to="states.html">States</Link></li>
                                            <li><Link to="cities.html">Cities</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="testimonials.html"><i className="ti ti-quote"></i><span>Testimonials</span></Link></li>
                                    <li><Link to="faq.html"><i className="ti ti-question-mark"></i><span>FAQ</span></Link></li>
                                </ul>
                            </li>
                            <li>
                                <h6 className="submenu-hdr">Support</h6>
                                <ul>
                                    <li><Link to="contact-messages.html"><i className="ti ti-page-break"></i><span>Contact Messages</span></Link></li>
                                    <li><Link to="tickets.html"><i className="ti ti-ticket"></i><span>Tickets</span></Link></li>
                                </ul>
                            </li>
                            <li>
                                <h6 className="submenu-hdr">Settings</h6>
                                <ul>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-settings-cog"></i><span>General Settings</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="profile">Profile</Link></li>
                                            <li><Link to="security">Security</Link></li>
                                            <li><Link to="notifications">Notifications</Link></li>
                                            <li><Link to="connected-apps">Connected Apps</Link></li>
                                        </ul>
                                    </li>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-world-cog"></i><span>Website Settings</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="company-settings.html">Company Settings</Link></li>
                                            <li><Link to="localization.html">Localization</Link></li>
                                            <li><Link to="prefixes.html">Prefixes</Link></li>
                                            <li><Link to="preference.html">Preference</Link></li>
                                            <li><Link to="appearance.html">Appearance</Link></li>
                                            <li><Link to="language.html">Language</Link></li>
                                        </ul>
                                    </li>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-apps"></i><span>App Settings</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="invoice-settings.html">Invoice Settings</Link></li>
                                            <li><Link to="printers.html">Printers</Link></li>
                                            <li><Link to="custom-fields.html">Custom Fields</Link></li>
                                        </ul>
                                    </li>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-device-laptop"></i><span>System Settings</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="email-settings.html">Email Settings</Link></li>
                                            <li><Link to="sms-gateways.html">SMS Gateways</Link></li>
                                            <li><Link to="gdpr-cookies.html">GDPR Cookies</Link></li>
                                        </ul>
                                    </li>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-moneybag"></i><span>Financial Settings</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="payment-gateways.html">Payment Gateways</Link></li>
                                            <li><Link to="bank-accounts.html">Bank Accounts</Link></li>
                                            <li><Link to="tax-rates.html">Tax Rates</Link></li>
                                            <li><Link to="currencies.html">Currencies</Link></li>
                                        </ul>
                                    </li>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-flag-cog"></i><span>Other Settings</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="storage.html">Storage</Link></li>
                                            <li><Link to="ban-ip-address.html">Ban IP Address</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h6 className="submenu-hdr">Pages</h6>
                                <ul>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-lock-square-rounded"></i><span>Authentication</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="login.html">Login</Link></li>
                                            <li><Link to="register.html">Register</Link></li>
                                            <li><Link to="forgot-password.html">Forgot Password</Link></li>
                                            <li><Link to="reset-password.html">Reset Password</Link></li>
                                            <li><Link to="email-verification.html">Email Verification</Link></li>
                                            <li><Link to="two-step-verification.html">2 Step Verification</Link></li>
                                            <li><Link to="lock-screen.html">Lock Screen</Link></li>
                                        </ul>
                                    </li>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-error-404"></i><span>Error Pages</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="error-404.html">404 Error</Link></li>
                                            <li><Link to="error-500.html">500 Error</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="blank-page.html"><i className="ti ti-apps"></i><span>Blank Page</span></Link></li>
                                    <li><Link to="coming-soon.html"><i className="ti ti-device-laptop"></i><span>Coming Soon</span></Link></li>
                                    <li><Link to="under-maintenance.html"><i className="ti ti-moneybag"></i><span>Under Maintenance</span></Link></li>
                                </ul>
                            </li>
                            <li>
                                <h6 className="submenu-hdr">UI Interface</h6>
                                <ul>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-adjustments-check"></i><span>Base UI</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="ui-alerts.html">Alerts</Link></li>
                                            <li><Link to="ui-accordion.html">Accordion</Link></li>
                                            <li><Link to="ui-avatar.html">Avatar</Link></li>
                                            <li><Link to="ui-badges.html">Badges</Link></li>
                                            <li><Link to="ui-borders.html">Border</Link></li>
                                            <li><Link to="ui-buttons.html">Buttons</Link></li>
                                            <li><Link to="ui-buttons-group.html">Button Group</Link></li>
                                            <li><Link to="ui-breadcrumb.html">Breadcrumb</Link></li>
                                            <li><Link to="ui-cards.html">Card</Link></li>
                                            <li><Link to="ui-carousel.html">Carousel</Link></li>
                                            <li><Link to="ui-colors.html">Colors</Link></li>
                                            <li><Link to="ui-dropdowns.html">Dropdowns</Link></li>
                                            <li><Link to="ui-grid.html">Grid</Link></li>
                                            <li><Link to="ui-images.html">Images</Link></li>
                                            <li><Link to="ui-lightbox.html">Lightbox</Link></li>
                                            <li><Link to="ui-media.html">Media</Link></li>
                                            <li><Link to="ui-modals.html">Modals</Link></li>
                                            <li><Link to="ui-offcanvas.html">Offcanvas</Link></li>
                                            <li><Link to="ui-pagination.html">Pagination</Link></li>
                                            <li><Link to="ui-popovers.html">Popovers</Link></li>
                                            <li><Link to="ui-progress.html">Progress</Link></li>
                                            <li><Link to="ui-placeholders.html">Placeholders</Link></li>
                                            <li><Link to="ui-rangeslider.html">Range Slider</Link></li>
                                            <li><Link to="ui-spinner.html">Spinner</Link></li>
                                            <li><Link to="ui-sweetalerts.html">Sweet Alerts</Link></li>
                                            <li><Link to="ui-nav-tabs.html">Tabs</Link></li>
                                            <li><Link to="ui-toasts.html">Toasts</Link></li>
                                            <li><Link to="ui-tooltips.html">Tooltips</Link></li>
                                            <li><Link to="ui-typography.html">Typography</Link></li>
                                            <li><Link to="ui-video.html">Video</Link></li>
                                        </ul>
                                    </li>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-box-align-bottom"></i><span>Advanced UI</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="ui-ribbon.html">Ribbon</Link></li>
                                            <li><Link to="ui-clipboard.html">Clipboard</Link></li>
                                            <li><Link to="ui-drag-drop.html">Drag & Drop</Link></li>
                                            <li><Link to="ui-rangeslider.html">Range Slider</Link></li>
                                            <li><Link to="ui-rating.html">Rating</Link></li>
                                            <li><Link to="ui-text-editor.html">Text Editor</Link></li>
                                            <li><Link to="ui-counter.html">Counter</Link></li>
                                            <li><Link to="ui-scrollbar.html">Scrollbar</Link></li>
                                            <li><Link to="ui-stickynote.html">Sticky Note</Link></li>
                                            <li><Link to="ui-timeline.html">Timeline</Link></li>
                                        </ul>
                                    </li>
                                    <li className="submenu">
                                        <Link to="/"><i className="ti ti-chart-donut-2"></i>
                                            <span>Charts</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="chart-apex.html">Apex Charts</Link></li>
                                            <li><Link to="chart-c3.html">Chart C3</Link></li>
                                            <li><Link to="chart-js.html">Chart Js</Link></li>
                                            <li><Link to="chart-morris.html">Morris Charts</Link></li>
                                            <li><Link to="chart-flot.html">Flot Charts</Link></li>
                                            <li><Link to="chart-peity.html">Peity Charts</Link></li>
                                        </ul>
                                    </li>
                                    <li className="submenu">
                                        <Link to="/"><i className="ti ti-icons"></i>
                                            <span>Icons</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li><Link to="icon-fontawesome.html">Fontawesome Icons</Link></li>
                                            <li><Link to="icon-feather.html">Feather Icons</Link></li>
                                            <li><Link to="icon-ionic.html">Ionic Icons</Link></li>
                                            <li><Link to="icon-material.html">Material Icons</Link></li>
                                            <li><Link to="icon-pe7.html">Pe7 Icons</Link></li>
                                            <li><Link to="icon-simpleline.html">Simpleline Icons</Link></li>
                                            <li><Link to="icon-themify.html">Themify Icons</Link></li>
                                            <li><Link to="icon-weather.html">Weather Icons</Link></li>
                                            <li><Link to="icon-typicon.html">Typicon Icons</Link></li>
                                            <li><Link to="icon-flag.html">Flag Icons</Link></li>
                                        </ul>
                                    </li>
                                    <li className="submenu">
                                        <Link to="/">
                                            <i className="ti ti-forms"></i><span>Forms</span><span className="menu-arrow"></span>
                                        </Link>
                                        <ul>
                                            <li className="submenu submenu-two">
                                                <Link to="/">Form Elements<span className="menu-arrow inside-submenu"></span></Link>
                                                <ul>
                                                    <li><Link to="form-basic-inputs.html">Basic Inputs</Link></li>
                                                    <li><Link to="form-checkbox-radios.html">Checkbox & Radios</Link></li>
                                                    <li><Link to="form-input-groups.html">Input Groups</Link></li>
                                                    <li><Link to="form-grid-gutters.html">Grid & Gutters</Link></li>
                                                    <li><Link to="form-select.html">Form Select</Link></li>
                                                    <li><Link to="form-mask.html">Input Masks</Link></li>
                                                    <li><Link to="form-fileupload.html">File Uploads</Link></li>
                                                </ul>
                                            </li>
                                            <li className="submenu submenu-two">
                                                <Link to="/">Layouts<span className="menu-arrow inside-submenu"></span></Link>
                                                <ul>
                                                    <li><Link to="form-horizontal.html">Horizontal Form</Link></li>
                                                    <li><Link to="form-vertical.html">Vertical Form</Link></li>
                                                    <li><Link to="form-floating-labels.html">Floating Labels</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link to="form-validation.html">Form Validation</Link></li>
                                            <li><Link to="form-select2.html">Select2</Link></li>
                                            <li><Link to="form-wizard.html">Form Wizard</Link></li>
                                        </ul>
                                    </li>
                                    <li className="submenu">
                                        <Link to="/"><i className="ti ti-table"></i><span>Tables</span><span className="menu-arrow"></span></Link>
                                        <ul>
                                            <li><Link to="tables-basic.html">Basic Tables </Link></li>
                                            <li><Link to="data-tables.html">Data Table </Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h6 className="submenu-hdr">Help</h6>
                                <ul>
                                    <li><Link to="/"><i className="ti ti-file-type-doc"></i><span>Documentation</span></Link></li>
                                    <li><Link to="/"><i className="ti ti-arrow-capsule"></i><span>Changelog v2.0.3</span></Link></li>
                                    <li className="submenu">
                                        <Link to="/"><i className="ti ti-brand-databricks"></i><span>Multi Level</span><span className="menu-arrow"></span></Link>
                                        <ul>
                                            <li><Link to="/">Level 1.1</Link></li>
                                            <li className="submenu submenu-two"><Link to="/">Level 1.2<span className="menu-arrow inside-submenu"></span></Link>
                                                <ul>
                                                    <li><Link to="/">Level 2.1</Link></li>
                                                    <li className="submenu submenu-two submenu-three"><Link to="/">Level 2.2<span className="menu-arrow inside-submenu inside-submenu-two"></span></Link>
                                                        <ul>
                                                            <li><Link to="/">Level 3.1</Link></li>
                                                            <li><Link to="/">Level 3.2</Link></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Sidebar