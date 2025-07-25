// app/privacy/page.js

import PrivacyContent from "@/components/PrivacyContent";

export const metadata = {
  title: "Privacy Policy | OmoolaEx",
  description: "Understand how OmoolaEx collects, uses, and protects your data.",
};

export default function PrivacyPage() {
      return (
          <main>
            <PrivacyContent />
          </main>
      );
}