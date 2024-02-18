'use client'
import React, { useRef } from 'react'
import QRCode from 'react-qr-code';


interface QRCodeProps {
    value: string; // Value to encode in the QR code
    size?: number; // Optional size of the QR code
}
const QRCodeComponent: React.FC<QRCodeProps> = ({ value, size = 128 }) => {
    return (
        <div>
            <QRCode value={value} size={size} />
        </div>
    );
};

export default QRCodeComponent;