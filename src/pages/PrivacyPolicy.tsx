import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo";

const schemas = [
  generateLocalBusinessSchema(),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ]),
];

const PrivacyPolicy = () => (
  <Layout>
    <SEOHead
      title="Privacy Policy | Texas Total Security"
      description="Privacy Policy for Texas Total Security — how we collect, use, and protect your personal information. Houston, TX."
      schemas={schemas}
    />
    <Breadcrumbs items={[{ name: "Privacy Policy" }]} />

    <section className="section-padding">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Effective Date: January 1, 2025 &nbsp;·&nbsp; Last Updated: April 30, 2026</p>

        <div className="prose prose-gray max-w-none space-y-10 text-[15px] leading-relaxed text-foreground/80">

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">1. Who We Are</h2>
            <p>
              Texas Total Security ("Company," "we," "us," or "our") is a locally owned and operated security company headquartered in Houston, Texas.
            </p>
            <address className="not-italic mt-3 text-sm text-foreground/60 leading-relaxed">
              Texas Total Security<br />
              11331 Richmond Ave. #102<br />
              Houston, TX 77082<br />
              Phone: <a href="tel:7133879937" className="text-accent hover:underline">(713) 387-9937</a><br />
              Email: <a href="mailto:info@texastotalsecurity.com" className="text-accent hover:underline">info@texastotalsecurity.com</a>
            </address>
            <p className="mt-3">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at{" "}
              <a href="https://www.texastotalsecurity.com" className="text-accent hover:underline">www.texastotalsecurity.com</a>{" "}
              or contact us for services. Please read it carefully.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">2. Information We Collect</h2>

            <h3 className="text-base font-semibold text-foreground mb-2">a. Information You Provide Directly</h3>
            <p>When you fill out a contact form or request a free security analysis, we may collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>First and last name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Property address, city, state, and ZIP code</li>
              <li>Service type and property type</li>
              <li>Property size, current security system, timeline, and budget</li>
              <li>Any additional notes you include</li>
            </ul>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">b. Automatically Collected Information</h3>
            <p>When you visit our website, certain data is collected automatically through third-party tools:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Google Analytics 4 (GA4):</strong> Pages visited, time on site, traffic source, device type, browser, and geographic region. Data is anonymized and aggregated. Google's Privacy Policy governs this data.</li>
              <li><strong>Hotjar:</strong> Session recordings, heatmaps, and behavior analytics to help us improve the user experience. Hotjar does not collect personally identifiable information. Hotjar's Privacy Policy governs this data.</li>
              <li><strong>Netlify:</strong> Form submissions are processed and stored by Netlify's infrastructure. Netlify's Privacy Policy governs this data.</li>
              <li><strong>Tidio Live Chat:</strong> If you use our live chat widget, Tidio may collect your messages and device information. Tidio's Privacy Policy governs this data.</li>
            </ul>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">c. Cookies and Tracking</h3>
            <p>
              Our website uses cookies and similar tracking technologies for analytics and performance measurement. You can control cookies through your browser settings. Disabling cookies may limit some site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Respond to your inquiries and schedule free security analyses</li>
              <li>Provide quotes, proposals, and security system installations</li>
              <li>Communicate with you about your account, services, or appointments</li>
              <li>Send service-related updates or follow-up communications (not spam)</li>
              <li>Improve our website, services, and marketing</li>
              <li>Comply with applicable laws and regulations</li>
            </ul>
            <p className="mt-3">
              We will never sell, rent, or trade your personal information to third parties for their marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">4. How We Share Your Information</h2>
            <p>We may share your information only in the following limited circumstances:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Service Providers:</strong> Third-party platforms we use to operate our business (Netlify, Google, Hotjar, Tidio) — only to the extent necessary for them to provide their services.</li>
              <li><strong>Legal Requirements:</strong> If required by law, court order, or government authority.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred to the successor entity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes described in this policy, provide ongoing service, and comply with legal obligations. Form submissions are retained for up to 3 years for business records purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">6. Your Rights (Texas Residents)</h2>
            <p>
              Under the Texas Data Privacy and Security Act (TDPSA), Texas residents have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Know what personal data we collect about you</li>
              <li>Correct inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of the sale of your personal data (we do not sell data)</li>
              <li>Appeal a refusal to act on your request</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:info@texastotalsecurity.com" className="text-accent hover:underline">info@texastotalsecurity.com</a>{" "}
              or call <a href="tel:7133879937" className="text-accent hover:underline">(713) 387-9937</a>. We will respond within 45 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">7. Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical safeguards to protect your personal information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">8. Children's Privacy</h2>
            <p>
              Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites (e.g., Google Maps). We are not responsible for the privacy practices of those sites and encourage you to review their policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this page reflects the most recent revision. Continued use of our website after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">11. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
            <address className="not-italic mt-3 text-sm text-foreground/60 leading-relaxed">
              Texas Total Security<br />
              11331 Richmond Ave. #102<br />
              Houston, TX 77082<br />
              Phone: <a href="tel:7133879937" className="text-accent hover:underline">(713) 387-9937</a><br />
              Email: <a href="mailto:info@texastotalsecurity.com" className="text-accent hover:underline">info@texastotalsecurity.com</a>
            </address>
          </section>

        </div>
      </div>
    </section>
  </Layout>
);

export default PrivacyPolicy;
