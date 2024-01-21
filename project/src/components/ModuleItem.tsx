import {
  ProgramItem,
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  useProgram,
} from "planby";
import React from "react";

// @ts-ignore
import iconLocked from "../assets/locked.png";
// @ts-ignore
import iconUnlocked from "../assets/unlocked.png";

export const ModuleItem = ({ program, ...rest }: ProgramItem) => {
  const { styles, formatTime, set12HoursTimeFormat, isLive, isMinWidth } =
    useProgram({
      program,
      ...rest,
    });

  const { data } = program;
  const { locked, title, since, till, description } = data;

  const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase();
  const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase();

  const backgroundColor = locked
    ? "#fbcfe8"
    : "#bae6fd";

  return (
    <ProgramBox width={styles.width} style={styles.position}>
      <ProgramContent style={{ padding: 6, background: backgroundColor }} width={styles.width} isLive={isLive}>
        <ProgramFlex>
          <ProgramStack style={{ width: "100%" }}>
            <ProgramFlex style={{ justifyContent: "space-between" }}>
              <ProgramTitle style={{ color: '#1e293b', fontWeight: '700', fontSize: '0.6rem' }}>{title}</ProgramTitle>
              {locked && <ProgramImage src={iconLocked} style={{ height: 12, width: 12 }}></ProgramImage>}
            </ProgramFlex>
            <ProgramText style={{ color: '#64748b', fontSize: '0.5rem' }}>
              {sinceTime} - {tillTime}
            </ProgramText>
            <ProgramText style={{ color: '#64748b', fontSize: '0.5rem' }}>
              {sinceTime} - {tillTime}
            </ProgramText>
            <p style={{ color: '#1e293b', fontSize: '0.6rem', marginTop: 5, marginBottom: 0 }}>
              {locked ? "Locked" : "Unlocked"}
            </p>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
};
