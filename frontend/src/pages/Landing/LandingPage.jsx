import React, { useEffect, useState } from 'react'
// import { google } from '@googleapis/youtube'
import axios from 'axios'
import yt_button from "../../images/yt_button.svg"
import yt_icon from "../../images/yt_icon.svg"
import "./LandingPage.css"
import { useParams, useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const [videoId, setVideoId] = useState('')
    const [channeldetails, setChanneldetails] = useState({})
    let subscribeCount = 0;
    const subsCount = async (cId) => {
        const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${cId}&key=${process.env.REACT_APP_API_KEY}`)
        setChanneldetails(res)
        subscribeCount = res.data.items[0].statistics.subscriberCount;
    }

    const updateViewsAndComments = async (res) => {
        const dateStr = res.data.items[0].snippet.publishedAt;
        const date = new Date(dateStr);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        let earn = Math.min(subscribeCount, res.data.items[0].statistics.viewCount) + 10 * res.data.items[0].statistics.commentCount + 5 * res.data.items[0].statistics.likeCount;
        try {
            const res1 = await axios.post("https://anchors-backend-git-main-shauryag2002.vercel.app/", {
                view: res.data.items[0].statistics.viewCount,
                comment: res.data.items[0].statistics.commentCount,
                like: res.data.items[0].statistics.likeCount,
                img: res.data.items[0].snippet.thumbnails.default.url,
                title: res.data.items[0].snippet.title,
                date: formattedDate,
                sub: subscribeCount,
                earn: earn
            });
        } catch (error) {
            console.error(error);
        }
    };
    let count = 0;
    useEffect(() => {
        if (count === 0) { } else {
            videoDetails();
        }
        count++;
    }, [channeldetails])

    const videoDetails = async () => {
        try {
            const res = await axios.get("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=" + videoId + "&key=" + process.env.REACT_APP_API_KEY)
            if (res.data.items && res.data.items.length > 0) {
                await subsCount(res.data.items[0].snippet.channelId)
                await updateViewsAndComments(res)
                navigate("/videoInfo")
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        // subsCount();
        // videoDetails();

    }, [])
    return (
        <div className='LandingPage'>


            <div className="landing">
                <div className="landWrapper">

                    <div className='landMainHeading'>
                        Discover your earning potential
                    </div>
                    <div className="landSubHeading">
                        Turn your Youtube expertise into a lucrative income
                        through resource sharing
                    </div>
                </div>
                <div className="yt_link">
                    {/* <div className="yt_input"> */}
                    <div className="yt_svg">
                        <img src={yt_icon} alt="Youtube icon" />
                        <input type="text" onChange={(e) => (setVideoId(e.target.value.split("=")[1]))} placeholder='enter youtube video link' />
                    </div>
                    {/* </div> */}
                    <div className="btn" onClick={videoDetails}>Enter</div>
                </div>
            </div>
            <div className="video_image">
                <img src={yt_button} alt="yt_button" />
            </div>
        </div>
    )
}

export default LandingPage