import { FcVideoCall, FcLike, FcSearch } from 'react-icons/fc'
// import { ImPlay3 } from "react-icons/im";
import { ImGithub, ImInstagram, ImCodepen } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";


export const menuText = [
    {
        title: "다큐 유튜버",
        icon: <FcVideoCall />,
        src: "/"
    },{
        title: "인생 다큐",
        icon: <FcLike />,
        src: "/today"
    },{
        title: "추천 다큐",
        icon: <FcSearch />,
        src: "/youtuber"
    }
]

export const keywordText = [
    {
        title: "KBS 다큐",
        src: "/search/KBS다큐"
    },{
        title: "EBS 다큐",
        src: "/search/EBS다큐"
    },{
        title: "KBS 뭉클티비",
        src: "/search/KBS뭉클티비"
    },{
        title: "내셔널지오그래픽",
        src: "/search/네셔널지오그래픽"
    },{
        title: "히스토리",
        src: "/search/히스토리"
    },{
        title: "SBS DALI",
        src: "/search/SBSDALI"
    },{
        title: "KBS 생로병사의 비밀",
        src: "/search/KBS생로병사의비밀"
    },{
        title: "KBS여행 걸어서 세계속으로",
        src: "/search/KBS걸어서세계속으로"
    }
]

export const snsText = [
    {
        title: "github",
        src: "https://github.com/audgns722",
        icon: <ImGithub />
    },{
        title: "youtube",
        src: "https://youtube.com/@user-ky5tb8xg1b?si=oWG8CUkqX9wd0TeB",
        icon: <IoLogoYoutube />
    },{
        title: "instagram",
        src: "https://instagram.com/",
        icon: <ImInstagram />
    },{
        title: "codepen",
        src: "https://codepen.io/",
        icon: <ImCodepen />
    }
]