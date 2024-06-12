import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [disable,setDisable] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/sendVerifyEmail";
    setDisable(true);
    try {
      const myForm = new FormData();
      myForm.append('email', email);
      const data = await axios.post(url, myForm);
      console.log("data: " + data.user, data);
      if (data.status === 200) {
        toast.success("Verification Mail Sent Successfully, Plz check Inbox");
        setEmail('');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
        setDisable(false);
      }
    } catch (error) {
      console.log("error: " + error, error.message);
      setDisable(false);
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        toast.warning(errorMessage);
        console.log("Error Message: ", errorMessage);
      } else {
        console.log("Unexpected Error: ", error.message);
      }
    }
  }

  return (
    <>
      <section className="wrapper">
        <div className="frmbox">
          <h4 className="frmhead">Verify Your Email</h4>
          <form
            action="/login"
            method="post" onSubmit={submitHandler} >
            {/* Email input */}
            <div data-mdb-input-init className="form-outline my-3">
              <label className="form-label emllabl" htmlFor="form1Example1">
                Email
              </label>
              <input
                aria-invalid="false"
                autoFocus=""
                id=":R3qnnjqudta:"
                type="email"
                placeholder="Please enter your Verification Email"
                onChange={(e)=>{setEmail(e.target.value)}}
                className=" emailfld"
                name="email" />
            </div>

            {/* Submit button */}
            <div>
              <button
                data-mdb-ripple-init
                type="submit"
                className="btn btn-primary btn-block lginbtn" disabled={disable} >
                Send Verification Mail
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default VerifyEmail;