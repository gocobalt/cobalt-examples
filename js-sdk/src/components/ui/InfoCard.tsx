import React, { useState } from "react";
import { ApiAction } from "@/types/cobalt";

interface InfoCardProps {
  method: ApiAction;
}

const InfoCard: React.FC<InfoCardProps> = ({ method }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-80 max-w-xs border border-gray-300">
      <h3 className="font-semibold text-lg">{method.title}</h3>
      {isExpanded && (
        <div>
          <p className="text-sm text-gray-600 mt-2">{method.description}</p>
          <div className="mt-4">
            <h4 className="font-semibold text-sm">File Reference:</h4>
            <p className="font-mono text-xs">
              <a
                href={method.fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {method.fileName}
              </a>
              (Line {method.lineNumber})
            </p>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-sm">Documentation Links:</h4>
            {method.links.length > 0 ? (
              <ul className="list-disc list-inside">
                {method.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-xs">No links available</p>
            )}
          </div>
        </div>
      )}
      <button
        onClick={toggleExpand}
        className="mt-4 text-blue-500 hover:underline text-sm"
      >
        {isExpanded ? "View Less" : "View More"}
      </button>
    </div>
  );
};

export default InfoCard;
