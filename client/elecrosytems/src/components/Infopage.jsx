import { useState,useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../App.css";
import { NavLink } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import { ImGithub } from "react-icons/im";


export default function RenewableInfoPage() {
  gsap.registerPlugin(ScrollTrigger);


  useEffect(() => {
    gsap.to(".sec3",{
      scrollTrigger:{
        trigger:".sec3",
        markers:true,
        start: "top 100%",
        end: "center 70%",
        toggleActions: "play none none none",
        scrub:2,

      },
      marginLeft:"auto",
      marginBottom:"100px",
    }),[]});
  
  return (
    <div className="bg-pink-100">
    <div className="infopage w-8/10 mx-auto translate-y-35.5 p-14">
      {/* Section 1 */}
        <section className="sec1 pt-5 overflow-hidden flex gap-10 justify-between items-start">

          <div className="content overflow-hidden h-[900px] shadow-2xl bg-no-repeat bg-white/60 w-7/10 mx-auto border-b-10 border-black">
          
      
            <h2 className="hero thicc text-3xl font-extrabold bg-black p-4 w-fit text-white mb-6">How a Wind Turbine Works?</h2>
            <p className="hero text-[24px] backdrop-blur-[5px] thicc text-neutral-700 p-3">
          

            A wind turbine is a remarkable machine that transforms the simple movement of air into usable electricity. At first glance it may seem that the wind simply pushes the blades, but the process is far more precise and rooted in aerodynamic science. The blades of a turbine are shaped much like the wings of an aircraft, engineered to create lift rather than rely on force. When wind passes over their curved surfaces, air on one side moves faster than on the other, producing a pressure difference that causes the rotor to turn smoothly and efficiently. This allows turbines to operate even in gentle winds.
            <br />
            </p>
            <div className="flex gap-2">
          <img src="https://imgs.search.brave.com/PUIYQO_rdJwnO8biJrjxowcy9kH8ORvJcJdmH9NtaIg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP3E9d2luZCUy/MHR1cmJpbmUlMjBk/aWFncmFtJnc9MTI4/MCZoPTcyMCZjPTUm/cnM9MSZwPTA" className=" showimg w-1/2 ml-4 duration-500" alt="" />
          <img src="https://images.unsplash.com/photo-1587168173357-99c7e95fb5cd?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="Showimg duration-500 w-1/2 mr-4" alt="" />
            </div>
          </div>
          

          <div className="content w-7/10 bg-white/60 shadow-2xl  h-[900px] overflow-hidden mx-auto border-b-10  bg-no-repeat ">
          <h2 className="hero thicc text-3xl font-extrabold  bg-black p-4 w-fit text-white mb-6">How Does a Solar Panel Work?</h2>
            <p className="hero backdrop-blur-[5px] text-[24px] thicc text-neutral-700 p-3">

              A solar panel is, at its core, a device that captures sunlight and turns it into electricity, yet the process behind this transformation is both elegant and profoundly scientific. Each panel is made up of many photovoltaic (PV) cells, usually crafted from silicon, a material whose atomic structure allows it to interact with light in a unique way. When sunlight strikes the surface of a panel, it carries energy in the form of photons. These photons collide with the silicon atoms, transferring enough energy to knock electrons free from their positions. This movement of electrons creates an electric current, the fundamental building block of power generation.
            </p>
            <div className="flex gap-2">
          <img src="https://imgs.search.brave.com/2SupGqSvomDEHMZif5s8hR8p4b80n-K7Rx6SIwwgyRo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2FjLzc5/L2FkL2FjNzlhZGFm/YTE4NmFjODgxZGNh/MGUxZGY3YzdmMTc5/LmpwZw" className="h-[200px] w-1/2 ml-4 showimg duration-500" alt="" />
          <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className=" mr-4 w-1/2 duration-500 showimg" alt="" />
          </div>
          </div>
        
          </section>




          <section className="flex mt-30">
            <div className="sec2 overflow-hidden h-[550px] ">
            
            <h2 className="hero thicc text-3xl font-extrabold bg-[url('https://plus.unsplash.com/premium_photo-1672419013359-3e0a2f9c039a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center p-4 w-fit text-white mb-6">How Renewable Energy Affects Nature</h2>
          
            <p className="hero  text-[20px] backdrop-blur-[5px] leading-relaxed thicc ">
              Renewable energy sources like solar and wind have a profoundly positive impact on our natural world. By transitioning away from fossil fuels, we significantly reduce greenhouse gas emissions that drive climate change, protecting ecosystems and wildlife from unprecedented environmental stress. These clean energy technologies produce no air or water pollution, preserving air quality for all living organisms and keeping our water sources pure. Unlike traditional power plants, renewable systems require minimal water for operation, conserving this precious resource for nature and agriculture. By choosing renewables, we honor the delicate balance of our planet's ecosystems and ensure a healthier, more <p className="bg-linear-to-br w-fit from-pink-500 via-blue-400 to-green-500 thicc">sustainable future for generations to come.</p> 
            </p>
          
            
          </div>
          <img src="src/assets/image/Gemini_Generated_Image_39qvjf39qvjf39qv.png" className="w-4/10 border-40 border-white/60 shadow-2xl" alt="" />
          
          </section>

        
        
        <section className="sec4 bg-white/80 w-8/10 mx-auto mt-30 p-11 hero shadow-lg overflow-hidden">
          <div className="content">
        <h2 className="hero  text-3xl font-extrabold bg-black p-4 w-fit text-white mb-6">Calculate Your Savings with Our Custom System Creator</h2>
        <p className="hero text-[24px] backdrop-blur-[5px] thicc text-neutral-700 p-3 mb-6">
          Wondering how much you can save by going solar or installing a wind turbine? Our intuitive Custom System Creator lets you design your perfect renewable energy setup and instantly see the financial impact. Simply input your current energy consumption, location, and preferences, and our calculator will estimate your annual savings, payback period, and environmental impact.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="thicc text-xl font-bold mb-3 text-blue-700 hero"> Bill Reduction</h3>
            <p className="thicc hero text-gray-700">See exactly how much you'll save monthly and annually on your energy bills.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="thicc text-xl font-bold mb-3 text-green-700 hero"> Carbon Offset</h3>
            <p className="thicc text-gray-700 hero">Track the CO2 emissions you'll prevent by switching to clean energy.</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="thicc text-xl font-bold mb-3 text-purple-700 hero"> ROI Analysis</h3>
            <p className="thicc text-gray-700 hero">Understand your return on investment and break-even timeline.</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-300 to-orange-300 p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-bold mb-4">Choose Your Template</h3>
          <p className="text-lg">
            We offer various preset template options to suit your needs:
          </p>
          <ul className="list-disc list-inside">
            <li><strong>Agriculture:</strong> Ideal for farms and agricultural setups, focusing on maximizing energy efficiency for irrigation and equipment.</li>
            <li><strong>Industry:</strong> Tailored for industrial applications, optimizing energy consumption for machinery and production lines.</li>
            <li><strong>Suburb:</strong> Designed for suburban homes, balancing energy needs with aesthetic considerations for residential areas.</li>
            <li><strong>Country House:</strong> Perfect for rural properties, emphasizing off-grid solutions and sustainable living.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-2xl font-bold mb-4">Calculation Steps</h3>
          <ol className="list-decimal list-inside ">
            <li>Input your current energy consumption data.</li>
            <li>Select your location to account for solar and wind availability.</li>
            <li>Choose a template that best fits your needs.</li>
            <li>Our system will analyze the data and provide estimates for savings, payback period, and environmental impact.</li>
          </ol>
          <p className="mt-4 text-lg font-semibold">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-1 rounded">Important:</span> The accuracy of the calculations depends on the data provided.
          </p>
        </div>
        <NavLink to="/Customcircuit" className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 font-bold hero thicc text-lg rounded-lg hover:shadow-lg duration-300">
          Start Calculating Your Savings Now
        </NavLink>
          </div>
        </section>

        
        <section className="sec3 bg-black w-8/10 flex mt-30 mr-auto p-11 pb-20 ml-[100%] overflow-hidden">
          
          <div className="content h-fit  text-white">
            <h2 className="hero thicc font-extrabold text-[40px] mb-2">How You Can Go Off-Grid ?</h2>
            <p className="hero thicc text-[24px] w-7/10 mb-10">
          Let the Nature do the Work for You. <br />
          <br />
          By harnessing the power of renewable energy sources like solar and wind, <br />
          <br />
          Know How much you can save on your energy bills and contribute to a sustainable future.
            </p>
            <NavLink to="/Customcircuit" className="mt-5 mb-40 bg-white text-black px-5 py-3 font-bold hero thicc text-lg">
          Go to Custom System Creator
            </NavLink>

          </div>
          <img src="src/assets/image/untitled33-removebg-preview.png" alt="" />
        </section>

          
        

          </div>
          <footer className="hero bg-black text-white mt-50 py-10 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo + Description */}
    <div>
      <h2 className="text-2xl font-semibold mb-4">Electrosystems</h2>
      <p className="text-gray-400">
        Building hybrid solar & wind systems for a sustainable future.
      </p>
    </div>

    {/* Navigation Links */}
    <div>
      <h3 className="text-xl font-semibold mb-4">Pages</h3>
      <ul className="space-y-2 text-gray-300">
        <li><a href="/" className="hover:text-white">Homepage</a></li>
        <li><a href="/learn-more" className="hover:text-white">Learn More</a></li>
        <li><a href="/custom-system" className="hover:text-white">Custom System</a></li>
        <li><a href="/login" className="hover:text-white">Login</a></li>
      </ul>
    </div>

    {/* Social Icons */}
    <div>
      <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
      <div className="flex space-x-5">
        <a href="#" className="hover:text-white text-gray-300 text-2xl">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="hover:text-white text-gray-300 text-2xl">
          <GrLinkedinOption/>
        </a>
        <a href="#" className="hover:text-white text-gray-300 text-2xl">
          <ImGithub/>
        </a>
        <a href="#" className="text-white text-2xl">
          <BsInstagram/>
        </a>
      </div>
    </div>

  </div>

  <div className="text-center text-gray-600 text-sm">
    © {new Date().getFullYear()} ELECTROSYTEMS. All rights reserved.
  </div>
    </footer>
    </div>
  
  );
}