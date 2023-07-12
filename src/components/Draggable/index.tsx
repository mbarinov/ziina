import React, {DragEvent, ReactElement} from "react";

import {generateUUID} from "../../utils/uuid";

export const Draggable = ({children, handleDragStart}: {
    children: ReactElement,
    handleDragStart: (event: DragEvent<HTMLElement>) => void
}) => {
    const generatedId = generateUUID();

    return (
        <div
            id={generatedId}
            data-testid='container'
            draggable="true"
            onDragStart={handleDragStart}
            style={{cursor: 'move', backgroundColor: 'transparent'}}
        >
            {children}
        </div>
    );
};