import React from 'react';
import Title from '../components/Title';
import News from '../components/News';
import { assets } from '../assets/assets';
import { FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen border-t pt-10 px-6 md:px-20">
      {/* Title */}
      <div className="text-center text-3xl font-bold mb-10">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Main Contact Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
        {/* Contact Image */}
        <img
          className="w-full md:max-w-[480px] rounded-xl shadow-lg"
          src={assets.contactus}
          alt="Contact"
        />

        {/* Contact Details */}
        <div className="flex flex-col gap-4 text-lg text-gray-700">
          <p><span className="font-semibold">📍 Address:</span> 317, Dhali Para Rd, Vivekananda Pally, Behala, Kolkata, West Bengal 700034</p>
          <p><span className="font-semibold">📞 Phone:</span> +91 9007490217</p>
          <p><span className="font-semibold">✉️ Email:</span> ghoruirohit700@.com</p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4 text-2xl">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
              <FaYoutube />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Map Embed */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">📌 Find Us on the Map</h3>
        <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-md border border-gray-200">
          <iframe
            title="GymSupp Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d921.544367840317!2d88.30894862504556!3d22.49752366554985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027a16ac096d51%3A0x1d23c0b4b9e12883!2s317%2C%20Dhali%20Para%20Rd%2C%20Vivekananda%20Pally%2C%20Behala%2C%20Kolkata%2C%20West%20Bengal%20700034!5e0!3m2!1sen!2sin!4v1749277807348!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Get Directions Button */}
        <div className="mt-6">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=317,+Dhali+Para+Rd,+Vivekananda+Pally,+Behala,+Kolkata,+West+Bengal+700034"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-200"
          >
            Get Directions
          </a>
        </div>
      </div>

      {/* Newsletter */}
      <News />
    </div>
  );
};

export default Contact;
