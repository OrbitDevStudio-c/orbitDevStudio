import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Lock, Send, ShieldCheck, Mail, MapPin } from 'lucide-react';
import {
  BUSINESS_TYPES,
  budgetOptions,
  CONTACT_METHODS,
  COUNTRIES,
  CURRENCIES,
  ENGAGEMENT_OPTIONS,
  INQUIRY_ID,
  PROJECT_CATEGORIES,
} from '../../data/globalSolutions';
import { track } from '../../lib/analytics';

const SERVICE_ID = 'service_3icvteb';
const NOTIFY_TEMPLATE = 'template_4l22qnf';
const AUTOREPLY_TEMPLATE = 'template_b56pwdk';
const PUBLIC_KEY = 'Jsq6GMdkOWnsEaGIS';

const oneOf = (values: string[], msg: string) => z.string().min(1, msg).refine((v) => values.includes(v), msg);

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(80, 'Name is too long'),
  company: z.string().trim().min(2, 'Please enter your business or company name').max(100, 'Name is too long'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Please enter your work email')
    .max(120, 'Email is too long')
    .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Please enter a valid email address'),
  country: oneOf(COUNTRIES, 'Please select your country'),
  businessType: oneOf(BUSINESS_TYPES.map((b) => b.value), 'Please select your business type'),
  category: oneOf(PROJECT_CATEGORIES, 'Please select a project category'),
  currency: oneOf(CURRENCIES.map((c) => c.code), 'Please select a currency'),
  budget: z.string().min(1, 'Please select an estimated budget'),
  engagement: oneOf(ENGAGEMENT_OPTIONS.map((e) => e.value), 'Please select an engagement model'),
  contactMethod: oneOf(CONTACT_METHODS.map((c) => c.value), 'Please select how you would like to be contacted'),
  description: z.string().trim().min(50, 'Please describe your project in at least 50 characters').max(1500, 'Please keep it under 1500 characters'),
  consent: z.literal(true, { message: 'Please confirm you agree to be contacted about this inquiry' }),
  website_url: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

const field =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[14px] text-white placeholder:text-slate-500 transition-all hover:bg-white/[0.06] focus:border-[#4F8CFF] focus:outline-none focus:ring-1 focus:ring-[#4F8CFF] light:border-slate-300 light:bg-white light:text-slate-900 light:hover:bg-white';
const label = 'mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-400';
const opt = 'bg-[#101A2D] text-white light:bg-white light:text-slate-900';

function Err({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[12px] font-medium text-red-400 light:text-red-600">
      {msg}
    </p>
  );
}

type Props = {
  /** Pre-selected from the audience / engagement cards above. */
  businessType?: string;
  engagement?: string;
};

export default function GlobalForm({ businessType, engagement }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [sentTo, setSentTo] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '', company: '', email: '', country: '', businessType: '', category: '', currency: 'USD', budget: '',
      engagement: '', contactMethod: 'email', description: '', website_url: '',
    },
  });

  useEffect(() => {
    if (businessType) setValue('businessType', businessType, { shouldValidate: true });
  }, [businessType, setValue]);
  useEffect(() => {
    if (engagement) setValue('engagement', engagement, { shouldValidate: true });
  }, [engagement, setValue]);

  const currencyCode = watch('currency');
  const currency = CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0];
  const budgets = useMemo(() => budgetOptions(currency), [currency]);
  const descLen = watch('description')?.length ?? 0;

  // Changing currency invalidates the chosen band.
  useEffect(() => {
    setValue('budget', '');
  }, [currencyCode, setValue]);

  const onSubmit = async (v: FormValues) => {
    if (v.website_url) {
      // Honeypot tripped: pretend success so bots learn nothing.
      setSentTo(v.email);
      setStatus('success');
      return;
    }
    setStatus('submitting');

    const lookup = (list: { value: string; label: string }[], value: string) => list.find((x) => x.value === value)?.label ?? value;
    const budgetLabel = lookup(budgets, v.budget);
    const message = [
      'GLOBAL SOLUTIONS INQUIRY',
      `Company: ${v.company}`,
      `Country: ${v.country}`,
      `Business type: ${lookup(BUSINESS_TYPES, v.businessType)}`,
      `Project category: ${v.category}`,
      `Estimated budget: ${budgetLabel} (${v.currency})`,
      `Engagement model: ${lookup(ENGAGEMENT_OPTIONS, v.engagement)}`,
      `Preferred contact: ${lookup(CONTACT_METHODS, v.contactMethod)}`,
      '',
      'Project description:',
      v.description,
    ].join('\n');

    // Same EmailJS templates as the /hire inquiry form, so the existing notification workflow is unchanged.
    const params = {
      from_name: v.name,
      reply_to: v.email,
      phone: `Not provided (preferred contact: ${lookup(CONTACT_METHODS, v.contactMethod)})`,
      service: `${v.category} | Global Solutions`,
      message,
      company: v.company,
      country: v.country,
      budget: `${budgetLabel} (${v.currency})`,
    };

    try {
      await emailjs.send(SERVICE_ID, NOTIFY_TEMPLATE, params, PUBLIC_KEY);
      // The confirmation to the client is best-effort: the inquiry itself already reached us.
      try {
        await emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE, params, PUBLIC_KEY);
      } catch (e) {
        console.warn('Auto-reply failed', e);
      }
      track('form_submit', { form: 'global_inquiry', country: v.country, category: v.category, engagement: v.engagement });
      setSentTo(v.email);
      setStatus('success');
      reset();
    } catch (e) {
      console.error('Global inquiry failed', e);
      setStatus('error');
    }
  };

  const invalid = (n: keyof FormValues) => (errors[n] ? true : undefined);

  return (
    <section id={INQUIRY_ID} className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/5 bg-[#0B1220] shadow-[0_10px_40px_rgba(0,0,0,0.3)] lg:flex-row lg:rounded-[2rem] light:border-slate-200 light:bg-white">
          {/* Left */}
          <div className="relative flex flex-col justify-between gap-10 overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#162137] via-[#0E1627] to-[#0A101C] p-8 md:p-10 lg:w-[440px] lg:border-b-0 lg:border-r lg:p-12 light:border-slate-200 light:from-white light:via-[#f8fbff] light:to-[#eef4ff]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#4F8CFF] opacity-[0.07] blur-[80px]" aria-hidden="true" />
            <div className="relative">
              <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">International project inquiry</span>
              <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl light:text-slate-900">
                Tell us about your <span className="text-gradient">global project</span>
              </h2>
              <p className="mb-8 text-[15px] leading-relaxed text-[#C7D2E4] light:text-slate-600">
                Share what you want to build and where you are based. We will read it, and get back to you by email to arrange a discovery conversation.
              </p>

              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">What happens next</h3>
              <ol className="space-y-4">
                {[
                  'You send the inquiry. A copy is emailed to our team.',
                  'We review your requirements and reply to your email.',
                  'We schedule a discovery conversation, then send a written scope and proposal.',
                ].map((t, i) => (
                  <li key={t} className="flex items-start gap-3 text-[14px] text-[#C7D2E4] light:text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] font-bold text-[#7FB2FF] light:text-[#1659C7]">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative space-y-3">
              <div className="flex items-center gap-3 text-[13px] text-[#C7D2E4] light:text-slate-700">
                <Mail size={16} className="text-accent" aria-hidden="true" />
                <a href="mailto:orbitdevstudios@gmail.com" data-track="global_email" data-track-location="global_form" className="break-all hover:text-white light:hover:text-slate-900">orbitdevstudios@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#C7D2E4] light:text-slate-700">
                <MapPin size={16} className="text-accent" aria-hidden="true" />
                Ahmedabad, Gujarat, India · remote delivery worldwide
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#C7D2E4] light:text-slate-700">
                <ShieldCheck size={16} className="text-accent" aria-hidden="true" />
                NDA available on request
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex-1 p-6 md:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  aria-live="polite"
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <CheckCircle2 size={34} aria-hidden="true" />
                  </span>
                  <h3 className="mb-3 text-2xl font-bold text-white light:text-slate-900">Inquiry received</h3>
                  <p className="mb-2 max-w-md text-[15px] leading-relaxed text-[#C7D2E4] light:text-slate-600">
                    Thank you. We will review your project and reply{sentTo ? <> to <strong className="text-white light:text-slate-900">{sentTo}</strong></> : null} to arrange a discovery conversation. An automatic confirmation may also arrive in your inbox.
                  </p>
                  <p className="mb-8 max-w-md text-[13px] text-slate-500">Nothing is binding until you approve a written proposal.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="rounded-xl border border-white/15 px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-white/[0.05] light:border-slate-300 light:text-slate-900 light:hover:bg-slate-50">
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5" aria-describedby="gs-form-note">
                  <div className="hidden" aria-hidden="true">
                    <input type="text" tabIndex={-1} autoComplete="off" {...register('website_url')} />
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="gs-name" className={label}>Full name</label>
                      <input id="gs-name" autoComplete="name" placeholder="Jane Smith" className={field} aria-invalid={invalid('name')} aria-describedby="gs-name-err" {...register('name')} />
                      <Err id="gs-name-err" msg={errors.name?.message} />
                    </div>
                    <div>
                      <label htmlFor="gs-company" className={label}>Business / company name</label>
                      <input id="gs-company" autoComplete="organization" placeholder="Acme Ltd" className={field} aria-invalid={invalid('company')} aria-describedby="gs-company-err" {...register('company')} />
                      <Err id="gs-company-err" msg={errors.company?.message} />
                    </div>
                    <div>
                      <label htmlFor="gs-email" className={label}>Work email</label>
                      <input id="gs-email" type="email" autoComplete="email" placeholder="jane@acme.com" className={field} aria-invalid={invalid('email')} aria-describedby="gs-email-err" {...register('email')} />
                      <Err id="gs-email-err" msg={errors.email?.message} />
                    </div>
                    <div>
                      <label htmlFor="gs-country" className={label}>Country</label>
                      <select id="gs-country" autoComplete="country-name" className={field} aria-invalid={invalid('country')} aria-describedby="gs-country-err" {...register('country')}>
                        <option value="" className={opt}>Select your country</option>
                        {COUNTRIES.map((c) => <option key={c} value={c} className={opt}>{c}</option>)}
                      </select>
                      <Err id="gs-country-err" msg={errors.country?.message} />
                    </div>
                    <div>
                      <label htmlFor="gs-btype" className={label}>Business type</label>
                      <select id="gs-btype" className={field} aria-invalid={invalid('businessType')} aria-describedby="gs-btype-err" {...register('businessType')}>
                        <option value="" className={opt}>Select business type</option>
                        {BUSINESS_TYPES.map((b) => <option key={b.value} value={b.value} className={opt}>{b.label}</option>)}
                      </select>
                      <Err id="gs-btype-err" msg={errors.businessType?.message} />
                    </div>
                    <div>
                      <label htmlFor="gs-category" className={label}>Project category</label>
                      <select id="gs-category" className={field} aria-invalid={invalid('category')} aria-describedby="gs-category-err" {...register('category')}>
                        <option value="" className={opt}>Select a category</option>
                        {PROJECT_CATEGORIES.map((c) => <option key={c} value={c} className={opt}>{c}</option>)}
                      </select>
                      <Err id="gs-category-err" msg={errors.category?.message} />
                    </div>
                    <div>
                      <label htmlFor="gs-currency" className={label}>Budget currency</label>
                      <select id="gs-currency" className={field} {...register('currency')}>
                        {CURRENCIES.map((c) => <option key={c.code} value={c.code} className={opt}>{c.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="gs-budget" className={label}>Estimated budget</label>
                      <select id="gs-budget" className={field} aria-invalid={invalid('budget')} aria-describedby="gs-budget-err" {...register('budget')}>
                        <option value="" className={opt}>Select a range</option>
                        {budgets.map((b) => <option key={b.value} value={b.value} className={opt}>{b.label}</option>)}
                      </select>
                      <Err id="gs-budget-err" msg={errors.budget?.message} />
                    </div>
                    <div>
                      <label htmlFor="gs-engagement" className={label}>Preferred engagement model</label>
                      <select id="gs-engagement" className={field} aria-invalid={invalid('engagement')} aria-describedby="gs-engagement-err" {...register('engagement')}>
                        <option value="" className={opt}>Select a model</option>
                        {ENGAGEMENT_OPTIONS.map((e) => <option key={e.value} value={e.value} className={opt}>{e.label}</option>)}
                      </select>
                      <Err id="gs-engagement-err" msg={errors.engagement?.message} />
                    </div>
                    <div>
                      <label htmlFor="gs-contact" className={label}>Preferred communication method</label>
                      <select id="gs-contact" className={field} aria-invalid={invalid('contactMethod')} aria-describedby="gs-contact-err" {...register('contactMethod')}>
                        {CONTACT_METHODS.map((c) => <option key={c.value} value={c.value} className={opt}>{c.label}</option>)}
                      </select>
                      <Err id="gs-contact-err" msg={errors.contactMethod?.message} />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-end justify-between">
                      <label htmlFor="gs-desc" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Project description</label>
                      <span className={`text-[10px] font-bold ${descLen > 0 && descLen < 50 ? 'text-red-400' : 'text-slate-400'}`}>{descLen} / 1500</span>
                    </div>
                    <textarea id="gs-desc" rows={6} maxLength={1500} placeholder="What do you want to build, who is it for, and what does success look like? (min 50 characters)" className={`${field} resize-none`} aria-invalid={invalid('description')} aria-describedby="gs-desc-err" {...register('description')} />
                    <Err id="gs-desc-err" msg={errors.description?.message} />
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-slate-400 light:text-slate-600">
                      <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#1677ff]" aria-describedby="gs-consent-err" {...register('consent')} />
                      <span>I agree that Orbit Dev Studios may contact me about this inquiry. See the privacy policy for how your details are handled.</span>
                    </label>
                    <Err id="gs-consent-err" msg={errors.consent?.message} />
                  </div>

                  <p id="gs-form-note" className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Lock size={12} aria-hidden="true" />
                    Sent over HTTPS and used only to respond to your inquiry. Please do not include passwords or confidential keys.
                  </p>

                  {status === 'error' && (
                    <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-[13px] text-red-300 light:text-red-700">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                      <span>
                        We could not send your inquiry. Please try again, or email us directly at{' '}
                        <a href="mailto:orbitdevstudios@gmail.com" className="font-semibold underline">orbitdevstudios@gmail.com</a>.
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    data-track="global_form_submit"
                    data-track-location="global_form"
                    className="btn-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4 text-[14px] font-bold disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Start Your Global Project
                        <Send size={17} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
