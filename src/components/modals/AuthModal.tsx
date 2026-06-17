'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'sonner';

const countries = [
  { id: 'us', name: 'United States', flag: 'https://flagcdn.com/w40/us.png', dialCode: '+1' },
  { id: 'ua', name: 'Ukraine', flag: 'https://flagcdn.com/w40/ua.png', dialCode: '+380' },
  { id: 'gb', name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png', dialCode: '+44' },
  { id: 'ca', name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png', dialCode: '+1' },
  { id: 'au', name: 'Australia', flag: 'https://flagcdn.com/w40/au.png', dialCode: '+61' },
  { id: 'de', name: 'Germany', flag: 'https://flagcdn.com/w40/de.png', dialCode: '+49' },
  { id: 'fr', name: 'France', flag: 'https://flagcdn.com/w40/fr.png', dialCode: '+33' },
];

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 0C3.1325 0 0 4.66667 0 4.66667C0 4.66667 3.1325 9.33333 7 9.33333C10.8675 9.33333 14 4.66667 14 4.66667C14 4.66667 10.8675 0 7 0ZM7 7.77778C5.22375 7.77778 3.79167 6.38556 3.79167 4.66667C3.79167 2.94778 5.22375 1.55556 7 1.55556C8.77625 1.55556 10.2083 2.94778 10.2083 4.66667C10.2083 6.38556 8.77625 7.77778 7 7.77778ZM7 2.8C5.93917 2.8 5.075 3.63689 5.075 4.66667C5.075 5.69644 5.93917 6.53333 7 6.53333C8.06083 6.53333 8.925 5.69644 8.925 4.66667C8.925 3.63689 8.06083 2.8 7 2.8Z" fill="#A5B8EF" />
    </svg>
  );
}

