import { Navbar1 } from "../components/Navbar";
import { ThemeProvider } from "../components/ThemeProvider";

export default function AppLayout({ children }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar1 />
        <main>{children}</main>
      </ThemeProvider>
    </>
  );
}
