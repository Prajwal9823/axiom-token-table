import "./globals.css";
import { Providers } from "@/store";

export const metadata = {
  title: "Axiom Token Discovery",
  description: "Real-time token discovery table demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
