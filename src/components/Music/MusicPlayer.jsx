import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';
import { RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri';
import ElasticSlider from '../../ui-components/ElasticSlider';
import './MusicPlayer.css';

const tracks = [
  {
    title: 'Relado',
    url: '../../../public/collection/001-Mgzavrebi_-_Relado_(SkySound.cc).mp3',
  },
  {
    title: 'Lyubov HD1080',
    url: '../../../public/collection/Каспийский Груз - Любовь HD1080 (3).mp3',
  },
  {
    title: 'Nikogda',
    url: '../../../public/collection/LSP_-_Nikogda_(SkySound.cc).mp3',
  },
  {
    title: 'Nejt Diaz',
    url: '../../../public/collection/makulatura_-_nejt_diaz_(SkySound.cc).mp3',
  },
  {
    title: 'Ne Otpuskaj NR',
    url: '../../../public/collection/Marselle_-_Ne_otpuskaj_NR_(SkySound.cc).mp3',
  },
  {
    title: 'Palmy RapNews',
    url: '../../../public/collection/maslo_chernogo_tmina_-_palmy_RapNews_(SkySound.cc).mp3',
  },
  {
    title: 'Blizitsja Rassvet',
    url: '../../../public/collection/svidanie-blizitsja-rassvet.mp3',
  },
  {
    title: 'Vstrechay Vostok',
    url: '../../../public/collection/yerkatt-feat.-lsp-amp-iyulina-vstrechajj-vostok.mp3',
  },
];

// Компонент музыкального плеера
const MusicPlayer = () => {
  // Состояния компонента
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Индекс текущего трека
  const [isPlaying, setIsPlaying] = useState(false); // Статус воспроизведения
  const [volume, setVolume] = useState(50); // Уровень громкости
  const [showPopup, setShowPopup] = useState(true); // Показывать popup
  const [showPlayer, setShowPlayer] = useState(false); // Показывать плеер
  const audioRef = useRef(new Audio()); // Ссылка на аудиоэлемент

  // Обработчик переключения на следующий трек
  const handleNext = () => {
    const next = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(next);
  };

  // Обработчик переключения на предыдущий трек
  const handlePrev = () => {
    const prev = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prev);
  };

  // Обработчик изменения громкости
  const handleVolumeChange = (arg) => {
    let newValue = arg;
    if (typeof arg !== 'number') {
      newValue = arg.value || arg.target.value || 0;
    }
    const newVolume = Math.max(0, Math.min(100, newValue));
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  // Обработчик выбора "Yes" в popup
  const handlePlayMusic = () => {
    setShowPlayer(true); // Показываем плеер
    setIsPlaying(true); // Запускаем воспроизведение
    setShowPopup(false); // Скрываем popup
  };

  // Обработчик выбора "No" в popup
  const handleClosePopup = () => {
    setShowPopup(false); // Скрываем popup, плеер остается скрытым
  };

  // Управление воспроизведением при изменении isPlaying
  useEffect(() => {
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((error) => console.error('Ошибка воспроизведения:', error));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Смена трека при изменении currentTrackIndex
  useEffect(() => {
    audioRef.current.src = tracks[currentTrackIndex].url;
    audioRef.current.volume = volume / 100;
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((error) => console.error('Ошибка воспроизведения:', error));
    }
  }, [currentTrackIndex]);

  // Обновление громкости при изменении volume
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  // Автоматическое переключение на следующий трек при окончании текущего
  useEffect(() => {
    const handleTrackEnd = () => {
      handleNext();
    };
    audioRef.current.addEventListener('ended', handleTrackEnd);
    return () => {
      audioRef.current.removeEventListener('ended', handleTrackEnd);
    };
  }, [currentTrackIndex]);

  return (
    <>
      {/* Popup с вопросом */}
      {showPopup && (
        <div className='popup-overlay'>
          <div className='popup-card'>
            <h2 className='popup-title'>
              Хотите прослушать свою любимую музыку?
            </h2>
            <div className='popup-buttons'>
              <button
                className='popup-button popup-button-yes'
                onClick={handlePlayMusic}
              >
                Yes
              </button>
              <button
                className='popup-button popup-button-no'
                onClick={handleClosePopup}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Плеер, отображается только если showPlayer === true */}
      {showPlayer && (
        <div className='music-bar'>
          <button
            className='music-btn'
            onClick={handlePrev}
            aria-label='Предыдущий трек'
          >
            <FaBackward />
          </button>
          <button
            className='music-btn center'
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
          >
            {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '4px' }} />}
          </button>
          <button
            className='music-btn'
            onClick={handleNext}
            aria-label='Следующий трек'
          >
            <FaForward />
          </button>
          <div className='volume-control'>
            <ElasticSlider
              leftIcon={RiVolumeDownFill}
              rightIcon={RiVolumeUpFill}
              value={volume}
              maxValue={100}
              isStepped
              stepSize={1}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
