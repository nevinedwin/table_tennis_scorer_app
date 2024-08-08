import { useMutation } from "react-query"
import { googleResp } from "../../services/userService";


export const useSendGoogleResponse = () => {
    return useMutation(googleResp)
};