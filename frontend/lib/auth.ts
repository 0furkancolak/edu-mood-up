import { UserDTO } from "@/types";
import fetcher from "./fetcher";
import { cookies } from "next/headers";

const CACHE_TTL = 5 * 60 * 1000;

let cachedUser: { data: UserDTO | null; timestamp: number } | null = null;

const clearUserCache = () => {
    cachedUser = null;
};

const getCachedUser = () => {
    if (!cachedUser) return null;

    const now = Date.now();
    if (now - cachedUser.timestamp > CACHE_TTL) {
        clearUserCache();
        return null;
    }

    return cachedUser.data;
};

const setCachedUser = (user: UserDTO) => {
    cachedUser = {
        data: user,
        timestamp: Date.now()
    };
};

export const getUser = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        clearUserCache();
        return null;
    }

    const cachedUserData = getCachedUser();
    if (cachedUserData) {
        return cachedUserData;
    }

    try {
        const data = await fetcher<{ user: UserDTO }>("/session/");
        if (!data?.user) {
            throw new Error("User not found");
        }
        setCachedUser(data.user);
        return data.user;
    } catch (error) {
        console.log(error);
        clearUserCache();
        return null;
    }
};
