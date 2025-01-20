import { VALID_FILE_EXT } from "../common/file-ext.constant";

export function updateUriForIndexHtml(uri: string): string {
  const isFile = VALID_FILE_EXT.some((ext) => uri.endsWith(ext));
  if (!isFile) {
    return uri + "/index.html";
  }
  return uri;
}
