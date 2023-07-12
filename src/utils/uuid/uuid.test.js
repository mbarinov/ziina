import { generateUUID } from './index';

describe('generateUUID', () => {
    test('generates a valid UUID', () => {
        const uuid = generateUUID();

        const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        expect(uuid).toMatch(uuidPattern);
    });
});
