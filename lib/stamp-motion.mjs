const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function getStampPointerTarget(rect, clientX, clientY) {
  const normalizedX = clamp((clientX - rect.left) / rect.width, 0, 1) * 2 - 1;
  const normalizedY = clamp((clientY - rect.top) / rect.height, 0, 1) * 2 - 1;

  return {
    rotateX: Number((-normalizedY * 7).toFixed(3)),
    rotateY: Number((normalizedX * 9).toFixed(3)),
    translateX: Number((normalizedX * 8).toFixed(3)),
    translateY: Number((normalizedY * 6).toFixed(3)),
  };
}

export function getNextStampFace(face) {
  return face === "front" ? "back" : "front";
}
