import { useEffect, useState } from "react";
import axios from "axios";

export default function useNewsSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = () => {
    if (pageNumber === 1) {
      setNews([]);
    }
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      // url: `https://newsapi.org/v2/everything?q=${query}&apiKey=856ab7e951b649059b57d8241dd6ad64&pageSize=10&page=${pageNumber}`,
      url: "https://api.newscatcherapi.com/v2/search",
      params: { q: query, page: pageNumber, page_size: 10 },
      headers: {
        "x-api-key": "XUvxZN72e6JThmRLViu06OrDXsMdZXTiZOcoT-mUvdE",
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        // console.log(res);
        if (res.data.page_size > 0) {
          setNews((prevNews) => {
            return [...prevNews, ...res.data.articles];
          });
        }
        //setHasMore(res.data.articles.length > 0);
        setHasMore(res.data.page_size > 0);
        setLoading(false);
        // setError(pageNumber === 1 && res.data.totalResults === 0);
        setError(pageNumber === 1 && res.data.total_hits === 0);
      })
      .catch((e) => {
        console.log(e);
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  };

  useEffect(() => {
    if (query !== "") {
      fetchData();
    }
  }, [pageNumber]);

  const updateData = () => {};
  return { loading, error, news, hasMore, fetchData };
}
