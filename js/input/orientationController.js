import { game, GAME_ORIENTATIONS } from "../state/gameState.js";
import { DEVICE_TYPES } from "../device/deviceDetector.js";

export async function lockGameOrientation() {
  // Desktop 不需要處理螢幕方向
  if (game.deviceType !== DEVICE_TYPES.MOBILE) {
    return;
  }

  // 瀏覽器不支援 Screen Orientation API
  if (!screen.orientation || !screen.orientation.lock) {
    return;
  }

  try {
    if (game.orientation === GAME_ORIENTATIONS.PORTRAIT) {
      await screen.orientation.lock("portrait");
      return;
    }

    if (game.orientation === GAME_ORIENTATIONS.LANDSCAPE) {
      await screen.orientation.lock("landscape");
    }
  } catch (error) {
    console.warn("Unable to lock screen orientation:", error);
  }
}

export function unlockGameOrientation() {
  // Desktop 不需要處理螢幕方向
  if (game.deviceType !== DEVICE_TYPES.MOBILE) {
    return;
  }

  // 瀏覽器不支援 Screen Orientation API
  if (!screen.orientation || !screen.orientation.unlock) {
    return;
  }

  try {
    screen.orientation.unlock();
  } catch (error) {
    console.warn("Unable to unlock screen orientation:", error);
  }
}