import React from 'react';

const IllustrationCard = ({ illustration }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-200 hover:shadow-xl transition-shadow">
      <img
        src={illustration.image}
        alt={illustration.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">{illustration.title}</h3>
          <p className="text-gray-500 text-sm mb-2">{illustration.description}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-indigo-600 font-semibold text-base">${illustration.price}</span>
          <span className="bg-indigo-100 text-indigo-700 text-xs font-mono px-2 py-1 rounded">{illustration.number}</span>
        </div>
      </div>
    </div>
  );
};

export default IllustrationCard;
