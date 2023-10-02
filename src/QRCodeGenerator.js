// src/QRCodeGenerator.js
import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import download from 'downloadjs'; // Import the downloadjs library
import './QRCodeGenerator.css';

function QRCodeGenerator() {
  const [text, setText] = useState('');
  const qrcodeRef = useRef(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDownload = () => {
    if (qrcodeRef.current) {
      html2canvas(qrcodeRef.current).then((canvas) => {
        const qrCodeImage = canvas.toDataURL('image/png');
        download(qrCodeImage, 'qrcode.png', 'image/png'); // Use downloadjs to trigger the download
      });
    }
  };

  return (
    <div className="qrcode-generator">
      <h1 className="title">QR Code Generator</h1>
      <div className="input-container">
        <input
          type="text"
          className="input"
          placeholder="Enter text for QR code"
          value={text}
          onChange={handleTextChange}
        />
        {text && (
          <div className="qrcode-container" ref={qrcodeRef}>
            <QRCode value={text} className="qrcode" size={256} />
          </div>
        )}
      </div>
      {text && (
        <button className="download-button" onClick={handleDownload}>
          Download QR Code
        </button>
      )}
      <p className="copyright"><b>© 2023 moabmo...</b></p>
    </div>
  );
}

export default QRCodeGenerator;
