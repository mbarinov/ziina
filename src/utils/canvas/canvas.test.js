import { drawInitialBackground, isPixelRed } from './index';

describe('Canvas operations', () => {
    let ctx;

    beforeEach(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 500;
        ctx = canvas.getContext('2d');
    });

    it('draws initial background', () => {
        drawInitialBackground(ctx);

        expect(ctx.fillStyle).toEqual('#ff0000');
    });

    it('identifies red pixel', () => {
        const pixels = new Uint8ClampedArray([150, 50, 50, 255]);
        const isRed = isPixelRed(pixels, 0);

        expect(isRed).toEqual(true);
    });
});
