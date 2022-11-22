
export default function useSearch(router, params) {
  router.push({
    path: "/search",
    query: {
      ...params
    },
  });
}