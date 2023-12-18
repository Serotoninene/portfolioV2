import { LenisProvider } from "../../contexts/LenisContext";
import { Navbar } from "../molecules";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <main className="text-dark bg-secondary-200">
      <LenisProvider>
        <Navbar />
        {children}
      </LenisProvider>
    </main>
  );
};
