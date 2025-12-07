import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../App.css";

export default function RenewableInfoPage() {
  gsap.registerPlugin(ScrollTrigger);

  const sec1 = useRef(null);
  const sec2 = useRef(null);
  const sec3 = useRef(null);

  useEffect(() => {
    gsap.to(".sec1",{
      scrollTrigger:{
        trigger:".h1",
        markers:true,
        start: "top 80%",
        end: "bottom 30%",
        scrub:true,

      },
      height:100,
      backgroundColor:"black"

    })
  

    gsap.to(".sec2",{
      scrollTrigger:{
        trigger:".h2",
        //markers:true,
        start: "top 80%",
        end: "top 70%",
        scrub:true,

      },
      height:100,    
      backgroundColor:"black",
  
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

              The rotating blades are connected to a central hub, forming the rotor, which spins a low-speed shaft inside the nacelle—the enclosed structure at the top of the tower. Because the blades turn relatively slowly, a gearbox is used to dramatically increase the rotational speed, stepping it up from around 15–20 revolutions per minute to nearly a thousand. This high-speed rotation drives the generator, where magnets and copper coils interact to produce electrical current. From here, the electricity travels down through the tower via heavy-duty cables to a transformer on the ground, which increases the voltage so the power can move efficiently over long distances.

              A modern turbine is also equipped with systems that allow it to adapt constantly to the wind. The yaw system rotates the entire nacelle to face shifting wind directions, ensuring the blades always meet the wind at the ideal angle. Meanwhile, pitch control adjusts the tilt of the blades themselves, helping regulate speed and protect the turbine during strong gusts. If winds become dangerously high, the turbine can shut itself down, applying brakes and pitching the blades to minimize stress on the structure.

              Wind turbines reach their peak performance at moderate wind speeds, typically between 7 and 12 meters per second. Too little wind and the turbine cannot generate meaningful power; too much and the safety systems intervene. Yet within this range, a turbine can capture a significant portion of the wind’s energy and convert it into a steady supply of electricity without fuel, emissions, or continuous human intervention.
          </p>
          
        </div>
        </section>

      {/* Divider */}
      <hr className="h1 h-[10px] mt-20 bg-black mx-auto w-8/10"></hr>

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

      {/* Divider */}
      <hr className="w-8/10 h2 mx-auto mt-[50px] h-[10px] bg-black"></hr>

      {/* Section 3 */}
      <section ref={sec3} className=" pt-5">
        
        <div className="content overflow-hidden w-7/10 mx-auto mt-4">
          <h2 className="hero font-bold text-3xl mb-2">How You Can Go Off-Grid</h2>
          <p className="hero text-[24px]">
            Using a hybrid system combining wind turbines and solar panels, you can generate
            consistent renewable electricity. Our custom system builder calculates your needs
            and designs a full hybrid power solution tailored to your home.
          </p>
          <button className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg hero text-lg">
            Go to Custom System Maker
          </button>
        </div>
      </section>
    </div>
  );
}