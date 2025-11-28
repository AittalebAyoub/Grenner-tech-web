import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const BlogDetailHero = ({ blogData }) => {
    const { locale } = useLanguage();
    
    const translations = {
        fr: {
            home: 'Accueil',
            blog: 'Blog'
        },
        en: {
            home: 'Home',
            blog: 'Blog'
        },
        ar: {
            home: 'الرئيسية',
            blog: 'المدونة'
        }
    };

    const t = translations[locale];
    const title = blogData?.titre || t.blog;
    
    return (
        <section className={`blog-hero ${locale === 'ar' ? 'rtl' : ''}`}>
            <div className="blog-hero-overlay"></div> 
            
            <div className="blog-hero-content">
                <div className="blog-breadcrumb">
                    <Link to="/">{t.home}</Link>
                    <FaChevronRight className="breadcrumb-icon" />
                    <Link to="/#blogs">{t.blog}</Link> 
                    <FaChevronRight className="breadcrumb-icon" />
                </div>
                
                <h1 className="blog-hero-title">{title}</h1>
            </div>
        </section>
    );
};

export default BlogDetailHero;