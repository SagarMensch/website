import InfiniteMenu from "./CompanyOrbit.tsx";
import Navigation from "@/sections/Navigation.tsx";
import Footer from "@/sections/Footer.tsx";
export default function CompanyOrbitFunction() {
  const items = [
    {
      image: "https://picsum.photos/300/300?grayscale",
      link: "https://google.com/",
      title: "Item 1",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/400/400?grayscale",
      link: "https://google.com/",
      title: "Item 2",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/500/500?grayscale",
      link: "https://google.com/",
      title: "Item 3",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/600/600?grayscale",
      link: "https://google.com/",
      title: "Item 4",
      description: "This is pretty cool, right?",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <section id="orbit" style={{ height: "100vh", position: "relative" }}>
        <Navigation />
        <InfiniteMenu items={items} scale={1} />
      </section>
      <Footer />
    </div>
  );
}
