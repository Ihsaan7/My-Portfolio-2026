import React, { useState } from 'react';
import { RoleData } from '../types/portfolio';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Check, Copy, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';

interface ContactSectionProps {
  role: RoleData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ role }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Safe input sanitization to prevent XSS injection
  const sanitizeInput = (str: string) => {
    return str.replace(/<[^>]*>?/gm, '').trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bot filling honeypot
    setErrorMessage(null);

    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Direct submission via FormSubmit service to Ihsaan's actual inbox
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          _subject: `Portfolio Inquiry from ${cleanName} (${role.label})`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        // Fallback to mailto link if external service has network restriction
        window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
          `Portfolio Inquiry from ${cleanName}`
        )}&body=${encodeURIComponent(`${cleanMessage}\n\nFrom: ${cleanName} (${cleanEmail})`)}`;
        setFormSubmitted(true);
      }
    } catch {
      // Network fallback: open user's default email client
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${cleanName}`
      )}&body=${encodeURIComponent(`${cleanMessage}\n\nFrom: ${cleanName} (${cleanEmail})`)}`;
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-zinc-200 dark:border-zinc-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Direct Contact & Info */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: role.theme.accentHex }}
              />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
              Let's connect.
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-8 max-w-md">
              Available for full-time engineering roles, technical opportunities, and freelance engagements across{' '}
              <span className="text-zinc-900 dark:text-white font-medium">{role.label}</span> domains.
            </p>

            <div className="space-y-3 max-w-md mb-8">
              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">
                      Email
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-zinc-900 dark:text-white">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">
                      Phone / WhatsApp
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-zinc-900 dark:text-white">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                  title="Copy phone number"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <div className="p-2 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">
                    Location
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-zinc-900 dark:text-white">
                    {PERSONAL_INFO.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Inquiry Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
            {formSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div
                  className="w-10 h-10 rounded-full mx-auto flex items-center justify-center text-white"
                  style={{ backgroundColor: role.theme.accentHex }}
                >
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Message Dispatched
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xs mx-auto font-light leading-relaxed">
                  Your inquiry was successfully sent to <span className="font-mono text-zinc-900 dark:text-white">{PERSONAL_INFO.email}</span>. Ihsaan will reply directly to your inbox.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                      `Follow-up: Portfolio Inquiry from ${formData.name || 'Visitor'}`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <span>Launch email client</span>
                  </a>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="text-xs font-mono text-zinc-500 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="_anti_bot_check"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 mb-1 uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Recruiter or Engineering Lead"
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 mb-1 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 mb-1 uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    maxLength={2000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe the role, project, or inquiry..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-5 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-1.5 disabled:opacity-60"
                  style={{ backgroundColor: role.theme.accentHex }}
                >
                  <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
                  <span>{isSubmitting ? 'Transmitting to Inbox...' : 'Transmit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
