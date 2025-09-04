import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../types';
import { getPostById } from '../services/blogService';
import Spinner from '../components/Spinner';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('Post ID is missing.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const fetchedPost = await getPostById(id);
        if (fetchedPost) {
          setPost(fetchedPost);
          document.title = `${fetchedPost.title} | Awesome Blog`;
        } else {
          setError('Post not found.');
        }
      } catch (err) {
        setError('Failed to fetch post.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
    
    // Reset title on component unmount
    return () => {
      document.title = 'Awesome Blog';
    };
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!post) {
    return null;
  }

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-12">
        <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors group">
                <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                Back to all articles
            </Link>
        </div>

      <header className="mb-8 border-b pb-8">
        <div className="mb-4">
            {post.tags.map(tag => (
                <span key={tag} className="inline-block bg-slate-100 text-slate-600 text-xs font-semibold mr-2 px-2.5 py-1 rounded-full">
                {tag}
                </span>
            ))}
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">{post.title}</h1>
        <div className="flex items-center">
          <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <p className="font-semibold text-slate-800">{post.author}</p>
            <p className="text-sm text-slate-500">{post.date} &middot; {post.readTime} min read</p>
          </div>
        </div>
      </header>

      <img src={post.imageUrl} alt={post.title} className="w-full h-auto rounded-lg mb-8" />
      
      <div 
        className="prose prose-slate lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

export default PostPage;