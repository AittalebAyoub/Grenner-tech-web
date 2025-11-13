import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

// Nous recevons maintenant l'objet serviceData complet pour accéder à la vidéo et à l'image de couverture
const VideoComponent = ({ serviceData }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // --- 1. Extraction des données de Strapi ---
  const videoObject = serviceData?.video;
  const serviceTitle = serviceData?.titre || 'Vidéo de présentation';
  
  // URL du fichier vidéo hébergé (l'attribut 'url' de l'objet média)
  const videoUrl = videoObject?.url; 
  console.log(videoUrl)
  // Miniature : on utilise la previewUrl Strapi si elle existe, sinon l'image de couverture du service
  const thumbnailUrl = videoObject?.previewUrl || serviceData?.image_cover?.url; 

  // --- Gestion de l'affichage ---
  
  // Si aucune URL de vidéo n'est présente, on ne rend rien.
  if (!videoUrl) {
    return null;
  }

  return (
    <section className="service-video">
      <div className="service-video-container">
        {!isPlaying ? (
          // --- ÉTAT 1 : Affiche la Miniature et le Bouton Play ---
          <>
            <div 
              className="service-video-thumbnail"
              // Utilise la miniature pour l'arrière-plan
              style={{ backgroundImage: `url(${thumbnailUrl})` }}
            >
              <div className="service-video-overlay"></div>
              
              {/* Bouton Play qui passe à l'état de lecture */}
              <button 
                className="service-video-play-btn"
                onClick={() => setIsPlaying(true)}
              >
                <FaPlay />
              </button>

              {/* Titre du service */}
              <h2 className="service-video-title">{serviceTitle}</h2>
            </div>
          </>
        ) : (
          // --- ÉTAT 2 : Affiche le Lecteur Vidéo HTML5 ---
          <div className="service-video-wrapper">
            <video
              width="100%"
              height="500"
              controls
              autoPlay // Lance la lecture automatiquement
              poster={thumbnailUrl} // Affiche la miniature avant que la vidéo ne se charge
              className="strapi-video-player"
            >
              <source src={videoUrl} type={videoObject.mime} />
              Votre navigateur ne supporte pas la balise vidéo.
            </video>
            
            {/* Si vous voulez un bouton pour revenir à l'état de miniature, ajoutez-le ici */}
            {/* <button onClick={() => setIsPlaying(false)}>Fermer la Vidéo</button> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoComponent;