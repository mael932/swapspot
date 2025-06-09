
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QRCodeProps {
  className?: string;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({ className = "" }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = window.location.origin;
        const qrCodeDataUrl = await QRCode.toDataURL(url, {
          width: 200,
          margin: 2,
          color: {
            dark: '#0F172A',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(qrCodeDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, []);

  return (
    <Card className={`w-fit ${className}`}>
      <CardHeader className="text-center">
        <CardTitle>Scan to visit SwapSpot</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {qrCodeUrl && (
          <img 
            src={qrCodeUrl} 
            alt="QR Code for SwapSpot website" 
            className="border rounded-lg"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeComponent;
