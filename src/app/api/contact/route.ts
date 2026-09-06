import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
  company?: string; // honeypot — real users never fill this in
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, projectType, message, company } = body;

  // Honeypot tripped — pretend success so the bot doesn't learn anything, but skip sending.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !projectType?.trim()) {
    return NextResponse.json({ ok: false, error: 'Name, email, and project type are required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ ok: false, error: 'Enter a valid email address.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set — contact form cannot send email.');
    return NextResponse.json({ ok: false, error: 'The contact form is not configured yet. Please email us directly.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const toAddress = process.env.CONTACT_TO_EMAIL || 'anthonytij3@gmail.com';
  const fromAddress = process.env.CONTACT_FROM_EMAIL || 'Capitol City Tech <onboarding@resend.dev>';

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email.trim(),
      subject: `New project inquiry from ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Project type: ${projectType.trim()}`,
        '',
        message?.trim() ? `Message:\n${message.trim()}` : 'No message provided.',
      ].join('\n'),
    });

    if (error) {
      console.error('Resend send failed:', error);
      return NextResponse.json({ ok: false, error: 'Could not send your message. Please try again shortly.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form submission failed:', err);
    return NextResponse.json({ ok: false, error: 'Could not send your message. Please try again shortly.' }, { status: 500 });
  }
}
