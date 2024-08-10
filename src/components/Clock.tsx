import { createSignal, onCleanup, onMount } from "solid-js";

function Clock() {
  const initialTime = 25 * 60 * 1000; // 25 minutes in milliseconds
  const [timeLeft, setTimeLeft] = createSignal(initialTime);
  const [isRunning, setIsRunning] = createSignal(false);
  let timer: number;
  let lastUpdateTime: number;

  const startTimer = () => {
    if (!isRunning()) {
      setIsRunning(true);
      lastUpdateTime = Date.now();
      timer = window.requestAnimationFrame(updateTimer);
    }
  };

  const updateTimer = () => {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastUpdateTime;
    lastUpdateTime = currentTime;

    setTimeLeft((prev) => {
      const newTime = Math.max(prev - deltaTime, 0);
      if (newTime <= 0) {
        setIsRunning(false);
        return 0;
      }
      timer = window.requestAnimationFrame(updateTimer);
      return newTime;
    });
  };

  const pauseTimer = () => {
    if (isRunning()) {
      window.cancelAnimationFrame(timer!);
      setIsRunning(false);
    }
  };

  const toggleTimer = () => {
    if (isRunning()) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const formatTime = (totalMilliseconds: number) => {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
      toggleTimer();
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeyPress);
  });

  onCleanup(() => {
    window.cancelAnimationFrame(timer!);
    window.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <div class="bg-white/[.10] flex flex-col items-center p-6 max-w-md mx-auto mt-2 mb-10 rounded-md">
      <span class="text-white font-bold text-6xl tabular-nums mb-4">
        {formatTime(timeLeft())}
      </span>
      <button
        onClick={toggleTimer}
        class="bg-white text-red-500 font-bold py-2 px-4 rounded"
      >
        {isRunning() ? "Pause" : timeLeft() < initialTime ? "Resume" : "Start"}
      </button>
      <p class="text-white mt-2">
        Press Space to {isRunning() ? "pause" : "start/resume"}
      </p>
    </div>
  );
}

export default Clock;
