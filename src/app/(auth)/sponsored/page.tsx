"use client";

import { BatteryCharging, Camera, Money2 } from "iconsax-react";
import Image from "next/image";
import React, { useState } from "react";

const Sponsored = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleSelect = (index: any) => {
    setSelectedIndex(index);
    console.log("selected option", selectedIndex);
  };

  const [satisfaction, setSatisfaction] = useState(2);
  const satisfactionLevels = [
    "Very satisfied",
    "Satisfied",
    "Neutral",
    "Dissatisfied",
    "Very dissatisfied",
  ];

  const images = [
    "/assets/happy.png",
    "/assets/good.png",
    "/assets/neutral.png",
    "/assets/sad.png",
    "/assets/unhappy.png",
  ];

  const handleSliderChange = (event: any) => {
    setSatisfaction(parseInt(event.target.value)); // Ensuring the value is treated as a number
    console.log("satisfaction", satisfaction);
  };

  const options = [
    { text: "1" },
    { text: "2" },
    { text: "3" },
    { text: "4" },
    { text: "5" },
  ];

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <div className="flex flex-row items-center gap-4 mt-2 mb-6">
        <p className="text-xs text-[#98A2B3] font-normal">Sponsored</p>
      </div>

      <section className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <p className="text-[20px] font-bold">
            How satisfied are you with your current iPhone&apos;s performance?
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col justify-between">
              {satisfactionLevels.map((level, index) => (
                <p
                  key={index}
                  className={`text-center text-base ${
                    index === satisfaction
                      ? "text-white font-bold"
                      : "text-[#98A2B3]"
                  }`}
                >
                  {level}
                </p>
              ))}
            </div>

            <div className="flex flex-1 justify-center items-center h-full">
              <input
                type="range"
                min="0"
                max="4"
                step="1"
                value={satisfaction}
                onChange={handleSliderChange}
                className="transform rotate-90 w-full h-[inherit]"
              />
            </div>

            <div className="flex flex-col justify-between items-center">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={satisfactionLevels[index]}
                  className={`w-16 h-16 ${
                    index === satisfaction ? "opacity-100" : "opacity-50"
                  } ${
                    index === satisfaction
                      ? "border-4 border-white rounded-full"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[20px] font-bold">
            Which iPhone model are you currently using (if any)?
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                imgSrc: "/assets/success.png",
                selectedSrc: "/assets/success-deep.png",
                text: "16 series",
              },
              {
                imgSrc: "/assets/success.png",
                selectedSrc: "/assets/success-deep.png",
                text: "15 series",
              },
              {
                imgSrc: "/assets/success.png",
                selectedSrc: "/assets/success-deep.png",
                text: "14 series",
              },
              {
                imgSrc: "/assets/success.png",
                selectedSrc: "/assets/success-deep.png",
                text: "13 series",
              },
              {
                imgSrc: "/assets/success.png",
                selectedSrc: "/assets/success-deep.png",
                text: "12 series",
              },
              {
                imgSrc: "/assets/success.png",
                selectedSrc: "/assets/success-deep.png",
                text: "11 series",
              },
              {
                imgSrc: "/assets/success.png",
                selectedSrc: "/assets/success-deep.png",
                text: "Xs Max ",
              },
              {
                imgSrc: "/assets/success.png",
                selectedSrc: "/assets/success-deep.png",
                text: "XR",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-row gap-2 p-2 items-center border border-[#FFFFFF36] rounded-full cursor-pointer ${
                  selectedIndex === index
                    ? "bg-white text-[#290064]"
                    : "bg-[#4b3d76] text-white"
                }`}
                onClick={() => handleSelect(index)}
              >
                <Image
                  src={selectedIndex === index ? item.selectedSrc : item.imgSrc}
                  alt=""
                  width={48}
                  height={48}
                />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[20px] font-bold">
            What do you value most in an iPhone?
          </p>

          <Image
            src={"/assets/sponsored-1.png"}
            alt="s1"
            width={280}
            height={240}
            className="w-auto"
          />

          <div className="flex flex-col gap-3">
            {[
              "Camera quality",
              "Performance",
              "Battery life",
              "Design and build quality",
            ].map((option, index) => (
              <label
                key={index}
                className={`flex flex-row gap-2 px-5 py-3 items-center justify-between border border-[#FFFFFF36] rounded-full cursor-pointer ${
                  selectedIndex === index
                    ? "bg-white text-[#290064] ring-2 ring-[#290064]"
                    : "bg-[#4b3d76] text-white"
                }`}
                onClick={() => handleSelect(index)}
              >
                <input
                  type="radio"
                  name="iphone-options"
                  value={index}
                  checked={selectedIndex === index}
                  onChange={() => handleSelect(index)}
                  className="hidden"
                />
                <p>{option}</p>

                <div
                  className={`w-4 h-4 flex items-center justify-center rounded-full border-2 ${
                    selectedIndex === index
                      ? "bg-white border-2 border-[#290064]"
                      : "border-white"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      selectedIndex === index
                        ? "bg-[#290064] border-2 border-[#290064]"
                        : "border-white"
                    }`}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[20px] font-bold">
            What features or improvements would you like to see in future
            iPhones?{" "}
          </p>

          <div className="grid grid-cols-2 gap-4 items-center justify-items-center">
            {[
              {
                imgSrc: "/assets/success.png",
                text: "Battery life",
                icon: <BatteryCharging size={30} />,
              },
              {
                imgSrc: "/assets/success.png",
                text: "Enhanced camera",
                icon: <Camera size={30} />,
              },
              {
                imgSrc: "/assets/success.png",
                text: "Lower pricing",
                icon: <Money2 size={30} />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col w-[138px] h-[138px] rounded-full text-base gap-2 p-2 items-center justify-center text-center border border-[#FFFFFF36] cursor-pointer ${
                  selectedIndex === index
                    ? "bg-white text-[#290064]"
                    : "bg-[#4b3d76] text-white"
                }`}
                onClick={() => handleSelect(index)}
              >
                {item.icon}
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-[20px] font-bold">
            How would you rate your overall experience with iOS on a scale of 1
            to 5
          </p>

          {selectedIndex !== null && (
            <p className="mt-2 text-[140px] font-bold text-center">
              {options[selectedIndex].text}
            </p>
          )}

          <div className="flex flex-row items-center justify-center w-full bg-[#4b3d76] rounded-full">
            {options.map((item, index) => (
              <div
                key={index}
                className={`w-full flex flex-row py-5 rounded-full items-center justify-center text-xl text-center cursor-pointer ${
                  selectedIndex === index
                    ? "bg-white text-[#290064]"
                    : "bg-[#4b3d76] text-white"
                }`}
                onClick={() => handleSelect(index)}
              >
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sponsored;
