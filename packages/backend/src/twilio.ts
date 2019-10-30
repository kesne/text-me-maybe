import twilio from 'twilio';

export default twilio(process.env.TWILIO_APP_SID, process.env.TWILIO_APP_TOKEN);
