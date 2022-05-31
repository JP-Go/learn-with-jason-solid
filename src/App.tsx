import type { Component } from "solid-js";

import Counter from "./components/Counter";
import Scheduler from "./components/Scheduler";

const App: Component = () => {
  return (
    <div id="wrapper">
      <h1> Hi Mommy </h1>
      <Counter />
			<Scheduler/>
    </div>
  );
};

export default App;
