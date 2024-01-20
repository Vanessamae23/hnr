import Module from "module";
import { N_DAYS, N_TIME_BLOCKS } from "../constants/constants";
import { Availabilities, Availability, CandidateLessons, CandidateModules, CandidateTimetables, Grouping, Lessons, ModuleDatas, Modules, TimetableInputs, Timetables, UnlockedModules, UnlockedTimetables } from "../types/types";
import { getAllClassNos, getAllClasses, getClasses, getLessonTypes } from "../utils/data";
import { parseLink } from "../utils/links";

export const findValidTimetables = (timetableInputs: TimetableInputs, groupings: Grouping[]) => {
  // Step 1: Separate locked and unlocked classes
  const [lockedTimetables, unlockedTimetables] = processData(timetableInputs, groupings);

  // Step 2: Find each person's availabilities
  const availabilities = findAvailabilities(lockedTimetables);

  // Step 3: Find initial set of candidates classes based on individual availability
  const candidateTimetables = findCandidateTimetables(unlockedTimetables, availabilities);

  // Step 4: Filter candidate based on groupings in-place
  filterCandidateTimetables(candidateTimetables, groupings);

  // Step 5: Depth-first search on all possible candidate class combinations
  const timetables = searchCandidateTimetables(candidateTimetables, availabilities, groupings, {}, Object.keys(candidateTimetables), 0, 0, 0);
  if (timetables === null) {
    return {};
  }
  return mergeTimetables(timetables, lockedTimetables);
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
        if (!isLocked || groupings.some(grouping => moduleCode === grouping.moduleCode && lessonType === grouping.lessonType && grouping.persons.includes(person))) {
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

const findAvailabilities = (lockedTimetables: Timetables) => {
  const availabilities: Availabilities = {};
  for (const [person, lockedModules] of Object.entries(lockedTimetables)) {
    const availability: Availability = getInitialAvailability();
    for (const [moduleCode, lockedLessons] of Object.entries(lockedModules)) {
      for (const [lessonType, classNo] of Object.entries(lockedLessons)) {
        const classDatas = getClasses(moduleCode, lessonType, classNo);
        for (const classData of classDatas) {
          const { startTime, endTime, day } = classData;
          const startIndex = timeToIndex(startTime);
          const endIndex = timeToIndex(endTime);
          const dayIndex = dayToIndex(day);
          for (let i = startIndex; i < endIndex; i++) {
            availability[dayIndex][i] = false;
          }
        }
      }
    }
    availabilities[person] = availability;
  }
  return availabilities;
}

const findCandidateTimetables = (unlockedTimetables: UnlockedTimetables, availabilities: Availabilities): CandidateTimetables => {
  const candidateTimetables: CandidateTimetables = {};

  for (const [person, unlockedLessons] of Object.entries(unlockedTimetables)) {
    const availability = availabilities[person];

    const candidateModules: CandidateModules = {}
    candidateTimetables[person] = candidateModules;

    for (const [moduleCode, lessonTypes] of Object.entries(unlockedLessons)) {
      const candidateLessons: CandidateLessons = {};
      candidateModules[moduleCode] = candidateLessons;

      for (const lessonType of lessonTypes) {
        const candidateClasses: string[] = [];
        candidateLessons[lessonType] = candidateClasses;

        const classDatas = getAllClasses(moduleCode, lessonType);
        const classNos = getAllClassNos(moduleCode, lessonType);

        for (const classNo of classNos) {
          for (const classData of classDatas) {
            if (classData.classNo !== classNo) {
              continue;
            }

            const { startTime, endTime, day } = classData;
            const startIndex = timeToIndex(startTime);
            const endIndex = timeToIndex(endTime);
            const dayIndex = dayToIndex(day);
            let isCandidateClass = true;

            for (let i = startIndex; i < endIndex; i++) {
              if (!availability[dayIndex][i]) {
                isCandidateClass = false;
                break;
              }
            }
            if (isCandidateClass) {
              candidateClasses.push(classNo);
            }
          }
        }
      }
    }
  }

  return candidateTimetables;
}

/**
 * Filters the candidate timetables in place.
 */
const filterCandidateTimetables = (candidateTimetables: CandidateTimetables, groupings: Grouping[]) => {
  for (const grouping of groupings) {
    if (grouping.persons.length < 2) {
      continue;
    }
    const candidateClassesSet = new Set<string>(candidateTimetables[grouping.persons[0]][grouping.moduleCode][grouping.lessonType]);
    let hasNoCandidates = false;
    for (let i = 1; i < grouping.persons.length; i++) {
      const person = grouping.persons[i];
      const candidateClasses = candidateTimetables[person][grouping.moduleCode][grouping.lessonType];
      // handle the case where no candidates found for any person, which means there are no valid classes
      if (candidateClasses.length === 0) {
        hasNoCandidates = true;
        break;
      }
      for (const candidateClass of candidateTimetables[person][grouping.moduleCode][grouping.lessonType]) {
        if (!candidateClassesSet.has(candidateClass)) {
          candidateClassesSet.delete(candidateClass);
        }
      }
    }
    const candidateClasses = hasNoCandidates ? [] : [...candidateClassesSet];

    for (const person of grouping.persons) {
      candidateTimetables[person][grouping.moduleCode][grouping.lessonType] = candidateClasses;
    }
  }
}

// TODO: optimise by using only one instance of modules array and lesson types array
// TODO: prune when reaching a grouping-related class
const searchCandidateTimetables = (candidateTimetables: CandidateTimetables, availabilities: Availabilities, groupings: Grouping[], timetables: Timetables, persons: string[], personIndex: number, moduleCodeIndex: number, lessonTypeIndex: number): Timetables | null => {
  if (personIndex >= persons.length) {
    return validateTimetables(timetables, availabilities, groupings) ? timetables : null;
  }
  const person = persons[personIndex];
  const candidateTimetable = candidateTimetables[person]
  const moduleCodes = Object.keys(candidateTimetable).sort((a, b) => a.localeCompare(b));
  if (!Object.keys(timetables).includes(person)) {
    timetables[person] = {};
  }
  const modules: Modules = timetables[person];
  if (moduleCodeIndex >= moduleCodes.length) {
    return searchCandidateTimetables(candidateTimetables, availabilities, groupings, timetables, persons, personIndex + 1, 0, 0);
  }
  const moduleCode = moduleCodes[moduleCodeIndex];
  const candidateLessons = candidateTimetable[moduleCode];
  if (!Object.keys(modules).includes(moduleCode)) {
    modules[moduleCode] = {};
  }
  const lessons = modules[moduleCode];
  const lessonTypes = Object.keys(candidateLessons).sort((a, b) => a.localeCompare(b));
  if (lessonTypeIndex >= lessonTypes.length) {
    return searchCandidateTimetables(candidateTimetables, availabilities, groupings, timetables, persons, personIndex, moduleCodeIndex + 1, 0);
  }
  for (const [lessonType, candidateClasses] of Object.entries(candidateLessons)) {
    for (const candidateClass of candidateClasses) {
      lessons[lessonType] = candidateClass;
      const result = searchCandidateTimetables(candidateTimetables, availabilities, groupings, timetables, persons, personIndex, moduleCodeIndex, lessonTypeIndex + 1);
      if (result !== null) {
        return result;
      }
      delete lessons[lessonType];
    }
  }
  return timetables;
}

const validateTimetables = (timetables: Timetables, availabilities: Availabilities, groupings: Grouping[]): boolean => {
  return Object.entries(timetables).every(([person, modules]) => validateTimetable(modules, availabilities[person])) && groupings.every(grouping => validateGrouping(timetables, grouping));
}

const validateTimetable = (modules: Modules, availability: Availability) => {
  const availabilityCopy = availability.map(row => [...row]);
  for (const [moduleCode, lessons] of Object.entries(modules)) {
    for (const [lessonType, classNo] of Object.entries(lessons)) {
      const classDatas = getClasses(moduleCode, lessonType, classNo);
      for (const classData of classDatas) {
        const { startTime, endTime, day } = classData;
        const startIndex = timeToIndex(startTime);
        const endIndex = timeToIndex(endTime);
        const dayIndex = dayToIndex(day);
        for (let i = startIndex; i < endIndex; i++) {
          if (!availabilityCopy[dayIndex][i]) {
            return false;
          }
          availabilityCopy[dayIndex][i] = false;
        }
      }
    }
  }
  return true;
}

const validateGrouping = (timetables: Timetables, grouping: Grouping) => {
  const { moduleCode, lessonType, persons } = grouping;
  const classNos: string[] = persons.map(person => timetables[person][moduleCode][lessonType]);
  if (classNos.length === 0) {
    return false;
  }
  return classNos.every(classNo => classNos[0] === classNo);
}

const mergeTimetables = (timetables1: Timetables, timetables2: Timetables): Timetables => {
  const mergedTimetables: Timetables = {};

  for (const timetables of [timetables1, timetables2]) {
    for (const [person, modules] of Object.entries(timetables)) {
      if (!Object.keys(mergedTimetables).includes(person)) {
        mergedTimetables[person] = {};
      }
      const mergedModules: Modules = mergedTimetables[person];
      for (const [moduleCode, lessons] of Object.entries(modules)) {
        if (!Object.keys(mergedModules).includes(moduleCode)) {
          mergedModules[moduleCode] = {};
        }
        const mergedLessons: Lessons = mergedModules[moduleCode];
        for (const [lessonType, classNo] of Object.entries(lessons)) {
          mergedLessons[lessonType] = classNo;
        }
      }
    }
  }

  return mergedTimetables;
}

// Utils
const timeToIndex = (time: string): number => {
  const hours = parseInt(time.substring(0, 2));
  const minutes = parseInt(time.substring(2, 4));

  return (hours - 6) * 2 + (minutes / 30);
}

const dayToIndex = (day: string): number => {
  return {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5
  }[day]!;
}

const getInitialAvailability = (): Availability => {
  const availability: Availability = [];
  for (let i = 0; i < N_DAYS; i++) {
    availability.push([]);
    for (let j = 0; j < N_TIME_BLOCKS; j++) {
      availability[i].push(true);
    }
  }
  return availability;
}
