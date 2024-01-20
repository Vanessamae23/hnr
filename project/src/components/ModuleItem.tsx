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
  
    return (
      <ProgramBox width={styles.width} style={styles.position}>
        <ProgramContent width={styles.width} isLive={isLive}>
          <ProgramFlex>
            <ProgramStack>
              <ProgramTitle>{title}</ProgramTitle>
              <ProgramText style={{ whiteSpace: 'normal' }}>
                {description}
              </ProgramText>
              <ProgramText>
                {sinceTime} - {tillTime}
              </ProgramText>
              <button onClick={() => alert(title)}>
                {locked ? "LOCKED" : "UNLOCKED"}
              </button>
            </ProgramStack>
          </ProgramFlex>
        </ProgramContent>
      </ProgramBox>
    );
  };
  