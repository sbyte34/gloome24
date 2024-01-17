// PdfViewerModal.js

import React from 'react';

const PdfViewerModal = ({ pdfUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-4 max-w-2xl max-h-full overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          Close
        </button>
        <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="600px" frameBorder="0"></iframe>
      </div>
    </div>
  );
};

export default PdfViewerModal;
