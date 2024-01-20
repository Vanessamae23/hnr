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
        <ProgramContent style={{  padding: 6}} width={styles.width} isLive={isLive}>
          <ProgramFlex>
            <ProgramStack>
              <ProgramTitle style={{ fontSize: '0.6rem'}}>{title}</ProgramTitle>
              <ProgramText style={{ fontSize: '0.5rem'}}>
                {sinceTime} - {tillTime}
              </ProgramText>
              <p style={{ color: 'white', fontSize: '0.6rem', marginTop: 5, marginBottom: 0}}>
                {locked ? "Locked" : "Unlocked"}
              </p>
            </ProgramStack>
          </ProgramFlex>
        </ProgramContent>
      </ProgramBox>
    );
  };
  