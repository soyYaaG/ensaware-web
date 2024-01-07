import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Ensaware",
		short_name: "Ensaware",
		description: "Ensaware",
		start_url: "/",
		display: "standalone",
		background_color: "#6d29d9",
		theme_color: "#6d29d9",
		icons: [
			{
				src: "/manifest/icon-72x72.png",
				sizes: "72x72",
				type: "image/png",
			},
			{
				src: "/manifest/icon-96x96.png",
				sizes: "96x96",
				type: "image/png",
			},
			{
				src: "/manifest/icon-128x128.png",
				sizes: "128x128",
				type: "image/png",
			},
			{
				src: "/manifest/icon-144x144.png",
				sizes: "144x144",
				type: "image/png",
			},
			{
				src: "/manifest/icon-152x152.png",
				sizes: "152x152",
				type: "image/png",
			},
			{
				src: "/manifest/icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/manifest/icon-384x384.png",
				sizes: "384x384",
				type: "image/png",
			},
			{
				src: "/manifest/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}
