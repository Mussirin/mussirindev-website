'use client';

import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
} from 'lucide-react';
import type { Dictionary } from '@/i18n/dictionaries/types';

export interface ContactFormProps {
  dict: Dictionary;
}

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string; // Honeypot field
}

type FieldErrors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;

type SubmitStatus =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success' }
  | { type: 'not-configured'; mailtoHref: string }
  | { type: 'error'; message: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ dict }: ContactFormProps) {
  const formDict = dict.contact.form;

  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>({ type: 'idle' });

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (!values.name.trim()) {
      errors.name = formDict.errors.nameRequired;
    }

    if (!values.email.trim()) {
      errors.email = formDict.errors.emailRequired;
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      errors.email = formDict.errors.emailInvalid;
    }

    if (!values.subject.trim()) {
      errors.subject = formDict.errors.subjectRequired;
    }

    if (!values.message.trim()) {
      errors.message = formDict.errors.messageRequired;
    } else if (values.message.trim().length < 10) {
      errors.message = formDict.errors.messageMinLength;
    }

    return errors;
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(values.subject.trim());
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n---\n${values.name.trim()} (${values.email.trim()})`
    );
    return `mailto:mustafasirin42@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setStatus({ type: 'submitting' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          company: values.company,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setStatus({ type: 'success' });
        setValues({
          name: '',
          email: '',
          subject: '',
          message: '',
          company: '',
        });
        setFieldErrors({});
        return;
      }

      if (
        response.status === 503 ||
        data?.code === 'EMAIL_NOT_CONFIGURED'
      ) {
        setStatus({
          type: 'not-configured',
          mailtoHref: buildMailtoHref(),
        });
        return;
      }

      setStatus({
        type: 'error',
        message:
          typeof data?.error === 'string' && data.error.trim().length > 0
            ? data.error
            : formDict.errors.generic,
      });
    } catch {
      setStatus({
        type: 'error',
        message: formDict.errors.generic,
      });
    }
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field !== 'company' && fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status.type !== 'idle' && status.type !== 'submitting') {
      setStatus({ type: 'idle' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-border-subtle bg-surface-card p-6 sm:p-8"
    >
      {/* Hidden Honeypot Field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => handleChange('company', e.target.value)}
        />
      </div>

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            {formDict.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={formDict.namePlaceholder}
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
            className="w-full rounded-xl border border-border-subtle bg-surface-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/20"
          />
          {fieldErrors.name && (
            <p id="contact-name-error" className="mt-1.5 text-xs text-red-500">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            {formDict.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={formDict.emailPlaceholder}
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
            className="w-full rounded-xl border border-border-subtle bg-surface-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/20"
          />
          {fieldErrors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs text-red-500">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-sm font-medium text-text-primary"
        >
          {formDict.subject}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          placeholder={formDict.subjectPlaceholder}
          value={values.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          aria-invalid={Boolean(fieldErrors.subject)}
          aria-describedby={fieldErrors.subject ? 'contact-subject-error' : undefined}
          className="w-full rounded-xl border border-border-subtle bg-surface-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/20"
        />
        {fieldErrors.subject && (
          <p id="contact-subject-error" className="mt-1.5 text-xs text-red-500">
            {fieldErrors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-text-primary"
        >
          {formDict.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder={formDict.messagePlaceholder}
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
          className="w-full resize-y rounded-xl border border-border-subtle bg-surface-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/20"
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-red-500">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Status Feedback Banners */}
      {status.type === 'success' && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">{formDict.successTitle}</p>
            <p className="mt-0.5 text-xs leading-relaxed opacity-90">
              {formDict.successMessage}
            </p>
          </div>
        </div>
      )}

      {status.type === 'not-configured' && (
        <div
          role="alert"
          className="space-y-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-200"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">{formDict.errorTitle}</p>
              <p className="mt-0.5 text-xs leading-relaxed opacity-90">
                {formDict.notConfiguredHint}
              </p>
            </div>
          </div>
          <div>
            <a
              href={status.mailtoHref}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-amber-700"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{formDict.mailtoFallback}</span>
            </a>
          </div>
        </div>
      )}

      {status.type === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-300"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">{formDict.errorTitle}</p>
            <p className="mt-0.5 text-xs leading-relaxed opacity-90">
              {status.message}
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status.type === 'submitting'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-electric-blue px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-electric-blue/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status.type === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>{formDict.sending}</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            <span>{formDict.submit}</span>
          </>
        )}
      </button>
    </form>
  );
}
