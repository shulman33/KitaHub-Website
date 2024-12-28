import React from "react";

// Types for shared components
interface SectionHeaderProps {
  title: string;
}

interface SubsectionHeaderProps {
  title: string;
}

interface LegalSectionProps {
  children: React.ReactNode;
}

interface LegalPageProps {
  type: "terms" | "privacy";
}

// Shared component for section headers
const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <h2 className="text-2xl font-bold tracking-tight text-midnight-blue sm:text-3xl mb-6">
    {title}
  </h2>
);

// Shared component for subsection headers
const SubsectionHeader: React.FC<SubsectionHeaderProps> = ({ title }) => (
  <h3 className="text-xl font-bold tracking-tight text-midnight-blue sm:text-2xl mb-4">
    {title}
  </h3>
);

// Shared component for legal content sections
const LegalSection: React.FC<LegalSectionProps> = ({ children }) => (
  <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
    <div className="mx-auto max-w-3xl">{children}</div>
  </div>
);

// Terms of Service Page Component
export const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-midnight-blue sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Last Updated: December 28, 2024
          </p>
        </div>
      </div>

      <LegalSection>
        <section className="mb-12">
          <SectionHeader title="1. Acceptance of Terms" />
          <p className="text-gray-700 mb-6">
            By accessing or using KitaHub (the &quot;Platform&quot;), you agree
            to be bound by these Terms of Service. If you disagree with any part
            of these terms, you do not have permission to access the Platform.
          </p>
        </section>

        <section className="mb-12">
          <SectionHeader title="2. User Registration and Account Types" />

          <SubsectionHeader title="2.1 Account Classification" />
          <p className="text-gray-700 mb-4">
            When registering for KitaHub, users must accurately identify
            themselves as either:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">A Professor/Instructor</li>
            <li className="mb-2">A Student</li>
          </ul>

          <SubsectionHeader title="2.2 Account Verification" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              Users must provide accurate, current, and complete information
              during registration
            </li>
            <li className="mb-2">
              KitaHub reserves the right to verify user status through
              institutional email addresses or other means
            </li>
            <li className="mb-2">
              Misrepresentation of user status or credentials is strictly
              prohibited and will result in immediate account suspension or
              termination
            </li>
          </ul>

          <SubsectionHeader title="2.3 Account Integrity" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              Users are responsible for maintaining the security of their
              account credentials
            </li>
            <li className="mb-2">
              Any activities that occur under your account are your
              responsibility
            </li>
            <li className="mb-2">
              Users must immediately notify KitaHub of any unauthorized use of
              their account
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <SectionHeader title="3. Platform Rules and Guidelines" />

          <SubsectionHeader title="3.1 Code Submission and Academic Integrity" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              Students must only submit code that they have written themselves
            </li>
            <li className="mb-2">
              Plagiarism and code sharing between students is prohibited
            </li>
            <li className="mb-2">
              Professors must maintain confidentiality of student submissions
            </li>
          </ul>

          <SubsectionHeader title="3.2 Discussion Board Usage" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              All communications must be professional and respectful
            </li>
            <li className="mb-2">
              Content must be related to STEM education and course material
            </li>
            <li className="mb-2">
              Harassment, spam, and inappropriate content are prohibited
            </li>
          </ul>

          <SubsectionHeader title="3.3 Grading and Feedback" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              Professors maintain sole discretion over grading decisions
            </li>
            <li className="mb-2">
              Code annotations must be constructive and educational
            </li>
            <li className="mb-2">
              Grade disputes must follow institutional policies
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <SectionHeader title="4. Intellectual Property Rights" />

          <SubsectionHeader title="4.1 User Content" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              Users retain rights to code they submit through the Platform
            </li>
            <li className="mb-2">
              Users grant KitaHub a limited license to store, display, and
              process submitted content
            </li>
            <li className="mb-2">
              Professors retain rights to their feedback and teaching materials
            </li>
          </ul>

          <SubsectionHeader title="4.2 Platform Content" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              KitaHub&apos;s software, design, and features are protected by
              intellectual property laws
            </li>
            <li className="mb-2">
              Users may not copy, modify, or redistribute Platform features
              without permission
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <SectionHeader title="5. Termination" />

          <SubsectionHeader title="5.1 Account Termination" />
          <p className="text-gray-700 mb-4">
            KitaHub reserves the right to terminate or suspend accounts for:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              Misrepresentation of user status (student/professor)
            </li>
            <li className="mb-2">Violation of academic integrity policies</li>
            <li className="mb-2">Harassment or inappropriate behavior</li>
            <li className="mb-2">Any other violation of these Terms</li>
          </ul>

          <SubsectionHeader title="5.2 Effect of Termination" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              Upon termination, users lose access to all Platform features
            </li>
            <li className="mb-2">
              Previously submitted content may be retained for academic
              integrity purposes
            </li>
            <li className="mb-2">
              No refunds will be issued for paid services
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <SectionHeader title="6. Disclaimer and Limitations" />

          <SubsectionHeader title="6.1 Service Availability" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              KitaHub is provided &quot;as is&quot; without warranties of any
              kind
            </li>
            <li className="mb-2">
              We do not guarantee uninterrupted or error-free service
            </li>
            <li className="mb-2">
              Platform maintenance may occur with or without notice
            </li>
          </ul>

          <SubsectionHeader title="6.2 Limitation of Liability" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              KitaHub is not liable for any indirect, incidental, or
              consequential damages
            </li>
            <li className="mb-2">
              Maximum liability is limited to the amount paid for services
            </li>
          </ul>
        </section>
      </LegalSection>
    </div>
  );
};

