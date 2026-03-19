import { MessageCircle, Phone } from "lucide-react";
import whatsappIcon from "../../assets/icons/whatsapp.svg";
export default function SupportSection() {
  return (
    <section className="py-6 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FAF8F5] to-[#F5F1ED]  shadow-xl p-8 md:p-12 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl mb-4"
            style={{ color: "#5E2A14" }}
          >
            Still have questions?
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Our customer support team is here to help you with any queries about
            our products, shipping, or returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#5E2A14] text-white px-8 py-3  hover:bg-[#4A2110] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Support
            </button>
            <button className="border border-[#5E2A14] text-[#5E2A14] px-8 py-3 hover:bg-[#5E2A14] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
