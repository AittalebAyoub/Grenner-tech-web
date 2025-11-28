import React from 'react';
import { FaCheck, FaTwitter } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

// Fonctions de rendu du contenu riche (inchangées)
const renderText = (children) => {
    return children.map((child, childIndex) => {
        if (child.type === 'link' && child.url) {
            return (
                <a key={childIndex} href={child.url} target="_blank" rel="noopener noreferrer" className="rich-text-link">
                    {renderText(child.children)}
                </a>
            );
        }

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

const renderRichText = (blocks) => {
    return blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === 'heading' && block.children) {
            const HeadingTag = `h${block.level || 3}`; 
            return (
                <HeadingTag key={key} className={`rich-text-heading rich-text-h${block.level || 3}`}>
                    {renderText(block.children)}
                </HeadingTag>
            );
        }

        if (block.type === 'paragraph' && block.children) {
            return (
                <p key={key} className="rich-text-paragraph">
                    {renderText(block.children)}
                </p>
            );
        }

        if (block.type === 'list' && block.children) {
            const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
            return (
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
        
        return null;
    });
};

const ServiceContent = ({ serviceData }) => {
    const { locale } = useLanguage();
    
    const translations = {
        fr: {
            error: 'Erreur',
            errorMessage: 'Impossible de charger le détail de ce service.',
            statsTitle: 'Indicateurs de Performance',
            benefitsTitle: 'Bénéfices et Avantages Clés'
        },
        en: {
            error: 'Error',
            errorMessage: 'Unable to load service details.',
            statsTitle: 'Performance Indicators',
            benefitsTitle: 'Key Benefits and Advantages'
        },
        ar: {
            error: 'خطأ',
            errorMessage: 'تعذر تحميل تفاصيل الخدمة.',
            statsTitle: 'مؤشرات الأداء',
            benefitsTitle: 'الفوائد والمزايا الرئيسية'
        }
    };

    const t = translations[locale];
    
    if (!serviceData) {
        return (
            <div className="error-message-container">
                <h1 className="error-title">{t.error}</h1>
                <p className="error-text">{t.errorMessage}</p>
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
        <section className={`service-content ${locale === 'ar' ? 'rtl' : ''}`}>
            <div className="container">
                <div className="service-content-wrapper">
                    
                    <div className="service-images-section">
                        {mainImage && (
                            <div className="service-image-left">
                                <img 
                                    src={mainImage}
                                    alt={`${titre} - Image principale`}
                                    className="main-image"
                                />
                            </div>
                        )}

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

                    <div className="service-content-with-stats">
                        <div className="service-content-left">
                            <div className="rich-text-content">
                                {detailedContentBlocks && renderRichText(detailedContentBlocks)}
                            </div>
                        </div>

                        <div className="service-content-right">
                            <h3 className="stats-title">{t.statsTitle}</h3>
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
                            <h3 className="benefits-title">{t.benefitsTitle}</h3>
                            
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