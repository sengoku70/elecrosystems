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

  const sec1 = useRef(null);
  const sec2 = useRef(null);
  const sec3 = useRef(null);
   const [pos, setPos] = useState({ x: 0, y: 0 });


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
      

    })
  
  }, []);


  return (
    <div className="bg-pink-100">
    <div className="infopage w-8/10 mx-auto translate-y-35.5 p-14">
      {/* Section 1 */}
      <section  className="sec1 pt-5 overflow-hidden flex gap-10 justify-between items-start">

        <div className="content overflow-hidden shadow-2xl h-[700px] bg-no-repeat bg-white/60 w-7/10 mx-auto border-b-10 border-black">
          <h2 className="hero text-3xl font-extrabold bg-black p-4 w-fit text-white mb-6">How a Wind Turbine Works?</h2>
          <p className="hero text-[24px] backdrop-blur-[5px] thicc text-neutral-700 p-3">
        

              A wind turbine is a remarkable machine that transforms the simple movement of air into usable electricity. At first glance it may seem that the wind simply pushes the blades, but the process is far more precise and rooted in aerodynamic science. The blades of a turbine are shaped much like the wings of an aircraft, engineered to create lift rather than rely on force. When wind passes over their curved surfaces, air on one side moves faster than on the other, producing a pressure difference that causes the rotor to turn smoothly and efficiently. This allows turbines to operate even in gentle winds.
              <br />
                        </p>
          
        </div>
        <div className="content w-7/10 bg-white/60 shadow-2xl h-[700px] overflow-hidden mx-auto border-b-10  bg-no-repeat ">
            <h2 className="hero text-3xl font-extrabold bg-black p-4 w-fit text-white mb-6">How Does a Solar Panel Work?</h2>
              <p className="hero backdrop-blur-[5px] text-[24px] thicc text-neutral-700 p-3">

                A solar panel is, at its core, a device that captures sunlight and turns it into electricity, yet the process behind this transformation is both elegant and profoundly scientific. Each panel is made up of many photovoltaic (PV) cells, usually crafted from silicon, a material whose atomic structure allows it to interact with light in a unique way. When sunlight strikes the surface of a panel, it carries energy in the form of photons. These photons collide with the silicon atoms, transferring enough energy to knock electrons free from their positions. This movement of electrons creates an electric current, the fundamental building block of power generation.
          </p>
        </div>
        </section>

        <section>
          <div className="sec2 pt-5 overflow-hidden flex gap-10 justify-between items-center">
            <div className="content w-8/10 mt-10 mx-auto">
              <h2 className="hero text-3xl font-extrabold bg-[url('https://plus.unsplash.com/premium_photo-1672419013359-3e0a2f9c039a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center p-4 w-fit text-white mb-6">How Renewable Energy Affects Nature</h2>
              <p className="hero text-[24px] backdrop-blur-[5px] leading-relaxed thicc ">
                Renewable energy sources like solar and wind have a profoundly positive impact on our natural world. By transitioning away from fossil fuels, we significantly reduce greenhouse gas emissions that drive climate change, protecting ecosystems and wildlife from unprecedented environmental stress. These clean energy technologies produce no air or water pollution, preserving air quality for all living organisms and keeping our water sources pure. Unlike traditional power plants, renewable systems require minimal water for operation, conserving this precious resource for nature and agriculture. By choosing renewables, we honor the delicate balance of our planet's ecosystems and ensure a healthier, more sustainable future for generations to come.
              </p>
              <img src="" alt="" />
            </div>
          </div>
        </section>

      
      
  

  
      <section className="sec3 bg-black w-8/10 flex mt-30 mr-auto p-11 pb-20 ml-[100%] overflow-hidden">
        
        <div className="content h-fit  text-white">
          <h2 className="hero font-extrabold text-[40px] mb-2">How You Can Go Off-Grid ?</h2>
          <p className="hero text-[24px] w-7/10 mb-10">
            Let the Nature do the Work for You. <br />
            <br />
            By harnessing the power of renewable energy sources like solar and wind, <br />
            <br />
            Know How much you can save on your energy bills and contribute to a sustainable future.
          </p>
          <NavLink to="/Customcircuit" className="mt-5 mb-40 bg-white text-black px-5 py-3 font-bold hero text-lg">
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