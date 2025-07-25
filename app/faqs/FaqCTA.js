import Link from "next/link";
import { MailIcon } from "lucide-react";

export default function FaqCTA() {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Still have questions?
        </h2>
        <p className="mt-3 text-gray-600">
          If you didn’t find the answer you’re looking for, we’re here to help.
          Reach out and let’s talk.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
        >
          <MailIcon className="w-4 h-4" />
          Contact Us
        </Link>
      </div>
    </section>
  );
}