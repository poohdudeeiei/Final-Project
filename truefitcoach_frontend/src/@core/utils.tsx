/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param item
 * @param activeItem
 */

export const handleURLQueries = (
  router: { query: { [x: string]: any }; asPath: string | any[] },
  path: string
) => {
  if (router && router.query && Object.keys(router.query).length && path) {
    const arr = Object.keys(router.query);

    return (
      router.asPath.includes(path) &&
      router.asPath.includes(router.query[arr[0]]) &&
      path !== "/"
    );
  }

  return false;
};
