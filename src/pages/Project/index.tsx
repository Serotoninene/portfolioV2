import { useParams } from "react-router-dom";

const LABELS = ["Client", "Project", "Website"];

const HeaderDuo = ({ idx, content }) => {
  const colSpan = idx === 2 ? "col-span-2" : "col-span-3";

  return (
    <div className={colSpan}>
      <h4 className="font-semibold md:text-xl">{LABELS[idx]}</h4>
      <p className="italic md:text-xl">{content}</p>
    </div>
  );
};

export default function Project() {
  const { id } = useParams<{ id: string }>();

  // if (!id || !projectsData[id]) {
  //   return (
  //     <>
  //       <div className="h-screen relative px-5 pt-[128px]">
  //         Project not found
  //       </div>
  //     </>
  //   );
  // }

  return (
    <div className="min-h-screen relative px-3 md:px-5 pt-14 md:pt-[100px]">
      <header>
        <h1 className="font-semibold text-2xl md:text-4xl">
          Title of the project
        </h1>
        <p className="w-full text-justify md:text-xl mt-6">
          The grid system and layout were developed from scratch with a custom
          CSS framework. Handling transitions — especially within the menu — was
          a major challenge, but it became one of the project’s key
          achievements. All animations were crafted in CSS and controlled via
          JavaScript. This project was particularly challenging due to the sheer
          number of videos, assets, and animations, but it was also one of the
          most enjoyable and rewarding experiences I've had. Every effort was
          made to adhere to HTML markup best practices.
        </p>

        <div className="grid grid-cols-8 gap-5 mt-6">
          <HeaderDuo idx={0} content="Avaa Architects" />
          <HeaderDuo idx={1} content="Avaa Architects" />
          <HeaderDuo idx={2} content="Avaa Architects" />
        </div>
      </header>
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="h-[80vh] col-span-2">
          <img
            className="h-full w-full object-cover"
            src="/assets/Photos/hp-projects/s-eychenne.png"
          />
        </div>
        <div className="h-[80vh]">
          <img
            className="h-full w-full object-cover"
            src="/assets/Photos/hp-projects/s-eychenne.png"
          />
        </div>
        <div className="h-[80vh]">
          <img
            className="h-full w-full object-cover"
            src="/assets/Photos/hp-projects/s-eychenne.png"
          />
        </div>
        <div className="h-[80vh] col-span-2">
          <img
            className="h-full w-full object-cover"
            src="/assets/Photos/hp-projects/s-eychenne.png"
          />
        </div>
      </div>
    </div>
  );
}
