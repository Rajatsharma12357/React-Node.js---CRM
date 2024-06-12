import React from 'react'
import { useSelector } from 'react-redux';

const Home2 = () => {
  const data = useSelector((state) => state.auth);
  console.log("Data", data)
  return (
    <>
      <h1>This is Redirected Page</h1>
      <p>First Name: {data?.auth?.firstName}</p>
      <p>Last Name: {data?.auth?.lastName}</p>
      <p>Email: {data?.auth?.email}</p>
      <p>Email: {data?.auth?.password}</p>
    </>
  )
}

export default Home2;