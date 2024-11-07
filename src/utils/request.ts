import createRequest from "./createRequest";

const request = createRequest({ baseURL: process.env.BASE_URL! });

export default request;
