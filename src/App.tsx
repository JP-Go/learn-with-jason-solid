import type { Component } from "solid-js";

import Counter from "./components/Counter";

const App: Component = () => {
  return (
    <div id="wrapper">
      <h1>Hi Mon </h1>
			<Counter/>
    </div>
  );
};

export default App;
