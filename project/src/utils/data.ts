import { Program } from "planby";
import json from "../data/data.json";
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
  TimetableInputs,
  LessonInputs,
  ClassInput,
} from "../types/types";
import { findValidTimetables } from "../logic/logic";

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
  if (classes.length <= 0) {
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
): ModuleInputs {
  const mapping: Record<
    string,
    Record<string, { classNo: string; isLocked: boolean }>
  > = {};

  friends.forEach((person) => {
    const classesMapping = person.classes.reduce(
      (acc: Record<string, { classNo: string; isLocked: boolean }>, cls) => {
        acc[cls.title] = { classNo: cls.classNumber, isLocked: cls.locked } as {
          classNo: string;
          isLocked: boolean;
        };
        return acc;
      },
      {}
    );

    mapping[person.name] = classesMapping;
  });

  mapping["me"] = meLoc.classes.reduce((acc, cls) => {
    acc[cls.title] = { classNo: cls.classNumber, isLocked: cls.locked };
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
    blockouts[person.name] = person.blockout;
  });

  blockouts["me"] = meLoc.blockout;
  return blockouts;
}

export const convertToTimetableInputs = (
  nameTitleMapping: ModuleInputs
): TimetableInputs => {
  const timetableInputs: TimetableInputs = {};

  Object.keys(nameTitleMapping).forEach((person) => {
    const moduleInputs: ModuleInputs = {};

    Object.keys(nameTitleMapping[person]).forEach((moduleCode) => {
      const lessonInputs: LessonInputs = {};

      Object.keys(nameTitleMapping[person][moduleCode]).forEach(
        (lessonType) => {
          const classInput: ClassInput = {
            classNo: nameTitleMapping[person][moduleCode][lessonType],
            isLocked: false,
          };

          lessonInputs[lessonType] = classInput;
        }
      );

      moduleInputs[moduleCode] = lessonInputs;
    });

    timetableInputs[person] = moduleInputs;
  });

  return timetableInputs;
};

export const localStorageToModels = (
  meLoc: LocalStorage_Me,
  friendsLoc: LocalStorage_Friends,
  classes: LocalStorage_Groups
) => {
  const nameTitleMapping = convertToNameTitleMapping(friendsLoc, meLoc);
  const classesWithFriends = collectClassesWithFriends(classes);
  const combinedBlockouts = collectAllBlockouts(meLoc, friendsLoc);
  console.log(convertToTimetableInputs(nameTitleMapping));
  console.log(classesWithFriends);
  console.log(combinedBlockouts);
  const timetableOutputs = findValidTimetables(
    convertToTimetableInputs(nameTitleMapping),
    classesWithFriends,
    combinedBlockouts
  );
  console.log("End");
  console.log(timetableOutputs);
};

export const getAllModuleCodes = (): string[] => {
  const modulesData: ModuleDatas = json;
  return Object.keys(modulesData);
};
