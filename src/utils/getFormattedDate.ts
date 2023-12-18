type Options = {
  weekday: "long" | "short" | "narrow" | undefined;
  year: "numeric" | "2-digit" | undefined;
  month: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
  day: "numeric" | "2-digit" | undefined;
};

export const getFormattedDate = (
  options: Options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => {
  const date = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
};
