import { useState } from 'react';
import { Phone, X } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface OTPLoginProps {
  onClose: () => void;
}

export default function OTPLogin({ onClose }: OTPLoginProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    
    // Mock API call - simulate sending OTP
    setTimeout(() => {
      console.log('OTP sent to:', phone);
      // In production, this would call: POST /api/send-otp with { phone }
      setStep('otp');
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);

    // Mock API call - simulate OTP verification
    setTimeout(() => {
      console.log('Verifying OTP:', otp, 'for phone:', phone);
      // In production, this would call: POST /api/verify-otp with { phone, otp }
      // On success, store JWT token and redirect
      
      // Mock success
      alert('Login successful! 🎉');
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#5E2A14] rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl mb-2" style={{ color: '#5E2A14' }}>
            {step === 'phone' ? 'Login with OTP' : 'Verify OTP'}
          </h2>
          <p className="text-gray-600">
            {step === 'phone'
              ? 'Enter your phone number to receive OTP'
              : `Enter the 6-digit code sent to +91 ${phone}`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-gray-100 rounded-lg border border-gray-200">
                  <span className="text-gray-600">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E2A14] focus:border-transparent"
                  maxLength={10}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5E2A14] text-white py-3 rounded-full hover:bg-[#4A2110] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5E2A14] text-white py-3 rounded-full hover:bg-[#4A2110] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-[#5E2A14] text-sm hover:underline"
            >
              Change phone number
            </button>

            <button
              type="button"
              onClick={handleSendOTP}
              className="w-full text-gray-600 text-sm hover:underline"
            >
              Resend OTP
            </button>
          </form>
        )}

        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to our Terms & Conditions and Privacy Policy
        </p>
      </div>
    </div>
  );
}
