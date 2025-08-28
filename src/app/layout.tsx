import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Metadata } from "next";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: {
    default: "Evidence Instituto Clínico | Saúde, Reabilitação e Performance",
    template: "%s | Evidence Instituto Clínico",
  },
  description:
    "Evidence Instituto Clínico em Uberlândia – Saúde, Reabilitação & Performance com equipe multidisciplinar: médicos, fisioterapeutas, nutricionistas, pilates clínico, biomédica esteta e profissionais da educação física. Localizado na Av. Araguari, 1900 – Osvaldo Rezende.",

  keywords: [
    "evidence instituto clínico",
    "fisioterapia uberlândia",
    "pilates clínico",
    "nutrição esportiva",
    "biomedicina estética",
    "reabilitação física",
    "saúde e performance",
  ],
  authors: [{ name: "Evidence Instituto Clínico" }],
  creator: "Evidence Instituto Clínico",

  openGraph: {
    title: "Evidence Instituto Clínico | Saúde, Reabilitação e Performance",
    description:
      "Saúde, Reabilitação & Performance em Uberlândia. Equipe de médicos, fisioterapeutas, nutricionistas, pilates clínico, biomédica esteta e educadores físicos.",
    url: "https://evidenceinstitutoclinico.com.br",
    siteName: "Evidence Instituto Clínico",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  alternates: {
    canonical: "https://evidenceinstitutoclinico.com.br",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900 text-gray-200 flex flex-col w-full min-h-screen transition-colors duration-300">
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
