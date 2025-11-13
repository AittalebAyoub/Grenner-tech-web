import React from 'react';
import { FaCheck, FaTwitter } from 'react-icons/fa';

// Importez ici un composant ou une librairie si vous utilisez le rendu de contenu riche (ex: react-markdown)

// ATTENTION: Nous recevons maintenant l'objet serviceData complet
const ServiceContent = ({ serviceData }) => {
  
  // Si le serviceData n'est pas encore chargé, on retourne null ou un message d'attente
  if (!serviceData) {
    return null; 
  }

  // --- 1. Extraction des données de Strapi ---
  const titre = serviceData.titre || "Contenu du Service";
  
  // Champs de contenu et listes
  const detailedContentBlocks = serviceData.description_detailler;
  const benefices = serviceData.benefices_avanages;
  const indicateurs = serviceData.indicateurs_performance;

  // Champs d'images (Nous supposons galerie_images est un tableau de média)
  const mainImage = serviceData.image_cover?.url;
  const secondaryImage1 = serviceData.galerie_images?.[0]?.url;
  const secondaryImage2 = serviceData.galerie_images?.[1]?.url;
  
  // --- Fonction pour afficher le Contenu Riche (Rich Text) ---
  // RAPPEL : Ce rendu est simple. Dans un projet réel, il faut un parseur (ex: 'strapi-blocks-renderer')
  const renderRichText = (blocks) => {
    return blocks.map((block, index) => {
      // Pour les blocs de type 'paragraph'
      if (block.type === 'paragraph' && block.children) {
        return (
          <p key={index}>
            {block.children.map((child, childIndex) => {
              // Applique le style (bold, italic, etc.)
              const style = {
                fontWeight: child.bold ? 'bold' : 'normal',
                fontStyle: child.italic ? 'italic' : 'normal',
                // Ajoutez d'autres styles comme souligné, code, etc.
              };
              // Utilise une balise span pour appliquer le style
              return <span key={childIndex} style={style}>{child.text}</span>;
            })}
          </p>
        );
      }
      // Ajoutez ici la gestion pour d'autres types (listes, headings, images embarquées...)
      return null;
    });
  };

  return (
    <section className="service-content">
      <div className="container">
        <div className="service-content-wrapper">
          
          {/* Section d'images - 1 Gauche, 2 Droite */}
          <div className="service-images-section">
            {/* Image Principale à Gauche (Image de Couverture) */}
            {mainImage && (
              <div className="service-image-left">
                <img 
                  src={mainImage}
                  alt={`${titre} - Image principale`}
                />
              </div>
            )}

            {/* Images Secondaires à Droite (Galerie d'images) */}
            {(secondaryImage1 || secondaryImage2) && (
              <div className="service-images-right">
                {secondaryImage1 && (
                  <div className="service-image-right">
                    <img 
                      src={secondaryImage1}
                      alt={`${titre} - Image secondaire 1`}
                    />
                  </div>
                )}
                {secondaryImage2 && (
                  <div className="service-image-right">
                    <img 
                      src={secondaryImage2}
                      alt={`${titre} - Image secondaire 2`}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content + Stats Layout */}
          <div className="service-content-with-stats">
            
            {/* Left Side - Text Content */}
            <div className="service-content-left">
              <h2 className="service-content-title">{titre}</h2>
              
              {/* Rendu du Contenu Détaillé (Rich Text Strapi) */}
              <div className="rich-text-content">
                {detailedContentBlocks && renderRichText(detailedContentBlocks)}
              </div>
              
              {/* Les sections de 'quote' et 'additionalText' de votre template
                  sont maintenant fusionnées dans le contenu riche de Strapi (description_detailler).
                  Si vous voulez extraire spécifiquement une citation, il faudrait la créer comme un champ séparé dans Strapi. */}

            </div>

            {/* Right Side - Stats Vertical (Indicateurs de Performance) */}
            <div className="service-content-right">
              <div className="service-stats">
                {indicateurs && indicateurs.map((stat, index) => (
                  <div key={stat.id || index} className="stat-item">
                    {/* La couleur est codée en dur dans votre maquette. 
                        Nous utilisons une couleur par défaut, ou vous pouvez ajouter ce champ dans Strapi. */}
                    <div className="stat-bar-top" style={{ backgroundColor: index % 2 === 0 ? '#4BAF47' : '#FFB800' }}></div>
                    <div className="stat-header">
                      <FaTwitter className="stat-icon" /> {/* Icône statique */}
                      <div className="stat-content">
                        <span className="stat-value">{stat.valeur} {stat.unite === 'POURCENTAGE' ? '%' : stat.unite}</span>
                        <span className="stat-label">{stat.titre}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits - Full Width (Bénéfices et Avantages) */}
          {benefices && benefices.length > 0 && (
            <div className="service-benefits">
              <h3 className="benefits-title">Bénéfices et Avantages</h3>
              
              {benefices.map((benefit, index) => (
                <div key={benefit.id || index} className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <div className="benefit-content">
                    {/* Utilisez titre et description de benefices_avanages */}
                    <h4>{benefit.titre}</h4>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceContent;