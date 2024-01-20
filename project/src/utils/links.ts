import {
  NUS_MODS_URL,
  lessonTypeShorthandMap,
  shorthandLessonTypeMap,
} from "../constants/constants";
import { Lessons, Modules } from "../types/types";

export const parseLink = (link: string): Modules => {
  const url = new URL(link);
  const searchParams = new URLSearchParams(url.search);
  const modules: Modules = {};

  for (const searchParam of searchParams.entries()) {
    const [moduleCode, moduleDataString] = searchParam;
    const lessons: Lessons = {};

    if (moduleDataString.length === 0) {
      modules[moduleCode] = lessons;
      continue;
    }

    for (const lessonDataString of moduleDataString.split(",")) {
      const [lessonTypeShorthand, classNo] = lessonDataString.split(":");
      lessons[shorthandLessonTypeMap[lessonTypeShorthand]] = classNo;
    }
    modules[moduleCode] = lessons;
  }
  return modules;
};

export const encodeLink = (modules: Modules): string => {
  const searchParams: { [key: string]: string | "" } = {};
  for (const [moduleCode, lessons] of Object.entries(modules)) {
    if (Object.keys(lessons).length === 0) {
      searchParams[moduleCode] = "";
      continue;
    }
    const classDataStrings: string[] = [];
    for (const [lessonType, classNo] of Object.entries(lessons)) {
      classDataStrings.push(
        [lessonTypeShorthandMap[lessonType], classNo].join(":")
      );
    }
    searchParams[moduleCode] = classDataStrings.join(",");
  }

  const urlSearch = new URLSearchParams(searchParams).toString();

  return [NUS_MODS_URL, urlSearch].join("");
};
