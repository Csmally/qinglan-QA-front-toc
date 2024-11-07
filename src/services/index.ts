import { LoginResDataType } from "@/types/fetchResponse";
import request from "@/utils/request";

interface FetchLoginParamsType {
    account: string;
    password: string;
    from: string;
}

const fetchLogin = (
    params: FetchLoginParamsType
): Promise<ResDataType<LoginResDataType>> => {
    return request.post("login", params);
};

export { fetchLogin }