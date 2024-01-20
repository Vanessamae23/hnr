import { Program } from "planby";
import json from "../data/data.json";
import { convertClassToProgram, convertProgramToClass } from "./transform";
import {
  ClassData,
  Class,
  ModuleDatas,
  Modules,
  LocalStorage_Friends,
  LocalStorage_Me,
  LocalStorage_Groups,
} from "../types/types";
import {
  LOCALSTORAGE_KEY_FRIENDS,
  LOCALSTORAGE_KEY_ME,
  LOCALSTORAGE_KEY_GROUPS,
} from "../constants/constants";

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
    (classData) => classData.classNo == classNo
  );
};

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
          channelUuid: dayToUuid[classData.day],
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
  friends: LocalStorage_Friends
): Record<string, Record<string, { classNo: string; isLock: boolean }>> {
  const mapping = {};

  friends.forEach((person) => {
    const classesMapping = person.classes.reduce((acc, cls) => {
      acc[cls.title] = { classNo: cls.classNumber, isLock: cls.locked };
      return acc;
    }, {});

    mapping[person.name] = classesMapping;
  });

  return mapping;
}

function collectClassesWithFriends(
  me: LocalStorage_Me,
  friends: LocalStorage_Friends,
  groups: LocalStorage_Groups
): Array<{ classTitle: string; lessonType: string; friendsNames: string[] }> {
  const allPersons = [me, ...friends];
  const groupInfo = groups.map((group) => {
    const { moduleCode, lessonType, persons } = group;
    const friendsNames = persons
      .map(
        (personUuid) =>
          allPersons.find((person) => personUuid === person.link)?.name
      )
      .filter(Boolean); // Filter out any undefined entries in case a person is not found

    const classTitle = allPersons
      .flatMap((person) => person.classes)
      .find((cls) => cls.channelUuid === group.id)?.title;

    return {
      classTitle,
      lessonType,
      friendsNames,
    };
  });

  return groupInfo.filter((info) => info.classTitle !== undefined) as {
    classTitle: string;
    lessonType: string;
    friendsNames: string[];
  }[];
}

export const localStorageToModels = (meLoc, friendsLoc, classes) => {
  const nameTitleMapping = convertToNameTitleMapping(friendsLoc);
  const classesWithFriends = collectClassesWithFriends(
    meLoc,
    friendsLoc,
    classes
  );

  console.log(nameTitleMapping);
  console.log(classesWithFriends);
};

export const getAllModuleCodes = (): string[] => {
  const modulesData: ModuleDatas = json;
  return Object.keys(modulesData);
}