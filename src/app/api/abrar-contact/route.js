import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const data = await request.json();
        const { email, subject, firstName, lastName, idea, users, budget, features, message } = data;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Email credentials are missing. EMAIL_USER present:', !!process.env.EMAIL_USER, '| EMAIL_PASS present:', !!process.env.EMAIL_PASS);
            return NextResponse.json(
                { error: 'System configuration error: Email credentials missing.' },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const name = [firstName, lastName].filter(Boolean).join(' ') || email;

        // Build message body from whatever fields were submitted
        const textParts = [];
        if (name !== email) textParts.push(`Name: ${name}`);
        textParts.push(`Email: ${email}`);
        if (idea) textParts.push(`Idea: ${idea}`);
        if (users) textParts.push(`Target Users: ${users}`);
        if (budget) textParts.push(`Budget: ${budget}`);
        if (features) textParts.push(`Must-have Features:\n${features}`);
        if (message) textParts.push(`Message:\n${message}`);

        const emailSubject = subject || 'Abrar Ahmed portfolio lead message';

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            subject: emailSubject,
            replyTo: email,
            text: textParts.join('\n\n'),
            html: `<div style="font-family:Arial,sans-serif;line-height:1.7;max-width:600px">
        <h2 style="color:#660033;margin-bottom:24px">${emailSubject}</h2>
        ${textParts.map(p => `<p style="white-space:pre-wrap;margin:0 0 12px">${p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</p>`).join('')}
      </div>`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email (abrar-contact):', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
