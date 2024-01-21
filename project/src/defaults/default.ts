import { Group, LocalStorage_Me } from "../types/types";
import { GeneratedPerson } from "../types/types";

export const default_LocalStorage_Me: LocalStorage_Me = {
  name: "↑", // Some untypable character that hopefully nobody uses
  link: "",
  blockout: [],
  classes: [],
};

export const default_LocalStorage_Friends: LocalStorage_Me[] = [];

export const default_LocalStorage_Groups: Group[] = [];

export const default_GeneratedTimetable = {
  generatedPeople: [],
  countGeneration: 0,
};

export const default_Person: GeneratedPerson = {
  name: "",
  link: "",
  classes: [],
};
export const sample_LocalStorage_Me: LocalStorage_Me = {
  name: "↑", // Some untypable character that hopefully nobody uses
  link: "https://nusmods.com/timetable/sem-2/share?CS2105=LEC:1,TUT:01&CS2106=LAB:07,TUT:14,LEC:2&CS3217=TUT:1,LEC:1&CS3223=TUT:14,LEC:1&ST2334=LEC:2,TUT:6",
  blockout: [{ startTime: "0600", endTime: "0800", day: "Thursday" }],
  classes: [],
};

export const sample_LocalStorage_Friends: LocalStorage_Me[] = [
  {
    name: "Daniel (Computer Science)",
    link: "https://nusmods.com/timetable/sem-2/share?BSP1703=TUT:D07,LEC:D2&CS2030S=LAB:12A,REC:02,LEC:1&CS2101=&CS2103T=LEC:G09&CS2109S=TUT:21,LEC:1&CS3230=TUT:02,LEC:1&FIN3701B=SEC:B2",
    blockout: [],
    classes: [],
  },
  {
    name: "Darrell (Computer Science)",
    link: "https://nusmods.com/timetable/sem-2/share?CS2105=LEC:1,TUT:12&CS2106=LAB:11,TUT:13,LEC:2&CS3233=LEC:1&CS4231=LEC:1,TUT:1&IS1128=LEC:1&IS2218=LEC:1&IS2238=LEC:1",
    blockout: [{ startTime: "0600", endTime: "2300", day: "Thursday" }],
    classes: [],
  },
  {
    name: "Jerome (Business)",
    link: "https://nusmods.com/timetable/sem-2/share?FIN2704=TUT:G03,LEC:A2&GEN2050X=TUT:07&GESS1025=TUT:D23&MNO2705A=SEC:A2&ST2334=TUT:23,LEC:2",
    blockout: [],
    classes: [],
  },
  {
    name: "Lee Shin (Business)",
    link: "https://nusmods.com/timetable/sem-2/share?DBA3701=SEC:A1&DBA3803=SEC:A2&GEN2061X=TUT:11&IT3010=LAB:05,LEC:1&LAK1201=LEC:10",
    blockout: [],
    classes: [],
  },
];

export const sample_LocalStorage_Groups: Group[] = [
  {
    id: "0",
    moduleCode: "GEA1000",
    lessonType: "Tutorial",
    persons: ["Daniel (Computer Science)", "Darrell (Computer Science)", "me"],
  },
  {
    id: "1",
    moduleCode: "GESS1025",
    lessonType: "Tutorial",
    persons: ["Jerome (Business)", "Lee Shin (Business)"]
  }
];
