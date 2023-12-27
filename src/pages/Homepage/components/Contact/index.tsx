import {
  FormEvent,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useColorContext } from "../../../../hooks/useColorContext";
import { useChangeBackgroundColor } from "./animations/useChangeBackgroundColor";
import { useIntroAnim } from "./animations/useIntroAnim";
import { useScrollAnim } from "./animations/useScrollAnim";

// Types
interface InputProps {
  field: string;
  type?: string;
  hasSubmit: boolean;
  optionnal?: boolean;
}

const Input = ({ type = "text", hasSubmit, field, optionnal }: InputProps) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");
  }, [hasSubmit]);

  return (
    <div className="relative">
      <input
        required={!optionnal && true}
        name={field.toLowerCase()}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={field}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="bg-transparent border-secondary-200 border-b-[0.5px] placeholder-secondary-600 w-full mb-2 px-2 py-2 focus:outline-none"
      ></input>
      {optionnal && !focus && (
        <div className="absolute top-1 right-1 text-xs">(optionnel)</div>
      )}
    </div>
  );
};

const Form = () => {
  const formRef = useRef() as RefObject<HTMLFormElement>;
  const [feedback, setFeedback] = useState<string>("");
  const [hasSubmit, setHasSubmit] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // emailjs
    //   .sendForm(
    //     process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    //     process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    //     formRef.current!,
    //     process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    //   )
    //   .then(() => {
    //     setFeedback("Votre message a bien été envoyé");
    //     setHasSubmit(true);
    //   });
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => handleSubmit(e)}
      className="sm:grid sm:grid-cols-2 sm:gap-2 sm:w-full"
    >
      <Input field="Prenom" hasSubmit={hasSubmit} />
      <Input field="Nom" hasSubmit={hasSubmit} />
      <Input field="Mail" type="mail" hasSubmit={hasSubmit} />
      <Input field="Telephone" type="phone" optionnal hasSubmit={hasSubmit} />
      <div className="sm:col-span-2">
        <textarea
          required={true}
          name={"message"}
          placeholder="Message"
          className="bg-transparent border-secondary-200 border-b-[0.5px] placeholder-secondary-600 w-full mb-2 px-2 py-2 focus:outline-none resize-none"
        ></textarea>
      </div>
      <div className="mt-2 sm:col-span-2 sm:mt-6">
        <button>Submit</button>
      </div>
      {hasSubmit && (
        <p className="w-full text-center sm:absolute sm:bottom-28">
          {feedback}
        </p>
      )}
    </form>
  );
};

export const Contact = () => {
  const { colors } = useColorContext();
  const container = useRef<HTMLDivElement>(null);

  const tl = useIntroAnim();
  const backgroundTl = useChangeBackgroundColor();
  const containerTl = useScrollAnim(container, backgroundTl);

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
          className="relative px-2 flex flex-col sm:justify-center sm:items-center"
          style={{ color: colors.light }}
        >
          <div className="w-fit">
            <div id="ContactHeader" className="mb-14">
              <h2 className="text-3xl font-bold mb-2 sm:text-4xl ">
                Let's work for you
              </h2>
              <p className="font-thin">
                Drop me a message, and let's turn your ideas into reality.{" "}
                <br />
                Excited to collaborate on your next creative project!🤝
              </p>
            </div>
            <Form />
            <div className="sm:absolute sm:left-4 sm:-bottom-1">
              <p className="">Hello </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
