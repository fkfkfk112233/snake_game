import { game } from "../state/gameState.js";
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
    // 遊戲一律優先嘗試強制直立。
    // 若瀏覽器不允許鎖定，會由 Mobile Landscape UI 自動處理。
    await screen.orientation.lock("portrait");
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