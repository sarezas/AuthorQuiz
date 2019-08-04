import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
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

function reducer(
  state = { authors, turnData: getTurnData(authors), highlight: "" },
  action
) {
  switch (action.type) {
    case "ANSWER_SELECTED":
      const isCorrect = state.turnData.author.books.some(
        book => book === action.answer
      );
      return Object.assign({}, state, {
        highlight: isCorrect ? "correct" : "wrong"
      });
    case "CONTINUE":
      return Object.assign({}, state, {
        highlight: "",
        turnData: getTurnData(state.authors)
      });
    case "ADD_AUTHOR":
      return Object.assign({}, state, {
        authors: state.authors.concat([action.author])
      });
    default:
      return state;
  }
}

let store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <>
        <Route exact path="/" component={AuthorQuiz} />
        <Route path="/add" component={AddAuthorForm} />
      </>
    </ReactRedux.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
