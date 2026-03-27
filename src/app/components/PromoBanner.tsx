import pic6 from "../../assets/images/pic6.jpg";

export default function PromoBanner() {
  return (
    <section className=" ">
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full  py-6 md:py-20">
        <div className="   ">
          <img
            src={pic6}
            alt="Festive Collection"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
