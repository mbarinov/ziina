import {DragEvent} from 'react';

const useDragAndDrop = () => {
    const handleDragStart = (event: DragEvent<HTMLElement>) => {
        event.dataTransfer.setData('text/plain', event.currentTarget.id);
    };

    const handleDragOver = (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(data);

        return {data, draggableElement}
    };

    return {handleDragStart, handleDragOver, handleDrop};
}

export default useDragAndDrop;
