import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const {isAuthenticated} = useSelector((state) => state.auth);
    // console.log("isAuthenticated => ",isAuthenticated);

    const handleNavigate = () => {
        if(isAuthenticated){
            navigate("/dashboard");
            window.location.reload();
        }else{
            navigate("/signin");
        }
    }
    useEffect(()=>{  },[]);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="#">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <button className="nav-link" onClick={handleNavigate}>Sign in</button>
                            <Link className="nav-link" to="/signup">Sign up</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Home
