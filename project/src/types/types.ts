
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
export type Modules = {
  [moduleCode: string]: Lessons;
}

export type Lessons = {
  [lessonType: string]: string;
}