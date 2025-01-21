import { useState } from "react"
import Field from "./Field"
import { handleConnect } from "@/methods/connectApp";
import { Application, Cobalt } from "@cobaltio/cobalt-js";

const AuthForm = ({app, cobalt, onConnect} : {
    app: Application,
    cobalt: Cobalt,
    onConnect: () => void
}) => {
    const [inputData, setInputData] = useState<{[key: string]: string}>({})
    const connectApp = () => {
        if (cobalt && app) {
            handleConnect(
                cobalt,
                app.slug!,
                inputData,
                onConnect
            );
        }
    };
    return <> 
        {/* The auth_input_map contains the information needed
        to authenticate the user with that app */}
        {!!app?.auth_input_map?.length && (
            app?.auth_input_map?.map(field =>
            {
                return <Field
                    key={field.name}
                    type={field.type}
                    required={Boolean(field.required)}
                    name={field.label}
                    placeholder={field.placeholder}
                    value={inputData?.[field.name] || ""}
                    onChange={value => setInputData({ ...inputData, [field.name]: value })}
                />
            }
            )
        )}
        <button
            onClick={() => connectApp()}
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
            Connect
        </button>

    </>
}
export default AuthForm