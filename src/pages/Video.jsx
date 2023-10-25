import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api';
import ReactPlayer from 'react-player';
import { AiFillEye, AiFillLike, AiOutlineComment } from "react-icons/ai";



const Video = () => {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    const [videoComments, setVideoComments] = useState([]);

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
            .then((data) => {
                setVideoDetail(data.items[0]);
                console.log(data);
            });
        fetchFromAPI(`commentThreads?key=36c0488b9bmsha694c50fc1a58dap12df45jsn98128f857dfb&videoId=${videoId}&part=snippet`)
            .then((data) => {
                const comments = data.items.slice(0, 10); // 여기서 10은 원하는 댓글 개수입니다.
                console.log(comments);
                setVideoComments(comments);
            });
    }, [videoId]);

    const [expandedDesc, setExpandedDesc] = useState(false);
    const toggleDescription = () => {
        setExpandedDesc(!expandedDesc);
    };

    function formatNumberWithK(number) {
        if (number >= 1000) {
            // Add "k" when the number is over 1000
            return (number / 1000).toFixed(1) + "k";
        } else {
            // Numbers less than 1000 are displayed as is
            return number.toString();
        }
    }

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
                                <span><AiFillEye /> : {formatNumberWithK(videoDetail.statistics.viewCount)}</span>
                                <span><AiFillLike /> : {formatNumberWithK(videoDetail.statistics.likeCount)}</span>
                                <span><AiOutlineComment /> : {formatNumberWithK(videoDetail.statistics.commentCount)}</span>
                            </div>
                        </div>
                        <button className='video__moreBtn' onClick={toggleDescription}>
                            {expandedDesc ? '▲ 접기' : '▼ 더보기'}
                        </button>
                        <div className="video__desc">
                            {expandedDesc ? videoDetail.snippet.description : videoDetail.snippet.description.split('\n', 2).join('\n')}
                        </div>
                        <div className="video__comments">
                            {videoComments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <p>💬 {comment.snippet.topLevelComment.snippet.authorDisplayName} : {comment.snippet.topLevelComment.snippet.textOriginal}</p>
                                    {/* 이외의 다른 댓글 정보를 표시할 수 있습니다. */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Video