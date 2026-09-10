import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Eye, EyeOff } from 'lucide-react';

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
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isCredentialsValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    email.includes('@') &&
    email.includes('.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCredentialsValid) return;

    // Directly access dashboard without OTP verification since there is no backend
    onNext({
      name: name.trim(),
      email: email.trim(),
    });
  };

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

      {/* Main Login Card */}
      <div
        className={`w-full max-w-[680px] rounded-[20px] sm:rounded-[28px] p-5 sm:p-9 md:p-12 transition-all border ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200/80 text-slate-900'
        }`}
      >
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
          Great to have you here! Enter your name and email to access your portfolio dashboard.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4">
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

          {/* Submit Button */}
          <button
            type="submit"
            id="login-btn-submit"
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
            <span>Access Portfolio</span>
            <span className="text-base leading-none font-normal">&gt;</span>
          </button>
        </form>
      </div>
    </div>
  );
};
