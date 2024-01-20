
// DATA -----------------------------------------
export type ModuleDatas = {
  [moduleCode: string]: LessonDatas;
}

export type LessonDatas = {
  [lessonType: string]: ClassData[];
}

export type ClassData = {
  classNo: string;
  startTime: string;
  endTime: string;
  weeks: number[] | { start: string; end: string };
  venue: string;
  day: string;
}

// LOGIC ----------------------------------------

// Timetable Input
export type TimetableInputs = {
  [person: string]: ModuleInputs;
}

export type ModuleInputs = {
  [moduleCode: string]: LessonInputs;
}

export type LessonInputs = {
  [lessonType: string]: ClassInput;
}

export type ClassInput = {
  classNo: string;
  isLocked: boolean;
}

// Grouping Input

export type Grouping = {
  moduleCode: string;
  lessonType: string;
  persons: string[];
}

// Unlocked Timetables
export type UnlockedTimetables = {
  [person: string]: UnlockedModules;
}

export type UnlockedModules = {
  [moduleCode: string]: string[]; // list of lesson types
}

// Candidates
export type CandidateTimetables = {
  [person: string]: CandidateModules;
}

export type CandidateModules = {
  [moduleCode: string]: CandidateLessons;
}

export type CandidateLessons = {
  [lessonType: string]: string[]; // list of candidate class numbers
}

// Output
export type Timetables = {
  [person: string]: Modules;
}

export type Modules = {
  [moduleCode: string]: Lessons;
}

export type Lessons = {
  [lessonType: string]: string;
}

// Availabilities

export type Availabilities = {
  [person: string]: Availability;
}

export type Availability = boolean[][];