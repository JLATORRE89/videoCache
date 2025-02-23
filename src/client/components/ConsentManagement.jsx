import React, { useState } from 'react';

const ConsentManagement = ({ logAudit }) => {
  const [showGDPR, setShowGDPR] = useState(true);

  const handleAccept = () => {
    setShowGDPR(false);
    logAudit('User accepted GDPR terms.');
  };

  return (
    showGDPR && (
      <div className="fixed bottom-0 left-0 right-0 bg-blue-100 text-blue-800 p-4 flex justify-between items-center">
        <p>
          This application uses cookies and stores IP information for GDPR compliance. By using this
          service, you agree to our terms.
        </p>
        <button
          onClick={handleAccept}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Accept
        </button>
      </div>
    )
  );
};

export default ConsentManagement;