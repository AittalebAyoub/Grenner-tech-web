import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUser, FaClock, FaQuoteLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

import Partners from '../components/Partners';
import BlogHero from '../components/BlogHero';

const getImageUrl = (item, baseUrl) => {
    const imageObject = Array.isArray(item?.image_coverture)
        ? item.image_coverture[0]
        : item?.image_coverture; 

    const url = imageObject?.url;

    if (url) {
        if (url.startsWith('http')) {
            return url;
        }
        return `${baseUrl}${url}`;
    }
    return '/placeholder.jpg'; 
};

const renderText = (children) => {
    return children.map((child, childIndex) => {
        const key = `text-${childIndex}`;
        
        if (child.type === 'link' && child.url) {
            return (
                <a key={key} href={child.url} target="_blank" rel="noopener noreferrer" className="rich-text-link">
                    {renderText(child.children)}
                </a>
            );
        }

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

const renderRichText = (blocks) => {
    if (!Array.isArray(blocks)) return null;

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

const renderBlogContentBlocks = (contentBlocks) => {
    if (!Array.isArray(contentBlocks)) return null;

    return contentBlocks.map((block, index) => {
        const key = `dyn-block-${index}`;

        if (block.__component === 'bloc.paragraphe-riche' && block.texte) {
            return (
                <div key={key} className="blog-rich-text-wrapper">
                    {renderRichText(block.texte)}
                </div>
            );
        }

        if (block.__component === 'bloc.citation' && block.texte_citation) {
            return (
                <blockquote key={key} className="blog-citation-block">
                    <FaQuoteLeft className="quote-icon" />
                    <p className="citation-text">{block.texte_citation}</p>
                    {block.source && <footer className="citation-source">— {block.source}</footer>}
                </blockquote>
            );
        }

        return null;
    });
};

const BlogDetail = () => {
    const { id } = useParams();
    const { locale } = useLanguage();
    const [blog, setBlog] = useState(null);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_STRAPI_API_URL;
    const API_BASE_MEDIA_URL = API_URL?.replace('/api', '');

    const translations = {
        fr: {
            loading: 'Chargement...',
            notFound: 'Blog non trouvé',
            recentPosts: 'Articles Récents',
            readTime: 'min de lecture'
        },
        en: {
            loading: 'Loading...',
            notFound: 'Blog not found',
            recentPosts: 'Recent Posts',
            readTime: 'min read'
        },
        ar: {
            loading: 'جاري التحميل...',
            notFound: 'المقال غير موجود',
            recentPosts: 'المقالات الأخيرة',
            readTime: 'دقيقة قراءة'
        }
    };

    const t = translations[locale];

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setLoading(true);

                // Récupérer le blog avec le locale
                const blogResponse = await fetch(`${API_URL}/blogs/${id}?populate=*&locale=${locale}`);
                if (!blogResponse.ok) throw new Error(t.notFound);
                const blogData = await blogResponse.json();
                setBlog(blogData.data);

                // Récupérer les blogs récents avec le locale
                const blogsResponse = await fetch(
                    `${API_URL}/blogs?populate=*&locale=${locale}&pagination[pageSize]=4&sort[0]=id:desc`
                );
                
                if (!blogsResponse.ok) {
                    const errorText = await blogsResponse.text();
                    console.error('API Error Response:', errorText);
                    throw new Error('Erreur lors du chargement des blogs');
                }
                
                const blogsData = await blogsResponse.json();
                
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
    }, [id, API_URL, locale]); // Recharger quand la langue change

    if (loading) {
        return (
            <div className={`blog-detail-content ${locale === 'ar' ? 'rtl' : ''}`} style={{ textAlign: 'center' }}>
                <div className="container"><p>{t.loading}</p></div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className={`blog-detail-content ${locale === 'ar' ? 'rtl' : ''}`} style={{ textAlign: 'center' }}>
                <div className="container"><p>{error || t.notFound}</p></div>
            </div>
        );
    }

    const finalImageUrl = getImageUrl(blog, API_BASE_MEDIA_URL);

    const localeMap = {
        fr: 'fr-FR',
        en: 'en-US',
        ar: 'ar-MA'
    };

    const formattedDate = new Date(blog.date_publication).toLocaleDateString(localeMap[locale], {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={`blog-detail-page ${locale === 'ar' ? 'rtl' : ''}`}>
            <BlogHero blogData={blog} /> 
            
            <section className="blog-detail-content">
                <div className="container">
                    <div className="blog-detail-wrapper">
                        
                        <div className="blog-detail-main">
                            <div className="blog-detail-image">
                                <img src={finalImageUrl} alt={blog.titre} />
                                <span className="blog-detail-date">{formattedDate}</span>
                            </div>

                            <h1 className="blog-detail-title">{blog.titre}</h1>

                            <div className="blog-detail-meta">
                                <span className="meta-item">
                                    <FaUser /> {blog.auteur}
                                </span>
                                <span className="meta-item">
                                    <FaClock /> {blog.temps_lecture} {t.readTime}
                                </span>
                            </div>

                            <div className="blog-detail-body">
                                {blog.content && renderBlogContentBlocks(blog.content)}
                            </div>
                        </div>

                        <div className="blog-detail-sidebar">
                            <h3 className="sidebar-title">{t.recentPosts}</h3>
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