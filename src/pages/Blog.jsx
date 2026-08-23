import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import posts from '../data/blogPosts';
import './Blog.css';

const Blog = () => {
  const { slug } = useParams();
  const post = slug ? posts.find((item) => item.slug === slug) : null;

  if (slug && !post) {
    return (
      <main className="page-content blog-page">
        <section className="container blog-empty">
          <SectionHeading title="Post not found" subtitle="That article may have moved or is not available yet." />
          <Link to="/blog" className="button primary">Back to Blog</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-content blog-page">
      <section className="page-hero">
        <div className="container">
          <SectionHeading title={post ? post.title : 'Ideas & Insights'} subtitle={post ? `${post.readTime} · ${post.date}` : 'Notes on design, development and building better digital experiences.'} />
        </div>
      </section>
      <section className="container blog-content">
        {post ? (
          <article className="blog-article">
            <ReactMarkdown>{post.content}</ReactMarkdown>
            <Link to="/blog" className="button secondary">All Posts</Link>
          </article>
        ) : (
          <div className="blog-grid">
            {posts.map((item) => (
              <article className="blog-card glass-card" key={item.slug}>
                <span>{item.date} · {item.readTime}</span>
                <h2>{item.title}</h2>
                <p>{item.excerpt}</p>
                <Link to={`/blog/${item.slug}`} className="button secondary">Read Article</Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Blog;
