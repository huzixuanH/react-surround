import { request } from "@/api";
export const login = async () =>
  request.get<string[]>({
    url: "/repos/javascript-tutorial/en.javascript.info/commits",
  });
