import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api';
import { AiFillEye, AiOutlineVideoCameraAdd,AiOutlineTeam } from "react-icons/ai";


const Channel = () => {
    const { channelId } = useParams();
    const [ channelDetail, setChannelDetail ] = useState();
    const [ latestVideos, setLatestVideos ] = useState();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await fetchFromAPI(`channels?part=snippet&id=${channelId}`);
                setChannelDetail(data.items[0]);
            } catch(error){
                console.log("Error fetching data", error);
            }
        };

        const fetchLatestVideos  = async () => {
            try {
                const vData = await fetchFromAPI(`search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=5`);
                setLatestVideos(vData.items);
            } catch(error){
                console.log("Error fetching latest videos", error);
            }
        }
        fetchLatestVideos();
        fetchResults();
    }, [channelId]);

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
                            <span><AiOutlineTeam />{channelDetail.statistics.subscriberCount}</span>
                            <span><AiOutlineVideoCameraAdd />{channelDetail.statistics.videoCount}</span>
                            <span><AiFillEye />{channelDetail.statistics.viewCount}</span>
                        </div>
                        <p className='desc'>{channelDetail.snippet.description}</p>
                    </div>
                    <h3 className='inner__title'>최신 동영상</h3>
                    <div className='channel__video video__inner'>
                        {latestVideos.map((video) => (
                            <div key={video.id.videoId} className='video-card'>
                                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                                <p>{video.snippet.title}</p>
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