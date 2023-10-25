import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api';
import { AiFillEye, AiOutlineVideoCameraAdd, AiOutlineTeam } from "react-icons/ai";
import VideoSearch from '../components/video/VideoSearch';

const Channel = () => {
    const { channelId } = useParams();
    const [ channelDetail, setChannelDetail ] = useState();
    const [ channelVideo, setChannelVideo ] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await fetchFromAPI(`channels?part=snippet&id=${channelId}`);
                setChannelDetail(data.items[0]);

                const videosData = await fetchFromAPI(`search?channelId=${channelId}&part=snippet&order=date`);
                console.log(videosData);
                setChannelVideo(videosData.items);

            } catch (error) {
                console.log("Error fetching data", error);
            }
        };

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
            {channelDetail && (
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
                        <VideoSearch videos={channelVideo}/>
                    </div>
                    <div className='channel__more'></div>
                </div>
            )}
        </section>
    )
}

export default Channel