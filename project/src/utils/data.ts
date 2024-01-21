import { Program } from "planby";
import json from "../data/data.json";
import moduleListJson from "../data/moduleList.json";

// import { convertClassToProgram, convertProgramToClass } from "./transform";
import { convertClassToProgram, convertProgramToClass } from "./transform";
import {
  ClassData,
  Class,
  ModuleDatas,
  Modules,
  LocalStorage_Friends,
  LocalStorage_Me,
  LocalStorage_Groups,
  ModuleInputs,
  Grouping,
  Blockouts,
  GeneratedTimetable,
  TimetableInputs,
  LessonInputs,
  UrlOuput,
} from "../types/types";
import { linkToClasses } from "./utils";
import { findValidTimetables, getUrlOutputs } from "../logic/logic";
import { parseLink } from "./links";

const dayToUuid = {
  Monday: "0",
  Tuesday: "1",
  Wednesday: "2",
  Thursday: "3",
  Friday: "4",
  Saturday: "5",
  Sunday: "6",
};

export const getLessonTypes = (moduleCode: string): string[] => {
  const modulesData: ModuleDatas = json;
  return Object.keys(modulesData[moduleCode]);
};

export const getAllClasses = (
  moduleCode: string,
  lessonType: string
): ClassData[] => {
  const modulesData: ModuleDatas = json;
  return modulesData[moduleCode][lessonType];
};

export const getAllClassNos = (
  moduleCode: string,
  lessonType: string
): string[] => {
  const modulesData: ModuleDatas = json;
  return [
    ...new Set(
      modulesData[moduleCode][lessonType].map((classData) => classData.classNo)
    ),
  ];
};

export const getClasses = (
  moduleCode: string,
  lessonType: string,
  classNo: string
): ClassData[] => {
  const modulesData: ModuleDatas = json;
  return modulesData[moduleCode][lessonType].filter(
    (classData) => classData.classNo === classNo
  );
};

export const getTitle = (
  moduleCode: string
): string => {
  const moduleList = moduleListJson;
  for (const module of moduleList) {
    if (module.moduleCode === moduleCode) {
      return module.title;
    }
  }
  return "";
}

export const modulestoClasses = (modules: Modules): Class[] => {
  const classes: Class[] = [];
  var ix = 0;
  for (const [moduleCode, lessons] of Object.entries(modules)) {
    for (const [lessonType, classNo] of Object.entries(lessons)) {
      const classDatas = getClasses(moduleCode, lessonType, classNo);
      for (const classData of classDatas) {
        classes.push({
          id: ix.toString(),
          lessonType: lessonType,
          classNumber: classNo,
          image: "", // Blank, Required for Vanessa's use
          since: classData.startTime,
          till: classData.endTime,
          title: moduleCode,
          channelUuid: dayToUuid[classData.day as keyof typeof dayToUuid],
          locked: true,
          description: "", // TODO: Populate with module name once re-filtered data
        });
      }
      ix++;
    }
  }
  return classes;
};

export const classesToPrograms = (classes: Class[]): Program[] => {
  if (classes == undefined || classes == null || classes.length <= 0) {
    return [];
  }
  const programs: Program[] = classes.map((cl: Class) =>
    convertClassToProgram(cl)
  );
  return programs; // Add this return statement
};

export const programsToClasses = (programs: Program[]): Class[] => {
  const classes: Class[] = programs.map((pg: Program) =>
    convertProgramToClass(pg)
  );
  return classes;
};

function convertToNameTitleMapping(
  friends: LocalStorage_Friends,
  meLoc: LocalStorage_Me
): TimetableInputs {
  const mapping: Record<string, Record<string, LessonInputs>> = {};

  friends.forEach((person) => {
    const classesMapping = person.classes.reduce((acc, cls) => {
      if (!acc[cls.title]) {
        acc[cls.title] = {};
      }
      acc[cls.title][cls.lessonType] = {
        classNo: cls.classNumber,
        isLocked: cls.locked,
      };
      return acc;
    }, {});

    mapping[person.name] = classesMapping;
  });

  mapping["me"] = meLoc.classes.reduce((acc, cls) => {
    if (!acc[cls.title]) {
      acc[cls.title] = {};
    }
    acc[cls.title][cls.lessonType] = {
      classNo: cls.classNumber,
      isLocked: cls.locked,
    };
    return acc;
  }, {});
  return mapping;
}

function collectClassesWithFriends(groups: LocalStorage_Groups): Grouping[] {
  return groups.map((item) => ({
    moduleCode: item.moduleCode,
    lessonType: item.lessonType,
    persons: [...item.persons, "me"], // Add "me" to the existing persons array
  }));
}

function collectAllBlockouts(
  meLoc: LocalStorage_Me,
  friendsLoc: LocalStorage_Friends
): Blockouts {
  const blockouts = {};

  friendsLoc.forEach((person) => {
    blockouts[person.name] = person.blockout.map((blockout) => ({
      ...blockout,
      startTime: new Date(blockout.startTime)
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(/\s|:/g, ""),
      endTime: new Date(blockout.endTime)
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(/\s|:/g, ""),
    }));
  });

  blockouts["me"] = meLoc.blockout.map((blockout) => ({
    ...blockout,
    startTime: new Date(blockout.startTime)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\s|:/g, ""),
    endTime: new Date(blockout.endTime)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\s|:/g, ""),
  }));

  console.log(blockouts);
  return blockouts;
}

function convertUrlOutputToArray(
  urlOutputs: UrlOuput[]
): { name: string; link: string }[] {
  return urlOutputs.map(({ person, url }) => ({ name: person, link: url }));
}

function convertArrayToObjectWithClasses(
  array: { name: string; link: string }[],
  linkToClasses: (link: string) => Class[]
): { name: string; link: string; classes: Class[] }[] {
  return array.map(({ name, link }) => ({
    name,
    link,
    classes: linkToClasses(link),
  }));
}

export const localStorageToModels = (
  meLoc: LocalStorage_Me,
  friendsLoc: LocalStorage_Friends,
  classes: LocalStorage_Groups,
  generatedTimetable: GeneratedTimetable,
  setGeneratedTimetable: (GeneratedTimetable) => void
) => {
  const nameTitleMapping = convertToNameTitleMapping(friendsLoc, meLoc);
  const classesWithFriends = collectClassesWithFriends(classes);
  const combinedBlockouts = collectAllBlockouts(meLoc, friendsLoc);
  const currentGeneation = generatedTimetable.countGeneration;

  const timetableOutputs = findValidTimetables(
    nameTitleMapping,
    classesWithFriends,
    combinedBlockouts
  );
  console.log(timetableOutputs)

  const result = convertArrayToObjectWithClasses(
    convertUrlOutputToArray(getUrlOutputs(timetableOutputs)),
    linkToClasses
  );

  // Get the generated here
  // generatedTimetable = // can put the data here (me/a user will be the first person)
  setGeneratedTimetable({
    generatedPeople: result,
    countGeneration: currentGeneation + 1,
  });

  // Navigate to the generation page
};

export const getAllModuleCodes = (): string[] => {
  const modulesData: ModuleDatas = json;
  return Object.keys(modulesData);
};
