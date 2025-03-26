import QRCode from "qrcode";

export async function generateQRCode(data) {
	if (typeof window === "undefined") {
		console.error("generateQRCode can only be used on the client-side.");
		return null;
	}

	try {
		return await QRCode.toDataURL(data);
	} catch (error) {
		console.error("Error generating QR code:", error);
		return null;
	}
}
