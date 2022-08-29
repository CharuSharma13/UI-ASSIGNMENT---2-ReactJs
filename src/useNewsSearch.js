import { useEffect, useState } from "react";
import axios from "axios";

export default function useNewsSearch(query, pageNumber) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [refreshMessage, setRefreshMessage] = useState(false);
  const fetchData = () => {
    if (pageNumber === 1) {
      setNews([]);
      setRefreshMessage(false);
    }
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      // url: `https://newsapi.org/v2/everything?q=${query}&apiKey=856ab7e951b649059b57d8241dd6ad64&pageSize=10&page=${pageNumber}`,
      url: "https://api.newscatcherapi.com/v2/search",
      params: { q: query, page: pageNumber, page_size: 10, lang: "en" },
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
        if (pageNumber === 1) {
          setTotalHits(res.data.total_hits);
        }
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

  // function autoRefreshLogic() {
  //   axios({
  //     method: "GET",
  //     // url: `https://newsapi.org/v2/everything?q=${query}&apiKey=856ab7e951b649059b57d8241dd6ad64&pageSize=10&page=${pageNumber}`,
  //     url: "https://api.newscatcherapi.com/v2/search",
  //     params: { q: query, page: 1 },
  //     headers: {
  //       "x-api-key": "XUvxZN72e6JThmRLViu06OrDXsMdZXTiZOcoT-mUvdE",
  //     },
  //   }).then((res) => {
  //     console.log(res.data.total_hits);
  //     console.log(totalHits);
  //     if (res.data.total_hits > totalHits) {
  //       setRefreshMessage(true);
  //       console.log("new posts");
  //     }
  //   });
  // }
  // function autoRefresh() {
  //   const interval = setInterval(() => {
  //     console.log("Logs every minute");
  //     console.log(totalHits);
  //     if (!refreshMessage) {
  //       console.log("going inside");
  //       autoRefreshLogic();
  //     }
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }

  // useEffect(() => {
  //   if (query !== "" && totalHits !== 0) {
  //     autoRefresh();
  //   }
  // }, [totalHits]);

  const updateData = () => {};
  return { loading, error, news, hasMore, fetchData, refreshMessage };
}
