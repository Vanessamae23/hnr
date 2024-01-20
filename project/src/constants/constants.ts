// Lesson Types ---------------------------------
export const lessonTypeShorthandMap: { [lessonType: string]: string } = {
  "Design Lecture": "DLEC",
  "Laboratory": "LAB",
  "Lecture": "LEC",
  "Packaged Lecture": "PLEC",
  "Packaged Tutorial": "PTUT",
  "Recitation": "REC",
  "Sectional Teaching": "SEC",
  "Seminar-Style Module Class": "SEM",
  "Tutorial": "TUT",
  "Tutorial Type 2": "TUT2",
  "Workshop": "WS"
}

export const shorthandLessonTypeMap: { [lessonTypeShorthand: string]: string } = {
  "DLEC": "Design Lecture",
  "LAB": "Laboratory",
  "LEC": "Lecture",
  "PLEC": "Packaged Lecture",
  "PTUT": "Packaged Tutorial",
  "REC": "Recitation",
  "SEC": "Sectional Teaching",
  "SEM": "Seminar-Style Module Class",
  "TUT": "Tutorial",
  "TUT2": "Tutorial Type 2",
  "WS": "Workshop"
}

// URL config
export const NUS_MODS_URL = "https://nusmods.com/timetable/sem-2/share?";