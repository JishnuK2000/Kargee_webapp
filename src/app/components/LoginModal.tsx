import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

interface User {
  _id: string;
  name: string;
  mobile: string;
  addresses?: any[];
  profilePicture?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const API = import.meta.env.VITE_API_URL;
  const [step, setStep] = useState<1 | 2>(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    if (!mobile) return setMessage("Enter your mobile number");
    setLoading(true);
    try {
      await axios.post(`${API}/user/auth/send-otp`, { mobile });
      setStep(2);
      setMessage("OTP sent to your mobile");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setMessage("Enter OTP");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/user/auth/verify-otp`, { mobile, otp });
      const { token, user } = res.data;
      localStorage.setItem("userToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal Box */}
        <motion.div
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-black text-lg"
          >
            ✕
          </button>

          <h2 className="text-xl font-semibold mb-4 text-center">
            Login / Signup
          </h2>

          {message && (
            <p className="text-sm text-red-500 mb-3 text-center">{message}</p>
          )}

          {step === 1 && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <input
                type="text"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full transition"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg w-full transition"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
