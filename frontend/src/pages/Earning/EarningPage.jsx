import React, { useEffect, useState } from 'react'
import thumbnail from '../../images/thumbnail.png'
import eye from '../../images/eye_icon.svg'
import comment from '../../images/comment_icon.svg'
import like from '../../images/like_icon.svg'
import star from '../../images/star_icon.svg'
import "./EarningPage.css"
import axios from 'axios'
const EarningPage = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_URL, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                        'Access-Control-Allow-Headers': 'Content-Type',
                    },
                });
                setData(res.data);
            } catch (error) {
                console.error(error.response);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='Earning'>
            <div className="earnWrapper">
                <div className="mainHeading">
                    <div className="subHeading">
                        <div className="left">
                            <div className="yt_image_info">
                                <div className="top">
                                    <img src={star} className='star' alt="star icon" />
                                    Top earner video
                                </div>
                                <img src={data[0]?.img} className='thumbnail' alt="Thumbnail" />
                                <div className='Date'>{data[0]?.date}</div>
                            </div>
                            <div className="yt_image_info_right">
                                <div className="name" title={data[0]?.title}>{data[0]?.title}</div>
                                <div className="videoInfo">
                                    <div className='Vviews vDetails'>
                                        <img className="eye_icon vDetailsIcon" src={eye} alt='eye icon' />
                                        <div className='viewsNo vDetailsNo'>{data[0]?.view}</div>
                                    </div>
                                    <div className='Vlikes vDetails'>
                                        <img src={like} className='vDetailsIcon' alt="like icon" />
                                        <div className="likeNo vDetailsNo">{data[0]?.like}</div>
                                    </div>
                                    <div className='Vcomments vDetails'>
                                        <img src={comment} className='vDetailsIcon' alt="comment icon" />
                                        <div className="commentNo vDetailsNo">{data[0]?.comment}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="yt_views_info">
                                <div className='view_count'>
                                    ₹{data[0]?.earn}

                                </div>
                                <div className='view_button'> Check How?</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='tableWrapper'>

                <div className='heading'>Other Videos Potentials</div>
                <div className="table">
                    <div className="Thead">
                        <div className="rank Tcontent">Rank</div>
                        <div className='title Tcontent'>Title</div>
                        <div className="thumbnail Tcontent">Thumbnail</div>
                        <div className="views Tcontent">Views</div>
                        <div className="likes Tcontent">Likes</div>
                        <div className="comment Tcontent">Comment</div>
                        <div className="upload Tcontent">Uploaded on</div>
                        <div className='estimate Tcontent'>*Estimated Earning</div>
                    </div>
                    <div className="tableContent">
                        {data?.map((elem, i) => {
                            if (i === 0) return null;
                            return <div key={i} className="Tbody Thead">
                                <div className="rankNum Tcontent">{i + 1}</div>
                                <div className='titleNum Tcontent' title={elem.title}>{elem.title}</div>
                                <div className="thumbnailNum Tcontent"> <img src={elem.img} alt="Thumbnail" /></div>
                                <div className="viewsNum Tcontent">{elem.view}</div>
                                <div className="likesNum Tcontent">{elem.like}</div>
                                <div className="commentNum Tcontent">{elem.comment}</div>
                                <div className="uploadNum Tcontent">{elem.date}</div>
                                <div className='estimateNum Tcontent'>{elem.earn}</div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EarningPage