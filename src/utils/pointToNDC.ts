export const pointToNDC = (pixelX: number, pixelY: number) => {
  const ndcX = (pixelX - window.innerWidth / 2) / (window.innerWidth / 2);
  const ndcY = -((pixelY - window.innerHeight / 2) / (window.innerHeight / 2));
  return { x: ndcX, y: ndcY };
};
