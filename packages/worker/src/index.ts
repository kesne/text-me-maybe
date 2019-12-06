import Queue from 'bull';
import mailgunAPI from 'mailgun-js';

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY as string;
const MAILGUN_DOMAIN = 'sandbox8588d310f9064e8a9587fcbb0ef91400.mailgun.org';
const mailgun = mailgunAPI({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

const resetQueue = new Queue('reset emails');

resetQueue.process(async job => {
    console.log('Attempting to send an email...');

    await mailgun.messages().send({
        from: `Text Me Maybe <noreply@${MAILGUN_DOMAIN}>`,
        to: job.data.to,
        subject: 'Password Reset',
        text: `You resquested a password reset on Text Me Maybe. To complete the password reset, click here: https://text-me-maybe.dev/reset-password/${job.data.uuid}`
    });

    console.log('Email has been sent!');
});

console.log('Worker started!');
