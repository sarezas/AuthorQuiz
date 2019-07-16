import React from "react";
import Proptypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function Hero() {
  return (
    <div id="hero" className="row">
      <h1 className="mx-auto my-auto">The Author Quiz</h1>
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

function Book({ title, onClick }) {
  return (
    <div
      className="answer"
      onClick={() => {
        onClick(title);
      }}
    >
      <h4>{title}</h4>
    </div>
  );
}

function Turn({ author, books, highlight, onAnswerSelected }) {
  function highlightToBgColor(highlight) {
    const mapping = {
      none: "white",
      correct: "#44C62D",
      wrong: "#F84622"
    };
    return mapping[highlight];
  }

  return (
    <div
      id="turn"
      className="row turn"
      style={{ backgroundColor: highlightToBgColor(highlight) }}
    >
      <div className="col-4 offset-1">
        <img src={author.imageUrl} alt="Author" className="authorimage" />
      </div>
      <div className="col-6">
        {books.map(title => (
          <Book title={title} key={title} onClick={onAnswerSelected} />
        ))}
      </div>
    </div>
  );
}
Turn.propTypes = {
  author: Proptypes.shape({
    name: Proptypes.string.isRequired,
    imageUrl: Proptypes.string.isRequired,
    imageSource: Proptypes.string.isRequired,
    books: Proptypes.arrayOf(Proptypes.string).isRequired
  }),
  books: Proptypes.arrayOf(Proptypes.string).isRequired,
  onAnswerSelected: Proptypes.func.isRequired,
  highlight: Proptypes.string.isRequired
};

function Continue() {
  return <div id="continue" className="row" />;
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are taken from
          <a href="https://commons.wikimedia.org/wiki/Main_Page">
            {" "}
            Wikimedia Commons{" "}
          </a>
          and are in the public domain
        </p>
      </div>
    </div>
  );
}

function AuthorQuiz({ turnData, highlight, onAnswerSelected }) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn
        {...turnData}
        highlight={highlight}
        onAnswerSelected={onAnswerSelected}
      />
      <Continue />
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
