import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api';
import ReactPlayer from 'react-player';
import { AiFillEye, AiFillLike, AiOutlineComment } from "react-icons/ai";



const Video = () => {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
            .then((data) => {
                setVideoDetail(data.items[0]);
                console.log(data);
            });
    }, [videoId]);

    const [expandedDesc, setExpandedDesc] = useState(false);
    const toggleDescription = () => {
        setExpandedDesc(!expandedDesc);
    };



    return (
        <section id='videoViewPage'>
            {videoDetail && (
                <div className='video__view'>
                    <div className='video__play'>
                        <ReactPlayer
                            playing={true}
                            url={`https://www.youtube.com/watch?v=${videoId}`}
                            width='100%'
                            height='100%'
                            style={{ position: 'absolute', top: 0, left: 0 }}
                        />
                    </div>
                    <div className='video__info'>
                        <h2 className='video__title'>
                            {videoDetail.snippet.title}
                        </h2>
                        <div className='video__channel'>
                            <div className='id'>
                                <Link to={`/channel/${videoDetail.snippet.channelId}`}>{videoDetail.snippet.channelTitle}</Link>
                            </div>
                            <div className='count'>
                                <span><AiFillEye /> : {videoDetail.statistics.viewCount}</span><br />
                                <span><AiFillLike /> : {videoDetail.statistics.likeCount}</span><br />
                                <span><AiOutlineComment /> : {videoDetail.statistics.commentCount}</span>
                            </div>
                        </div>
                        <button onClick={toggleDescription}>
                            {expandedDesc ? '접기' : '더보기'}
                        </button>
                        <div className="video__desc">
                            {expandedDesc ? videoDetail.snippet.description : videoDetail.snippet.description.slice(0, 3) + '...'}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Video