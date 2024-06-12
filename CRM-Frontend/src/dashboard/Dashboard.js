import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogOut } from "../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import Login from "../auth/Login";

const Dashboard = () => {
  const data = useSelector((state) => state.auth);
  const { isAuthenticated } = data;
  // console.log("data = > ", data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(handleLogOut());
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="main-wrapper">
          {/* <div className="preloader">
                <div className="preloader-blk">
                  <div className="preloader__image"></div>
                </div>
              </div> */}

          <Header />
          <Sidebar />
          <div className="page-wrapper">
            <div className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-header">
                    <div className="row align-items-center ">
                      <div className="col-md-4">
                        <h3 className="page-title">Deals Dashboard</h3>
                      </div>
                      <div className="col-md-8 float-end ms-auto">
                        <div className="d-flex title-head">
                          <div className="daterange-picker d-flex align-items-center justify-content-center">
                            <div className="form-sort me-2">
                              <i className="ti ti-calendar"></i>
                              <input
                                type="text"
                                className="form-control  date-range bookingrange"   />
                            </div>
                            <div className="head-icons mb-0">
                              <Link
                                to="/"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Refresh"
                              >
                                <i className="ti ti-refresh-dot"></i>
                              </Link>
                              <Link
                                to="/"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Collapse"
                                id="collapse-header"
                              >
                                <i className="ti ti-chevrons-up"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 d-flex">
                      <div className="card flex-fill">
                        <div className="card-body">
                          <div className="statistic-header">
                            <h4>
                              <i className="ti ti-grip-vertical me-1"></i>
                              Recently Created Deals
                            </h4>
                            <div className="dropdown statistic-dropdown">
                              <div className="card-select">
                                <ul>
                                  <li>
                                    <Link
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      to="/"
                                    >
                                      <i className="ti ti-calendar-check me-2"></i>
                                      Last 30 days
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <Link to="/" className="dropdown-item">
                                        Last 15 days
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Last 30 days
                                      </Link>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="table-responsive custom-table">
                            <table
                              className="table dataTable"
                              id="deals-project"
                            >
                              <thead className="thead-light">
                                <tr>
                                  <th>Deal Name</th>
                                  <th>Stage</th>
                                  <th>Deal Value</th>
                                  <th>Probability</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex">
                      <div className="card flex-fill">
                        <div className="card-body">
                          <div className="statistic-header">
                            <h4>
                              <i className="ti ti-grip-vertical me-1"></i>Deals
                              By Stage
                            </h4>
                            <div className="dropdown statistic-dropdown">
                              <div className="card-select">
                                <ul>
                                  <li>
                                    <Link
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      to="/"
                                    >
                                      Sales Pipeline
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <Link to="/" className="dropdown-item">
                                        Marketing Pipeline
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Sales Pipeline
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Email
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Chats
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Operational
                                      </Link>
                                    </div>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      to="/"
                                    >
                                      Last 30 Days
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <Link to="/" className="dropdown-item">
                                        Last 30 Days
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Last 15 Days
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Last 7 Days
                                      </Link>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div id="deals-chart"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 d-flex">
                      <div className="card flex-fill">
                        <div className="card-body">
                          <div className="statistic-header">
                            <h4>
                              <i className="ti ti-grip-vertical me-1"></i>Leads
                              By Stage
                            </h4>
                            <div className="dropdown statistic-dropdown">
                              <div className="card-select">
                                <ul>
                                  <li>
                                    <Link
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      to="/"
                                    >
                                      Marketing Pipeline
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <Link to="/" className="dropdown-item">
                                        Marketing Pipeline
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Sales Pipeline
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Email
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Chats
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Operational
                                      </Link>
                                    </div>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      to="/"
                                    >
                                      Last 3 months
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <Link to="/" className="dropdown-item">
                                        Last 3 months
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Last 6 months
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Last 12 months
                                      </Link>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div id="last-chart"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex">
                      <div className="card flex-fill">
                        <div className="card-body ">
                          <div className="statistic-header">
                            <h4>
                              <i className="ti ti-grip-vertical me-1"></i>Won
                              Deals Stage
                            </h4>
                            <div className="dropdown statistic-dropdown">
                              <div className="card-select">
                                <ul>
                                  <li>
                                    <Link
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      to="/"
                                    >
                                      Marketing Pipeline
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <Link to="/" className="dropdown-item">
                                        Marketing Pipeline
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Sales Pipeline
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Email
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Chats
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Operational
                                      </Link>
                                    </div>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      to="/"
                                    >
                                      Last 3 months
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <Link to="/" className="dropdown-item">
                                        Last 3 months
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Last 6 months
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Last 12 months
                                      </Link>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div id="won-chart"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 d-flex">
                      <div className="card w-100">
                        <div className="card-body">
                          <div className="statistic-header">
                            <h4>
                              <i className="ti ti-grip-vertical me-1"></i>Deals
                              by Year
                            </h4>
                            <div className="dropdown statistic-dropdown">
                              <div className="card-select">
                                <ul>
                                  <li>
                                    <Link
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      to="/"
                                    >
                                      Sales Pipeline
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <Link to="/" className="dropdown-item">
                                        Marketing Pipeline
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Sales Pipeline
                                      </Link>
                                    </div>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      to="/"
                                    >
                                      Last 3 months
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-end">
                                      <Link to="/" className="dropdown-item">
                                        Last 3 months
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Last 6 months
                                      </Link>
                                      <Link to="/" className="dropdown-item">
                                        Last 12 months
                                      </Link>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div id="deals-year"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Dashboard;
