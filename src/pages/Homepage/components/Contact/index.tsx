import { FormEvent, RefObject, useRef, useState } from "react";
import { Button } from "../../../../components/atoms";
import { useColorContext } from "../../../../hooks/useColorContext";
import { splitWords } from "../../../../utils";
import { useChangeBackgroundColor } from "./animations/useChangeBackgroundColor";
import { useIntroAnim } from "./animations/useIntroAnim";
import { useScrollAnim } from "./animations/useScrollAnim";

// Types
interface InputProps {
  field: string;
  type?: string;
  // hasSubmit: boolean;
}

const FORM_ENDPOINT =
  "https://public.herotofu.com/v1/9f625ad0-bbc4-11ec-8bd8-6d49e4d0c791";

const Input = ({ type = "text", field }: InputProps) => {
  const [value, setValue] = useState("");

  return (
    <div className="relative overflow-hidden">
      <input
        required={true}
        name={field.toLowerCase()}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={field}
        className="bg-transparent border-secondary-200 border-b-[0.5px] placeholder-secondary-600 w-full mb-2 px-2 py-2 focus:outline-none"
      ></input>
    </div>
  );
};

const Form = () => {
  const formRef = useRef() as RefObject<HTMLFormElement>;
  const [submitted, setSubmitted] = useState(false);

  // const [feedback, setFeedback] = useState<string>("");
  // const [hasSubmit, setHasSubmit] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = e.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Form response was not ok");
          }

          setSubmitted(true);
        })
        .catch((err) => {
          // Submit the form manually
          e.target.submit();
        });
    }
  };

  if (submitted) {
    return (
      <>
        <div className="text-2xl">Thank you!</div>
        <div className="text-md">We'll be in touch soon.</div>
      </>
    );
  }

  return (
    <form
      id="ContactForm"
      ref={formRef}
      onSubmit={handleSubmit}
      className="sm:grid sm:grid-cols-2 sm:gap-4 sm:w-full"
    >
      <Input field="Prenom" />
      <Input field="Nom" />
      <Input field="Mail" type="mail" />
      <Input field="Telephone" type="phone" />
      <div className="sm:col-span-2">
        <textarea
          required={true}
          name={"message"}
          placeholder="Message"
          className="bg-transparent border-secondary-200 border-b-[0.5px] placeholder-secondary-600 w-full mb-2 px-2 py-2 focus:outline-none resize-none"
        ></textarea>
      </div>
      <div className="mt-2 sm:col-span-2 sm:mt-6">
        <Button>Get in touch</Button>
      </div>
      {/* {hasSubmit && (
        <p className="w-full text-center sm:absolute sm:bottom-28">
          {feedback}
        </p>
      )} */}
    </form>
  );
};

export const Contact = () => {
  const { colors } = useColorContext();
  const container = useRef<HTMLDivElement>(null);

  useIntroAnim();
  const backgroundTl = useChangeBackgroundColor();
  useScrollAnim(container, backgroundTl);

  return (
    <div ref={container} className="h-screen">
      <div
        id="Contact"
        className="px-2 pt-14 pb-10 h-screen grid gap-8 sm:gap-0 sm:grid-cols-2 sm:px-5 sm:pt-14sm:pb-6 m-auto"
        style={{
          background: colors.dark,
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
          style={{ color: colors.light }}
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
