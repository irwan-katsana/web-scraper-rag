import React, { useState } from 'react';
import UrlInput from './components/UrlInput';
import LinkList from './components/LinkList';
import TextExtractor from './components/TextExtractor';
import { Globe, Link as LinkIcon, FileText } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState<string[]>([]);
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (submittedUrl: string) => {
    setUrl(submittedUrl);
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/crawl`, { url: submittedUrl });
      setLinks(response.data.links);
    } catch (err) {
      setError('Error crawling the webpage. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkSelection = (link: string) => {
    setSelectedLinks(prev => 
      prev.includes(link) ? prev.filter(l => l !== link) : [...prev, link]
    );
  };

  const handleExtractText = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/extract`, { urls: selectedLinks });
      setExtractedText(response.data.extractedText);
    } catch (err) {
      setError('Error extracting text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        <Globe className="inline-block mr-2" />
        Web Scraper for RAG
      </h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <UrlInput onSubmit={handleUrlSubmit} />
        {isLoading && <p className="mt-4 text-center">Loading...</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {links.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-4 flex items-center">
              <LinkIcon className="inline-block mr-2" />
              Available Links
            </h2>
            <LinkList links={links} selectedLinks={selectedLinks} onLinkSelect={handleLinkSelection} />
            <button
              onClick={handleExtractText}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:bg-gray-400"
              disabled={selectedLinks.length === 0 || isLoading}
            >
              Extract Text from Selected Links
            </button>
          </>
        )}
        {extractedText && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-4 flex items-center">
              <FileText className="inline-block mr-2" />
              Extracted Text
            </h2>
            <TextExtractor text={extractedText} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;