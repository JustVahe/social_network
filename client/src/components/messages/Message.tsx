import { IMessage } from "../../types";
import { url } from "../../utils/enviromentConfig";

export default function Message({ align, message }: { align: string, message: IMessage }) {

	return (
		message &&
		<div className={"w-full flex gap-[10px] pb-[10px] " + (align === "right" ? "flex-row-reverse" : "")} >
			<img src={`${url}/public` + message.from?.avatar} alt="avatar" className="w-[20px] h-[20px] object-cover object-top rounded-full" />
			<div className={"text-zinc-700 text-sm-14 p-[5px] max-w-[250px] md:max-w-[150px] rounded-sm lg:max-w-[250px] xl:max-w-[400px] " + (align === "left" ? "bg-lime-200" : "bg-sky-100")}>{message.message}</div>
		</div>
	)
}
