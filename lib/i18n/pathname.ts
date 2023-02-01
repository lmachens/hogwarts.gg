export function getPathLanguage(pathname: string) {
  const [, pathLanguage] = pathname.match(/\/(\w+)\/?/) ?? [];
  return pathLanguage;
}
