import { useEffect } from 'react'
import '../App.css';
import gsap from 'gsap';
import image from "../assets/image/image.png"
import logo from "../assets/image/untitled.png"
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function Homepage() {

useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".ringbox", {
      scrollTrigger: {
        trigger: ".herotext",
        start: "top 20%",
        //markers: true,
        scrub:2,
      },
      scaleX:1.3,
      scaleY:1.3,
      marginLeft:"-60%"
    });
    gsap.to(".herotext", {
      scrollTrigger: {
        trigger: ".herotext",
        start: "top 20%",
        //markers: true,
        scrub:true,
      },
      position : "inline",
      zIndex:10
    });

    gsap.to(".homepage", {
      scrollTrigger: {
        trigger: ".ringbox",
        start: "top top",
        end:"bottom -10%",
        //markers: true,
        scrub:true,
      },
      backgroundColor: "rgb(254, 226, 226)"
    });
    gsap.to(".homepage", {
      scrollTrigger: {
        trigger: ".hr2",
        start: "top top",
        end:"bottom -10%",
        //markers: true,
        scrub:true,
      },
      backgroundColor: "rgb(254, 226, 226)"
    });
    gsap.to(".h2side", {
      scrollTrigger: {
        trigger: ".hr1",
        start: "top bottom",
        end:"bottom 50%",
        markers: true,
        scrub:true,
      },
      width: "100%"
    });
    gsap.to(".c1, .c2, .c3",{
      scrollTrigger: {
        trigger: ".hr1",
        start: "top center",
        end:"bottom 300px",
        //markers: true,
        scrub:2
        
        },
      marginTop:0,
      
    });
    
    




  }, []);

  return (
    
    <div className="homepage bg-blue-100 duration-500  p-6 w-screen">
    
    <div className='hero h-screen w-full text-[130px] text-center'>
      
        <h1 className='herotext mt-80 absolute z-35 left-[10%]'>MAKING IT POSSIBLE</h1>
        <h4 className='absolute w-[410px] z-10 bottom-0 text-[15px] text-left'>we invison to provide people with innovation that can make you go off grid , with cutting edge tecnology we are tranforming lives and Earth,Renewable energy is changing lives, giving people the freedom to choose better, greener, and more independent sources of power. From solar rooftops to wind micro-turbines, from off-grid cabins to eco-smart homes—renewable technologies are not just an alternative anymore; they are becoming the new standard.</h4>
      
      
        <div  className={`ringbox z-1 fixed left-[35%] top-[140px]`}>
        <div className={`ringg r2 border-90 border-pink-700/50 translate-y-[30px] `}></div>
        <div className={`ringg r1 border-90 border-red-700/50 translate-x-[20px] `}></div>
        <div className={`ringg r3 border-90 border-green-400/50 translate-x-[20px] `}></div>
        <div className={`ringg r4 border-90 border-blue-500/50 translate-y-[20px] `}></div>
        <div className={`ringg r5 border-30 border-white/60 translate-x-[20px]} `}></div>
        </div>
        <div className='text-[40px] absolute rotate-270 -right-40 top-50'><span className='h2side bg-black absolute w-[10px] h-full mr-10'> </span> ELECTROSYTEMS</div>
        
    </div>


    <div className='flex justify-center'>

    <hr className='hr1 bg-black h-[10px] w-6/10 '/> <hr className='hr1 h-[10px] w-[100px] bg-black ml-5' /><hr className='hr1 h-[10px] w-[10px] bg-black ml-5' />
     </div>




    <div className='cards z-10 flex row justify-center gap-[30px] items-center mt-[100px] '>


      <div className='c1 w-1/5 h-[550px] mt-[100px] px-4 bg-white/40 backdrop-blur-2xl shadow-2xl'><img src="src/assets/image/battry.png" alt="" className='ml-[15%]' />
             <h1 className='hero text-[20px]'>
              Learn how you can switch to Renewable and Go of Grid
             </h1>
      
      </div>
      
      <span className="h-[400px] bg-black w-[10px]"></span>

      <div className='c2 w-1/5 h-[550px] px-4 mt-[500px] bg-white/40 backdrop-blur-2xl shadow-2xl '> <img src="src/assets/image/plant.png" alt="" className='' />
            <h1 className='hero text-[20px]'>
              Learn how you can switch to Renewable and Go of Grid
             </h1>
      
      </div>

      <span className="h-[400px] bg-black w-[10px]"></span>

      <div className='c3 w-1/5 h-[550px] px-4 mt-[1000px] bg-white/40 backdrop-blur-2xl shadow-2xl '><img src="src/assets/image/house.png" alt="" className='' />
          <h1 className='hero text-[20px]'>
              Learn how you can switch to Renewable and Go of Grid
             </h1>
      </div>
      
    </div>




  <div className='hr2 z-35 bg-black h-[450px] text-white shadow-2xl flex row justify-center overflow-hidden items-center mt-[100px] w-6/10 mx-auto hover:w-7/10 hover:h-[500px] duration-900'>
    <h1 className='hero text-[60px] absolute text-center w-full font-bold'>CHOOSE AMONG 300+ BRANDS</h1>
    <div className='w-[3700px] h-full flex justify-end items-center gap-4 duration-15000 translate-x-320 hover:-translate-x-280 '>
        <div className='productcard ml-[1000px]'></div>
        <div className='productcard'></div>
        <div className='productcard'></div>
        <div className='productcard'></div>
        <div className='productcard'></div>
        <div className='productcard'></div>
        <div className='productcard'></div>
        <div className='productcard'></div>
        <div className='productcard'></div>
        
    
    
    
    </div>
  </div>

    <div className=''>
        <div className='hero text-[40px] my-[100px] w-7/10 mx-auto'>SEE WAHT COMMUNITY HAS TO OFFER</div>
        {/* <img src="" alt="" /> */}
      
    </div>


    <footer className='mt-auto bg-black h-[800px]'>


    </footer>




        
        

      
          


        
      
    
      
      
  
  </div>
  )
}
