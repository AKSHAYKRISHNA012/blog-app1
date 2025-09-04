
import React, { useState } from 'react';
import { useBlogData } from '../hooks/useBlogData';
import PostCard from '../components/PostCard';
import SearchInput from '../components/SearchInput';
import Spinner from '../components/Spinner';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, isLoading, error } = useBlogData(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    if (posts.length === 0) {
      return <p className="text-center text-slate-500">No posts found.</p>;
    }

    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Insights & Ideas</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Your source for the latest in web development, design, and technology.
        </p>
      </section>
      
      <section>
        <SearchInput value={searchQuery} onChange={handleSearchChange} />
      </section>

      <section>
        {renderContent()}
      </section>
    </div>
  );
};

export default HomePage;
