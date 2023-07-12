import {DragEvent} from "react";

export function drawInitialBackground(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 500, 500);
}

export function drawImageFromSvg(ctx: CanvasRenderingContext2D, event: DragEvent<HTMLCanvasElement>, svgElement: SVGSVGElement): Promise<void> {
    return new Promise((resolve, reject) => {
        const rect = ctx.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left - (svgElement.width.baseVal.value / 2);
        const y = event.clientY - rect.top - (svgElement.height.baseVal.value / 2);
        const img = new Image();
        const svgData = new XMLSerializer().serializeToString(svgElement);
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);

        img.onload = function() {
            ctx.drawImage(img, x, y);
            resolve();
        };

        img.onerror = function() {
            reject(new Error('Image loading failed'));
        };
    });
}

export function countRedPixels(ctx: CanvasRenderingContext2D): number {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const pixels = imageData.data;

    let redPixelCount = 0;
    for (let i = 0; i < pixels.length; i += 4) {
        if (isPixelRed(pixels, i)) {
            redPixelCount++;
        }
    }

    return redPixelCount;
}

export function isPixelRed(pixels: Uint8ClampedArray, i: number): boolean {
    const red = pixels[i];
    const green = pixels[i + 1];
    const blue = pixels[i + 2];
    return red > 100 && green < 100 && blue < 100;
}
