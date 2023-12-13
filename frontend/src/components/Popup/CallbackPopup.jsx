import React, { useRef, useEffect, useState } from 'react'
import "./CallbackPopup.css"
import tick from "../../images/tick.svg"
import arrow from "../../images/arrow.svg"
import { useNavigate } from 'react-router-dom'
import emailjs from "@emailjs/browser";
import AWS from 'aws-sdk';
const CallbackPopup = ({ popup, setPopup }) => {
    const navigate = useNavigate()
    const popupWrapperRef = useRef(null);
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const home = () => {
        setPopup((prev) => !prev)
        navigate("/")
    }
    const handleClickOutside = (event) => {
        if (popupWrapperRef.current && !popupWrapperRef.current.contains(event.target)) {
            setPopup((prev) => !prev);
        }
    };
    const [popupclick, setPopupclick] = useState(true)
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        emailjs.init("pPrXHULe-4xrwKwJZ")
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleClick = () => {
        if (name === '' || mobile === '') { }
        else {
            const ses = new AWS.SES({ apiVersion: 'latest', region: process.env.REACT_APP_REGION, accessKeyId: process.env.REACT_APP_ACCESS_KEY, secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY });
            const sendEmail = async () => {
                const params = {
                    Source: "guptashaurya2002@gmail.com",
                    Destination: {
                        ToAddresses: ["ravi@anchors.in"],
                    },
                    Message: {
                        Subject: {
                            Data: "New Callback Request",
                        },
                        Body: {
                            Text: {
                                Data: `Name: ${name} \n Mobile: ${mobile}\n \nBest Regards,\nShaurya Gupta`,
                            },
                        },
                    },
                };

                try {
                    await ses.sendEmail(params).promise();
                    console.log('Email sent successfully!');
                } catch (error) {
                    console.error(error);
                }
            };
            sendEmail();
            setPopupclick((prev) => !prev)
        }
    }
    return (
        <div className={`popup ${popup ? "overf" : ""}`}>
            {popupclick ? <div ref={popupWrapperRef} className='popupWrapper'>
                <div className="content">
                    Request a call back
                </div>
                <div className="popupForm">
                    <div className="formInputs">
                        <input type="text" className='popupName' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
                        <input type="number" className='popupMobile' value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Mobile number' />
                    </div>
                    <button className="popupButton" onClick={handleClick}>
                        Request a Call Back
                    </button>
                </div>
            </div> :
                <div ref={popupWrapperRef} className="popupWrapper">
                    <img src={tick} className='success' alt="tick svg" />
                    <div className="popupContent">
                        <div className='contentHead'>
                            <div className="heading">
                                Request a call back
                            </div>
                            <div className="subHeading">
                                <div className="sub1">Our Team will call you shortly in
                                    12-24 hrs</div>
                                <div className="sub2">Can’t you wait for call?</div>
                            </div>
                        </div>
                        <button className='popupBtn' onClick={home}>
                            <div className="popupText">Check another video</div>
                            <img src={arrow} alt="arrow svg" />
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default CallbackPopup