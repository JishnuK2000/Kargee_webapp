import pic6 from "../../assets/images/pic6.jpg";

export default function PromoBanner() {
  return (
    <section className=" ">
      
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full  py-6 md:py-20">
        
        <div className="relative   shadow-2xl h-[400px] md:h-[500px]">
          
          <img
            src={pic6}
            alt="Festive Collection"
            className="w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 flex items-center justify-center">
            
            <div className="text-center space-y-6 px-4">
              
              {/* <h2 className="text-3xl sm:text-4xl md:text-6xl text-white">
                Festive Elegance
                <br />
                Collection
              </h2>

              <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full">
                <p className="text-white text-xl md:text-3xl">
                  Flat <span className="text-yellow-300">20% OFF</span>
                </p>
              </div>

              <button className="bg-white text-[#5E2A14] px-10 py-4 rounded-full hover:bg-[#F5F1ED] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg">
                Shop Now
              </button> */}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}