import React from "react";
import { Display } from "../../component";

export default (props) => {
  return (
    <div>
      <h1>hello world!</h1>
      <Display.SayHi {...data} />
      <Display.SayHi name="Tuasddka" />
      <Display.SayHi name="Huska" />
      <Display.Time />

      <input onChange={(e) => console.log(e.target.value)} />
      <button onClick={() => alert("hi")} />
    </div>
  );
};

const data = {
  name: "Hello",
  age: "asdasd",
};
