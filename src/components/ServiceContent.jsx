import React from 'react';
import { FaCheck, FaTwitter } from 'react-icons/fa';

// ... (Importations FaCheck, FaTwitter, React)

// ----------------------------------------------------------------------------------
// --- Fonctions de Rendu du Contenu Riche (Rich Text Renderer) ---------------------
// ----------------------------------------------------------------------------------

// Fonction interne pour appliquer le style de texte (gras, italique, lien) - Pas de changement structurel ici
const renderText = (children) => {
    // ... (Logique de renderText inchangée)
    return children.map((child, childIndex) => {
        // Gère les liens
        if (child.type === 'link' && child.url) {
            return (
                <a key={childIndex} href={child.url} target="_blank" rel="noopener noreferrer" className="rich-text-link">
                    {renderText(child.children)}
                </a>
            );
        }

        // Gère les styles de base (texte)
        const style = {
            fontWeight: child.bold ? 'bold' : 'normal',
            fontStyle: child.italic ? 'italic' : 'normal',
        };

        return (
            <span key={childIndex} style={style}>
                {child.text}
            </span>
        );
    });
};

// Fonction principale pour rendre les blocs de contenu riche (Headings, Paragraphs, Lists)
const renderRichText = (blocks) => {
    return blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        // 1. Gère les Titres (Headings) - Ajout de la classe "rich-text-heading"
        if (block.type === 'heading' && block.children) {
            const HeadingTag = `h${block.level || 3}`; 
            return (
                <HeadingTag key={key} className={`rich-text-heading rich-text-h${block.level || 3}`}>
                    {renderText(block.children)}
                </HeadingTag>
            );
        }

        // 2. Gère les Paragraphes (Paragraphs) - Ajout de la classe "rich-text-paragraph"
        if (block.type === 'paragraph' && block.children) {
            return (
                <p key={key} className="rich-text-paragraph">
                    {renderText(block.children)}
                </p>
            );
        }

        // 3. Gère les Listes (Lists) - Ajout de la classe "rich-text-list"
        if (block.type === 'list' && block.children) {
            const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
            return (
                // C'est ici que l'indentation (padding-left) sera gérée par la classe CSS
                <ListTag key={key} className={`rich-text-list rich-text-${block.format}`}>
                    {block.children.map((listItem, itemIndex) => {
                        if (listItem.type === 'list-item' && listItem.children) {
                            return (
                                <li key={itemIndex}>
                                    {renderText(listItem.children)}
                                </li>
                            );
                        }
                        return null;
                    })}
                </ListTag>
            );
        }
        
        // Gère les autres types non pris en charge
        return null;
    });
};


// ----------------------------------------------------------------------------------
// --- Composant Principal : ServiceContent -----------------------------------------
// ----------------------------------------------------------------------------------

const ServiceContent = ({ serviceData }) => {
    
    // ... (Logique d'extraction des données et gestion d'erreur inchangée)
    if (!serviceData) {
        return (
            <div className="error-message-container">
                <h1 className="error-title">Erreur</h1>
                <p className="error-text">Impossible de charger le détail de ce service.</p>
            </div>
        );
    }
    const titre = serviceData.titre || "Contenu du Service";
    const detailedContentBlocks = serviceData.description_detailler;
    const benefices = serviceData.benefices_avanages;
    const indicateurs = serviceData.indicateurs_performance;
    const mainImage = serviceData.image_cover?.url;
    const secondaryImage1 = serviceData.galerie_images?.[0]?.url;
    const secondaryImage2 = serviceData.galerie_images?.[1]?.url;


    return (
        <section className="service-content">
            <div className="container">
                <div className="service-content-wrapper">
                    
                    {/* 1. Section d'images (Structure: 1 Grande image à gauche, 2 petites à droite) */}
                    {/* ... (Code de la section Images inchangé) ... */}
                    <div className="service-images-section">
                        
                        {/* Image Principale à Gauche (Image de Couverture) */}
                        {mainImage && (
                            <div className="service-image-left">
                                <img 
                                    src={mainImage}
                                    alt={`${titre} - Image principale`}
                                    className="main-image"
                                />
                            </div>
                        )}

                        {/* Images Secondaires à Droite (Galerie d'images) */}
                        <div className="service-images-right">
                            {secondaryImage1 && (
                                <div className="service-image-right">
                                    <img 
                                        src={secondaryImage1}
                                        alt={`${titre} - Image secondaire 1`}
                                        className="secondary-image"
                                    />
                                </div>
                            )}
                            {secondaryImage2 && (
                                <div className="service-image-right">
                                    <img 
                                        src={secondaryImage2}
                                        alt={`${titre} - Image secondaire 2`}
                                        className="secondary-image"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 2. Content + Stats Layout (Structure: Contenu riche à gauche, Stats à droite) */}
                    <div className="service-content-with-stats">
                        
                        {/* Left Side - Text Content (Le contenu riche) */}
                        <div className="service-content-left">
                            {/* Le titre principal de la page est déjà rendu en haut, on met le contenu détaillé ici */}
                            <div className="rich-text-content">
                                {detailedContentBlocks && renderRichText(detailedContentBlocks)}
                            </div>
                        </div>

                        {/* Right Side - Stats Vertical (Indicateurs de Performance) */}
                        {/* ... (Code de la section Stats inchangé) ... */}
                        <div className="service-content-right">
                            <h3 className="stats-title">Indicateurs de Performance</h3>
                            <div className="service-stats">
                                {indicateurs && indicateurs.map((stat, index) => (
                                    <div key={stat.id || index} className="stat-item">
                                        <div className="stat-bar-top" style={{ backgroundColor: index % 2 === 0 ? '#4BAF47' : '#FFB800' }}></div>
                                        <div className="stat-header">
                                            <FaTwitter className="stat-icon" style={{ color: '#1DA1F2' }}/> 
                                            <div className="stat-content">
                                                <span className="stat-value">
                                                    {stat.prefixe || ''} {stat.valeur} {stat.unite === 'POURCENTAGE' ? '%' : stat.unite}
                                                </span>
                                                <span className="stat-label">{stat.titre}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {benefices && benefices.length > 0 && (
                        <div className="service-benefits">
                            <h3 className="benefits-title">Bénéfices et Avantages Clés</h3>
                            
                            <div className="benefits-list">
                                {benefices.map((benefit, index) => (
                                    <div key={benefit.id || index} className="benefit-item">
                                        <FaCheck className="benefit-check" style={{ color: '#4BAF47' }}/>
                                        <div className="benefit-content">
                                            <h4>{benefit.titre}</h4>
                                            <p>{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServiceContent;