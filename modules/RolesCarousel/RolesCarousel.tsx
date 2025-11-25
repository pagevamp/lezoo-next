"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import type { CardsEffectOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { LeftArrowCircled, RightArrowCircled } from "@/components/Icon/Icon";

const roles = [
  {
    title: "Audio Alchemist",
    tour: "Hard Hat Tour I",
    image: "/images/zooblings.webp",
    badge: "Sonic Support",
  },
  {
    title: "Cultural Catalyst",
    tour: "Hard Hat Tour II",
    image: "/images/pt-skip-the-line.webp",
    badge: "Community",
  },
  {
    title: "Mythic Cartographer",
    tour: "Hard Hat Tour III",
    image: "/images/leadspace-strokes-2.webp",
    badge: "World Building",
  },
  {
    title: "Combat Conductor",
    tour: "Hard Hat Tour IV",
    image: "/images/karma-gain.webp",
    badge: "Gameplay",
  },
  {
    title: "Style Savant",
    tour: "Hard Hat Tour V",
    image: "/images/looks.webp",
    badge: "Customization",
  },
  {
    title: "Style Savant",
    tour: "Hard Hat Tour V",
    image: "/images/looks.webp",
    badge: "Customization",
  },
  {
    title: "Style Savant",
    tour: "Hard Hat Tour V",
    image: "/images/looks.webp",
    badge: "Customization",
  },
  {
    title: "Style Savant",
    tour: "Hard Hat Tour V",
    image: "/images/looks.webp",
    badge: "Customization",
  },
];

const cardsEffectSettings: CardsEffectOptions = {
  perSlideRotate: 7,
  perSlideOffset: 50,
  slideShadows: false,
};

export const RolesCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className="relative bg-raisin-black-2 py-16 lg:py-28 overflow-hidden">
      <style jsx global>{`
        .park-role-swiper .swiper-slide {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease-in-out;
        }
        .park-role-swiper .swiper-slide-active,
        .park-role-swiper .swiper-slide-prev,
        .park-role-swiper .swiper-slide-next {
          opacity: 1;
          pointer-events: auto;
        }
        .park-role-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .park-role-pagination .swiper-pagination-bullet-active {
          background: #ffffff;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
      <div className="container-xl mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col lg:flex-row gap-14 xl:gap-24 items-center">
          {/* Left Column - Swiper */}
          <div className="w-full lg:w-1/2 flex flex-col items-center gap-8">

            <div className="relative w-full lg:w-[650px] min-h-[450px] flex justify-center">
              <div className="absolute rotate-[4.48deg] text-white text-small tracking-[0.35em] uppercase font-atomic z-10 w-[285px] h-[156px] inset-[-10%_auto_auto_12%]">
                <figure className="w-full h-full max-w-[275px] absolute inset-0">
                  <img src="/images/role-circle.webp" alt="Roles Carousel Stroke" className="w-full h-full" />
                </figure>
                <div className="-rotate-15 absolute w-full top-[40%] left-[10%]">Find your Role</div>
              </div>
              <Swiper
                className="park-role-swiper w-[250px] overflow-visible"
                effect="cards"
                grabCursor
                loop
                loopAdditionalSlides={5}
                initialSlide={1}
                speed={500}
                watchSlidesProgress={true}
                modules={[EffectCards, Pagination]}
                cardsEffect={cardsEffectSettings}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                pagination={{
                  el: ".park-role-pagination",
                  type: "bullets",
                  clickable: false,
                  dynamicBullets: false,
                }}
              >
                {roles.map((role, index) => (
                  <SwiperSlide key={`${role.title}-${index}`}>
                    <div className="relative w-[250px] h-[420px] rounded-[32px] overflow-hidden shadow-[0_25px_80px_rgba(5,8,17,0.65)] bg-space-cadet">
                      <Image
                        src={role.image}
                        alt={role.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 320px, 360px"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[rgba(3,5,8,0.9)] via-[rgba(3,5,8,0.2)] to-transparent" />

                      <div className="absolute bottom-0 w-full p-6">
                        <p className="text-white text-[28px] font-atomic leading-tight mb-2">
                          {role.title}
                        </p>
                        <p className="text-ivory text-medium tracking-widest uppercase">
                          {role.tour}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="absolute top-[40%] w-full flex justify-between z-10 pointer-events-none">
                <button
                  type="button"
                  aria-label="Previous role"
                  onClick={handlePrev}
                  className="cursor-pointer pointer-events-auto"
                >
                  <LeftArrowCircled className="w-14 h-14" />
                </button>
                <button
                  type="button"
                  aria-label="Next role"
                  onClick={handleNext}
                  className="cursor-pointer pointer-events-auto"
                >
                  <RightArrowCircled className="w-14 h-14" />
                </button>
              </div>
            </div>

            <div className="park-role-pagination flex items-center justify-center gap-2 mt-4 static! w-auto!" />
          </div>

          {/* Right Column - Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left text-white space-y-6 -order-1 lg:order-1">
            <p className="text-blueberry h4 font-bold text-stroke">02</p>
            <h2 className="text-h2 lg:text-h1 font-atomic text-[45px] text-white">PARK ROLES</h2>
            <p className="text-white text-medium max-w-[520px] mx-auto lg:mx-0 font-normal">
              Level up your journey and earn special memberships that unlock unique perks, style upgrades, and in-game surprises. Your adventure just got even more rewarding.
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen">
        <Image
          src="/images/leadpace-strokes.webp"
          alt="Strokes texture"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
};
