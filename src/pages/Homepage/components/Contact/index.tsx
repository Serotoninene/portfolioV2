import { useRef } from "react";
import { useColorContext } from "../../../../hooks/useColorContext";
import { splitWords } from "../../../../utils";
import { useIntroAnim } from "./animations/useIntroAnim";
import { useScrollAnim } from "./animations/useScrollAnim";
import { Form } from "./components/Form";

export const Contact = () => {
  const { colors } = useColorContext();
  const container = useRef<HTMLDivElement>(null);

  useIntroAnim();
  useScrollAnim(container);

  return (
    <div ref={container} className="h-screen">
      <div
        id="Contact"
        className="px-2 pt-14 pb-10 h-screen grid gap-8 sm:gap-0 sm:grid-cols-2 sm:px-5 sm:pt-14sm:pb-6 m-auto"
        style={{
          background: colors.secondaryColor,
          clipPath: "polygon(40% 20%, 60% 20%, 60% 80%, 40% 80%)",
        }}
      >
        {/* left part */}
        <div className="overflow-hidden">
          <div className="relative w-full h-[35vh] sm:h-full overflow-hidden ">
            <img
              id="ContactImage"
              alt="placeholder"
              src="/assets/Photos/s-eychenne-les-routes-de-mon-enfance.jpeg"
              className="w-full object-cover h-full"
            />
          </div>
        </div>
        {/* right part */}
        <div
          className="relative px-2 flex flex-col sm:justify-center sm:items-center sm:px-4 md:px-20"
          style={{ color: colors.mainColor }}
        >
          <div className="w-fit">
            <div id="ContactHeader" className="mb-14">
              <h2
                id="ContactHeader_Title"
                className="text-3xl font-bold mb-2 sm:text-4xl overflow-hidden"
              >
                {splitWords("Let's work together !")}
              </h2>
              <div
                id="ContactHeader_Paragraph"
                className="font-thin leading-[110%]"
              >
                {splitWords(
                  "Drop me a message, and let's turn your ideas into reality. Excited to collaborate on your next creative project!"
                )}
              </div>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};
