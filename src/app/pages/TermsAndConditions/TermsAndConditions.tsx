import { motion } from "framer-motion";
import Layout from "../../components/layout";

export default function TermsConditions() {
  return (
    <Layout>
      <section className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-20 font-[Inter]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 sm:p-12"
        >
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#062F2C] mb-8">
            Terms & Conditions
          </h1>

          {/* Scrollable content */}
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Welcome to our website. By accessing or using our services, you agree to comply with these terms and conditions. Please read them carefully.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-2">2. Use of Website</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                You may use the website for lawful purposes only. You must not misuse the website or attempt to access it in a way that may cause damage or disrupt our services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                All content, including text, graphics, logos, and images, is owned by the company or its licensors. You may not use or reproduce any content without explicit permission.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-2">4. Limitation of Liability</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                We are not responsible for any damages or losses arising from the use of this website. All services are provided "as is" without warranty of any kind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-2">5. Changes to Terms</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                We reserve the right to update or modify these terms at any time. Continued use of the website signifies acceptance of any changes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                If you have any questions about these terms, please contact us at <span className="text-[#5E2A14]">hello@indiemakers.in</span>.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}