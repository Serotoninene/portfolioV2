import { ProjectData } from "../projectsData";

const MobilePhoto = ({ data }) => (
  <div className="col-span-2 h-[80vh]  my-10 md:my-32 md:col-span-1">
    <img
      className="h-full mx-auto object-cover md:object-contain rounded "
      src={data}
    />
  </div>
);

export function ProjectContent({ data }: { data: ProjectData }) {
  const { video, photos, paragraphs } = data;
  // We chunk the photos into groups of 3
  const photoChunks = photos.reduce((chunks: string[][], photo, index) => {
    if (index % 3 === 0) {
      // start a new chunk every 3 photos
      chunks.push([]);
    }
    chunks[chunks.length - 1].push(photo);
    return chunks;
  }, []);

  // Helper to compute alignment class based on the paragraph’s order.
  const getAlignmentClass = (paragraphIndex: number) => {
    if (paragraphIndex % 3 === 0) return "justify-start";
    if (paragraphIndex % 3 === 1) return "justify-center";
    return "justify-end";
  };

  return (
    <div className="grid grid-cols-2 gap-3 px-3 md:px-5 md:gap-6 mt-10 md:mt-32">
      {/* INTRO ALWAYS STAYS LIKE THIS */}
      <div className="h-[calc(100vw*9/16)] border col-span-2">
        <video
          src={video}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          loop
        />
      </div>
      <div className="col-span-2 my-10">
        <p className="text-[16px] md:text-[24px] font-medium leading-[150%] max-w-[640px] my-10 md:my-32">
          {paragraphs![0]}
        </p>
      </div>

      {photoChunks.map((chunk, index) => (
        <section key={index} className="col-span-2 grid grid-cols-2 gap-3">
          <div className="h-[calc(100vw*9/16)] col-span-2 my-10 md:my-32">
            <img className="h-full w-full object-cover" src={chunk[0]} />
          </div>
          {chunk[1] && <MobilePhoto data={chunk[1]} />}
          {chunk[2] && <MobilePhoto data={chunk[2]} />}
          {paragraphs[index + 1] ? (
            <div
              className={`col-span-2 my-10 md:my-24 flex ${getAlignmentClass(
                index + 1
              )}`}
            >
              <p className="text-[16px] md:text-[24px] font-medium leading-[150%] max-w-[640px]">
                {paragraphs[index + 1]}
              </p>
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
