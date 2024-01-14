import { Loader2 } from "lucide-react";

export const Load = () => {
	return (
		<div className="bg-zinc-300 bg-opacity-50 fixed bottom-0 left-0 right-0 top-0 flex flex-col justify-center items-center h-screen z-[100]">
			<b className="text-2xl md:text-4xl mb-4">Cargando...</b>
			<Loader2 className="mr-2 h-16 w-16 animate-spin" />
		</div>
	);
};
