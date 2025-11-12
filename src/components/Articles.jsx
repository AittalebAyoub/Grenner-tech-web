import React, { useState } from 'react';
import { FaUser, FaClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const articles = [
    {
      id: 1,
      title: 'Bringing Food Production Back To Cities',
      image: '/irigation.png',
      date: '05 July 2022',
      author: 'Kevin Martin',
      readTime: '5 min de lecture'
    },
    {
      id: 2,
      title: 'The Future of Farming, Smart Irrigation Solutions',
      image: '/malade.png',
      date: '05 July 2022',
      author: 'Kevin Martin',
      readTime: '5 min de lecture'
    },
    {
      id: 3,
      title: 'Agronomy and relation to Other Sciences',
      image: '/sol.png',
      date: '05 July 2022',
      author: 'Kevin Martin',
      readTime: '5 min de lecture'
    },
    {
      id: 4,
      title: 'Sustainable Farming Practices',
      image: '/palisage.jpg',
      date: '12 July 2022',
      author: 'Sarah Johnson',
      readTime: '6 min de lecture'
    },
    {
      id: 5,
      title: 'Climate Smart Agriculture',
      image: '/recolte.jpg',
      date: '18 July 2022',
      author: 'John Doe',
      readTime: '7 min de lecture'
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const visibleArticles = articles.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - itemsPerPage : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= articles.length - itemsPerPage + 1 ? 0 : prev + 1));
  };

  return (
    <section className="blog" id = "blogs">
      <div className="container">
        <div className="blog-header">
          <span className="blog-label">Nos blogs</span>
          <h2 className="blog-title">Actualités et articles</h2>
        </div>

        <div className="blog-carousel-wrapper">
          <button className="carousel-arrow prev-arrow" onClick={handlePrev}>
            <FaChevronLeft />
          </button>

          <div className="blog-grid">
            {visibleArticles.map((article) => (
              <div key={article.id} className="blog-card">
                <div className="blog-image-wrapper">
                  <img src={article.image} alt={article.title} />
                  <span className="blog-date-badge">{article.date}</span>
                </div>

                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="blog-author">
                      <FaUser /> {article.author}
                    </span>
                    <span className="blog-read-time">
                      <FaClock /> {article.readTime}
                    </span>
                  </div>

                  <h3 className="blog-article-title">{article.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-arrow next-arrow" onClick={handleNext}>
            <FaChevronRight />
          </button>
        </div>

        <div className="blog-footer">
          <button className="blog-view-all">Views All Blogs</button>
        </div>
      </div>
    </section>
  );
};

export default Blog;