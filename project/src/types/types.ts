
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
  weeks: number[];
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

// Output / Candidates
export type Modules = {
  [moduleCode: string]: Lessons;
}

export type Lessons = {
  [lessonType: string]: string;
}