import json from "../data/data.json";
import { ClassData, ModuleDatas } from "../types/types";


export const getLessonTypes = (moduleCode: string): string[] => {
  const modulesData: ModuleDatas = json;
  return Object.keys(modulesData[moduleCode]);
}

export const getAllClasses = (moduleCode: string, lessonType: string): ClassData[] => {
  const modulesData: ModuleDatas = json;
  return modulesData[moduleCode][lessonType];
}

export const getAllClassNos = (moduleCode: string, lessonType: string): string[] => {
  const modulesData: ModuleDatas = json;
  return [...new Set(modulesData[moduleCode][lessonType].map(classData => classData.classNo))];
}
export const getClasses = (moduleCode: string, lessonType: string, classNo: string): ClassData[] => {
  const modulesData: ModuleDatas = json;
  return modulesData[moduleCode][lessonType].filter(classData => classData.classNo == classNo);
}