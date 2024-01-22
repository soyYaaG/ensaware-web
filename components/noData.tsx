import Image from "next/image";
import noDataSvg from "../public/svg/no-data.svg";

export const NoData = () => {
	return (
		<div className="flex justify-center">
			<Image src={noDataSvg} alt="Sin datos" priority={true} />
		</div>
	);
};
