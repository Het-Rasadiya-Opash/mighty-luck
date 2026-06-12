'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

export default function SignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/sign-up', formData);
      if (response.data.success) {
        toast.success(response.data.message || 'Registration successful!');
        router.push('/auth/sign-in');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error during sign-up');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 w-[1440px] max-w-full h-full min-h-screen bg-[#0C1733]/70 backdrop-blur-[8px] flex items-center justify-center z-50 mx-auto">
      <div className="relative w-[730px] h-[546px] rounded-[16px] flex flex-row shadow-2xl shrink-0 overflow-hidden">
        
        <div className="relative w-[340px] h-[546px] rounded-l-[16px] bg-[#0C1F56] overflow-hidden shrink-0">
          <div 
            className="absolute left-[-3px] top-[-29px] w-[343px] h-[483px] bg-cover bg-center"
            style={{ backgroundImage: 'url(/lion.png)' }} 
          />
          <div className="absolute left-0 top-[327px] w-[340px] h-[219px] bg-gradient-to-b from-[rgba(0,12,36,0)] to-[#000C24]" />
          <div className="absolute bottom-[-129px] left-[calc(50%-86.5px)] w-[173px] h-[173px] bg-[#1463FF] blur-[40px] rounded-full" />
          
          <div className="absolute top-[359px] left-[calc(50%-150px)] w-[300px] h-[160px] flex flex-col items-center gap-[20px]">
            <div className="flex flex-col items-center w-[167px] h-[112px]">
              <div className="flex justify-center items-center gap-[10px] w-[156px] h-[75px]">
                <h2 className="font-['Jost'] font-extrabold text-[52px] leading-[75px] text-center tracking-[0.01em] text-white">
                  350%
                </h2>
              </div>
              <div className="flex justify-center items-center px-[20px] py-[10px] gap-[10px] w-[167px] h-[37px] bg-[#FFC83D] rounded-[100px]">
                <span className="font-['Jost'] font-extrabold text-[12px] leading-[17px] text-center text-[#1A1404]">
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

        <div className="relative w-[390px] h-[546px] bg-[#091741] rounded-r-[16px] flex flex-col items-start px-[20px] py-[24px] gap-[32px] shrink-0 overflow-hidden">
          <div className="absolute top-[-145px] left-[calc(50%-86.5px)] w-[173px] h-[173px] bg-[#1463FF] blur-[40px] rounded-full" />
          
          <div className="relative w-[350px] flex flex-col items-start gap-[16px] z-10">
            <div className="w-[350px] flex justify-center items-start mb-[9px]">
              <Image src="/Horizontal logo.png" alt="Mighty Luck" width={140} height={26} className="object-contain" />
            </div>

            <div className="flex flex-row items-center gap-[8px] w-[350px] h-[40px]">
              <Link href="/auth/sign-up" className="flex-1 flex justify-center items-center px-[30px] py-[10px] gap-[10px] bg-[#FFC83D] rounded-[8px] h-full">
                <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#000000]">Join Now</span>
              </Link>
              <Link href="/auth/sign-in" className="flex-1 flex justify-center items-center px-[30px] py-[10px] gap-[10px] bg-[#1463FF] rounded-[8px] h-full">
                <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">Log In</span>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-[12px] w-[350px]">
              <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-[350px] h-[40px] bg-[#112F82] rounded-[8px]">
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="User name"
                  className="w-full bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                  required
                />
              </div>

              <div className="flex flex-row items-start gap-[8px] w-[350px] h-[40px]">
                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-[171px] h-[40px] bg-[#112F82] rounded-[8px]">
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                    required
                  />
                </div>
                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-[171px] h-[40px] bg-[#112F82] rounded-[8px]">
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-[350px] h-[40px] bg-[#112F82] rounded-[8px]">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                  required
                />
              </div>

              <div className="flex flex-row justify-between items-center px-[16px] py-[10px] gap-[10px] w-[350px] h-[40px] bg-[#112F82] rounded-[8px]">
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                  required
                />
                <div className="w-[20px] h-[20px] shrink-0 flex justify-center items-center">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0C3.1325 0 0 4.66667 0 4.66667C0 4.66667 3.1325 9.33333 7 9.33333C10.8675 9.33333 14 4.66667 14 4.66667C14 4.66667 10.8675 0 7 0ZM7 7.77778C5.22375 7.77778 3.79167 6.38556 3.79167 4.66667C3.79167 2.94778 5.22375 1.55556 7 1.55556C8.77625 1.55556 10.2083 2.94778 10.2083 4.66667C10.2083 6.38556 8.77625 7.77778 7 7.77778ZM7 2.8C5.93917 2.8 5.075 3.63689 5.075 4.66667C5.075 5.69644 5.93917 6.53333 7 6.53333C8.06083 6.53333 8.925 5.69644 8.925 4.66667C8.925 3.63689 8.06083 2.8 7 2.8Z" fill="#A5B8EF"/>
                  </svg>
                </div>
              </div>

              <div className="flex flex-row items-start gap-[8px] w-[350px] h-[40px]">
                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[10px] w-[121px] h-[40px] bg-[#112F82] rounded-[8px]">
                  <div className="w-[20px] h-[20px] shrink-0 rounded-full overflow-hidden flex items-center justify-center">
                    <img src="https://flagcdn.com/w40/us.png" alt="US" className="w-[20px] h-[20px] object-cover" />
                  </div>
                  <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white">+1</span>
                  <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-auto">
                    <path d="M1 1L3.5 3L6 1" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-[221px] h-[40px] bg-[#112F82] rounded-[8px]">
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full bg-transparent font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#A5B8EF] outline-none placeholder:text-[#A5B8EF]"
                  />
                </div>
              </div>

              <div className="flex flex-row items-start gap-[10px] w-[350px] h-[28px]">
                <p className="font-['Manrope'] font-medium text-[10px] leading-[14px] text-justify tracking-[0.01em] text-[#BBCAF3] w-[300px]">
                  By clicking "Join Now" I confirm that I'm over 18 years old and agree to Mighty Luck' T&C along with the Privacy Policy
                </p>
              </div>

              <div className="flex flex-col items-start gap-[12px] w-[350px] h-[78px] mt-[4px]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex flex-row justify-center items-center px-[30px] py-[10px] gap-[10px] w-[350px] h-[50px] bg-[#FFC83D] rounded-[8px]"
                >
                  <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404]">
                    {isSubmitting ? 'Joining...' : 'Join with a 350% Bonus'}
                  </span>
                </button>
                <div className="flex flex-row justify-center items-center gap-[8px] w-[350px] h-[16px]">
                  <div className="w-[16px] h-[16px] flex items-center justify-center border-[1.5px] border-[#7795E8] rounded-full text-[#7795E8] font-bold text-[10px]">?</div>
                  <p className="font-['Manrope'] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                    Having problems? <span className="font-bold cursor-pointer">Contact support</span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
