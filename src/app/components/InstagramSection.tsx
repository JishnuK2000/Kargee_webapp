import { Instagram } from 'lucide-react';

export default function InstagramSection() {
  return (
    <section className="py-6 md:py-20 ">
      <div className="">
        <div className="relative overflow-hidden  shadow-xl h-[300px] md:h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1675507325410-5b5988e55c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZXN0aXZlJTIwY2VsZWJyYXRpb24lMjBkZWNvcnxlbnwxfHx8fDE3NzM4OTcyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Instagram"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#5E2A14]/90 via-[#5E2A14]/60 to-transparent flex flex-col items-center justify-center text-center px-4">
            <Instagram className="w-16 h-16 md:w-20 md:h-20 text-white mb-6" />
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl mb-3">
              Follow us on Instagram
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-6 ">
              @kargee.co.in
            </p>
            <button
              onClick={() => window.open("https://www.instagram.com/kargee.co.in/", "_blank")}
              className="bg-white text-[#5E2A14] px-8 py-3 rounded-full hover:bg-[#F5F1ED] transition-all duration-300 shadow-lg cursor-pointer"
            >
              Follow Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
