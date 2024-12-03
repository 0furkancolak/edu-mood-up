import { User } from "@/types";
import fetcher from "./fetcher";

export const getUser = async () => {
    try {
        const user = await fetcher("/session/");
        return user as User;
    } catch (error) {
        console.log(error);
        return null;
    }
}