import express from 'express';
import { insertPatient, getPatientsByMobile } from './db';
import { whatsappService } from './whatsapp';

const app = express();
app.use(express.json());

app.post('/api/patients', async (req, res) => {
  try {
    const patientData = {
      ...req.body,
      riskLevel: Math.random() > 0.5 ? 'High' : 'Low' // Mock prediction for demo
    };
    
    const result = insertPatient.run(patientData);
    
    // Send WhatsApp message
    try {
      const message = whatsappService.formatPredictionMessage(patientData);
      await whatsappService.sendMessage(patientData.mobile, message);
    } catch (whatsappError) {
      console.error('WhatsApp message failed:', whatsappError);
      // Continue with the response even if WhatsApp fails
    }

    res.json({ 
      success: true, 
      id: result.lastInsertRowid,
      riskLevel: patientData.riskLevel 
    });
  } catch (error) {
    console.error('Error saving patient:', error);
    res.status(500).json({ success: false, error: 'Failed to save patient data' });
  }
});

app.get('/api/patients/:mobile', (req, res) => {
  try {
    const patients = getPatientsByMobile.all(req.params.mobile);
    res.json({ success: true, patients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch patient data' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});