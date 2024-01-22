import { useRef, RefObject, useState, FormEvent } from "react";
import { Input } from ".";
import { Button } from "../../../../../components/atoms";

const FORM_ENDPOINT =
  "https://public.herotofu.com/v1/3de905a0-b939-11ee-ae0b-a7e011fe96d3";

export const Form = () => {
  const formRef = useRef() as RefObject<HTMLFormElement>;
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  // const [hasSubmit, setHasSubmit] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = (e.target as HTMLFormElement)
      .elements as HTMLFormControlsCollection;
    const data: { [key: string]: string } = {};

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i] as HTMLInputElement;

      if (input.name) {
        data[input.name] = input.value;
      }
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
        if (response.status !== 200) {
          throw new Error("Form response was not ok");
        }

        setSubmitted(true);
      })
      .catch(() => {
        // Submit the form manually
        setFeedback("Something went wrong. Please try again.");
      });
  };

  if (feedback) {
    return (
      <>
        <div className="text-base font-thin">{feedback}</div>
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <div className="text-base font-thin">We'll be in touch soon.</div>
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
      <Input field="Prenom" required />
      <Input field="Nom" required />
      <Input field="Mail" type="mail" required />
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
    </form>
  );
};
