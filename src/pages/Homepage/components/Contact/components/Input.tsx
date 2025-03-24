import { useColorContext } from "../../../../../hooks/useColorContext";

// Types
interface Props {
  field: string;
  type?: string;
  required?: boolean;
}

export const Input = ({ type = "text", field, required }: Props) => {
  const { colors } = useColorContext();
  return (
    <div className="relative overflow-hidden">
      <input
        required={required}
        name={field.toLowerCase()}
        type={type}
        placeholder={field}
        className="bg-transparent w-full mb-2 px-2 py-2 appearance-none rounded-smd focus:outline-none"
        style={{
          color: colors.mainColor,
          borderBottom: `0.5px solid ${colors.mainColor}`,
        }}
      ></input>
    </div>
  );
};
