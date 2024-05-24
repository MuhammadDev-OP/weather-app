import Image from "next/image";
import Wrapper from "./components/shared/Wrapper";
import Hero from "./components/widgets/Hero";
import Weather from "./components/widgets/weather/Weather";

export default function Home() {
  return (
    <>
      <Hero />
      <Weather />
    </>
  );
}
