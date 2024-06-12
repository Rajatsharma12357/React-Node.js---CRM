import React, { useEffect, useState } from 'react'
import Eye from './Eye';
import CloseEye from './CloseEye';

const HandleEye = () => {
    const [eye, setEye] = useState(false);
    const toggler = () => {
        setEye((eye) => !eye);
    }
    useEffect(() => { }, [])
    return (
        <>
            <button type='button' className='border-0' onClick={toggler}>
                {eye ? (
                    <CloseEye />
                ) : (
                    <Eye />
                )}
            </button>
        </>
    )
}

export default HandleEye;