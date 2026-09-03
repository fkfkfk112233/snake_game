export const DEVICE_TYPES = {
  DESKTOP: "DESKTOP",
  MOBILE: "MOBILE",
};

export function detectDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();

  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent,
    );

  return isMobile ? DEVICE_TYPES.MOBILE : DEVICE_TYPES.DESKTOP;
}
