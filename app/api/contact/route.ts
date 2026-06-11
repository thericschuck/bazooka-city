import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // TODO: wire up an email service here (e.g. Resend, Nodemailer, Mailgun)
  // Example with Resend:
  // await resend.emails.send({
  //   from: 'kontakt@bazooka-city.de',
  //   to: 'info@bazooka-city.de',
  //   subject: subject || `Kontaktanfrage von ${name}`,
  //   html: `<p>${message}</p><p>Von: ${name} (${email})</p>`,
  // });

  console.log('Contact form submission:', { name, email, subject, message });

  return NextResponse.json({ ok: true });
}
