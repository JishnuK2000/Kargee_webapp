import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({
  children,
  withContainer = true,
}: {
  children: React.ReactNode;
  withContainer?: boolean;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">

      {/* HEADER */}
      <Navbar />

      {/* MAIN */}
      <main className="flex-1">
        {withContainer ? (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
            {children}
          </div>
        ) : (
          children
        )}
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}