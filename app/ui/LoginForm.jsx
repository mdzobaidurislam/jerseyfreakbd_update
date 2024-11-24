import React, { useState } from "react";
import TitleLoginHeading from "./LoginCoomponent/TitleLoginHeading";
import { Eye, EyeOff, KeyIcon, Mail, Phone } from "lucide-react";
import SocialSection from "./LoginCoomponent/SocialSection";
import GradientBtn from "./GradientBtn";
import Link from "next/link";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const LoginFormAction = ({
  handleInputChange,
  formData,
  isLoggedIn,
  temp_user_id,
  setUseEmailOrPhone,
  useEmailOrPhone,
  handleLogin,
  isPending,
  setActiveForm,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="flex-1  bg-gray-50 px-3 pb-4 pt-4 flex-col md:gap-1 flex form_area rounded-[30px]  ">
        <div className="flex flex-col gap-[10px] ">
          <TitleLoginHeading title="Login with" />
          <div className="w-full flex flex-col gap-2 ">
            <div>
              {useEmailOrPhone ? (
                <div className="relative ">
                  <input
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    type="number"
                    placeholder="Phone"
                    className="w-full py-[10px] pl-10 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent-lightPink focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input"
                  />
                  <Phone className=" text-white pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              ) : (
                <div className="relative ">
                  <input
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="w-full py-[10px] pl-10 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent-lightPink focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input"
                  />
                  <Mail className=" text-white pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              )}
            </div>

            <div className="relative ">
              <input
                value={formData.password}
                onChange={handleInputChange}
                className="w-full py-3 pl-10 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent-lightPink focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input"
                id="password"
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                placeholder="Enter password"
                minLength={6}
              />
              <KeyIcon className=" text-white pointer-events-none absolute left-3 top-[60%] h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5 text-gray-500 text-white" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-500 text-white" />
                )}
              </button>
            </div>
            {!isLoggedIn && (
              <input
                value={temp_user_id ?? ""} // Default to an empty string if temp_user_id is undefined
                type="hidden"
                name="temp_user_id"
              />
            )}
          </div>
          <div className="flex items-center justify-between ">
            <div
              className="cursor-pointer"
              onClick={() => setUseEmailOrPhone(!useEmailOrPhone)}
            >
              <span className="text-base font-bold text-white ">
                Use {useEmailOrPhone ? "Email" : "Phone"} Instead
              </span>
            </div>
            <GradientBtn
              type="button"
              onClick={handleLogin}
              disabled={isPending}
            >
              {isPending ? "Login..." : "Log in"}
            </GradientBtn>
          </div>
          <div className="cursor-pointer">
            <Link href="/forget-password">
              <span className="text-base font-bold text-white ">
                Forgotten password
              </span>
            </Link>
          </div>

          {errorMessage && (
            <>
              <div className="flex items-center space-x-1">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-xl font-semibold text-white">
                  {errorMessage}
                </p>
              </div>
            </>
          )}
        </div>
        {/* social  */}
        <SocialSection
          otherTitle="Login"
          title="Don’t have and account?"
          loginText="Sign Up"
          value={1}
          setActiveForm={setActiveForm}
        />
      </div>
    </>
  );
};
export default LoginFormAction;
