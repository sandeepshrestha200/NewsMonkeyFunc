import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const apiKey = process.env.REACT_APP_API_KEY;

const News = (props) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);

    props.setProgress(20);

    let data = await fetch(url);
    props.setProgress(40);

    let parsedData = await data.json();
    props.setProgress(70);

    //console.log(parsedData);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    document.title = `News Monkey - ${capitalizeFirstLetter(props.category)}`;

    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    // console.log(page);

    setLoading(false);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
    setLoading(false);

    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setPage(page + 1);
  };

  return (
    <>
      <h1 className="text-center mb-4" style={{ marginTop: "80px" }}>
        NewsMonkey - Top Headlines from {capitalizeFirstLetter(props.category)}
      </h1>
      {loading ? <Spinner /> : <></>}
      <InfiniteScroll dataLength={articles} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={articles !== totalResults ? <Spinner /> : " "}>
        <div className="container my-3 mx-auto">
          <div className=" row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? (element.title.length >= 70 ? element.title.slice(0, 70) + "..." : element.title) : ""}
                    description={element.description ? (element.description.length >= 100 ? element.description.slice(0, 100) + "..." : element.description) : "..."}
                    imageUrl={element.urlToImage ? element.urlToImage : "https://content.api.news/v3/images/bin/ec253ca2762fb7fd02bc3481e09c662f"}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
