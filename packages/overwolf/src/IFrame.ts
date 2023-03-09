import { getLastIFramePathname } from './lib/storage';

export const BASE_URL =
  import.meta.env.VITE_APP_WEB || 'https://www.hogwarts.gg';
export const DEFAULT_URL = BASE_URL + '/en/map/hogwarts';
export default function IFrame() {
  const iframe = document.querySelector<HTMLIFrameElement>('.iframe')!;
  const lastIFramePathname = getLastIFramePathname();
  if (lastIFramePathname) {
    iframe.src = BASE_URL + getLastIFramePathname();
  } else {
    iframe.src = DEFAULT_URL;
  }
  return iframe;
}
