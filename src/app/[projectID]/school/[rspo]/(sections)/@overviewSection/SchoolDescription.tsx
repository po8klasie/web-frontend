'use client';

import { FC, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface SchoolDescriptionProps {
  description: string;
}
const SchoolDescription: FC<SchoolDescriptionProps> = ({ description }) => {
  const [isWholeContentVisible, setIsWholeContentVisible] = useState(false);
  const shouldTrim = description.length > 200;
  const content =
    isWholeContentVisible || !shouldTrim ? description : `${description.slice(0, 200)}...`;
  const buttonText = isWholeContentVisible ? 'Pokaż mniej' : 'Pokaż więcej';

  return (
    <div className="border-t border-light py-2 px-5">
      <h4 className="text-dark text-base font-semibold">O szkole</h4>
      <div className="my-2 mx-auto prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      {shouldTrim && (
        <div>
          <button
            className="underline hover:text-gray-700"
            onClick={() => setIsWholeContentVisible((v) => !v)}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default SchoolDescription;
