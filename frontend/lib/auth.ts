import { UserDTO } from "@/types";
import fetcher from "./fetcher";

export const getUser = async () => {
    try {
        const user = await fetcher("/session/");
        return user as UserDTO;
    } catch (error) {
        console.log(error);
        return null;
    }
}