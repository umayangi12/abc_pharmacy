import React from 'react'
import aboutusbg from '../assets/aubg.jpg'

function AboutUs() {
  return (
    <div className="w-full px-4 py-16 bg-white ">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className='w-[500px] mx-auto my-4' src={aboutusbg} alt="/" />
        <div className='flex flex-col justify-center'>
          <p className='text-[orange] font-bold'>YOUR TRUSTED HEALTH CARE PARTER</p>
          <h1 className='text-2xl font-bold text-gray-500 md:text-4xl sm:text-3xl'>Empowering Wellness, Ensuring Care</h1>
          <p>
            Welcome to ABC Pharmacy, where your health is our priority. As your
            trusted health partner, we are dedicated to providing top-notch
            pharmaceutical services, personalized care, and a wide range of
            quality products. Whether you need prescription medications,
            over-the-counter remedies, or expert advice on health and wellness,
            our experienced team is here to support you. At ABC Pharmacy, we are
            committed to empowering wellness, ensuring care, and fostering a
            healthier community. Your well-being is at the heart of everything
            we do. Discover the difference of a pharmacy that cares – ABC
            Pharmacy, where your health is our passion.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs
