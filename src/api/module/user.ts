import { service } from "@/api";
export const login = async () =>
  service.get<string[]>({
    url: "/repos/javascript-tutorial/en.javascript.info/commits",
  });
