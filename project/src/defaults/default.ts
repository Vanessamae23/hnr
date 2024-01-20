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
