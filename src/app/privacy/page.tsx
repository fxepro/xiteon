import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice",
  robots: { index: false },
};

// DRAFT: placeholder structure only. Have this reviewed by a lawyer for
// India's DPDP Act 2023 (and GDPR if you collect data from the EU) before launch.
export default function PrivacyPage() {
  return (
    <section className="sec">
      <div className="wrap prose">
        <div className="kicker">Draft</div>
        <h1 className="h-display" style={{ fontSize: 44 }}>Privacy notice</h1>
        <p><span className="ph">[Draft: legal review required before launch]</span></p>

        <h2>What we collect</h2>
        <p>From applicants: name, email, city, areas of expertise, languages, availability and the background you share.
          From business contacts: name, work email, company and project details.</p>

        <h2>Why we collect it</h2>
        <p>To assess applications and match people to projects, and to respond to business enquiries. We don&apos;t sell personal data.</p>

        <h2>Where it is stored</h2>
        <p>Form submissions are received and stored by our website host, Netlify, Inc., which processes them on our behalf.
          <span className="ph">[confirm data processing agreement and storage region]</span></p>

        <h2>How long we keep it</h2>
        <p><span className="ph">[retention period]</span></p>

        <h2>Your rights</h2>
        <p>You can ask to see, correct or delete your data, or withdraw consent, by emailing <span className="ph">[privacy contact email]</span>.</p>

        <h2>Grievance officer</h2>
        <p><span className="ph">[Name and contact, as required under the DPDP Act]</span></p>
      </div>
    </section>
  );
}
