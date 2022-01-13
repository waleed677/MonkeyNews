import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
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
    let baseUrl = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=2675b76c6e714c869e7679ed95dacd8a&pageSize=10&page=${this.state.page}`;
    let data = await fetch(baseUrl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResuls: parsedData.totalResults,
    });
  }

  handlePreClick = async () => {
    let baseUrl = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=2675b76c6e714c869e7679ed95dacd8a&pageSize=10&page=${
      this.state.page - 1
    }`;
    console.log(baseUrl);
    let data = await fetch(baseUrl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
    });
  };
  handleNextClick = async () => {
    let baseUrl = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=2675b76c6e714c869e7679ed95dacd8a&pageSize=10&page=${
      this.state.page + 1
    }`;
    console.log(baseUrl);
    let data = await fetch(baseUrl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
    });
  };

  render() {
    return (
      <div className="my-3">
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-evenly">
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
            disabled={this.state.page >= this.state.totalResuls / 10}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
