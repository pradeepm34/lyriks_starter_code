import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import 'swiper/css';
import 'swiper/css/free-mode';
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePlayClick, handlePauseClick }) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounder-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img src={song?.images?.coverart} alt="song?.title"
          className="w-20 h-20 rounded-lg" />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song?.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song?.artists[0]?.adamid}`}>
            <p className="text-base text-gray-300 mt-1 ">{song?.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        song={song}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick} />
    </div>
  )
}

const TopPlay = () => {

  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => divRef.current.scrollIntoView({ behaviour: 'smooth' }));

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const topPlays = data?.slice(0, 5);

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <link to="/top-charts"></link>
          <p className="text-gray-300 text-base cursor-pointer">See more</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {topPlays?.map((song, i) => <TopChartCard
          song={song}
          i={i}
          key={i}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={() => handlePlayClick(song, i)}
        />)}
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <link to="/top-artists"></link>
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </div>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => <SwiperSlide song={song} i={i} key={song.key}
            style={{ width: '25%', height: 'auto' }} className="shadow-lg rounded-full">
            <Link to={`/artists/${song?.artists[0]?.adamid}`}>
              <img src={song?.images.background} alt="name"
                className="rounded-full w-full object-cover" />
            </Link>
          </SwiperSlide>)}
        </Swiper>
      </div>
    </div>
  );
}

export default TopPlay;
