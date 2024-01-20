import { Program } from "planby";
import json from "../data/data.json";
import { ClassData, Class, ModuleDatas, Modules } from "../types/types";
import { convertClassToProgram, convertProgramToClass } from "./transform";

const dayToUuid = {
  "Monday": "0",
  "Tuesday": "1",
  "Wednesday": "2",
  "Thursday": "3",
  "Friday": "4",
  "Saturday": "5",
  "Sunday": "6",
}

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

export const modulestoClasses = (modules: Modules): Class[] => {
  const classes: Class[] = [];
  for (const [moduleCode, lessons] of Object.entries(modules)) {
    for (const [lessonType, classNo] of Object.entries(lessons)) {
      const classDatas = getClasses(moduleCode, lessonType, classNo);
      for (const classData of classDatas) {
        classes.push({
          id: classes.length.toString(),
          image: "", // Blank, Required for Vanessa's use
          since: classData.startTime,
          till: classData.endTime,
          title: moduleCode,
          channelUuid: dayToUuid[classData.day],
          locked: true,
          description: "", // TODO: Populate with module name once re-filtered data
        });
      }
    }
  }
  return classes;
}

export const classesToPrograms = (classes: Class[]): Program[] => {
  const programs: Program[] = classes.map((cl: Class) => convertClassToProgram(cl));
  return programs; // Add this return statement
}

export const programsToClasses = (programs: Program[]): Class[] => {
  const classes: Class[] = programs.map((pg: Program) => convertProgramToClass(pg))
  return classes
}