import { useEffect, useRef } from "react";

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const contactPanel = section.querySelector(".contact-panel");
    const contactOpen = section.querySelector(".contact-form-open");
    const contactForm = section.querySelector("#contact-form");
    const contactSubmit = section.querySelector(".contact-submit");
    const contactStatus = section.querySelector(".contact-form-status");
    const contactSuccess = section.querySelector(".contact-success");
    const contactAnother = section.querySelector(".contact-another");
    const nameInput = section.querySelector("#contact-name");

    function openContactForm(focusField) {
      contactPanel.classList.add("form-open");
      contactOpen.setAttribute("aria-expanded", "true");
      contactOpen.querySelector("span").textContent = "\u2191";
      if (focusField) setTimeout(() => nameInput.focus(), reduce ? 0 : 420);
    }
    function closeContactForm() {
      contactPanel.classList.remove("form-open");
      contactOpen.setAttribute("aria-expanded", "false");
      contactOpen.querySelector("span").textContent = "\u2193";
    }
    function validateContactField(field) {
      const wrap = field.closest(".contact-field");
      const error = wrap.querySelector(".field-error");
      let message = "";
      if (field.validity.valueMissing)
        message =
          field.name === "from_name"
            ? "Please share your name."
            : field.name === "from_email"
              ? "Please enter your email address."
              : "Please add a short message.";
      else if (field.validity.typeMismatch) message = "That email address does not look quite right.";
      else if (field.validity.tooShort)
        message = "A little more detail will help, please use at least 10 characters.";
      wrap.classList.toggle("invalid", Boolean(message));
      field.setAttribute("aria-invalid", String(Boolean(message)));
      error.textContent = message;
      return !message;
    }

    const onOpen = () => {
      const opening = !contactPanel.classList.contains("form-open");
      if (opening) openContactForm(true);
      else closeContactForm();
    };
    const onNavContact = () => openContactForm(false);
    const onAnother = () => {
      contactSuccess.classList.remove("visible");
      contactForm.style.display = "grid";
      contactSubmit.classList.remove("sent");
      contactStatus.textContent = "";
      contactForm.reset();
      nameInput.focus();
    };
    const onSubmit = (e) => {
      e.preventDefault();
      const fields = Array.prototype.filter.call(contactForm.elements, (f) => Boolean(f.name));
      let valid = true;
      fields.forEach((f) => {
        if (!validateContactField(f)) valid = false;
      });
      if (!valid) {
        contactStatus.className = "contact-form-status error";
        contactStatus.textContent = "Please check the highlighted fields.";
        const first = contactForm.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }
      if (!window.emailjs) {
        contactStatus.className = "contact-form-status error";
        contactStatus.textContent =
          "The message service is unavailable. Please use the email link above.";
        return;
      }
      contactSubmit.disabled = true;
      contactSubmit.classList.add("sending");
      contactStatus.className = "contact-form-status";
      contactStatus.textContent = "Sending your message\u2026";
      window.emailjs
        .sendForm("service_ko3hmpt", "template_ahbmmqd", contactForm, {
          publicKey: "I6HAT5mUZH7WHabGE",
        })
        .then(
          () => {
            contactSubmit.classList.remove("sending");
            contactSubmit.classList.add("sent");
            contactStatus.className = "contact-form-status success";
            contactStatus.textContent = "Message sent.";
            setTimeout(() => {
              contactForm.style.display = "none";
              contactSuccess.classList.add("visible");
            }, reduce ? 0 : 380);
          },
          () => {
            contactSubmit.disabled = false;
            contactSubmit.classList.remove("sending");
            contactStatus.className = "contact-form-status error";
            contactStatus.textContent =
              "Message could not be sent. Please try again or use the email link above.";
          }
        );
    };

    contactOpen.addEventListener("click", onOpen);
    const navLinks = document.querySelectorAll('.nav-links a[href="#contact"]');
    navLinks.forEach((l) => l.addEventListener("click", onNavContact));
    const fieldHandlers = [];
    Array.prototype.forEach.call(contactForm.elements, (field) => {
      if (!field.name) return;
      const onBlur = () => validateContactField(field);
      const onInput = () => {
        if (field.closest(".contact-field").classList.contains("invalid")) validateContactField(field);
      };
      field.addEventListener("blur", onBlur);
      field.addEventListener("input", onInput);
      fieldHandlers.push([field, onBlur, onInput]);
    });
    contactAnother.addEventListener("click", onAnother);
    contactForm.addEventListener("submit", onSubmit);

    return () => {
      contactOpen.removeEventListener("click", onOpen);
      navLinks.forEach((l) => l.removeEventListener("click", onNavContact));
      fieldHandlers.forEach(([f, b, i]) => {
        f.removeEventListener("blur", b);
        f.removeEventListener("input", i);
      });
      contactAnother.removeEventListener("click", onAnother);
      contactForm.removeEventListener("submit", onSubmit);
    };
  }, []);

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="wrap contact-panel reveal">
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h2>Building something ambitious?</h2>
          <p>
            Let&rsquo;s talk about full-stack engineering, agentic AI systems, or practical
            automation.
          </p>
        </div>
        <div className="contact-list">
          <a href="mailto:chksaikumar@gmail.com">
            chksaikumar@gmail.com <span aria-hidden="true">↗</span>
          </a>
          <a href="https://github.com/chksaikumar" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a href="https://www.linkedin.com/in/chksaikumar" target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <button
            className="contact-form-open"
            type="button"
            aria-expanded="false"
            aria-controls="contact-form-shell"
          >
            Send a message <span aria-hidden="true">↓</span>
          </button>
        </div>
        <div className="contact-form-shell" id="contact-form-shell">
          <form className="contact-form" id="contact-form" noValidate>
            <div className="contact-field">
              <input
                id="contact-name"
                name="from_name"
                type="text"
                placeholder=" "
                autoComplete="name"
                required
                maxLength="80"
                aria-describedby="contact-name-error"
              />
              <label htmlFor="contact-name">Your name</label>
              <span className="field-error" id="contact-name-error" aria-live="polite"></span>
            </div>
            <div className="contact-field">
              <input
                id="contact-email"
                name="from_email"
                type="email"
                placeholder=" "
                autoComplete="email"
                required
                maxLength="120"
                aria-describedby="contact-email-error"
              />
              <label htmlFor="contact-email">Email address</label>
              <span className="field-error" id="contact-email-error" aria-live="polite"></span>
            </div>
            <div className="contact-field message-field">
              <textarea
                id="contact-message"
                name="message"
                placeholder=" "
                required
                minLength="10"
                maxLength="2000"
                aria-describedby="contact-message-error"
              ></textarea>
              <label htmlFor="contact-message">Tell me about your project or opportunity</label>
              <span className="field-error" id="contact-message-error" aria-live="polite"></span>
            </div>
            <div className="contact-form-actions">
              <button className="contact-submit" type="submit">
                <span className="send-label">
                  Send message <span aria-hidden="true">↗</span>
                </span>
                <span className="send-spinner" aria-hidden="true"></span>
                <span className="send-check" aria-hidden="true">
                  ✓
                </span>
              </button>
              <p className="contact-form-status" role="status" aria-live="polite"></p>
            </div>
          </form>
          <div className="contact-success" role="status" aria-live="polite">
            <div>
              <div className="contact-success-mark" aria-hidden="true">
                ✓
              </div>
              <h3>Message Sent Successfully</h3>
              <p>Thanks for reaching out. Sai will get back to you soon.</p>
              <button type="button" className="contact-another">
                Send another message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
