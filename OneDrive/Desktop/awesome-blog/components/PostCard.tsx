
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <Link to={`/post/${post.id}`} className="block">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="inline-block bg-slate-100 text-slate-600 text-xs font-semibold mr-2 px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-2">
          <Link to={`/post/${post.id}`} className="hover:text-slate-600 transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-slate-600 flex-grow">{post.excerpt}</p>
        <div className="mt-6 flex items-center">
          <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full mr-4" />
          <div>
            <p className="font-semibold text-slate-800">{post.author}</p>
            <p className="text-sm text-slate-500">{post.date} &middot; {post.readTime} min read</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
