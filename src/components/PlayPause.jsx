import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, song, activeSong, handlePlay, handlePause }) => (isPlaying && song?.title === activeSong?.title ?
  <FaPauseCircle
    size={35}
    className="text-gray-300"
    onClick={handlePause}
  /> :
  <FaPlayCircle
    size={35}
    className="text-gray-300"
    onClick={handlePlay}
  />)

export default PlayPause;
