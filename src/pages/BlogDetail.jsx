import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser, FaClock } from 'react-icons/fa';
import Header from '../components/Header';
import Partners from '../components/Partners';
import Footer from '../components/Footer';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_STRAPI_API_URL;

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);

        // Récupérer le blog détail
        const blogResponse = await fetch(`${API_BASE_URL}/blogs/${id}?populate=*`);
        if (!blogResponse.ok) throw new Error('Blog non trouvé');
        const blogData = await blogResponse.json();
        setBlog(blogData.data);

        // Récupérer tous les blogs pour la sidebar
        const blogsResponse = await fetch(`${API_BASE_URL}/blogs?populate=*&pagination[pageSize]=3`);
        if (!blogsResponse.ok) throw new Error('Erreur lors du chargement des blogs');
        const blogsData = await blogsResponse.json();
        setRecentBlogs(blogsData.data || []);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Erreur lors du chargement du blog');
      } finally {
        setLoading(false);
      }
    };

    if (id && API_BASE_URL) {
      fetchBlogData();
    }
  }, [id, API_BASE_URL]);

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <p>Chargement...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <p>{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <p>Blog non trouvé</p>
        </div>
        <Footer />
      </>
    );
  }

    // 1. image_coverture est un ARRAY, nous prenons le premier élément (l'objet image)
    const imageObject = blog.image_coverture && blog.image_coverture[0]; 
                            
    // 2. Nous accédons directement à l'URL de l'objet image
    const imageUrl = imageObject?.url || '/placeholder.jpg';

   // 3. Si l'URL est relative, on ajoute l'API_BASE_URL (mais ici, elle est absolue)
   const finalImageUrl = imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`;

  // Formater la date
  const formattedDate = new Date(blog.date_publication).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Récupérer le contenu du blog
  const getContentText = () => {
    if (!blog.content || blog.content.length === 0) return '';

    let fullText = '';
    blog.content.forEach(block => {
      if (block.__component === 'bloc.paragraphe-riche') {
        // Extraire le texte des paragraphes riches
        if (Array.isArray(block.texte)) {
          block.texte.forEach(para => {
            if (para.children) {
              para.children.forEach(child => {
                if (child.text) {
                  fullText += child.text + '\n';
                }
              });
            }
          });
        }
      } else if (block.__component === 'bloc.citation') {
        fullText += `\n"${block.texte_citation}"\n— ${block.source}\n`;
      }
    });
    return fullText;
  };

  const contentText = getContentText();

  return (
    <div className="blog-detail-page">
      <Header />

      {/* Blog Content */}
      <section className="blog-detail-content">
        <div className="container">
          <div className="blog-detail-wrapper">
            {/* Main Content */}
            <div className="blog-detail-main">
              {/* Image */}
              <div className="blog-detail-image">
                <img src={finalImageUrl} alt={blog.titre} />
                <span className="blog-detail-date">{formattedDate}</span>
              </div>

              {/* Title */}
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

              {/* Content */}
              <div className="blog-detail-body">
                {contentText.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Sidebar - Latest Posts */}
            <div className="blog-detail-sidebar">
              <h3 className="sidebar-title">Latest Posts</h3>
              <div className="latest-posts">
                {recentBlogs.map((post) => (

                  <div key={post.documentId} className="latest-post-item">
                    <img 
                      src={post.image_coverture?.url 
                        ? `${API_BASE_URL.replace('/api', '')}${post.image_coverture.url}`
                        : 'https://via.placeholder.com/150x150'
                      } 
                      alt={post.titre} 
                    />
                    <div className="latest-post-content">
                      <span className="latest-post-author">
                        <FaUser /> by {post.auteur}
                      </span>
                      <h4 className="latest-post-title">{post.titre}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Partners />
      <Footer />
    </div>
  );
};

export default BlogDetail;