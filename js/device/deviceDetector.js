export const DEVICE_TYPES = {
  DESKTOP: "DESKTOP",
  MOBILE: "MOBILE",
};

export function detectDeviceType() {
  // 與 mobile.css 的 768px breakpoint 保持一致，
  // 避免 JS 與 CSS 對 Mobile / Desktop 的判定不同。
  return window.matchMedia("(max-width: 768px)").matches
    ? DEVICE_TYPES.MOBILE
    : DEVICE_TYPES.DESKTOP;
}
