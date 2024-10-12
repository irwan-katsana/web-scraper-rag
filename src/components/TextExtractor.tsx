import React from 'react';

interface TextExtractorProps {
  text: string;
}

const TextExtractor: React.FC<TextExtractorProps> = ({ text }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <pre className="whitespace-pre-wrap text-sm">{text}</pre>
    </div>
  );
};

export default TextExtractor;