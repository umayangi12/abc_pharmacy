import React from 'react'
import checkup from '../assets/checkup.png'
import ambulance from "../assets/ambulance.png";
import experts from "../assets/experts.png";
import care from "../assets/care.png";
import bed from "../assets/bed.png";
import med from "../assets/med.png";

function Services() {
  return (
    <div className="w-ful py-[10rem] px-4 bg-white">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
        <div className="flex flex-col w-full p-4 my-4 duration-300 rounded-lg shadow-xl hover:scale-105">
          <img src={checkup} className="w-25 mx-auto mt-[3rem] bg-white" />
          <h2 className="py-8 text-2xl font-bold text-center">Free Checkup</h2>
          <p className="py-2 mx-8 mt-8 font-medium text-center border-b">
            Experience proactive healthcare at ABC Pharmacy with our Free
            Checkup service. Our dedicated healthcare professionals prioritize
            your well-being by offering complimentary health checkups.
          </p>
        </div>
        <div className="flex flex-col w-full p-4 my-4 duration-300 bg-gray-100 rounded-lg shadow-xl hover:scale-105">
          <img
            src={ambulance}
            className="w-25 mx-auto mt-[3rem] bg-transparent"
          />
          <h2 className="py-8 text-2xl font-bold text-center">
            24/7 Ambulance
          </h2>
          <p className="py-2 mx-8 mt-8 font-medium text-center border-b">
            EAt ABC Pharmacy, we prioritize your well-being around the clock
            with our 24/7 Ambulance service. We understand that emergencies can
            happen anytime, anywhere.
          </p>
        </div>
        <div className="flex flex-col w-full p-4 my-4 duration-300 rounded-lg shadow-xl hover:scale-105">
          <img src={experts} className="w-25 mx-auto mt-[3rem] bg-white" />
          <h2 className="py-8 text-2xl font-bold text-center">
            Expert Consultancy
          </h2>
          <p className="py-2 mx-8 mt-8 font-medium text-center border-b">
            At ABC Pharmacy, we offer Expert Consultancy services to provide you
            with personalized and knowledgeable guidance on your health
            concerns.
          </p>
        </div>
        <div className="flex flex-col w-full p-4 my-4 duration-300 rounded-lg shadow-xl hover:scale-105">
          <img src={med} className="w-25 mx-auto mt-[3rem] bg-white" />
          <h2 className="py-8 text-2xl font-bold text-center">Medicines</h2>
          <p className="py-2 mx-8 mt-8 font-medium text-center border-b">
            At ABC Pharmacy, we offer a comprehensive range of high-quality
            medicines to meet your healthcare needs. Our well-stocked pharmacy
            provides access to a diverse selection of prescription and
            over-the-counter medications.
          </p>
        </div>
        <div className="flex flex-col w-full p-4 my-4 duration-300 bg-gray-100 rounded-lg shadow-xl hover:scale-105">
          <img src={care} className="w-25 mx-auto mt-[3rem] bg-transparent" />
          <h2 className="py-8 text-2xl font-bold text-center">Total Care</h2>
          <p className="py-2 mx-8 mt-8 font-medium text-center border-b">
            Experience comprehensive healthcare like never before with ABC
            Pharmacy's Total Care service. Our commitment goes beyond treating
            symptoms – we focus on your overall well-being.
          </p>
        </div>
        <div className="flex flex-col w-full p-4 my-4 duration-300 rounded-lg shadow-xl hover:scale-105">
          <img src={bed} className="w-25 mx-auto mt-[3rem] bg-white" />
          <h2 className="py-8 text-2xl font-bold text-center">Bed Facility</h2>
          <p className="py-2 mx-8 mt-8 font-medium text-center border-b">
            At ABC Pharmacy, we go beyond pharmaceutical care to ensure your
            complete well-being. Our state-of-the-art facilities include
            comfortable and well-equipped beds for your recovery and rest.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services
