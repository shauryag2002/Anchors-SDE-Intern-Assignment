import React, { useState } from 'react'
import logo from "../../images/anchors_logo.png"
import phone from "../../images/Phone.png"
import user from "../../images/user_image.svg"
import "./header.css"
import { useNavigate } from 'react-router-dom'
import CallbackPopup from '../Popup/CallbackPopup'
const Header = () => {
    const navigate = useNavigate()
    const [popup, setPopup] = useState(false)
    const homepage = () => {
        navigate("/")
    }
    return (
        <div className={`header`}>
            <div className="logo">
                <div className='logoHeading'>
                    <div className='mainHeading' onClick={homepage}>
                        <img src={logo} alt="anchor logo" />
                        <p className='appName'>anchors</p>
                    </div>
                    <p className='beta'>Beta</p>
                    {popup ? <CallbackPopup popup={popup} setPopup={setPopup} /> : null}
                </div>
            </div>
            {window.location.pathname !== "/" ? <div className="userInfo">
                <div className='request' onClick={() => setPopup((prev) => !prev)}>
                    <img src={phone} alt="" />
                    <p className='reqText'>Request a call back</p>
                </div>

                <img src={user} alt="User Image" />
            </div> : null
            }
        </div>
    )
}

export default Header