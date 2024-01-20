import { Program } from "planby";
import { Class } from "../types/types";

export function convertClassToProgram(classObj: Class): Program {
  const { id, since, till, title, channelUuid, description, locked, image } =
    classObj;
  // Assuming you have a function to parse the date strings to Date objects
  const sinceDate = parseDateString(since);
  const tillDate = parseDateString(till);

  // Create a Program object
  const program: Program = {
    id,
    since: sinceDate,
    till: tillDate,
    title,
    channelUuid,
    description,
    locked,
    image,
  };

  return program;
}

function parseDateString(dateString: string): string {
  // Add your date parsing logic here
  return `2024-01-20T${dateString.substring(0, 2)}:${dateString.substring(
    2,
    4
  )}:00`;
}

export function convertProgramToClass(program: Program): Class {
    const { id, since, till, title, channelUuid, description, locked, image } = program;
  
    // Assuming you have a function to format Date objects to string
    const sinceDate = new Date(since);
    const tillDate = new Date(till);
  
    // Helper function to ensure two digits with leading zero
    const formatTime = (value: number) => value.toString().padStart(2, '0');
  
    // Create a Class object
    const classObj: Class = {
      id,
      since: `${formatTime(sinceDate.getHours())}${formatTime(sinceDate.getMinutes())}`,
      till: `${formatTime(tillDate.getHours())}${formatTime(tillDate.getMinutes())}`,
      title,
      channelUuid,
      description,
      locked,
      image,
      lessonType: "",
      classNumber: ""
    };
    
    return classObj;
  }