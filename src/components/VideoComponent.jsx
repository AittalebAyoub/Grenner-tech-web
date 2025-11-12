import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

const ServiceVideo = ({ serviceId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Données dynamiques des vidéos par service
  const videosData = {
    1: {
      thumbnail: '/ficelle.jpg',
      title: 'ECO-Friendly Products can be Made from Scratch',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    2: {
      thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=500&fit=crop',
      title: 'Sustainable Farming Methods for the Future',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    3: {
      thumbnail: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=1200&h=500&fit=crop',
      title: 'Smart Irrigation Technology Explained',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  };

  const video = videosData[serviceId] || videosData[1];

  return (
    <section className="service-video">
      <div className="service-video-container">
        {!isPlaying ? (
          <>
            {/* Thumbnail with Overlay */}
            <div 
              className="service-video-thumbnail"
              style={{ backgroundImage: `url(${video.thumbnail})` }}
            >
              <div className="service-video-overlay"></div>
              
              {/* Play Button */}
              <button 
                className="service-video-play-btn"
                onClick={() => setIsPlaying(true)}
              >
                <FaPlay />
              </button>

              {/* Title */}
              <h2 className="service-video-title">{video.title}</h2>
            </div>
          </>
        ) : (
          /* Video Iframe */
          <div className="service-video-iframe-wrapper">
            <iframe
              width="100%"
              height="500"
              src={`${video.videoUrl}?autoplay=1`}
              title="Service Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceVideo;