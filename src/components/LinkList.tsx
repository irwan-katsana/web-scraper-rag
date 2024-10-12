import React from 'react';
import { Check } from 'lucide-react';

interface LinkListProps {
  links: string[];
  selectedLinks: string[];
  onLinkSelect: (link: string) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, selectedLinks, onLinkSelect }) => {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link} className="flex items-center">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedLinks.includes(link)}
              onChange={() => onLinkSelect(link)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">{link}</span>
          </label>
          {selectedLinks.includes(link) && (
            <Check className="text-green-500 ml-2" size={18} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default LinkList;