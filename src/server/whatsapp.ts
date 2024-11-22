import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

class WhatsAppService {
  private client: Client;
  private isReady: boolean = false;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: ['--no-sandbox'],
      }
    });

    this.initialize();
  }

  private initialize() {
    this.client.on('qr', (qr) => {
      console.log('Please scan the following QR code with your WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('WhatsApp client is ready!');
      this.isReady = true;
    });

    this.client.initialize();
  }

  async sendMessage(to: string, message: string): Promise<boolean> {
    if (!this.isReady) {
      throw new Error('WhatsApp client is not ready');
    }

    try {
      // Format the number to international format
      const formattedNumber = to.replace(/\D/g, '');
      const chatId = `${formattedNumber}@c.us`;
      
      await this.client.sendMessage(chatId, message);
      return true;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return false;
    }
  }

  formatPredictionMessage(data: any): string {
    return `
🏥 *Diabetes Risk Assessment Report*

Dear ${data.name},

Based on your recent health assessment, here are your results:

*Risk Level:* ${data.riskLevel}

*Your Health Metrics:*
• Age: ${data.age}
• Glucose Level: ${data.glucose} mg/dL
• Blood Pressure: ${data.bloodPressure} mm Hg
• BMI: ${data.bmi}
• Insulin: ${data.insulin} mu U/ml

${data.riskLevel === 'High' 
  ? '⚠️ *Recommendation:* Please consult with a healthcare professional for proper medical advice.'
  : '✅ *Recommendation:* Continue maintaining your healthy lifestyle and schedule regular check-ups.'}

Stay healthy! 🌟

_This is an automated message. Please consult healthcare professionals for medical advice._
    `.trim();
  }
}

export const whatsappService = new WhatsAppService();