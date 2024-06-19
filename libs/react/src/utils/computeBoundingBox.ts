export default function computeImageBoundingBox(
  { clientWidth, clientHeight }: HTMLDivElement,
  imageObj: HTMLImageElement
) {
  const imageAspectRatio = imageObj.width / imageObj.height;
  const canvasAspectRatio = clientWidth / clientHeight;
  let renderableHeight, renderableWidth, xStart, yStart;

  xStart = 0;
  yStart = 0;
  renderableHeight = clientHeight;
  renderableWidth = clientWidth;

  if (imageAspectRatio < canvasAspectRatio) {
    renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
    xStart = Math.round((clientWidth - renderableWidth) / 2);
  } else if (imageAspectRatio > canvasAspectRatio) {
    renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
    yStart = Math.round((clientHeight - renderableHeight) / 2);
  }

  return {
    scale: Number(Number(renderableWidth / imageObj.width).toFixed(3)),
    x: xStart,
    y: yStart,
    width: Math.round(renderableWidth),
    height: Math.round(renderableHeight),
  };
}
