import { useMutation, useQuery } from "react-query"
import { fetchUser, googleResp } from "../../services/userService";


export const useSendGoogleResponse = () => {
    return useMutation(googleResp)
};

export const useFetchUser = (id?: string) => {
    return useQuery(["fetch-user", id], () => fetchUser(id));
}