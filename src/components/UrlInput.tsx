import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface UrlInputProps {
  onSubmit: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onSubmit }) => {
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onSubmit(inputUrl.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="url"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Enter URL to crawl"
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors flex items-center"
      >
        <Search className="mr-2" size={18} />
        Crawl
      </button>
    </form>
  );
};

export default UrlInput;