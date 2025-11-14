import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

// Ce composant est conçu pour la page de détail d'un article de blog (BlogDetail.jsx)
const BlogDetailHero = ({ blogData }) => {
    
    // Extrait le titre de l'article à partir des données passées.
    // L'objet 'blogData' est le 'blog' chargé dans BlogDetail.jsx, 
    // qui contient le champ 'titre'.
    const title = blogData?.titre || 'Détail de l\'Article';
    const breadcrumbLabel = blogData?.titre || 'Article'; 
    
    // NOTE : L'image de fond et le style général de la section sont gérés 
    // par le CSS de la classe .blog-hero.
    
    return (
        <section 
            className="blog-hero"
            // L'attribut 'style' n'est pas utilisé ici, il est géré par le CSS
        >
            {/* L'overlay est nécessaire pour améliorer le contraste du texte sur l'image de fond */}
            <div className="blog-hero-overlay"></div> 
            
            <div className="blog-hero-content">
                <div className="blog-breadcrumb">
                    {/* Lien vers l'accueil */}
                    <Link to="/">Accueil</Link>
                    <FaChevronRight className="breadcrumb-icon" />
                    
                    {/* Lien vers la page de listing des blogs */}
                    {/* Assurez-vous que l'URL vers votre page de listing est bien '/blog' */}
                    <Link to="/#blogs">Blog</Link> 
                    <FaChevronRight className="breadcrumb-icon" />
                    
                </div>
                
                {/* Titre principal de la page, dynamique */}
                <h1 className="blog-hero-title">{title}</h1>
            </div>
        </section>
    );
};

export default BlogDetailHero;