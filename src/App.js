import logo from "./logo.svg";
import "./App.css";
import React, {useState} from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
    const apiKey = process.env.REACT_APP_NEWS_API;
    // const[apiKey, setApiKey] = useState(process.env.REACT_APP_NEWS_API);
    const [progress, setProgress] = useState(0); 

  const setProgressBar = (progress) => {
    setProgress(progress);
  }

    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
  
      />
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact  path="/" element={<News setProgress = {setProgressBar} apiKey={apiKey} key="general" category={"general"} />} />
              <Route exact  path="/business" element={<News setProgress = {setProgressBar} apiKey={apiKey} key="business" category={"business"} />}/>
              <Route exact path="/entertainment" element={<News setProgress = {setProgressBar} apiKey={apiKey}  key="entertainment" category={"entertainment"} />}/>
              <Route exact  path="/health" element={<News setProgress = {setProgressBar} apiKey={apiKey}  key="health" category={"health"} />} />
              <Route exact  path="/science" element={<News setProgress = {setProgressBar} apiKey={apiKey} key="science" category={"science"} />} />
              <Route exact  path="/sports" element={<News setProgress = {setProgressBar} apiKey={apiKey} key="sports" category={"sports"} />} />
              <Route exact  path= "/technology" element={<News setProgress = {setProgressBar} apiKey={apiKey} key="technology" category={"technology"} />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  
}

export default App;
