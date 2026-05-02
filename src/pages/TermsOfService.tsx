import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo";

const schemas = [
  generateLocalBusinessSchema(),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ]),
];

const TermsOfService = () => (
  <Layout>
    <SEOHead
      title="Terms of Service | Texas Total Security"
      description="Terms and conditions for Texas Total Security's security system installation, monitoring, and service offerings. Houston, TX."
      schemas={schemas}
    />
    <Breadcrumbs items={[{ name: "Terms of Service" }]} />

    <section className="section-padding">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Effective Date: January 1, 2025 &nbsp;·&nbsp; Last Updated: April 30, 2026</p>

        <div className="prose prose-gray max-w-none space-y-10 text-[15px] leading-relaxed text-foreground/80">

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing our website at <a href="https://www.texastotalsecurity.com" className="text-accent hover:underline">www.texastotalsecurity.com</a> or
              engaging Texas Total Security for any service, you agree to be bound by these Terms of Service ("Terms").
              If you do not agree with any part of these Terms, please do not use our website or services.
            </p>
            <p className="mt-3">
              These Terms apply to all visitors, customers, and users of Texas Total Security's services, including but not
              limited to security system installation, alarm monitoring, security cameras, and related offerings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">2. Services Offered</h2>
            <p>Texas Total Security provides the following services to residential and commercial customers in the Greater Houston area:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Security alarm system installation, takeovers, and upgrades</li>
              <li>Security camera and CCTV installation (hard-wired)</li>
              <li>24/7 alarm monitoring services</li>
              <li>HOA and community security systems</li>
              <li>Commercial and property management security solutions</li>
              <li>Security pole installation</li>
              <li>Ongoing system maintenance and support</li>
            </ul>
            <p className="mt-3">
              All services are subject to availability, site assessment results, and execution of a separate service agreement where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">3. Free Security Analysis</h2>
            <p>
              Our free onsite security analysis is provided at no charge and with no obligation to purchase. It involves a
              licensed security specialist visiting your property to assess vulnerabilities and recommend a custom security plan.
              Scheduling is subject to availability. We aim to respond to all requests within 24 hours on business days.
            </p>
            <p className="mt-3">
              Texas Total Security reserves the right to decline or reschedule any free analysis at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">4. Quotes and Proposals</h2>
            <p>
              All quotes and proposals provided by Texas Total Security are estimates based on information gathered during the
              free analysis. Final pricing is confirmed at the time of contract execution and may differ based on actual site
              conditions, equipment availability, or scope changes requested by the customer.
            </p>
            <p className="mt-3">
              Quotes are valid for 30 days from the date of issuance unless otherwise stated in writing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">5. Scheduling and Cancellations</h2>
            <p>
              Installation and service appointments are confirmed upon mutual agreement. If you need to reschedule or cancel
              an appointment, please provide at least 24 hours' notice by calling{" "}
              <a href="tel:7133879937" className="text-accent hover:underline">(713) 387-9937</a> or emailing{" "}
              <a href="mailto:info@texastotalsecurity.com" className="text-accent hover:underline">info@texastotalsecurity.com</a>.
            </p>
            <p className="mt-3">
              Late cancellations or no-shows for paid services may result in a service call fee as outlined in your service agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">6. Payment Terms</h2>
            <p>
              Payment terms are specified in your individual service agreement. Unless otherwise agreed in writing:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Installation fees are due upon completion of work</li>
              <li>Monthly monitoring fees are billed in advance on the agreed billing cycle</li>
              <li>Accepted payment methods will be disclosed at the time of service agreement</li>
            </ul>
            <p className="mt-3">
              Late payments may be subject to a late fee as specified in your service agreement. Texas Total Security reserves the
              right to suspend monitoring services for accounts 30 or more days past due.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">7. Licensing</h2>
            <p>
              Texas Total Security holds Texas Department of Public Safety (DPS) Alarm License{" "}
              <strong>#B03066901</strong>. All installations are performed by licensed and trained technicians in compliance
              with applicable Texas laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">8. Customer Responsibilities</h2>
            <p>As a customer of Texas Total Security, you agree to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide accurate information during the quote and installation process</li>
              <li>Ensure safe and lawful access to the property for our technicians</li>
              <li>Maintain equipment in good condition and report issues promptly</li>
              <li>Comply with all local ordinances regarding alarm systems (including false alarm policies)</li>
              <li>Not attempt to modify, repair, or tamper with installed equipment yourself</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">9. Disclaimer of Warranties</h2>
            <p>
              Security systems are designed to reduce — not eliminate — the risk of burglary, property damage, or other
              security incidents. Texas Total Security does not guarantee that the use of its systems will prevent crime or
              other losses.
            </p>
            <p className="mt-3">
              Our website and its content are provided "as is" without warranties of any kind, either expressed or implied,
              including but not limited to fitness for a particular purpose or non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by Texas law, Texas Total Security's liability for any claim arising from our
              services shall not exceed the total amount paid by the customer for the specific service giving rise to the claim
              in the 12 months preceding the claim.
            </p>
            <p className="mt-3">
              Texas Total Security shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
              including loss of profits, data, or property, even if advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">11. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, images, and software — is the property of Texas
              Total Security and is protected by applicable intellectual property laws. You may not reproduce, distribute, or
              create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard
              to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive
              jurisdiction of the courts located in Harris County, Texas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">13. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The "Last Updated" date at the top of this page reflects the most
              recent revision. Continued use of our website or services after changes constitutes your acceptance of the updated Terms.
              We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">14. Contact Us</h2>
            <p>If you have questions about these Terms, please contact us:</p>
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

export default TermsOfService;
