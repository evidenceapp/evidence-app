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

  viewport: "width=device-width, initial-scale=1",

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              name: "Evidence Instituto Clínico",
              url: "https://evidenceinstitutoclinico.com.br",
              image: "https://evidenceinstitutoclinico.com.br/opengraph-image.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Araguari, 1900",
                addressLocality: "Uberlândia",
                addressRegion: "MG",
                postalCode: "38400-060",
                addressCountry: "BR",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+55-34-9682-0404",
                contactType: "customer service",
              },
            }),
          }}
        ></script>
      </body>
    </html>
  );
}
