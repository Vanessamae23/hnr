import json from "../data/data.json";
import { ModuleDatas } from "../types/types";


export const getLessonTypes = (moduleCode: string): string[] => {
  const modulesData: ModuleDatas = json;
  return Object.keys(modulesData[moduleCode]);
}