import { useParams } from "react-router-dom";

export const ProjectLayout = () => {
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

  return <div className="h-screen relative px-5 pt-[128px]">Hello</div>;
};
