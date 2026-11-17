import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'mustafasirin42@gmail.com';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = request.headers.get('x-real-ip')?.trim();
  return realIp || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  honeypot?: unknown;
  company?: unknown;
}

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        code: 'RATE_LIMITED',
        error: 'Too many requests. Please wait a few minutes before trying again.',
      },
      { status: 429 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: 'INVALID_JSON',
        error: 'Invalid request payload.',
      },
      { status: 400 }
    );
  }

  // Honeypot check: reject automated spam submissions
  const honeypotValue =
    asTrimmedString(body.website) ||
    asTrimmedString(body.honeypot) ||
    asTrimmedString(body.company);
  if (honeypotValue.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        code: 'INVALID_SUBMISSION',
        error: 'Invalid submission.',
      },
      { status: 400 }
    );
  }

  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email);
  const subject = asTrimmedString(body.subject);
  const message = asTrimmedString(body.message);

  if (!name || name.length > 120) {
    return NextResponse.json(
      { ok: false, code: 'VALIDATION_ERROR', error: 'Please provide a valid name.' },
      { status: 400 }
    );
  }

  if (!email || email.length > 200 || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, code: 'VALIDATION_ERROR', error: 'Please provide a valid email address.' },
      { status: 400 }
    );
  }

  if (!subject || subject.length > 200) {
    return NextResponse.json(
      { ok: false, code: 'VALIDATION_ERROR', error: 'Please provide a valid subject.' },
      { status: 400 }
    );
  }

  if (!message || message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      {
        ok: false,
        code: 'VALIDATION_ERROR',
        error: 'Message must be between 10 and 5000 characters.',
      },
      { status: 400 }
    );
  }

  const formattedText = [
    `New contact inquiry from mussirindev website`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    ``,
    `Message:`,
    message,
  ].join('\n');

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'mussirindev <onboarding@resend.dev>',
          to: [process.env.CONTACT_TO_EMAIL || RECIPIENT_EMAIL],
          reply_to: email,
          subject: `[mussirindev] ${subject}`,
          text: formattedText,
        }),
      });

      if (!response.ok) {
        return NextResponse.json(
          {
            ok: false,
            code: 'DELIVERY_FAILED',
            error: 'Failed to deliver email via email service.',
          },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          code: 'DELIVERY_FAILED',
          error: 'An error occurred while sending the email.',
        },
        { status: 502 }
      );
    }
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const smtpPort = Number(process.env.SMTP_PORT || 587);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: process.env.SMTP_SECURE === 'true' || smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: process.env.CONTACT_FROM_EMAIL || smtpUser,
        to: process.env.CONTACT_TO_EMAIL || RECIPIENT_EMAIL,
        replyTo: email,
        subject: `[mussirindev] ${subject}`,
        text: formattedText,
      });

      return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          code: 'DELIVERY_FAILED',
          error: 'Failed to deliver email via SMTP.',
        },
        { status: 502 }
      );
    }
  }

  return NextResponse.json(
    {
      ok: false,
      code: 'EMAIL_NOT_CONFIGURED',
      error: 'Email delivery service is not configured.',
    },
    { status: 503 }
  );
}
