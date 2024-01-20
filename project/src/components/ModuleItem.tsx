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

    // Define the dynamic background color based on the locked status
    const backgroundColor = locked
        ? "linear-gradient(90deg, rgba(95,37,37,1) 18%, rgba(66,35,19,1) 83%, rgba(81,59,28,1) 100%)" // Darker red gradient for locked
        : "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 75%, rgba(9,49,57,1) 100%)"; // Darker blue gradient for unlocked

    // Apply the dynamic background color directly in the style attribute
    const boxStyle = {
        background: backgroundColor,
    };

    return (
        <ProgramBox width={styles.width} style={styles.position}>
            <ProgramContent style={{ padding: 6, background: backgroundColor }} width={styles.width} isLive={isLive}>
                <ProgramFlex>
                    <ProgramStack>
                        <ProgramTitle style={{ color: 'white', fontWeight: '700', fontSize: '0.6rem' }}>{title}</ProgramTitle>
                        <ProgramText style={{ color: 'grey', fontSize: '0.5rem' }}>
                            {sinceTime} - {tillTime}
                        </ProgramText>
                        <p style={{ color: 'white', fontSize: '0.6rem', marginTop: 5, marginBottom: 0 }}>
                            {locked ? "Locked" : "Unlocked"}
                        </p>
                    </ProgramStack>
                </ProgramFlex>
            </ProgramContent>
        </ProgramBox>
    );
};
