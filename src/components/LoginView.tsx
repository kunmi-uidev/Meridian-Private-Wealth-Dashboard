import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Eye, EyeOff, ArrowLeft, CheckCircle2, RotateCw } from 'lucide-react';

interface LoginViewProps {
  onNext: (userData: { name: string; email: string }) => void;
  isDark: boolean;
  onToggleTheme?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onNext,
  isDark,
  onToggleTheme,
}) => {
  // Step: 'credentials' | 'verify'
  const [step, setStep] = useState<'credentials' | 'verify'>('credentials');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Verification state (6-digit OTP)
  const DEMO_CODE = '482910';
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Refs for 6 OTP input boxes
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isCredentialsValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    email.includes('@') &&
    email.includes('.');

  // Timer countdown for resending code
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'verify' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Focus the first OTP input when moving to verify step
  useEffect(() => {
    if (step === 'verify') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCredentialsValid) return;
    setStep('verify');
    setOtp(['', '', '', '', '', '']);
    setOtpError(null);
    setResendTimer(30);
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric digits
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      setOtpError(null);
      return;
    }

    // Handle single character
    const char = cleaned.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);
    setOtpError(null);

    // Auto advance to next box
    if (index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || '';
    }
    setOtp(newOtp);
    setOtpError(null);

    const nextIndex = Math.min(pastedData.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  const fillDemoCode = () => {
    const chars = DEMO_CODE.split('');
    setOtp(chars);
    setOtpError(null);
    otpInputRefs.current[5]?.focus();
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setResendSuccess(true);
    setOtp(['', '', '', '', '', '']);
    setOtpError(null);
    setTimeout(() => {
      setResendSuccess(false);
    }, 4000);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length < 6) {
      setOtpError('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsVerifying(true);
    setOtpError(null);

    // Quick verification simulation
    setTimeout(() => {
      setIsVerifying(false);
      onNext({
        name: name.trim(),
        email: email.trim(),
      });
    }, 400);
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <div
      className={`min-h-[100dvh] w-full flex flex-col justify-center items-center p-3.5 sm:p-6 transition-colors duration-200 overflow-y-auto py-8 sm:py-12 ${
        isDark ? 'bg-[#080C14] text-slate-100' : 'bg-[#E5E7EB] text-slate-900'
      }`}
    >
      {/* Top right theme toggle */}
      {onToggleTheme && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20">
          <button
            type="button"
            onClick={onToggleTheme}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              isDark
                ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                : 'border-slate-300/80 bg-white text-[#808080] hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Toggle theme"
          >
            <Icon icon="ph:circle-half-fill" className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Login Card - Frame 427318279.png layout, shadow removed, deeper background */}
      <div
        className={`w-full max-w-[680px] rounded-[20px] sm:rounded-[28px] p-5 sm:p-9 md:p-12 transition-all border ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200/80 text-slate-900'
        }`}
      >
        {step === 'credentials' ? (
          <>
            {/* Title */}
            <h1
              id="login-title"
              className="text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight leading-tight"
            >
              Welcome to Meridian Private
            </h1>

            {/* Subtitle */}
            <p
              id="login-subtitle"
              className={`text-xs sm:text-sm md:text-[14px] leading-relaxed mt-2 sm:mt-3 font-normal ${
                isDark ? 'text-slate-400' : 'text-[#737373]'
              }`}
            >
              Great to have you here! We would like you to enter your name, email and verify it.
            </p>

            {/* Login Form */}
            <form onSubmit={handleCredentialsSubmit} className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4">
              {/* Name Field */}
              <div>
                <input
                  id="login-input-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  autoComplete="name"
                  className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border text-sm sm:text-[15px] transition-all outline-none ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700/80 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'
                      : 'bg-white border-[#E0E0E0] text-slate-900 placeholder:text-[#9E9E9E] focus:border-[#185ABC] focus:ring-1 focus:ring-[#185ABC]/30'
                  }`}
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  id="login-input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  inputMode="email"
                  className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border text-sm sm:text-[15px] transition-all outline-none ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700/80 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'
                      : 'bg-white border-[#E0E0E0] text-slate-900 placeholder:text-[#9E9E9E] focus:border-[#185ABC] focus:ring-1 focus:ring-[#185ABC]/30'
                  }`}
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <input
                    id="login-input-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 pr-12 rounded-xl sm:rounded-2xl border text-sm sm:text-[15px] transition-all outline-none ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700/80 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'
                        : 'bg-white border-[#E0E0E0] text-slate-900 placeholder:text-[#9E9E9E] focus:border-[#185ABC] focus:ring-1 focus:ring-[#185ABC]/30'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Helper text */}
                <p
                  id="password-helper-text"
                  className={`text-xs sm:text-[13px] mt-2 font-normal ${
                    isDark ? 'text-slate-400' : 'text-[#737373]'
                  }`}
                >
                  Password should contain 8 alphanumeric keys and a special character{' '}
                  <span className="text-[#185ABC] dark:text-blue-400 font-medium">(!@#$%&)</span>
                </p>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2.5 pt-0.5 sm:pt-1">
                <input
                  id="remember-me-checkbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-[#06397A] dark:text-blue-500 focus:ring-0 cursor-pointer accent-[#06397A]"
                />
                <label
                  htmlFor="remember-me-checkbox"
                  className={`text-xs sm:text-sm font-normal cursor-pointer select-none ${
                    isDark ? 'text-slate-300' : 'text-[#4A4A4A]'
                  }`}
                >
                  Remember Me
                </label>
              </div>

              {/* Next Button */}
              <button
                type="submit"
                id="login-btn-next"
                disabled={!isCredentialsValid}
                className={`w-full mt-4 sm:mt-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] ${
                  isCredentialsValid
                    ? isDark
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-[#06397A] hover:bg-[#052E63] text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-[#EAEAEA] text-[#737373] cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <span className="text-base leading-none font-normal">&gt;</span>
              </button>
            </form>
          </>
        ) : (
          /* Email Verification Step */
          <div className="animate-in fade-in duration-200">
            {/* Back Button to Credentials */}
            <button
              type="button"
              onClick={() => setStep('credentials')}
              className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium mb-4 sm:mb-5 transition-colors cursor-pointer py-1 ${
                isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Back to credentials</span>
            </button>

            {/* Header */}
            <h1
              id="verify-title"
              className="text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight leading-tight"
            >
              Verify your email
            </h1>

            {/* Subtitle */}
            <p
              id="verify-subtitle"
              className={`text-xs sm:text-sm md:text-[14px] leading-relaxed mt-2 sm:mt-3 font-normal ${
                isDark ? 'text-slate-400' : 'text-[#737373]'
              }`}
            >
              We've sent a 6-digit verification code to{' '}
              <strong className="font-semibold text-slate-900 dark:text-slate-100 break-all">{email}</strong>.
              Enter the code below to confirm your account.
            </p>

            {/* OTP Input Form */}
            <form onSubmit={handleVerifySubmit} className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-5">
              {/* 6 Digit Inputs */}
              <div>
                <div className="flex items-center justify-between gap-1.5 sm:gap-2.5 max-w-[480px]">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className={`w-11 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-center text-lg sm:text-2xl font-semibold rounded-xl sm:rounded-2xl border transition-all outline-none ${
                        digit
                          ? isDark
                            ? 'border-blue-500 bg-slate-850 text-white ring-1 ring-blue-500/40'
                            : 'border-[#185ABC] bg-white text-slate-900 ring-1 ring-[#185ABC]/30'
                          : isDark
                          ? 'border-slate-700 bg-slate-800/80 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'
                          : 'border-[#E0E0E0] bg-white text-slate-900 focus:border-[#185ABC] focus:ring-1 focus:ring-[#185ABC]/30'
                      }`}
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="text-xs text-rose-500 dark:text-rose-400 mt-2 font-medium">
                    {otpError}
                  </p>
                )}
              </div>

              {/* Demo Helper & Resend Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 text-xs sm:text-[13px]">
                {/* Demo autofill hint */}
                <div className="flex items-center gap-2">
                  <span className={`${isDark ? 'text-slate-400' : 'text-[#737373]'}`}>
                    Demo code: <strong className="text-slate-900 dark:text-slate-200 font-mono">482910</strong>
                  </span>
                  <button
                    type="button"
                    onClick={fillDemoCode}
                    className="text-[#185ABC] dark:text-blue-400 hover:underline font-medium cursor-pointer p-1"
                  >
                    Use code
                  </button>
                </div>

                {/* Resend button / countdown */}
                <div className="flex items-center gap-1.5">
                  {resendSuccess ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Code resent!
                    </span>
                  ) : resendTimer > 0 ? (
                    <span className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      Resend code in <strong className="font-semibold">{resendTimer}s</strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="inline-flex items-center gap-1 text-[#185ABC] dark:text-blue-400 hover:underline font-medium cursor-pointer py-1"
                    >
                      <RotateCw className="w-3 h-3" />
                      Resend code
                    </button>
                  )}
                </div>
              </div>

              {/* Submit Verification Button */}
              <button
                type="submit"
                id="verify-btn-submit"
                disabled={!isOtpComplete || isVerifying}
                className={`w-full mt-3 sm:mt-5 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] ${
                  isOtpComplete && !isVerifying
                    ? isDark
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-[#06397A] hover:bg-[#052E63] text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-[#EAEAEA] text-[#737373] cursor-not-allowed'
                }`}
              >
                {isVerifying ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <span className="text-base leading-none font-normal">&gt;</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
