import type { ProjectConfig } from "../../config/types";
import { fetchJson } from "../serverFetch";

export const fetchProjectConfig = async (projectID: string) => {
  return fetchJson<ProjectConfig>(`/project/${projectID}`)
};
