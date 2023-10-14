import { fileUploadRequest } from "@/api";
import qs from "qs";
import type { AxiosRequestConfig } from "axios";

export const fileUpload = async (
  data,
  onUploadProgress?: AxiosRequestConfig["onUploadProgress"],
  contentType = "multipart/form-data"
) =>
  fileUploadRequest.post({
    headers: { "Content-Type": contentType },
    data:
      contentType === "application/x-www-form-urlencoded"
        ? qs.stringify(data)
        : data,
    onUploadProgress,
  });
