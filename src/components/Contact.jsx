import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FiMail, FiLinkedin, FiGithub, FiMapPin, FiSend } from "react-icons/fi";
import { emailjs as emailjsConfig, profile } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "peer w-full rounded-xl border border-white/10 bg-night/40 px-4 pb-2.5 pt-6 text-sm text-fog placeholder-transparent outline-none transition focus:border-accent/60 light:border-ink/10 light:bg-white light:text-ink";

const labelClass =
  "pointer-events-none absolute left-4 top-4 text-sm text-muteddark transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs light:text-mutedlight";

const infoRows = [
  {
    icon: FiMail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/chksaikumar",
    href: profile.linkedin,
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "github.com/chksaikumar",
    href: profile.github,
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Newark, Delaware",
    href: null,
  },
];

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const validateField = (field, val) => {
    if (field === "name") return val.trim() ? "" : "Please tell me your name.";
    if (field === "email") {
      if (!val.trim()) return "Please enter your email address.";
      return EMAIL_PATTERN.test(val.trim()) ? "" : "Please enter a valid email address.";
    }
    if (field === "message") return val.trim() ? "" : "Please write a message.";
    return "";
  };

  const validateAll = (vals) => {
    const next = {};
    for (const field of ["name", "email", "message"]) {
      const msg = validateField(field, vals[field]);
      if (msg) next[field] = msg;
    }
    return next;
  };

  const handleChange = (field) => (e) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, next[field]) || undefined }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) || undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          message: values.message.trim(),
        },
        { publicKey: emailjsConfig.publicKey }
      );
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setValues({ name: "", email: "", message: "" });
    setTouched({ name: false, email: false, message: false });
    setErrors({});
    setStatus("idle");
  };

  const buttonLabel =
    status === "sending"
      ? "Sending..."
      : status === "success"
        ? "Message Sent Successfully"
        : "Send Message";

  return (
    <section id="contact" className="relative scroll-mt-20 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
          <h2 className="mt-3 text-3xl font-bold text-fog light:text-ink md:text-4xl">
            Let's build something
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Left info panel */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-card p-8 shadow-card light:border-ink/10 light:bg-paper">
              <p className="text-muteddark light:text-mutedlight">
                Have a role, a project, or just an idea to talk through? My inbox is open and I
                usually reply within a day.
              </p>
              <ul className="mt-8 space-y-5">
                {infoRows.map((row) => {
                  const Icon = row.icon;
                  const content = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-widest text-muteddark light:text-mutedlight">
                          {row.label}
                        </span>
                        <span className="block truncate text-sm font-medium text-fog light:text-ink">
                          {row.value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={row.label}>
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.href.startsWith("http") ? "_blank" : undefined}
                          rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                          className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-white/5 light:hover:bg-ink/5"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-2">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {/* Right form card */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-accent/20 bg-[#0d1512]/80 p-6 shadow-card backdrop-blur md:p-8 light:border-ink/10 light:bg-[#f7f8f7] light:shadow-card"
            >
              <div className="space-y-5">
                <div className="relative">
                  <input
                    id="contact-name"
                    type="text"
                    placeholder=" "
                    value={values.name}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    disabled={status === "sending" || status === "success"}
                    className={inputClass}
                  />
                  <label htmlFor="contact-name" className={labelClass}>
                    Your name
                  </label>
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    id="contact-email"
                    type="email"
                    placeholder=" "
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    disabled={status === "sending" || status === "success"}
                    className={inputClass}
                  />
                  <label htmlFor="contact-email" className={labelClass}>
                    Email address
                  </label>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    id="contact-message"
                    placeholder=" "
                    rows={5}
                    value={values.message}
                    onChange={handleChange("message")}
                    onBlur={handleBlur("message")}
                    disabled={status === "sending" || status === "success"}
                    className={`${inputClass} min-h-[130px] resize-y`}
                  />
                  <label htmlFor="contact-message" className={labelClass}>
                    Your message
                  </label>
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-night shadow-glow transition hover:bg-accentdeep hover:text-fog disabled:cursor-default disabled:opacity-90"
              >
                {status !== "success" && <FiSend aria-hidden="true" />}
                {buttonLabel}
              </button>

              {status === "success" && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-3 w-full text-center text-sm text-accent underline-offset-4 hover:underline"
                >
                  Send another message
                </button>
              )}

              {status === "error" && (
                <p className="mt-4 text-sm text-red-400">
                  Something went wrong, please email me directly at{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-medium text-accent underline underline-offset-4"
                  >
                    {profile.email}
                  </a>
                  .
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
