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
    function handleMove(e) {
       setPos({ x: e.pageX, y: e.pageY });
    }
    window.addEventListener("pointermove", handleMove);

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  useEffect(() => {
    gsap.to(".sec1",{
      scrollTrigger:{
        trigger:".h1",
        //markers:true,
        start: "top 80%",
        end: "bottom 30%",
        toggleActions: "play none none none",
        scrub:2,

      },
      backgroundColor:"black",
      

    })
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
    <div className="infopage translate-y-35.5 ">
      {/* Section 1 */}
      <section  className="sec1 pt-5 overflow-hidden">

        <div className="content overflow-hidden bg-no-repeat bg-right bg-[url('https://plus.unsplash.com/premium_photo-1673120558208-c5855770123d?q=80&w=665&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] pr-70 w-7/10 mx-auto ">
          <h2 className="hero text-3xl font-extrabold bg-black p-4 w-fit text-white mb-6">How a Wind Turbine Works?</h2>
          <p className="hero text-[24px] backdrop-blur-[5px]">
        

              A wind turbine is a remarkable machine that transforms the simple movement of air into usable electricity. At first glance it may seem that the wind simply pushes the blades, but the process is far more precise and rooted in aerodynamic science. The blades of a turbine are shaped much like the wings of an aircraft, engineered to create lift rather than rely on force. When wind passes over their curved surfaces, air on one side moves faster than on the other, producing a pressure difference that causes the rotor to turn smoothly and efficiently. This allows turbines to operate even in gentle winds.
              <br />
              The rotating blades are connected to a central hub, forming the rotor, which spins a low-speed shaft inside the nacelle—the enclosed structure at the top of the tower. Because the blades turn relatively slowly, a gearbox is used to dramatically increase the rotational speed, stepping it up from around 15–20 revolutions per minute to nearly a thousand. This high-speed rotation drives the generator, where magnets and copper coils interact to produce electrical current. From here, the electricity travels down through the tower via heavy-duty cables to a transformer on the ground, which increases the voltage so the power can move efficiently over long distances.
              <br />
              A modern turbine is also equipped with systems that allow it to adapt constantly to the wind. The yaw system rotates the entire nacelle to face shifting wind directions, ensuring the blades always meet the wind at the ideal angle. Meanwhile, pitch control adjusts the tilt of the blades themselves, helping regulate speed and protect the turbine during strong gusts. If winds become dangerously high, the turbine can shut itself down, applying brakes and pitching the blades to minimize stress on the structure.

              <br />
              Wind turbines reach their peak performance at moderate wind speeds, typically between 7 and 12 meters per second. Too little wind and the turbine cannot generate meaningful power; too much and the safety systems intervene. Yet within this range, a turbine can capture a significant portion of the wind’s energy and convert it into a steady supply of electricity without fuel, emissions, or continuous human intervention.
          </p>
          
        </div>
        </section>

      {/* Divider */}
      <hr className="h1 h-[10px] mt-20 mb-20 bg-black mx-auto w-8/10"></hr>

      {/* Section 2 */}
      <section  className="sec2 pt-5">
          <div className="content w-7/10 bg-[url('https://images.unsplash.com/photo-1723133371535-1412bc2e412e?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] overflow-hidden mx-auto bg-right pr-40 bg-no-repeat mt-[40px]">
            <h2 className="hero text-3xl font-extrabold bg-black p-4 w-fit text-white mb-6">How Does a Solar Panel Work?</h2>
              <p className="hero backdrop-blur-[5px] text-[24px]">

                A solar panel is, at its core, a device that captures sunlight and turns it into electricity, yet the process behind this transformation is both elegant and profoundly scientific. Each panel is made up of many photovoltaic (PV) cells, usually crafted from silicon, a material whose atomic structure allows it to interact with light in a unique way. When sunlight strikes the surface of a panel, it carries energy in the form of photons. These photons collide with the silicon atoms, transferring enough energy to knock electrons free from their positions. This movement of electrons creates an electric current, the fundamental building block of power generation.

                Within each PV cell, layers of silicon are specially treated to create an internal electric field. One layer carries a slight positive charge, the other a slight negative charge. When electrons are released by sunlight, this built-in electric field forces them to flow in a single direction, forming a direct current (DC). Thin metal conductors on the top and bottom of each cell collect this current and guide it out of the panel, where it can be used, stored, or converted for household needs.

                Because homes and appliances rely on alternating current (AC), the DC power from solar panels is fed into an inverter. The inverter reshapes the flow of electrons into AC, synchronizing it with a home’s electrical system or the larger grid. A solar array may be paired with batteries to store excess power for nighttime use, or it can directly offset energy consumption by feeding power back into the grid.

                What makes solar panels extraordinary is their simplicity: no moving parts, no combustion, no noise. They quietly convert light—one of the most abundant resources on Earth—into dependable electricity, offering a clean, scalable solution for both individual homes and entire cities.
          </p>
        </div>
      </section>

  
      <section className="sec3 bg-black w-7/10 flex mt-30 mx-auto p-14 pb-20 ml-[100%] overflow-hidden">
        
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
        <div className=" bg-cover  w-[800px]  bg-[url('src/assets/image/untitled33-removebg-preview.png')]"></div>
      </section>

    
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