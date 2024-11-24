"use client";

import React, { useState } from "react";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SigninUpForm from "./signup-form";
import SocialSection from "./LoginCoomponent/SocialSection";
import FormHeader from "./FormHeader";
import LoginFormAction from "./LoginForm";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginForm({ reg, translate }) {
  const [activeForm, setActiveForm] = useState(reg ? 1 : 0);
  const { setTempUserId, temp_user_id } = useCartStoreData((state) => ({
    setTempUserId: state.setTempUserId,
    temp_user_id: state.temp_user_id,
  }));
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    temp_user_id: temp_user_id,
  });
  const cookieValue = cookieStore((state) => state.cookieValue);
  const isLoggedIn = !!cookieValue?.user?.id;
  const [useEmailOrPhone, setUseEmailOrPhone] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    setIsPending(true);

    try {
      const { data } = await axios.post(`/api/auth/login`, formData);
      if (data?.result) {
        toast.success(data.message, {
          style: { color: "#404042", fontWeight: 600 },
          iconTheme: { primary: "#A020F0", secondary: "#fff" },
        });
        await signIn("credentials", formData);
      } else {
        setErrorMessage(data?.message);
        toast.error(data.message, {
          style: { color: "#404042", fontWeight: 600 },
          iconTheme: { primary: "#A020F0", secondary: "#fff" },
        });
      }
      setIsPending(false);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Invalid credentials");
      setIsPending(false);
    }
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateForm = () => {
    const { email, password } = formData;

    if (!email && !useEmailOrPhone) {
      setErrorMessage("Email are required.");
      toast.error("Email are required.", {
        style: { color: "#404042", fontWeight: 600 },
        iconTheme: { primary: "#A020F0", secondary: "#fff" },
      });
      return false;
    }
    if (!email && useEmailOrPhone) {
      toast.error("Phone are required.", {
        style: { color: "#404042", fontWeight: 600 },
        iconTheme: { primary: "#A020F0", secondary: "#fff" },
      });
      setErrorMessage("Phone are required.");
      return false;
    }

    if (!password) {
      toast.error("Password are required.", {
        style: { color: "#404042", fontWeight: 600 },
        iconTheme: { primary: "#A020F0", secondary: "#fff" },
      });
      setErrorMessage("Password are required.");
      return false;
    }
    return true;
  };

  return (
    <>
      <FormHeader setActiveForm={setActiveForm} activeForm={activeForm} />

      <div className="relative mx-auto flex w-full flex-col space-y-2.5 lg:p-4 md:w-[630px] ">
        <div className="grid grig-cols-1 lg:mt-[30px]   ">
          {activeForm === 0 ? (
            <LoginFormAction
              handleInputChange={handleInputChange}
              useEmailOrPhone={useEmailOrPhone}
              formData={formData}
              isLoggedIn={isLoggedIn}
              temp_user_id={temp_user_id}
              setUseEmailOrPhone={setUseEmailOrPhone}
              handleLogin={handleLogin}
              isPending={isPending}
              setActiveForm={setActiveForm}
              errorMessage={errorMessage}
            />
          ) : (
            <SigninUpForm
              translate={translate}
              setActiveForm={setActiveForm}
              SocialSection={
                <SocialSection
                  title="Already have an account?"
                  loginText="Sign In"
                  value={0}
                />
              }
            />
          )}
        </div>
      </div>
    </>
  );
}
