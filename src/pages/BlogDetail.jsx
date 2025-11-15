import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUser, FaClock, FaQuoteLeft, FaChevronRight } from 'react-icons/fa'; 
// FaChevronRight n'est pas utilisé ici mais souvent utile pour les breadcrumbs

import Header from '../components/Header';
import Partners from '../components/Partners';
import Footer from '../components/Footer';
import BlogHero from '../components/BlogHero';

// Fonction utilitaire pour extraire l'URL de l'image de couverture
const getImageUrl = (item, baseUrl) => {
    // Tente de récupérer le premier élément du tableau 'image_coverture'
    const imageObject = Array.isArray(item?.image_coverture)
        ? item.image_coverture[0]
        : item?.image_coverture; 

    const url = imageObject?.url;

    if (url) {
        // Si l'URL est absolue (commence par http), on la retourne directement (cas Strapi Cloud)
        if (url.startsWith('http')) {
            return url;
        }
        // Sinon, elle est relative, on préfixe avec l'URL de base des médias
        return `${baseUrl}${url}`;
    }
    // URL par défaut si aucune image n'est trouvée
    return '/placeholder.jpg'; 
};

// --- 1. Fonction interne pour appliquer le style de texte (gras, italique, lien) ---
const renderText = (children) => {
    return children.map((child, childIndex) => {
        const key = `text-${childIndex}`;
        
        // Gère les liens
        if (child.type === 'link' && child.url) {
            return (
                <a key={key} href={child.url} target="_blank" rel="noopener noreferrer" className="rich-text-link">
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
            <span key={key} style={style}>
                {child.text}
            </span>
        );
    });
};

// --- 2. Fonction principale pour rendre les blocs de contenu riche (Headings, Paragraphs, Lists) ---
const renderRichText = (blocks) => {
    if (!Array.isArray(blocks)) return null;

    return blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        // 1. Gère les Titres (Headings)
        if (block.type === 'heading' && block.children) {
            const HeadingTag = `h${block.level || 3}`; 
            return (
                <HeadingTag key={key} className={`rich-text-heading rich-text-h${block.level || 3}`}>
                    {renderText(block.children)}
                </HeadingTag>
            );
        }

        // 2. Gère les Paragraphes (Paragraphs)
        if (block.type === 'paragraph' && block.children) {
            return (
                <p key={key} className="rich-text-paragraph">
                    {renderText(block.children)}
                </p>
            );
        }

        // 3. Gère les Listes (Lists)
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

// --- 3. Fonction pour rendre les Dynamic Zones spécifiques au Blog ---
const renderBlogContentBlocks = (contentBlocks) => {
    if (!Array.isArray(contentBlocks)) return null;

    return contentBlocks.map((block, index) => {
        const key = `dyn-block-${index}`;

        // Bloc: Paragraphe Riche (qui contient le Rich Text de Strapi)
        if (block.__component === 'bloc.paragraphe-riche' && block.texte) {
            return (
                <div key={key} className="blog-rich-text-wrapper">
                    {/* On appelle renderRichText pour gérer les titres, paragraphes et listes internes */}
                    {renderRichText(block.texte)}
                </div>
            );
        }

        // Bloc: Citation
        if (block.__component === 'bloc.citation' && block.texte_citation) {
            return (
                <blockquote key={key} className="blog-citation-block">
                    <FaQuoteLeft className="quote-icon" />
                    <p className="citation-text">{block.texte_citation}</p>
                    {block.source && <footer className="citation-source">— {block.source}</footer>}
                </blockquote>
            );
        }

        // Ajoutez ici d'autres types de blocs si vous en avez (ex: image)
        // ...

        return null;
    });
};


// ==================================================================================
// === COMPOSANT PRINCIPAL : BLOG DETAIL ============================================
// ==================================================================================

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Gestion des URLs de l'API ---
    const API_URL = process.env.REACT_APP_STRAPI_API_URL;
    const API_BASE_MEDIA_URL = API_URL?.replace('/api', '');

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setLoading(true);

                // Appel 1: Récupérer le blog détail
                const blogResponse = await fetch(`${API_URL}/blogs/${id}?populate=*`);
                if (!blogResponse.ok) throw new Error('Blog non trouvé');
                const blogData = await blogResponse.json();
                setBlog(blogData.data);

                // Appel 2: Récupérer les 3 derniers blogs
                const blogsResponse = await fetch(`${API_URL}/blogs?populate=*&pagination[pageSize]=4&sort[0]=id:desc`);
                
                if (!blogsResponse.ok) {
                    const errorText = await blogsResponse.text();
                    console.error('API Error Response:', errorText);
                    throw new Error('Erreur lors du chargement des blogs');
                }
                
                const blogsData = await blogsResponse.json();
                
                // Filtrer le blog actuel et prendre les 3 premiers
                const filteredRecentBlogs = (blogsData.data || [])
                    .filter(post => post.id.toString() !== id)
                    .slice(0, 3); 
                    
                setRecentBlogs(filteredRecentBlogs);

            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('Erreur lors du chargement du blog ou API injoignable.');
            } finally {
                setLoading(false);
            }
        };

        if (id && API_URL) {
            fetchBlogData();
        }
    }, [id, API_URL]); 

    if (loading) {
        return (
            <>
           
                <div className="blog-detail-content" style={{ textAlign: 'center' }}>
                    <div className="container"><p>Chargement...</p></div>
                </div>
             
            </>
        );
    }

    if (error || !blog) {
        return (
            <>
               
                <div className="blog-detail-content" style={{ textAlign: 'center' }}>
                    <div className="container"><p>{error || 'Blog non trouvé'}</p></div>
                </div>
              
            </>
        );
    }

    const finalImageUrl = getImageUrl(blog, API_BASE_MEDIA_URL);

    // Formater la date
    const formattedDate = new Date(blog.date_publication).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="blog-detail-page">
           
            <BlogHero blogData={blog} /> 
            {/* Blog Content */}
            <section className="blog-detail-content">
                <div className="container">
                    <div className="blog-detail-wrapper">
                        
                        {/* 1. Main Content */}
                        <div className="blog-detail-main">
                            
                            {/* Image de Couverture */}
                            <div className="blog-detail-image">
                                <img src={finalImageUrl} alt={blog.titre} />
                                <span className="blog-detail-date">{formattedDate}</span>
                            </div>

                            {/* Titre */}
                            <h1 className="blog-detail-title">{blog.titre}</h1>

                            {/* Meta Info */}
                            <div className="blog-detail-meta">
                                <span className="meta-item">
                                    <FaUser /> {blog.auteur}
                                </span>
                                <span className="meta-item">
                                    <FaClock /> {blog.temps_lecture} min de lecture
                                </span>
                            </div>

                            {/* Content BODY CORRIGÉ (Rendu du contenu riche) */}
                            <div className="blog-detail-body">
                                {
                                    blog.content && renderBlogContentBlocks(blog.content)
                                }
                            </div>
                        </div>

                        {/* 2. Sidebar - Latest Posts */}
                        <div className="blog-detail-sidebar">
                            <h3 className="sidebar-title">Articles Récents</h3>
                            <div className="latest-posts">
                                {recentBlogs.map((post) => {
                                    const postImageUrl = getImageUrl(post, API_BASE_MEDIA_URL);
                                    
                                    return (
                                        <Link 
                                            to={`/blog/${post.documentId}`} 
                                            key={post.documentId} 
                                            className="latest-post-item"
                                            onClick={() => window.scrollTo(0, 0)}
                                        >
                                            <img 
                                                src={postImageUrl} 
                                                alt={post.titre} 
                                            />
                                            <div className="latest-post-content">
                                                <span className="latest-post-author">
                                                    <FaUser /> {post.auteur}
                                                </span>
                                                <h4 className="latest-post-title">{post.titre}</h4>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Partners />
          
        </div>
    );
};

export default BlogDetail;