import { LenisProvider } from "../../contexts/LenisContext";
import { Navbar, ScrollIndicator } from "../molecules";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <main className="text-dark bg-secondary-200">
      <LenisProvider>
        <Navbar />
        {children}
        <ScrollIndicator />
      </LenisProvider>
    </main>
  );
};
