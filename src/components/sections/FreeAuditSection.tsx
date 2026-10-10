import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {
  LayoutDashboard,
  Smartphone,
  Gauge,
  Search,
  MousePointerClick,
  CheckCircle2,
  AlertCircle,
  Send,
  RotateCcw,
} from 'lucide-react';
import { track } from '../../lib/analytics';
import GradientIcon from '../ui/GradientIcon';

/*
 * EmailJS: same service, notification template and public key as HireForm.tsx.
 * These are EmailJS's public browser identifiers (not secrets). If HireForm is later moved to
 * env vars / a shared config, point these at the same source.
 */
const EMAILJS_SERVICE_ID = 'service_3icvteb';
const EMAILJS_TEMPLATE_ID = 'template_4l22qnf';
const EMAILJS_PUBLIC_KEY = 'Jsq6GMdkOWnsEaGIS';
const CONTACT_EMAIL = 'orbitdevstudios@gmail.com';

/** Adds https:// when missing and returns a normalised URL, or null if it isn't a plausible website. */
function normalizeWebsiteUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  const withScheme = /^[a-z][a-z\d+\-.]*:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (!/^[^\s.]+(\.[^\s.]+)+$/.test(url.hostname) && url.hostname !== 'localhost') return null;
    return url.toString();
  } catch {
    return null;
  }
}

const auditSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80, 'Name is too long'),
  company: z.string().trim().max(100, 'Company name is too long').optional(),
  website: z
    .string()
    .trim()
    .min(1, 'Please enter your website URL')
    .refine((v) => normalizeWebsiteUrl(v) !== null, 'Enter a valid website, e.g. example.com'),
  email: z.string().trim().min(1, 'Please enter your email').email('Enter a valid email address'),
  message: z.string().trim().max(1000, 'Please keep this under 1000 characters').optional(),
  // Honeypot: must stay empty. Real users never see this field.
  nickname: z.string().optional(),
});

type AuditFormValues = z.infer<typeof auditSchema>;

const AUDIT_AREAS = [
  { icon: LayoutDashboard, title: 'UI/UX', desc: 'Layout, hierarchy, readability and navigation clarity.' },
  { icon: Smartphone, title: 'Mobile responsiveness', desc: 'How the site holds up on phones and tablets.' },
  { icon: Gauge, title: 'Performance', desc: 'Load speed, Core Web Vitals and heavy assets.' },
  { icon: Search, title: 'SEO fundamentals', desc: 'Titles, meta, headings, indexability and structure.' },
  { icon: MousePointerClick, title: 'Conversion opportunities', desc: 'CTAs, forms, trust signals and friction points.' },
];

const DELIVERABLES = [
  'A prioritised list of issues, grouped by impact',
  'Practical, plain-English recommendations for each finding',
  'Quick wins you can act on straight away',
  'An optional follow-up call to walk through the findings',
];

// Exact input styling from HireForm.tsx
const INPUT_BASE =
  'w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-white/[0.04] text-white light:text-slate-900 hover:bg-white/[0.06] placeholder:text-slate-500';
const INPUT_ERROR = '!border-red-400/70 focus:!border-red-400 focus:ring-red-400';
const LABEL = 'text-[10px] font-bold tracking-widest text-slate-400 uppercase';

function VerifyChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-md border border-dashed border-amber-400/40 bg-amber-400/[0.06] px-1.5 text-amber-300 light:text-amber-700">
      {children}
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-xs font-medium text-red-400">
      <AlertCircle size={13} aria-hidden="true" />
      {message}
    </p>
  );
}

interface FreeAuditSectionProps {
  /** Tighter layout for embedding on other pages (e.g. the homepage). */
  compact?: boolean;
  id?: string;
  /** Value for data-track-location on CTAs in this section. */
  trackLocation?: string;
}

