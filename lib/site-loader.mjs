export function nextGreetingIndex(current, count, random = Math.random) {
  if (count <= 1) return 0;

  const offset = Math.min(count - 2, Math.floor(random() * (count - 1)));
  return offset >= current ? offset + 1 : offset;
}

export function advanceGreetingFrame(frame, count, random = Math.random) {
  return {
    current: nextGreetingIndex(frame.current, count, random),
    previous: frame.current,
  };
}

export function createGreetingQueue(current, count, random = Math.random) {
  const queue = Array.from({ length: Math.max(0, count) }, (_, index) => index)
    .filter((index) => index !== current);

  for (let index = queue.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.min(index, Math.floor(random() * (index + 1)));
    [queue[index], queue[swapIndex]] = [queue[swapIndex], queue[index]];
  }

  return queue;
}

export function waitForIntroduction(readiness, minimumMs = 1400, maximumMs = 3000) {
  return new Promise((resolve) => {
    let resourcesReady = false;
    let minimumElapsed = false;
    let finished = false;

    const finish = (reason) => {
      if (finished) return;
      finished = true;
      clearTimeout(minimumTimer);
      clearTimeout(maximumTimer);
      resolve(reason);
    };

    const minimumTimer = setTimeout(() => {
      minimumElapsed = true;
      if (resourcesReady) finish("ready");
    }, minimumMs);
    const maximumTimer = setTimeout(() => finish("timeout"), maximumMs);

    Promise.resolve(readiness).then(
      () => {
        resourcesReady = true;
        if (minimumElapsed) finish("ready");
      },
      () => {
        resourcesReady = true;
        if (minimumElapsed) finish("ready");
      },
    );
  });
}
