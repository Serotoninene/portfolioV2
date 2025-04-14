const LABELS = ["Client", "Project", "Website"];

interface HeaderDuoProps {
  idx: number;
  content: string;
  url?: string;
}

export const HeaderDuo = ({ idx, content, url }: HeaderDuoProps) => {
  const Component = url ? "a" : "div";

  return (
    <Component className="col-span-2" href={url} target="_blank">
      <h4 className="font-semibold md:text-xl">{LABELS[idx]}</h4>
      <p className="italic md:text-xl">{content}</p>
    </Component>
  );
};