export default function FreeAuditSection({
  compact = false,
  id = 'free-audit',
  trackLocation = 'free_audit_section',
}: FreeAuditSectionProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fid = (name: string) => `${id}-${name}`;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
    mode: 'onTouched',
    defaultValues: { name: '', company: '', website: '', email: '', message: '', nickname: '' },
  });

  const onSubmit = async (values: AuditFormValues) => {
    // Honeypot: pretend success so bots don't retry
    if (values.nickname) {
      setStatus('success');
      reset();
      return;
    }

    const website = normalizeWebsiteUrl(values.website) ?? values.website;
    const company = values.company?.trim() || 'Not provided';
    const notes = values.message?.trim() || 'No additional notes.';

    // Mapped onto HireForm's template variables (from_name, reply_to, phone, service, message).
    // Extra keys (subject, company, website) are ignored unless the template is updated to use them.
    const templateParams = {
      subject: 'Free Website Audit request',
      from_name: values.name,
      reply_to: values.email,
      phone: 'Not provided',
      service: 'Free Website Audit request',
      company,
      website,
      message: [
        'Free Website Audit request',
        `Website: ${website}`,
        `Company: ${company}`,
        '',
        notes,
      ].join('\n'),
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      track('audit_submit');
      track('form_submit', { form: 'free_audit' });
      setStatus('success');
      reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  const mailtoHref = () => {
    const v = getValues();
    const body = [
      `Name: ${v.name ?? ''}`,
      `Company: ${v.company ?? ''}`,
      `Website: ${v.website ?? ''}`,
      `Email: ${v.email ?? ''}`,
      '',
      v.message ?? '',
    ].join('\n');
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Free Website Audit request')}&body=${encodeURIComponent(body)}`;
  };

  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative overflow-hidden ${compact ? 'py-16 md:py-20' : 'py-20 md:py-24'}`}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(22,119,255,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`grid grid-cols-1 gap-10 ${compact ? 'lg:grid-cols-2 lg:gap-12' : 'lg:grid-cols-12 lg:gap-14'} items-start`}>
          {/* Left: pitch */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={compact ? '' : 'lg:col-span-5'}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] light:bg-[rgba(22,119,255,0.06)] border border-white/10 light:border-[rgba(22,119,255,0.18)] text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Free Audit
            </div>

            <h2
              id={headingId}
              className="text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] text-white light:text-slate-900 font-bold tracking-tight mb-5"
            >
              Get a Free Website Audit
            </h2>
            <p className="text-[#C7D2E4] light:text-slate-600 text-[15px] md:text-base leading-relaxed mb-8 max-w-xl">
              We'll review your website across UI/UX, mobile responsiveness, performance, SEO
              fundamentals, and conversion opportunities.
            </p>

            <ul className={`grid gap-3 mb-8 ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              {AUDIT_AREAS.map(({ icon: Icon, title, desc }) => (
                <li
                  key={title}
                  className="group flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-white p-3.5"
                >
                  <GradientIcon icon={Icon} size={18} boxClassName="w-10 h-10 rounded-xl" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white light:text-slate-900">{title}</span>
                    {!compact && (
                      <span className="block text-[13px] text-[#C7D2E4] light:text-slate-600 leading-relaxed mt-0.5">
                        {desc}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-white p-6">
              <h3 className="text-white light:text-slate-900 font-bold tracking-tight text-base mb-4">
                What you'll get
              </h3>
              <ul className="flex flex-col gap-3">
                {DELIVERABLES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#C7D2E4] light:text-slate-600 leading-relaxed">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 pt-4 border-t border-white/10 light:border-slate-200 text-[13px] text-[#C7D2E4] light:text-slate-600 leading-relaxed">
                Delivered by email within <VerifyChip>[VERIFY: 2–3]</VerifyChip> business days. No
                obligation. Reviewed by our team, not just an automated scan.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={compact ? '' : 'lg:col-span-7'}
          >
            <div className="glass-panel p-6 sm:p-8 md:p-10">
              {status === 'success' ? (
                <div role="status" aria-live="polite" className="flex flex-col items-center text-center py-10">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                    <CheckCircle2 size={30} className="text-emerald-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl text-white light:text-slate-900 font-bold tracking-tight mb-3">
                    Audit request received
                  </h3>
                  <p className="text-[#C7D2E4] light:text-slate-600 text-[15px] leading-relaxed max-w-md mb-8">
                    Thanks! We'll review your site and email your findings within{' '}
                    <VerifyChip>[VERIFY: 2–3]</VerifyChip> business days. If we have questions, we'll
                    reply to the email you provided.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center gap-2 px-6 py-3 text-white light:text-slate-900 border border-white/15 font-bold text-sm rounded-xl hover:border-white/30 hover:bg-white/[0.04] transition-all cursor-pointer"
                  >
                    <RotateCcw size={15} aria-hidden="true" />
                    Submit another site
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor={fid('nickname')}>Leave this field empty</label>
                    <input type="text" id={fid('nickname')} tabIndex={-1} autoComplete="off" {...register('nickname')} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor={fid('name')} className={LABEL}>
                        Name <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        id={fid('name')}
                        autoComplete="name"
                        placeholder="John Doe"
                        aria-required="true"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? fid('name-error') : undefined}
                        className={`${INPUT_BASE} ${errors.name ? INPUT_ERROR : ''}`}
                        {...register('name')}
                      />
                      <FieldError id={fid('name-error')} message={errors.name?.message} />
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor={fid('company')} className={LABEL}>
                        Company
                      </label>
                      <input
                        type="text"
                        id={fid('company')}
                        autoComplete="organization"
                        placeholder="Acme Inc."
                        aria-invalid={errors.company ? 'true' : 'false'}
                        aria-describedby={errors.company ? fid('company-error') : undefined}
                        className={`${INPUT_BASE} ${errors.company ? INPUT_ERROR : ''}`}
                        {...register('company')}
                      />
                      <FieldError id={fid('company-error')} message={errors.company?.message} />
                    </div>

                    {/* Website */}
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor={fid('website')} className={LABEL}>
                        Website URL <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        inputMode="url"
                        id={fid('website')}
                        autoComplete="url"
                        placeholder="yourwebsite.com"
                        aria-required="true"
                        aria-invalid={errors.website ? 'true' : 'false'}
                        aria-describedby={errors.website ? fid('website-error') : undefined}
                        className={`${INPUT_BASE} ${errors.website ? INPUT_ERROR : ''}`}
                        {...register('website')}
                      />
                      <FieldError id={fid('website-error')} message={errors.website?.message} />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor={fid('email')} className={LABEL}>
                        Email <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="email"
                        id={fid('email')}
                        autoComplete="email"
                        placeholder="john@example.com"
                        aria-required="true"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? fid('email-error') : undefined}
                        className={`${INPUT_BASE} ${errors.email ? INPUT_ERROR : ''}`}
                        {...register('email')}
                      />
                      <FieldError id={fid('email-error')} message={errors.email?.message} />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor={fid('message')} className={LABEL}>
                      Message
                    </label>
                    <textarea
                      id={fid('message')}
                      placeholder="Anything specific you'd like us to look at? (optional)"
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? fid('message-error') : undefined}
                      className={`${INPUT_BASE} h-[140px] resize-none ${errors.message ? INPUT_ERROR : ''}`}
                      {...register('message')}
                    />
                    <FieldError id={fid('message-error')} message={errors.message?.message} />
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/[0.08] p-4 text-sm text-red-300 light:text-red-700"
                    >
                      <AlertCircle size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="leading-relaxed">
                        We couldn't send your request. Please try again, or email us directly at{' '}
                        <a
                          href={mailtoHref()}
                          data-track-location={trackLocation}
                          className="font-semibold underline underline-offset-2 break-all"
                        >
                          {CONTACT_EMAIL}
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    data-track="free_audit_submit"
                    data-track-location={trackLocation}
                    className="btn-primary w-full rounded-xl px-7 py-3.5 font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Get My Free Audit
                        <Send size={16} aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-500">
                    We only use these details to prepare and send your audit. See our{' '}
                    <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-accent">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
