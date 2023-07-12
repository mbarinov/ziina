import { renderHook } from '@testing-library/react';
import useDragAndDrop from './useDragAndDrop';

let spy;
beforeAll(() => {
    spy = jest.spyOn(document, 'getElementById');
});

describe('useDragAndDrop', () => {
    beforeAll(() => {
        spy.mockReturnValue({"id": "test-id"});
    });

    test('handleDragStart sets the correct data', () => {
        const { result } = renderHook(() => useDragAndDrop());
        const event = {
            dataTransfer: {
                setData: jest.fn(),
            },
            currentTarget: {
                id: 'test-id',
            },
        };
        result.current.handleDragStart(event);

        expect(event.dataTransfer.setData).toHaveBeenCalledWith('text/plain', 'test-id');
    });

    test('handleDragOver prevents default event', () => {
        const { result } = renderHook(() => useDragAndDrop());
        const event = {
            preventDefault: jest.fn(),
        };
        result.current.handleDragOver(event);

        expect(event.preventDefault).toHaveBeenCalled();
    });

    test('handleDrop prevents default event and gets correct data', () => {
        const { result } = renderHook(() => useDragAndDrop());

        const draggableElement = { id: 'test-id' };

        const event = {
            preventDefault: jest.fn(),
            dataTransfer: {
                getData: jest.fn(() => 'test-id'),
            },
        };

        const { data, draggableElement: element } = result.current.handleDrop(event);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.dataTransfer.getData).toHaveBeenCalledWith('text/plain');
        expect(data).toEqual('test-id');
        expect(element).toEqual(draggableElement);
    });
});
