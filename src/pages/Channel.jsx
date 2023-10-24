import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api';
import { AiFillEye, AiOutlineVideoCameraAdd, AiOutlineTeam } from "react-icons/ai";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const Channel = () => {
    const { channelId } = useParams();
    const [channelDetail, setChannelDetail] = useState();
    const [latestVideos, setLatestVideos] = useState();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await fetchFromAPI(`channels?part=snippet&id=${channelId}`);
                setChannelDetail(data.items[0]);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };

        const fetchLatestVideos = async () => {
            try {
                const Data = await fetchFromAPI(`search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=5`);
                setLatestVideos(Data.items);
            } catch (error) {
                console.log("Error fetching latest videos", error);
            }
        }
        fetchLatestVideos();
        fetchResults();
    }, [channelId]);

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
        <section id='channel'>
            {(channelDetail && latestVideos) && (
                <div className='channel__inner'>
                    <div className='channel__header' style={{ backgroundImage: `url(${channelDetail.brandingSettings.image.bannerExternalUrl})` }}>
                        <div className='circle'>
                            <img src={channelDetail.snippet.thumbnails.high.url} alt={channelDetail.snippet.title} />
                        </div>
                    </div>
                    <div className='channel__info'>
                        <h3 className='title'>{channelDetail.snippet.title}</h3>
                        <div className='info'>
                            <span><AiOutlineTeam />{formatNumberWithK(channelDetail.statistics.subscriberCount)}</span>
                            <span><AiOutlineVideoCameraAdd />{formatNumberWithK(channelDetail.statistics.videoCount)}</span>
                            <span><AiFillEye />{formatNumberWithK(channelDetail.statistics.viewCount)}</span>
                        </div>
                        <p className='desc'>{channelDetail.snippet.description}</p>
                    </div>
                    <h3 className='inner__title'>최신 동영상</h3>
                    <div className='channel__video video__inner'>
                        {latestVideos.map((video, key) => (
                            <div className='video' key={key}>
                                <div className='video__thumb play__icon'>
                                    <Link
                                        to={`/video/${video.id.videoId}`}
                                        style={{ backgroundImage: `url(${video.snippet.thumbnails.high.url})` }}
                                    >
                                    </Link>
                                </div>
                                <div className='video__info'>
                                    <div className='title'>
                                        <Link to={`/video/${video.id.videoId}`}>{video.snippet.title}</Link>
                                    </div>
                                    <div className="desc">
                                        {video.snippet.description}
                                    </div>
                                    <div className='info'>
                                        <Link to={`/channel/${video.snippet.channelId}`} className='author'>{video.snippet.channelTitle}</Link>
                                        <span className='date'>{formatDate(video.snippet.publishedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='channel__more'></div>
                </div>
            )}
        </section>
    )
}

export default Channel