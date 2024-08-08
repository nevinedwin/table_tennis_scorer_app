import { useQuery } from "react-query"
import { fetchUser } from "../../services/userService"


export const useFetchUser = (userId: string) => {
    return useQuery(['user-fetch', userId], fetchUser);
};