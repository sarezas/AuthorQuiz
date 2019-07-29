import React from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import AuthorQuiz from "./AuthorQuiz";
import AddAuthorForm from "./AddAuthorForm";
import * as serviceWorker from "./serviceWorker";
import { sample, shuffle } from "underscore";

// app data

const authors = [
  {
    name: "Mark Twain",
    imageUrl: "images/authors/marktwain.jpg",
    imageSource: "Wikimedia Commons",
    books: ["The Adventures Of Huckleberry Finn"]
  },
  {
    name: "Joseph Conrad",
    imageUrl: "images/authors/josephconrad.jpg",
    imageSource: "Wikimedia Commons",
    books: ["Heart Of Darkness"]
  },
  {
    name: "J.K. Rowling",
    imageUrl: "images/authors/jkrowling.jpg",
    imageSource: "Wikimedia Commons",
    books: ["Harry Potter And The Sorcerer's Stone"]
  },
  {
    name: "Stephen King",
    imageUrl: "images/authors/stephenking.jpg",
    imageSource: "Wikimedia Commons",
    books: ["The Shining", "IT"]
  },
  {
    name: "Charles Dickens",
    imageUrl: "images/authors/charlesdickens.jpg",
    imageSource: "Wikimedia Commons",
    books: ["David Copperfield", "A Tale Of Two Cities"]
  },
  {
    name: "William Shapkespear",
    imageUrl: "images/authors/williamshakespear.jpg",
    imageSource: "Wikimedia Commons",
    books: ["Hamlet", "Macbeth", "Romeo And Juliet"]
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find(author => author.books.some(title => title === answer))
  };
}

const state = {
  turnData: getTurnData(authors),
  highlight: "none"
};

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some(book => book === answer);
  state.highlight = isCorrect ? "correct" : "wrong";
  render();
}

function App() {
  return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />;
}

const AuthorWrapper = withRouter(({ history }) => (
  <AddAuthorForm
    onAddAuthor={author => {
      authors.push(author);
      history.push("/");
      console.log(authors);
    }}
  />
));

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <>
        <Route exact path="/" component={App} />
        <Route path="/add" component={AuthorWrapper} />
      </>
    </BrowserRouter>,
    document.getElementById("root")
  );
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
