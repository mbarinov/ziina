import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Draggable } from './index';
import { generateUUID } from '../../utils/uuid';

jest.mock('../../utils/uuid');

describe('Draggable', () => {
    beforeEach(() => {
        (generateUUID).mockReturnValue('random-uuid');
    });

    test('renders correctly with children', () => {
        const handleDragStart = jest.fn();
        render(
            <Draggable handleDragStart={handleDragStart}>
                <svg>
                    <circle cx="50" cy="50" r="40" fill="blue"/>
                </svg>
            </Draggable>
        );

        const draggable = screen.getByTestId('container');
        expect(draggable).toBeInTheDocument();
        expect(draggable).toHaveAttribute('id', 'random-uuid');
        expect(draggable).toHaveStyle({ cursor: 'move' });
    });

    test('handles onDragStart correctly', () => {
        const handleDragStart = jest.fn();
        render(
            <Draggable handleDragStart={handleDragStart}>
                <svg>
                    <circle cx="50" cy="50" r="40" fill="blue"/>
                </svg>
            </Draggable>
        );

        const draggable = screen.getByTestId('container')
        fireEvent.dragStart(draggable);

        expect(handleDragStart).toHaveBeenCalled();
    });
});