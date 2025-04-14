import { ProjectData } from "../projectsData";

export function ProjectContent({ data }: { data: ProjectData }) {
  const { photos, paragraphs } = data;
  // We chunk the photos into groups of 3
  const photoChunks = photos
    .slice(1) // skip the first photo
    .reduce((chunks: string[][], photo, index) => {
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
    <div className="grid grid-cols-2 gap-3 px-3 md:px-5">
      {/* INTRO ALWAYS STAYS LIKE THIS */}
      <div className="h-[80vh] col-span-2">
        <img className="h-full w-full object-cover" src={photos[0]} />
      </div>
      <div className="col-span-2 my-10">
        <p className="text-[24px] md:text-[32px] font-medium leading-[150%] max-w-[640px] my-10 md:my-32">
          {paragraphs![0]}
        </p>
      </div>

      {photoChunks.map((chunk, index) => (
        <section key={index} className="col-span-2 grid grid-cols-2 gap-3">
          <div className="h-[80vh] col-span-2">
            <img className="h-full w-full object-cover" src={chunk[0]} />
          </div>
          {chunk[1] && (
            <div className="h-[80vh]">
              <img className="h-full w-full object-cover" src={chunk[1]} />
            </div>
          )}
          {chunk[2] && (
            <div className="h-[80vh]">
              <img className="h-full w-full object-cover" src={chunk[2]} />
            </div>
          )}
          {paragraphs[index + 1] ? (
            <div
              className={`col-span-2 md:my-10 flex ${getAlignmentClass(
                index + 1
              )}`}
            >
              <p className="text-[24px] md:text-[32px] font-medium leading-[150%] max-w-[640px] my-10 md:my-32">
                {paragraphs[index + 1]}
              </p>
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
