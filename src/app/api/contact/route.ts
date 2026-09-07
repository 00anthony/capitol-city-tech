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
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedType = projectType.trim();
  const trimmedMessage = message?.trim();

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: trimmedEmail,
      subject: `New project inquiry from ${trimmedName}`,
      text: [
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Project type: ${trimmedType}`,
        '',
        trimmedMessage ? `Message:\n${trimmedMessage}` : 'No message provided.',
      ].join('\n'),
    });

    if (error) {
      console.error('Resend send failed:', error);
      return NextResponse.json({ ok: false, error: 'Could not send your message. Please try again shortly.' }, { status: 502 });
    }

    // Best-effort confirmation to the submitter — their inquiry is already
    // captured above, so a failure here shouldn't turn into an error for them.
    try {
      const { error: confirmationError } = await resend.emails.send({
        from: fromAddress,
        to: trimmedEmail,
        subject: 'We got your message — Capitol City Tech',
        text: [
          `Hi ${trimmedName},`,
          '',
          `Thanks for reaching out about your ${trimmedType.toLowerCase()} project. We've received your message and will be in touch soon.`,
          '',
          'In the meantime, feel free to reply directly to this email if there\'s anything else you want to add.',
          '',
          '— Capitol City Tech',
        ].join('\n'),
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; color: #1e293b;">
            <p>Hi ${trimmedName},</p>
            <p>Thanks for reaching out about your <strong>${trimmedType.toLowerCase()}</strong> project. We've received your message and will be in touch soon.</p>
            <p>In the meantime, feel free to reply directly to this email if there's anything else you want to add.</p>
            <p style="color: #64748b;">— Capitol City Tech</p>
          </div>
        `,
      });
      if (confirmationError) {
        console.error('Confirmation email failed to send:', confirmationError);
      }
    } catch (confirmationErr) {
      console.error('Confirmation email threw:', confirmationErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form submission failed:', err);
    return NextResponse.json({ ok: false, error: 'Could not send your message. Please try again shortly.' }, { status: 500 });
  }
}