function CaretDown() {
  return (
    <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L3.5 3L6 1" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AuthModalContent({ defaultMode }: { defaultMode?: 'login' | 'register' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authModeFromUrl = searchParams?.get('auth'); // 'login' or 'register'
  const authMode = authModeFromUrl === 'login' || authModeFromUrl === 'register' ? authModeFromUrl : defaultMode;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    identifier: '', // used for login
  });

  if (!authMode) {
    return null;
  }

  const isLogin = authMode === 'login';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    if (window.location.pathname.includes('/auth/')) {
      router.push('/');
    } else {
      router.push(window.location.pathname); // remove query params
    }
  };

  const handleTabSwitch = (mode: 'login' | 'register') => {
    if (window.location.pathname.includes('/auth/')) {
      router.push(mode === 'login' ? '/auth/sign-in' : '/auth/sign-up');
    } else {
      const params = new URLSearchParams(searchParams as any);
      params.set('auth', mode);
      router.push(`${window.location.pathname}?${params.toString()}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const result = await signIn('credentials', {
          redirect: false,
          identifier: formData.identifier,
          password: formData.password,
        });

        if (result?.error) {
          toast.error('Invalid credentials');
        } else if (result?.ok) {
          toast.success('Login successful!');
          handleClose();
        }
      } else {
        const response = await axios.post('/api/sign-up', formData);
        if (response.data.success) {
          toast.success(response.data.message || 'Registration successful!');
          handleTabSwitch('login');
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Error during ${authMode}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0C1733]/70 backdrop-blur-[8px] md:p-8 md:overflow-y-auto">
      <div
        className="relative w-full h-full md:w-[730px] md:h-[546px] md:rounded-[16px] flex flex-row shadow-2xl overflow-hidden bg-[#091741]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-[16px] right-[16px] z-50 w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#112F82]/80 text-white hover:bg-[#1463FF] transition-colors md:flex hidden"
        >
          ✕
        </button>

        {/* Left Panel */}
        <div className="relative w-[340px] h-[546px] rounded-l-[16px] bg-[#0C1F56] overflow-hidden shrink-0 hidden md:block">
          <div
            className="absolute left-[-3px] top-[-29px] w-[343px] h-[483px]"
            style={{
              backgroundImage: 'url(/login-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div
            className="absolute left-0 top-[327px] w-[340px] h-[219px]"
            style={{ background: 'linear-gradient(180deg, rgba(0, 12, 36, 0) 6.85%, #000C24 45.66%)' }}
          />
          <div className="absolute bottom-[-129px] left-[calc(50%-86.5px)] w-[173px] h-[173px] bg-[#1463FF] blur-[40px] rounded-full" />

          <div className="absolute top-[359px] left-[calc(50%-150px)] w-[300px] h-[160px] flex flex-col items-center gap-[20px]">
            <div className="flex flex-col items-center w-[167px] h-[112px]">
              <div className="flex justify-center items-center gap-[10px] w-[156px] h-[75px]">
                <h2 className="font-['Jost'] font-extrabold text-[52px] leading-[75px] text-center tracking-[0.01em] text-white">
                  350%
                </h2>
              </div>
              <div className="flex justify-center items-center px-[20px] py-[10px] gap-[10px] w-[167px] h-[37px] bg-[#2BEA51] rounded-[100px]">
                <span className="font-['Jost'] font-extrabold text-[12px] leading-[17px] text-center text-[#051D09]">
                  WELCOME PACKAGE
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-[10px] w-[300px] h-[28px]">
              <p className="font-['Manrope'] font-bold text-[10px] leading-[14px] text-center tracking-[0.01em] text-white w-[200px]">
                Boost your deposits with 350% in Bonus and 200 Free Spins
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="relative w-full md:w-[390px] h-full md:h-[546px] bg-[#091741] rounded-none md:rounded-l-none md:rounded-r-[16px] flex flex-col items-center md:items-start px-[20px] py-[24px] gap-[32px] shrink-0 overflow-y-auto md:overflow-hidden z-10">
          <div className="hidden min-[426px]:block absolute top-[-145px] left-[calc(50%-86.5px)] w-[173px] h-[173px] bg-[#1463FF] blur-[40px] rounded-full -z-10" />

          {/* Mobile Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-[16px] right-[16px] w-[28px] h-[28px] rounded-full bg-[#112F82]/80 hover:bg-[#1463FF] flex items-center justify-center text-white transition-colors md:hidden z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>

          <div className="relative w-full max-w-[350px] mx-auto my-auto py-8 md:py-0 flex flex-col items-center md:items-start gap-[16px] z-10">
            <div className="w-full flex justify-center items-start">
              <Image src="/Horizontal logo.png" alt="Mighty Luck" width={140} height={26} className="object-contain" />
            </div>

            <div className="flex flex-row items-center gap-[8px] w-full h-[40px] mt-[2px]">
              <button
                onClick={() => handleTabSwitch('register')}
                className={`flex-1 flex justify-center items-center px-[30px] py-[10px] gap-[10px] rounded-[8px] h-full transition-colors ${!isLogin ? 'bg-[#FFC83D] text-[#000000]' : 'bg-[#1463FF] text-white'}`}
              >
                <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em]">Join Now</span>
              </button>
              <button
                onClick={() => handleTabSwitch('login')}
                className={`flex-1 flex justify-center items-center px-[30px] py-[10px] gap-[10px] rounded-[8px] h-full transition-colors ${isLogin ? 'bg-[#FFC83D] text-[#000000]' : 'bg-[#1463FF] text-white'}`}
              >
                <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em]">Log In</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-[12px] w-full mt-[8px]">
              {isLogin ? (
                // Login Form
                <>
                  <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                    <input
                      name="identifier"
                      value={formData.identifier}
                      onChange={handleChange}
                      placeholder="User name or Email"
                      className="w-full min-w-0 bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-white"
                      required
                    />
                  </div>

                  <div className="flex flex-row justify-between items-center px-[16px] py-[10px] gap-[10px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="w-full min-w-0 bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-white"
                      required
                    />
                    <div
                      className="w-[20px] h-[20px] shrink-0 flex justify-center items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <EyeIcon />
                    </div>
                  </div>

                  <div className="w-full flex justify-end mt-[4px]">
                    <span className="font-['Manrope'] font-medium text-[12px] text-[#A5B8EF] cursor-pointer hover:text-white transition-colors">
                      Forgot password?
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-[12px] w-full mt-[16px]">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex flex-row justify-center items-center px-[30px] py-[10px] gap-[10px] w-full h-[50px] bg-[#1463FF] rounded-[8px] hover:bg-blue-600 transition-colors"
                    >
                      <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                        {isSubmitting ? 'Logging in...' : 'Log In'}
                      </span>
                    </button>
                    <div className="flex flex-row items-center gap-[8px] w-full h-[16px] mt-[4px]">
                      <div className="w-[16px] h-[16px] flex items-center justify-center border-[1.5px] border-[#7795E8] rounded-full text-[#7795E8] font-bold text-[10px]">?</div>
                      <p className="font-['Manrope'] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                        Having problems? <span className="font-bold cursor-pointer text-[#FFC83D]">Contact support</span>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                // Register Form
                <>
                  <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                    <input
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="User name"
                      className="w-full min-w-0 bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-[8px] w-full h-[40px]">
                    <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full min-w-0 bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                        required
                      />
                    </div>
                    <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full min-w-0 bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full min-w-0 bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                      required
                    />
                  </div>

                  <div className="flex flex-row justify-between items-center px-[16px] py-[10px] gap-[10px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="w-full min-w-0 bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                      required
                    />
                    <div
                      className="w-[20px] h-[20px] shrink-0 flex justify-center items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <EyeIcon />
                    </div>
                  </div>

                  <div className="flex flex-row items-start gap-[8px] w-full h-[40px]">
                    <div ref={countryRef} className="relative h-[40px] z-30">
                      <button
                        type="button"
                        onClick={() => setIsCountryOpen(!isCountryOpen)}
                        className={`flex flex-row items-center px-[16px] py-[10px] gap-[10px] w-[121px] h-[40px] bg-[#112F82] transition-colors hover:bg-[#1A3FA6] ${isCountryOpen ? 'rounded-t-[8px] border border-[#1463FF] border-b-0' : 'rounded-[8px]'}`}
                      >
                        <div className="w-[20px] h-[20px] shrink-0 rounded-full overflow-hidden flex items-center justify-center">
                          <img src={selectedCountry.flag} alt={selectedCountry.id} className="w-[20px] h-[20px] object-cover" />
                        </div>
                        <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white">{selectedCountry.dialCode}</span>
                        <div className={`ml-auto flex items-center justify-center transition-transform ${isCountryOpen ? 'rotate-180' : ''}`}>
                          <CaretDown />
                        </div>
                      </button>

                      {isCountryOpen && (
                        <div className="absolute top-[39px] left-0 w-full bg-[#091741] border border-[#1463FF] rounded-b-[8px] overflow-hidden z-40 shadow-xl max-h-[150px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                          {countries.map(country => (
                            <button
                              key={country.id}
                              type="button"
                              onClick={() => { setSelectedCountry(country); setIsCountryOpen(false); }}
                              className="w-full px-[16px] py-[10px] flex flex-row items-center gap-[10px] hover:bg-[#112F82] transition-colors text-left"
                            >
                              <div className="w-[20px] h-[20px] shrink-0 rounded-full overflow-hidden flex items-center justify-center">
                                <img src={country.flag} alt={country.id} className="w-[20px] h-[20px] object-cover" />
                              </div>
                              <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white flex-1">{country.dialCode}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] flex-1 min-w-0 h-[40px] bg-[#112F82] rounded-[8px]">
                      <input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full min-w-0 bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row items-start gap-[10px] w-full mt-[4px]">
                    <p className="font-['Manrope'] font-medium text-[10px] leading-[14px] text-justify tracking-[0.01em] text-[#BBCAF3] w-full">
                      By clicking "Join Now" I confirm that I'm over 18 years old and agree to Mighty Luck' T&C along with the Privacy Policy
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-[12px] w-full mt-[12px]">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex flex-row justify-center items-center px-[30px] py-[10px] gap-[10px] w-full h-[50px] bg-[#FFC83D] rounded-[8px] hover:opacity-90 transition-opacity"
                    >
                      <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404]">
                        {isSubmitting ? 'Joining...' : 'Join with a 350% Bonus'}
                      </span>
                    </button>
                    <div className="flex flex-row items-center gap-[8px] w-full h-[16px] mt-[4px]">
                      <div className="w-[16px] h-[16px] flex items-center justify-center border-[1.5px] border-[#7795E8] rounded-full text-[#7795E8] font-bold text-[10px]">?</div>
                      <p className="font-['Manrope'] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                        Having problems? <span className="font-bold cursor-pointer text-[#FFC83D]">Contact support</span>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AuthModal({ defaultMode }: { defaultMode?: 'login' | 'register' }) {
  return (
    <Suspense fallback={null}>
      <AuthModalContent defaultMode={defaultMode} />
    </Suspense>
  );
}
