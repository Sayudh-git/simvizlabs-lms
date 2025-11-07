// import { useState } from 'react';
// import axios from 'axios';

// const PDFDownloader = ({ 
//   pdfUrl = '/path/to/your/pdf.pdf',  // URL of the PDF file to download
//   fileName = 'document.pdf',         // Default filename for the downloaded file
//   buttonText = 'Download PDF',       // Text to display on the button
//   className = 'pdf-download-btn'     // CSS class for styling
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleDownload = async () => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       // Fetch the PDF file
//       const response = await axios.get(pdfUrl, {
//         responseType: 'blob', // Important for binary files like PDFs
//       });
      
//       // Create a blob from the response data
//       const blob = new Blob([response.data], { type: 'application/pdf' });
      
//       // Create a URL for the blob
//       const blobUrl = URL.createObjectURL(blob);
      
//       // Create a temporary anchor element
//       const link = document.createElement('a');
//       link.href = blobUrl;
//       link.download = fileName;
      
//       // Append to body, click to download, then clean up
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       // Release the object URL when done
//       setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      
//       setIsLoading(false);
//     } catch (err) {
//       console.error('Error downloading PDF:', err);
//       setError('Failed to download the PDF. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="pdf-downloader">
//       <button 
//         onClick={handleDownload}
//         disabled={isLoading}
//         className={className}
//       >
//         {isLoading ? 'Downloading...' : buttonText}
//       </button>
      
//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

// export default PDFDownloader;


// pages/index.tsx
import { useState } from 'react';
import Head from 'next/head';
import { Download, DownloadIcon } from 'lucide-react';

export default function PDF() {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = () => {
    setIsDownloading(true);
    
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = '/course/airbus_a320/pdf/a320-file.pdf'; // PDF file in public folder
    link.download = 'a320.pdf'; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Download</title>
        <meta name="description" content="Download PDF files easily" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-6">Download File</h1>
                
                <div className="text-center mb-8">
                  <p className="text-gray-600">Airbus a230</p>
                </div>
                
                <div className="flex items-center justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                    type="button"
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    {isDownloading ? 'Downloading...' : <DownloadIcon/>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}