import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

// Initialize WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
});

// Handle QR code generation
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Scan this QR code with WhatsApp to log in.");
});

// Handle client ready event
client.on("ready", () => {
  console.log("WhatsApp client is ready!");
});
client.on("message", async (msg) => {
  if (msg.body === "hi") {
    await client.sendMessage(msg.from, "Hello");
  }
});

// Initialize the client
client.initialize();

/**
 * Send a WhatsApp message
 * @param phone - Recipient phone number (e.g., "1234567890@c.us")
 * @param message - Message text
 */
export const sendMessage = async (
  phone: string,
  message: string
): Promise<void> => {
  try {
    const formattedPhone = `${phone}@c.us`; // Format phone number for WhatsApp
    const isRegistered = await client.isRegisteredUser(formattedPhone);

    if (!isRegistered) {
      console.error("The provided number is not registered on WhatsApp.");
      throw { error: "The phone number is not registered on WhatsApp." };
    } else {
      console.log("formattedPhone", formattedPhone);
    }
    await client.sendMessage(formattedPhone, message);
    console.log("Message sent to:", phone);
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    throw error;
  }
};
