import React,{useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{
  News.defaultProps = {
    category: "general",
    pageSize: 8,

  };

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  
  const updateState = async (page) =>{
  props.setProgress(20);
    let baseUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    let data = await fetch(baseUrl);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateState(page);
  }, [])


  // const handlePreClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //    this.updateState(this.state.page - 1);
  // };
  // const handleNextClick = async () => {
  //  this.setState({ page: this.state.page + 1 });
  //    this.updateState(this.state.page + 1);
  // };


  const fetchMoreData = async () => {
    setPage(page + 1);
    let baseUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=2675b76c6e714c869e7679ed95dacd8a&pageSize=${props.pageSize}&page=${page}`;
    let data = await fetch(baseUrl);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

    return (
      <div className="my-3">
        <h2 className="text-center mb-5">NewsMonkey - Top {props.category.toUpperCase()} Headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
        <div className="container my-5">
            <div className="row">
              {articles.map((element,index) => {
                  return <div className="col-md-4" key={index}>
                      <NewsItem
                        title={element.title}
                        description={element.description}
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date = {element.publishedAt}
                        source = {element.source.name}

                      />
                    </div>
                  
                })}
                </div>
            </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-evenly mt-4">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreClick}
            disabled={this.state.page <= 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >= Math.ceil(this.state.totalResutls / 10)
            }
          >
            Next
          </button>
        </div> */}
      </div>
    );
  
}

export default News;
