import { frontEndAuthAPI } from "./api";

export const Auth = async () => {
    try {
        const data = localStorage.getItem("userToken");

        const jwt = JSON.parse(data);
        const obj = {
            data1: jwt,
        };
        const result = await frontEndAuthAPI(obj);

        return (result)
    }
    catch (e) {
        return (e.response.data);
    }

}