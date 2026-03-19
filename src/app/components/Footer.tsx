import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const company = ['About Us', 'Our Story', 'Careers', 'Press'];
  const customerService = ['Track Order', 'Size Guide', 'Shipping Info', 'FAQs'];
  const policies = ['Privacy Policy', 'Terms & Conditions', 'Return Policy', 'Payment Terms'];

  return (
    <footer className="bg-[#5E2A14] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Kargee
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Crafting timeless ethnic fashion with modern elegance since 2020.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {customerService.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">support@kargee.co.in</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Policies Links */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-wrap gap-6 justify-center mb-6">
            {policies.map((policy) => (
              <a
                key={policy}
                href="#"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {policy}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-white/60">
            © {new Date().getFullYear()} Kargee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
