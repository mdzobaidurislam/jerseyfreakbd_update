import "@/app/ui/global.css";
import Footer from "@/app/ui/Footer/Footer";
import Header from "@/app/ui/Header/Header";
import Providers from "@/lib/Providers";
import { API_BASE_URL, BASE_URL } from "./config/api";
import { get_setting } from "@/lib/utils";
import Image from "next/image";
import GoogleTagManager from "./ui/analytics/GoogleTagManager";
// Fetch business settings
async function getDetails() {
  try {
    const response = await fetch(`${API_BASE_URL}/business-settings`, {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      console.error("Failed to fetch:", response.status, await response.text());
      return [];
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

// Fetch translations
async function getTranslate() {
  try {
    const response = await fetch(`${API_BASE_URL}/get_translation`);
    if (!response.ok) {
      return {};
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data.data;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

// Generate metadata for SEO
export async function generateMetadata() {
  const result = await getDetails();

  const meta_title = get_setting(result, "meta_title")?.value || "Jersey Freak";
  const meta_description =
    get_setting(result, "meta_description")?.value || "Jersey Freak";
  const meta_image = get_setting(result, "meta_image")?.value || "Jersey Freak";
  const meta_keywords =
    get_setting(result, "meta_keywords")?.value || "Jersey Freak";
  const site_name = get_setting(result, "site_name")?.value || "Jersey Freak";
  const canonical_url = get_setting(result, "canonical_url")?.value || BASE_URL;

  return {
    title: meta_title,
    description: meta_description,
    keywords: meta_keywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonical_url,
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
    openGraph: {
      title: meta_title,
      description: meta_description,
      url: BASE_URL,
      siteName: site_name,
      images: [
        {
          url: `${BASE_URL}/public/${meta_image}`,
          width: 1200,
          height: 630,
          alt: `${meta_title} image`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
      images: [`${BASE_URL}/public/${meta_image}`],
      creator: "@yourtwitterhandle",
      site: "@yourwebsite",
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
  };
}

// JSON-LD Schema Generator
function generateSchema(setting) {
  const site_name = get_setting(setting, "site_name")?.value || "Jersey Freak";
  const meta_description =
    get_setting(setting, "meta_description")?.value || "Jersey Freak";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site_name,
    description: meta_description,
    url: BASE_URL,
    logo: `${BASE_URL}/public/${
      get_setting(setting, "site_logo")?.value || ""
    }`,
    sameAs: [
      "https://facebook.com/yourpage",
      "https://twitter.com/yourpage",
      "https://linkedin.com/company/yourpage",
      "https://instagram.com/yourpage",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: get_setting(setting, "phone")?.value || "",
      contactType: "customer service",
      email: get_setting(setting, "email")?.value || "",
      areaServed: "Worldwide",
    },
  };
}

export default async function RootLayout({ children }) {
  const setting = await getDetails();
  const translate = await getTranslate();
  const site_icon = get_setting(setting, "site_icon")?.value || "";
  const whatsapp_name = get_setting(setting, "whatsapp_name")?.value || "";
  const schema = generateSchema(setting);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${BASE_URL}/public/${site_icon}`} />
        <link rel="apple-touch-icon" href={`${BASE_URL}/public/${site_icon}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="p:domain_verify"
          content="e5058dafd37d2223b21bc4578bfb1d58"
        />
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body id="filter_product">
        {/* Google Analytics */}

        <GoogleTagManager id={"G-S4ED028867"} />

        <Providers setting={setting} translate={translate}>
          <Header setting={setting} />
          {children}
          <Footer setting={setting} translate={translate} />
        </Providers>

        <div className="social_widget fixed right-[20px] bottom-[50px] z-10">
          <div className="icon_wrap icon_wrap_animation">
            <div className="icon_link transition-all transform hover:scale-110">
              <a
                href={`https://wa.me/${whatsapp_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="icon_item WhatsApp"
              >
                <Image
                  src={`/social/wp.png`}
                  width={60}
                  height={60}
                  alt={"WhatsApp Contact"}
                  className="object-contain transition-transform duration-300 ease-in-out transform mx-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
