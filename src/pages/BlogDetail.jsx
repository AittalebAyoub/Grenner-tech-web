import React from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendar, FaUser, FaClock } from 'react-icons/fa';
import Header from '../components/Header';
import Partners from '../components/Partners';
import Footer from '../components/Footer';
import BlogHero from '../components/BlogHero';
const BlogDetail = () => {
  const { id } = useParams();

  // Données dynamiques des blogs
  const blogsData = {
    1: {
      title: 'The Future of Farming, Smart Irrigation Solutions',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=400&fit=crop',
      date: '05 July 2022',
      author: 'Kevin Martin',
      readTime: '5 min de lecture',
      content: `Lorem ipsum dolor sit amet, cibo mundei vel dub, vim exerci phaerum. There are many variations of passages of Lorem ipsum available, but the majority have alteration in some injected humor or words which don't look even slightly believable. If you are going to use a passage of Lorem ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem ipsum which looks reasonable.

Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type simen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
Lorem ipsum is simply dummy text of the printing and typesetting industry, orem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.

`
    },
    2: {
      title: 'Bringing Food Production Back To Cities',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&h=400&fit=crop',
      date: '12 July 2022',
      author: 'Sarah Johnson',
      readTime: '6 min de lecture',
      content: `Urban agriculture is transforming cities around the world. By bringing food production back to cities, we can reduce transportation costs, support local economies, and create fresher food for consumers.

The benefits of urban farming are numerous. First, it reduces the carbon footprint associated with food transportation. Second, it provides employment opportunities for local communities. Third, it educates consumers about where their food comes from.

This article explores the latest innovations in urban farming, from rooftop gardens to vertical farms, and how they're reshaping our relationship with food.`
    },
    3: {
      title: 'Agronomy and Relation to Other Sciences',
      image: 'https://images.unsplash.com/photo-1500382017468-f049863256f0?w=800&h=400&fit=crop',
      date: '18 July 2022',
      author: 'John Doe',
      readTime: '7 min de lecture',
      content: `Agronomy is a science that brings together elements of biology, chemistry, physics, and ecology. Understanding how these disciplines interact is crucial for modern agriculture.

The integration of data science and machine learning into agronomy is revolutionizing farming practices. Farmers can now use predictive analytics to optimize crop yields, reduce water usage, and minimize pesticide application.

This comprehensive guide explains how agronomy connects to other scientific disciplines and how this interdisciplinary approach is shaping the future of sustainable agriculture.`
    }
  };

  const blog = blogsData[id] || blogsData[1];

  // Récents articles (sidebar)
  const recentPosts = [
    {
      id: 1,
      title: 'Bringing Food Production Back To Cities',
      author: 'Kevin Martin',
      image: '/malade.png'
    },
    {
      id: 2,
      title: 'The Future of Farming, Smart Irrigation Solutions',
      author: 'Kevin Martin',
      image: '/sol.png'
    },
    {
      id: 3,
      title: 'Agronomy and relation to Other Sciences',
      author: 'Kevin Martin',
      image: '/recolte.jpg'
    }
  ];

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
                <img src={blog.image} alt={blog.title} />
                <span className="blog-detail-date">{blog.date}</span>
              </div>

              {/* Title */}
              <h1 className="blog-detail-title">{blog.title}</h1>

              {/* Meta Info */}
              <div className="blog-detail-meta">
                <span className="meta-item">
                  <FaUser /> {blog.author}
                </span>
                <span className="meta-item">
                  <FaClock /> {blog.readTime}
                </span>
              </div>

              {/* Content */}
              <div className="blog-detail-body">
                {blog.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Sidebar - Latest Posts */}
            <div className="blog-detail-sidebar">
              <h3 className="sidebar-title">Latest Posts</h3>
              <div className="latest-posts">
                {recentPosts.map((post) => (
                  <div key={post.id} className="latest-post-item">
                    <img src={post.image} alt={post.title} />
                    <div className="latest-post-content">
                      <span className="latest-post-author">
                        <FaUser /> by {post.author}
                      </span>
                      <h4 className="latest-post-title">{post.title}</h4>
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