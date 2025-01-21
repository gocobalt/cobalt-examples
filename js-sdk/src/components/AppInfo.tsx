import { Application } from "@cobaltio/cobalt-js"
import Image from "next/image"

const AppInfo = ({ app }: { app: Application }) => {
    return <div className="flex flex-col sm:flex-row bg-white p-2 items-center sm:items-start">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
            <Image
                src={app.icon}
                width={100}
                height={100}
                alt={`${app.name} logo`}
                className="rounded-md"
            />
        </div>

        <div className="flex flex-col justify-between">
            <h2 className="text-lg font-semibold">{app.name}</h2>
            <p className="text-sm text-gray-600 mt-2">{app.description}</p>

        </div>
    </div>
}
export default AppInfo