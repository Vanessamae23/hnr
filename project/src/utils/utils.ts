import { Class } from "../types/types";
import { modulestoClasses } from "./data";
import { parseLink } from "./links";

export const linkToClasses = (link: string) : Class[] => {
    return modulestoClasses(parseLink(link));
}