export const ImagePath = (path: string): string => {
  return process.env.NEXT_PUBLIC_ENDPOINT + "/" + path;
};
