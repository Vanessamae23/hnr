import { Grouping, ModuleDatas, Modules, TimetableInputs, Timetables, UnlockedModules, UnlockedTimetables } from "../types/types";
import { getLessonTypes } from "../utils/data";
import { parseLink } from "../utils/links";

export const findValidTimetables = (timetableInputs: TimetableInputs, groupings: Grouping[]) => {
  // Step 1: Separate locked and unlocked classes
  const [lockedTimetables, unlockedTimetables] = processData(timetableInputs, groupings);
  console.log(lockedTimetables, unlockedTimetables);

  // Step 2: Find each person's availabilities

  // Step 3: Find initial set of candidates classes based on individual availability

  // Step 4: Filter candidate based on group-related availabilities

  // Step 5: Depth-first search on all possible candidate class combinations
}

const processData = (timetableInputs: TimetableInputs, groupings: Grouping[]): [Timetables, UnlockedTimetables] => {
  const lockedTimetables: Timetables = {};
  const unlockedTimetables: UnlockedTimetables = {};

  for (const [person, moduleInputs] of Object.entries(timetableInputs)) {
    const lockedModules: Modules = {};
    const unlockedModules: UnlockedModules = {};
    lockedTimetables[person] = lockedModules;
    unlockedTimetables[person] = unlockedModules;

    // Step 1. separate based on inputs
    for (const [moduleCode, lessonInputs] of Object.entries(moduleInputs)) {
      if (!Object.keys(lockedModules).includes(moduleCode)) {
        lockedModules[moduleCode] = {};
      }
      if (!Object.keys(unlockedModules).includes(moduleCode)) {
        unlockedModules[moduleCode] = [];
      }
      const lockedLessons = lockedModules[moduleCode];
      const unlockedLessons = unlockedModules[moduleCode];

      // ordinary case
      for (const [lessonType, { classNo, isLocked }] of Object.entries(lessonInputs)) {
        // grouping-related classes are unlocked by default
        if (!isLocked || groupings.some(grouping => moduleCode == grouping.moduleCode && lessonType == grouping.lessonType && grouping.persons.includes(person))) {
          unlockedLessons.push(classNo);
        } else {
          lockedLessons[lessonType] = classNo;
        }
      }
    }

    // Step 2. add in grouping-related classes
    for (const grouping of groupings) {
      if (!grouping.persons.includes(person)) {
        continue;
      }
      if (!Object.keys(lockedModules).includes(grouping.moduleCode)) {
        lockedModules[grouping.moduleCode] = {};
      }


      const lessonTypes = getLessonTypes(grouping.moduleCode);
      if (!Object.keys(unlockedModules).includes(grouping.moduleCode)) {
        unlockedModules[grouping.moduleCode] = lessonTypes;
        continue;
      }

      for (const lessonType of lessonTypes) {
        if (!unlockedModules[grouping.moduleCode].includes(lessonType) || !Object.keys(lockedModules[grouping.moduleCode]).includes(lessonType)) {
          unlockedModules[grouping.moduleCode].push(lessonType);
        }
      }
    }
  }

  return [lockedTimetables, unlockedTimetables];
}

