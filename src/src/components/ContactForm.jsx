import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef();
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dwa3n78",   // replace with your EmailJS Service ID
        "template_1uuf3to",  // replace with your Template ID
        form.current,
        "mI_iUunwqiGTE_qzZ"    // replace with your Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div id="contact" className="max-w-lg mx-auto my-16 p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
      <h2 className="text-3xl font-semibold text-white mb-6 text-center tracking-wide">Send a Message</h2>
      {success && (
        <p className="text-green-400 mb-4 text-center animate-pulse">
          Message sent successfully!
        </p>
      )}
      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-3 rounded-xl bg-white/20 text-white placeholder:text-white/70 focus:bg-white/30 focus:outline-none transition"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-3 rounded-xl bg-white/20 text-white placeholder:text-white/70 focus:bg-white/30 focus:outline-none transition"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={5}
          className="p-3 rounded-xl bg-white/20 text-white placeholder:text-white/70 focus:bg-white/30 focus:outline-none transition resize-none"
        />
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition transform"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
