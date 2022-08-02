// import { useEffect, useState } from "react";

// export default function useInfiniteScroll() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [vocabs, setVocabs] = useState([]);
//   const [hasMore, setHasMore] = useState(false);

//   //   useEffect(() => {
//   //     setBooks([]);
//   //   }, [query]);

//   useEffect(() => {
//     setLoading(true);
//     setError(false);
//     let cancel;
//     axios({
//       method: "GET",
//       url: "http://openlibrary.org/search.json",
//       params: { q: query, page: pageNumber },
//       cancelToken: new axios.CancelToken((c) => (cancel = c)),
//     })
//       .then((res) => {
//         setBooks((prevBooks) => {
//           return [
//             ...new Set([...prevBooks, ...res.data.docs.map((b) => b.title)]),
//           ];
//         });
//         setHasMore(res.data.docs.length > 0);
//         setLoading(false);
//       })
//       .catch((e) => {
//         if (axios.isCancel(e)) return;
//         setError(true);
//       });
//     return () => cancel();
//   }, [query, pageNumber]);

//   return { loading, error, books, hasMore };
// }
