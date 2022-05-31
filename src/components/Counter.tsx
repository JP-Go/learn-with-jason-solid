import { createSignal, createEffect } from "solid-js";
// Create Signal can be used outside the component, noice, unlike React
// This can be used to share state between components
const [count, setCount] = createSignal(0);
export default function Counter() {
  // Returns a count getter and a setter
  // I called the getter count() and the setter setCount()
  const add = () => {
    return setCount(count() + 1);
  };
  const remove = () => {
    return setCount(count() - 1);
  };

  createEffect(() => {
    // using a reactive component in createEffect, reruns this effect
    console.log("Teste de reatividade", count());
  });

  return (
    <div>
      <button onclick={add}>Add</button>
      <button onclick={remove}>Remove</button>
      <p>{`Counter is ${count()}`}</p>
    </div>
  );
}
