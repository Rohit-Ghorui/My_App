import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import News from '../components/News';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 md:gap-16 px-4">
        <img className="w-full md:max-w-[450px] rounded-xl shadow-md" src={assets.aboutus} alt="About Us" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At <b className="text-gray-800">MuscleFuel Supplements</b>, we’re more than just a supplement store — we're your fitness ally. Founded by a team of passionate fitness enthusiasts and nutrition experts, our mission is to provide top-quality supplements to help you reach your performance and health goals.
          </p>
          <p>
            Whether you're a seasoned athlete or just starting your fitness journey, we’re committed to helping you get stronger, fitter, and healthier — one product at a time.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            To empower individuals with the right nutrition tools to maximize their physical potential. We believe in transparency, science-backed products, and building a community of strong, confident people.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 px-4 gap-6">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-lg shadow-sm">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            All our supplements are sourced from trusted manufacturers and undergo strict quality checks. We ensure every product you receive is safe, effective, and up to the highest industry standards.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-lg shadow-sm">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Shop from anywhere at any time with our user-friendly website. We offer secure payment options, fast delivery, and easy returns to make your experience seamless.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-lg shadow-sm">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our support team is always here to help you with product advice, order updates, or any questions you may have. Your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <News />
    </div>
  );
};

export default About;
