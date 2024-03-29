import React from "react";
import ReactDOM from "react-dom";
import AuthorQuiz from "./AuthorQuiz";
import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ["The Shining", "IT", "Hamlet", "Macbeth", "Romeo And Juliet"],
    author: {
      name: "Charles Dickens",
      imageUrl: "images/authors/charlesdickens.jpg",
      imageSource: "Wikimedia Commons",
      books: ["David Copperfield", "A Tale Of Two Cities"]
    }
  },
  highlight: "none"
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("is not equal to null", () => {
  expect(AuthorQuiz).not.toBeNull();
});

describe("When no answer is selected", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} />);
  });

  it("should have white background color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
      "white"
    );
  });
});

describe("When a wrong answer is selected", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <AuthorQuiz
        {...Object.assign({}, state, { highlight: "wrong" })}
        onAnswerSelected={() => {}}
      />
    );
  });

  it("should have red background color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
      "#F84622"
    );
  });
});

describe("When a correct answer is selected", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <AuthorQuiz
        {...Object.assign({}, state, { highlight: "correct" })}
        onAnswerSelected={() => {}}
      />
    );
  });

  it("should have green background color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
      "#44C62D"
    );
  });
});

describe("When user selects first answer", () => {
  const handleAnswerSelected = jest.fn();
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />
    );
    wrapper
      .find(".answer")
      .first()
      .simulate("click");
  });

  it("onAnswerSelected function is called", () => {
    expect(handleAnswerSelected).toHaveBeenCalled();
  });

  it("should receive The Shining as answer", () => {
    expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
  });
});
