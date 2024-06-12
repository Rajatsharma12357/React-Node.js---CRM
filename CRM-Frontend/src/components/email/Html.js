import React from 'react'

const Html = ({ mailContent }) => {
    console.log("mailContent => ", mailContent);
    return (
        <>
            {
                mailContent ? (
                    mailContent
                ) : (
                    <h1>HTML Page</h1>
                )
            }
        </>
    )
}

export default Html
