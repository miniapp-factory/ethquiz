import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const appUrl = process.env.NEXT_PUBLIC_URL ?? "";
  const imageUrl = `${appUrl}/icon.png`;

  const config = {
    version: "next",
    imageUrl,
    ogTitle: title,
    ogDescription: description,
    ogImageUrl: imageUrl,
    button: {
      title: "Launch Mini App",
      action: {
        type: "launch_miniapp",
        name: title,
        url: appUrl,
        splashImageUrl: `${appUrl}/icon.png`,
        iconUrl: `${appUrl}/icon.png`,
        splashBackgroundColor: "#000000",
        description,
        primaryCategory: "utility",
        tags: [],
      },
    },
  };

  return new Response(JSON.stringify(config), {
    headers: { "Content-Type": "application/json" },
  });
}
