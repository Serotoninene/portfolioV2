// Types
interface Props {
  field: string;
  type?: string;
  required?: boolean;
}

export const Input = ({ type = "text", field, required }: Props) => {
  return (
    <div className="relative overflow-hidden">
      <input
        required={required}
        name={field.toLowerCase()}
        type={type}
        placeholder={field}
        className="bg-transparent border-secondary-200 border-b-[0.5px] placeholder-secondary-600 w-full mb-2 px-2 py-2 focus:outline-none"
      ></input>
    </div>
  );
};
