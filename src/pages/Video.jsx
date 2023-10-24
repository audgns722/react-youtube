import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api';
import ReactPlayer from 'react-player';


const Video = () => {
    const { videoId } = useParams();
    const [ videoDetail, setVideoDetail ] = useState(null);

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
            .then((data) => {
                setVideoDetail(data.items[0]);
                console.log(data);
            });
    }, [videoId]);


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
                            style={{position :'absolute', top:0, left : 0}}
                        />
                    </div>
                    <div className='video__info'>
                        <h2 className='video__title'>
                            {videoDetail.snippet.title}
                        </h2>
                        <div className='video__channel'>
                            <div className='id'>{videoDetail.snippet.channelId}</div>
                            <div className='count'>
                                <span className='view'>조회수 : {videoDetail.statistics.viewCount}</span><br />
                                <span className='like'>좋아요 : {videoDetail.statistics.likeCount}</span><br />
                                <span className='comment'>댓글 : {videoDetail.statistics.commentCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Video