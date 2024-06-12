import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyEmailByToken = () => {
    const navigate = useNavigate();
    
    const { id, token } = useParams();
    console.log(id, token);
    (async () => {
        // e.preventDefault();
        const url = `http://localhost:5000/api/verifyEmail/${id}/${token}`;
        try {
            const data = await axios.post(url);
            if (data.status === 200) {
                toast.success("Verification Successful, Please Do login");
                alert("Verification Completed, you can go back Now!");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message;
                toast.warning(errorMessage);
                console.log("Error Message: ", errorMessage);
            } else {
                console.log("Unexpected Error: ", error.message);
            }
        }
    })()
    // useEffect(() => {
    // verificationHandler()
    // }, [])
    return null;
}

export default VerifyEmailByToken