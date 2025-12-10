"use client";

import Image from 'next/image';
import { useState } from 'react';
import { SubmitSuccess, RightArrowDashBlue } from '@/components/Icon/Icon';

export const HomeLeadspace = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(false);

    try {
      // Handle email submission
      console.log('Email submitted:', email);
      // Simulate API call
      // const response = await submitEmail(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting email:', error);
      setHasError(true);
    }
  };

  return (
    <section className="w-full h-[80vh] md:h-screen relative overflow-hidden">
      {/* Background Images - Desktop and Mobile */}
      <div className="absolute inset-0">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="https://dev-lezoowp.pantheonsite.io/wp-content/uploads/2025/12/hero-desktop-scaled.webp"
          />
          <Image
            src="https://dev-lezoowp.pantheonsite.io/wp-content/uploads/2025/12/full-mobile-hero.webp"
            alt=""
            fill
            className="object-cover object-[center_50%] md:object-top min-h-screen"
            priority
            aria-hidden="true"
          />
        </picture>
      </div>

      {/* Bottom Purple Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #755a9400 0%, #1a1a26 100%)'
        }}
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative h-full flex items-end lg:items-center">
        {/* Desktop Layout: Right Side Content */}
        <div className="hidden lg:block absolute right-[14%] top-[58%] -translate-y-1/2 w-[600px]">
          {/* Main Heading */}
          <h1
            className="h1 text-alabaster text-stroke text-shadow-2 mb-6"
            style={{ '--text-stroke-color': 'black', '--text-shadow-2-color': 'black' } as React.CSSProperties}
          >
            <span className="flex items-start justify-end gap-2">
              <span className="text-[45px] leading-[98%]">A</span>
              <span className="flex flex-col">
                <span>TRIPPY GAME</span>
                <span>ABOUT YOU</span>
              </span>
            </span>
          </h1>

          {/* Dark Paper Panel - Desktop Only */}
          <div className="relative w-full max-w-[507px] h-[227px] ml-auto left-[30px]">
            {/* Panel Background Image */}
            <Image
              src="https://dev-lezoowp.pantheonsite.io/wp-content/uploads/2025/12/email-banner-desktop.webp"
              alt=""
              width={507}
              height={225}
              className="w-full h-full object-cover"
              aria-hidden="true"
            />

            {/* Panel Content */}
            <div className="absolute inset-0 flex flex-col px-12 py-8">
              {/* Panel Text */}
              <p className="text-alabaster text-[20px] lg:text-[24px] font-strawford mb-4 font-bold leading-[129%]">
                You didn't find this by accident.<br />
                You're being guided.
              </p>

              {/* Email Form */}
              <form
                onSubmit={handleSubmit}
                className="relative group transition-all duration-300"
              >
                {/* Form Background */}
                <div className="relative">
                  <Image
                    src={isSubmitted ? "/svg/submit-border.svg" : "/svg/email-outline-bg.svg"}
                    alt=""
                    width={400}
                    height={70}
                    className="w-full h-auto"
                    aria-hidden="true"
                  />

                  {/* Form Content */}
                  <div className="absolute inset-0 flex items-center justify-between ps-8 pe-2.5">
                    {isSubmitted ? (
                      <span className="flex-1 text-white font-strawford font-medium text-[18px] lg:text-[20px]">
                        You're now part of this journey!
                      </span>
                    ) : (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Sign-Up for Early Access"
                        className="flex-1 bg-transparent text-alabaster font-strawford font-medium text-[18px] lg:text-[20px] placeholder:text-white outline-none"
                        required
                      />
                    )}

                    {/* Submit Button with Arrow Icon or Success Icon */}
                    <button
                      type="submit"
                      className="shrink-0 cursor-pointer"
                      aria-label="Submit email"
                      disabled={isSubmitted}
                    >
                      {isSubmitted ? (
                        <SubmitSuccess width={40} height={40} className="w-10 h-10" />
                      ) : (
                        <RightArrowDashBlue width={40} height={40} className="w-10 h-10" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {hasError && (
                  <p className="text-red-500 text-center mt-2 font-strawford font-medium text-[16px]">
                    Oops! Something went wrong while submitting the form.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Layout: Bottom Centered */}
        <div className="flex lg:hidden flex-col items-center justify-end md:items-end md:justify-center w-full pb-12 px-2.5 h-[80vh]">
          {/* Main Heading */}
          <h1
            className="h1 text-alabaster text-stroke text-shadow-2 text-center mb-4"
            style={{ '--text-stroke-color': 'black', '--text-shadow-2-color': 'black' } as React.CSSProperties}
          >
            A TRIPPY GAME<br />
            ABOUT YOU
          </h1>

          {/* Email Form - Mobile */}
          <form
            onSubmit={handleSubmit}
            className="relative group transition-all duration-300 w-full max-w-[400px]"
          >
            {/* Form Background */}
            <div className="relative">
              <Image
                src={isSubmitted ? "/svg/submit-success-mobile.svg" : "/svg/email-btn-mobile.svg"}
                alt=""
                width={400}
                height={64}
                className="w-full h-auto"
                aria-hidden="true"
              />

              {/* Form Content */}
              <div className="absolute inset-0 flex items-center justify-between ps-6 pe-2.5">
                {isSubmitted ? (
                  <span className="flex-1 text-white font-strawford font-medium text-[16px]">
                    You're now part of this journey!
                  </span>
                ) : (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Sign-Up for Early Access"
                    className="flex-1 bg-transparent text-raisin-black-3 font-strawford font-medium text-[20px] placeholder:text-raisin-black-3 outline-none px-3 py-2"
                    required
                  />
                )}

                {/* Submit Button with Arrow Icon or Success Icon */}
                <button
                  type="submit"
                  className="shrink-0"
                  aria-label="Submit email"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <SubmitSuccess width={32} height={32} className="w-8 h-8" />
                  ) : (
                    <RightArrowDashBlue width={32} height={32} className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {hasError && (
              <p className="text-red-500 text-center mt-2 font-strawford font-medium text-[14px]">
                Oops! Something went wrong while submitting the form.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
