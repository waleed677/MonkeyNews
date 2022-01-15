import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    category: "general",
    pageSize: 8,

  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async updateState(page){
    this.props.setProgress(20);
    let baseUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=2675b76c6e714c869e7679ed95dacd8a&pageSize=${this.props.pageSize}&page=${page}`;
    this.setState({ loading: true });
    let data = await fetch(baseUrl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateState(this.state.page);
  }

  handlePreClick = async () => {
    this.setState({ page: this.state.page - 1 });
     this.updateState(this.state.page - 1);
  };
  handleNextClick = async () => {
   this.setState({ page: this.state.page + 1 });
     this.updateState(this.state.page + 1);
  };


  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let baseUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=2675b76c6e714c869e7679ed95dacd8a&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    console.log(baseUrl);
    let data = await fetch(baseUrl);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div className="my-3">
        <h2 className="text-center mb-5">NewsMonkey - Top {this.props.category.toUpperCase()} Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
        <div className="container my-5">
            <div className="row">
              {this.state.articles.map((element,index) => {
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
}

export default News;
