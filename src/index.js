import { LITERAL_TYPES } from "@babel/types";
import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state]; // 절대로 push사용해서 넣으면 안된다
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id); // filter는 array를 새로 만들어 배치함
    default:
      return state;
  }
};

const store = createStore(reducer);

const deleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch({ type: DELETE_TODO, id });
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerText = ""; // ul에 있는 텍스트를 전부다 지우고 새로 리스트 부르게 한다
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", deleteTodo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  store.dispatch({ type: ADD_TODO, text: toDo });
};

form.addEventListener("submit", onSubmit);
