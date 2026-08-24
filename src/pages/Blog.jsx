import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FaReact, FaBolt, FaPencilRuler, FaMobileAlt, FaFileSignature, FaUniversalAccess, FaArrowRight } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import posts from '../data/blogPosts';
import { getSiteContent } from '../services/siteContentService';
import './Blog.css';

const categoryIcons = {
  FaReact,
  FaBolt,
  FaPencilRuler,
  FaMobileAlt,
  FaFileSignature,
  FaUniversalAccess
};

const CoverArt = ({ icon, category, image, title }) => {
  const Icon = categoryIcons[icon] || FaReact;
  return (
    <div className={`blog-cover blog-cover-${category.toLowerCase()}`}>
      {image && <img className="blog-cover-image" src={image} alt={title} loading="lazy" />}
      <span className="blog-cover-icon"><Icon /></span>
      <span className="blog-cover-tag">{category}</span>
    </div>
  );
};

const getYouTubeEmbedUrl = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const VideoEmbed = ({ url, title }) => {
  if (!url) return null;
  return (
    <div className="blog-video">
      <iframe
        src={getYouTubeEmbedUrl(url)}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const Blog = () => {
  const { slug } = useParams();
  const { pageCopy } = getSiteContent();
  const post = slug ? posts.find((item) => item.slug === slug) : null;

  if (slug && !post) {
    return (
      <main className="page-content blog-page">
        <section className="container blog-empty">
          <SectionHeading title={pageCopy.blogNotFound.title} subtitle={pageCopy.blogNotFound.subtitle} />
          <Link to="/blog" className="button primary">Back to Blog</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-content blog-page">
      <section className="page-hero">
        <div className="container">
          <SectionHeading title={post ? post.title : pageCopy.blogPage.title} subtitle={post ? `${post.readTime} · ${post.date}` : pageCopy.blogPage.subtitle} />
        </div>
      </section>
      <section className="container blog-content">
        {post ? (
          <article className="blog-article">
            <CoverArt icon={post.icon} category={post.category} image={post.image} title={post.title} />
            <VideoEmbed url={post.videoUrl} title={post.title} />
            <ReactMarkdown>{post.content}</ReactMarkdown>
            <Link to="/blog" className="button secondary">All Posts</Link>
          </article>
        ) : (
          <div className="blog-grid">
            {posts.map((item) => (
              <article className="blog-card glass-card" key={item.slug}>
                <CoverArt icon={item.icon} category={item.category} image={item.image} title={item.title} />
                <span>{item.date} · {item.readTime}</span>
                <h2>{item.title}</h2>
                <p>{item.excerpt}</p>
                <Link to={`/blog/${item.slug}`} className="button secondary">Read Article <FaArrowRight /></Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Blog;
