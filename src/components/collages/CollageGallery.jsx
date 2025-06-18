import React from 'react';
import './collages.css';
import About_me from '../About_me/About_me'; // Adjust path based on your project structure
import may from '../../../public/assets/may.png';
import tigers from '../../../public/assets/tigers.png';
import watchToEyes from '../../../public/assets/watch_to_eyes.png';
import yourFace from '../../../public/assets/your_face.png';
import fear from '../../../public/assets/fear.png';
import heart from '../../../public/assets/heart.png';

const collages = [
  {
    src: may,
    alt: 'Не унывай!',
    title: 'Не унывай!',
  },
  {
    src: tigers,
    alt: 'Тигры',
    title: 'Тигры',
  },
  {
    src: watchToEyes,
    alt: 'Смотри в глаза',
    title: 'Смотри в глаза',
  },
  {
    src: yourFace,
    alt: '...Не забуду лица твоего',
    title: '...Не забуду лица твоего',
  },
  {
    src: heart,
    alt: 'Не сокращай расстояние',
    title: 'Не сокращай расстояние',
  },
  {
    src: fear,
    alt: 'В твоих глазах я вижу страх',
    title: 'В твоих глазах я вижу страх',
  },
];

const CollageGallery = () => {
  const midPoint = Math.ceil(collages.length / 2); // Split after 3rd collage
  const firstHalf = collages.slice(0, midPoint);
  const secondHalf = collages.slice(midPoint);

  return (
    <div className='gallery'>
      <div className='collageColumn'>
        {firstHalf.map((collage, index) => (
          <div key={`first-${index}`} className='collageItem'>
            <div className='imageContainer'>
              <img src={collage.src} alt={collage.alt} className='image' />
            </div>
            <p className='title'>{collage.title}</p>
          </div>
        ))}
      </div>
      <div className='aboutMeContainer'>
        <About_me />
      </div>
      <div className='collageColumn'>
        {secondHalf.map((collage, index) => (
          <div key={`second-${index}`} className='collageItem'>
            <div className='imageContainer'>
              <img src={collage.src} alt={collage.alt} className='image' />
            </div>
            <p className='title'>{collage.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollageGallery;
