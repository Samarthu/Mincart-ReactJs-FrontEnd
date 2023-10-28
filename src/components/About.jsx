import React from 'react'

const About = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to our MineCart online store. We are a dedicated team of developers and designers
        who are passionate about creating the best shopping experience for our customers.
      </p>
      <p className="mb-4">
        At MineCart, we offer a wide range of products for your shopping needs. Our goal is to
        provide high-quality products at competitive prices while ensuring a seamless and secure
        shopping experience for you.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
      <div className="flex flex-wrap -m-4">
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="/founder.jpeg"
              alt="Team Member 1"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">John Drwau</h3>
            <p>Co-Founder</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="/founder2.jpeg"
              alt="Team Member 2"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Jame Smith</h3>
            <p>Lead Developer</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
             src="/founder3.jpeg"
              alt="Team Member 3"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Mary Johnson</h3>
            <p>Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
