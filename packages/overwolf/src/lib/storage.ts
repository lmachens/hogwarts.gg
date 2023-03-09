export function setLastIFramePathname(pathname: string) {
  localStorage.setItem('lastIFramePathname', pathname);
}

export function getLastIFramePathname() {
  return localStorage.getItem('lastIFramePathname') || '/en/map/hogwarts';
}
