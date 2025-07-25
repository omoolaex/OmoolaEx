// app/cookie-policy/page.js
import PageHero from "@/components/PageHero";

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero title="Cookie Policy" />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
        <p className="text-gray-700 mb-6">
          Cookies are small text files that are placed on your device when you visit a website. They help the website remember your preferences and enhance your user experience.
        </p>

        <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
        <p className="text-gray-700 mb-6">
          At OmoolaEx, we use cookies to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>Remember your preferences and settings</li>
          <li>Understand how you interact with our content</li>
          <li>Improve website performance and functionality</li>
          <li>Provide relevant marketing and advertising</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li><strong>Essential Cookies:</strong> Necessary for website functionality.</li>
          <li><strong>Performance Cookies:</strong> Help us analyze how our website is used.</li>
          <li><strong>Functional Cookies:</strong> Enhance features and personalize your experience.</li>
          <li><strong>Marketing Cookies:</strong> Track browsing habits to deliver tailored content.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
        <p className="text-gray-700 mb-6">
          You can control and manage cookies through your browser settings. Please note that disabling cookies may affect your ability to use certain features of our site.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Changes to This Policy</h2>
        <p className="text-gray-700 mb-6">
          We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated effective date.
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
        <p className="text-gray-700">
          If you have questions about our use of cookies, please email us at <a href="mailto:info@omoolaex.com" className="text-blue-600 hover:underline">info@omoolaex.com</a>.
        </p>
      </main>
    </>
  );
}