// Privacy Policy Page Component
export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-midnight-blue sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Last Updated: December 28, 2024
          </p>
        </div>
      </div>

      <LegalSection>
        <section className="mb-12">
          <SectionHeader title="1. Information We Collect" />

          <SubsectionHeader title="1.1 Personal Information" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">Name and contact information</li>
            <li className="mb-2">Academic institution affiliation</li>
            <li className="mb-2">User role (professor/student)</li>
            <li className="mb-2">Educational records and submissions</li>
          </ul>

          <SubsectionHeader title="1.2 Technical Information" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">Device and browser information</li>
            <li className="mb-2">IP address and location data</li>
            <li className="mb-2">Usage patterns and analytics</li>
            <li className="mb-2">Cookie data</li>
          </ul>
        </section>

        <section className="mb-12">
          <SectionHeader title="2. How We Use Your Information" />

          <SubsectionHeader title="2.1 Educational Purposes" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">Facilitating course management</li>
            <li className="mb-2">Processing code submissions</li>
            <li className="mb-2">Enabling professor-student communication</li>
            <li className="mb-2">Maintaining academic records</li>
          </ul>

          <SubsectionHeader title="2.2 Platform Improvement" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">Analyzing usage patterns</li>
            <li className="mb-2">Improving features and functionality</li>
            <li className="mb-2">Troubleshooting technical issues</li>
            <li className="mb-2">User support</li>
          </ul>
        </section>

        <section className="mb-12">
          <SectionHeader title="3. Information Sharing" />

          <SubsectionHeader title="3.1 Within the Platform" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              Student submissions are shared with course professors
            </li>
            <li className="mb-2">
              Discussion board posts are visible to course participants
            </li>
            <li className="mb-2">
              Grades are only visible to the student and professor
            </li>
          </ul>

          <SubsectionHeader title="3.2 Third-Party Sharing" />
          <p className="text-gray-700 mb-4">
            By default, we do not sell personal information
          </p>
          <p className="text-gray-700 mb-4">
            Students may opt-in to share their academic performance data with
            recruiters:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              This option is disabled by default and must be explicitly enabled
              in profile settings
            </li>
            <li className="mb-2">
              When enabled, recruiters can purchase access to view:
              <ul className="list-disc pl-6 mt-2">
                <li className="mb-2">Code submission history</li>
                <li className="mb-2">Academic performance metrics</li>
                <li className="mb-2">Course participation data</li>
                <li className="mb-2">Discussion board contributions</li>
              </ul>
            </li>
            <li className="mb-2">
              Students can disable recruiter access at any time
            </li>
          </ul>

          <p className="text-gray-700 mb-4">Information may be shared with:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              Educational institutions for verification purposes
            </li>
            <li className="mb-2">
              Service providers who assist in Platform operation
            </li>
            <li className="mb-2">Legal authorities when required by law</li>
          </ul>
        </section>

        <section className="mb-12">
          <SectionHeader title="4. Data Security" />

          <SubsectionHeader title="4.1 Security Measures" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">Industry-standard encryption</li>
            <li className="mb-2">Regular security audits</li>
            <li className="mb-2">Secure data storage and transmission</li>
            <li className="mb-2">Access controls and authentication</li>
          </ul>

          <SubsectionHeader title="4.2 Data Retention" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              Academic records retained per institutional requirements
            </li>
            <li className="mb-2">
              Account data retained while account is active
            </li>
            <li className="mb-2">Backup data retained for reasonable period</li>
          </ul>
        </section>

        <section className="mb-12">
          <SectionHeader title="5. User Rights" />

          <SubsectionHeader title="5.1 Access and Control" />
          <p className="text-gray-700 mb-4">Users have the right to:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">Access their personal information</li>
            <li className="mb-2">Request corrections to their data</li>
            <li className="mb-2">Export their data</li>
            <li className="mb-2">Delete their account</li>
          </ul>

          <SubsectionHeader title="5.2 Data Sharing and Communication Preferences" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              Users can opt-out of non-essential communications
            </li>
            <li className="mb-2">
              Course-related communications cannot be opted out of
            </li>
            <li className="mb-2">
              Students control recruiter data access through profile settings
            </li>
            <li className="mb-2">
              Opting in to recruiter data sharing is entirely voluntary
            </li>
            <li className="mb-2">
              Students will be notified when their data is accessed by
              recruiters
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <SectionHeader title="6. Updates to Privacy Policy" />
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li className="mb-2">
              We reserve the right to update this privacy policy
            </li>
            <li className="mb-2">
              Users will be notified of significant changes
            </li>
            <li className="mb-2">
              Continued use after changes constitutes acceptance
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <SectionHeader title="7. Contact Information" />
          <p className="text-gray-700 mb-6">
            For questions about these policies, contact: [Insert KitaHub Contact
            Information]
          </p>
        </section>

        <section className="mb-12">
          <SectionHeader title="8. Governing Law" />
          <p className="text-gray-700 mb-6">
            These terms are governed by [Insert Applicable Jurisdiction] law.
            Any disputes shall be resolved in the courts of [Insert
            Jurisdiction].
          </p>
        </section>
      </LegalSection>
    </div>
  );
};

// Export a page component that can switch between Terms and Privacy
const LegalPage: React.FC<LegalPageProps> = ({ type = "terms" }) => {
  return type === "terms" ? <TermsOfService /> : <PrivacyPolicy />;
};

export default LegalPage;
