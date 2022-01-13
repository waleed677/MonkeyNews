import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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
      totalResuls: 0,
    };
  }

  async componentDidMount() {
    let baseUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=2675b76c6e714c869e7679ed95dacd8a&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(baseUrl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResuls: parsedData.totalResults,
      loading: false,
    });
  }

  handlePreClick = async () => {
    let baseUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${
      this.props.category
    }&apiKey=2675b76c6e714c869e7679ed95dacd8a&pageSize=${
      this.props.pageSize
    }&page=${this.state.page - 1}`;
    this.setState({ loading: true });
    let data = await fetch(baseUrl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };
  handleNextClick = async () => {
    let baseUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${
      this.props.category
    }&apiKey=2675b76c6e714c869e7679ed95dacd8a&pageSize=${
      this.props.pageSize
    }&page=${this.state.page + 1}`;
    this.setState({ loading: true });
    let data = await fetch(baseUrl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false,
    });
  };

  render() {
    return (
      <div className="my-3">
        <h2 className="text-center mb-5">NewsMonkey - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
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
              );
            })}
        </div>
        <div className="container d-flex justify-content-evenly mt-4">
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
              this.state.page + 1 >= Math.ceil(this.state.totalResuls / 10)
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
