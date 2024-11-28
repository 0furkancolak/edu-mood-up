import AboutHome from "@/components/home/about/AboutHome";
import AboutExtra from "./components/aboutExtra/AboutExtra";

export default async function About() {
  return (
    <div>
      <AboutHome bg={"bg-violet-600"} />
      <AboutExtra />
    </div>
  );
}
