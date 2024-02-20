// GenerateQRCode.js

const QRCode = require("qrcode");

export async function generateQRCode(data) {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data);
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
}


