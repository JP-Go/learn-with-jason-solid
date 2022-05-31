import { createSignal } from "solid-js";

export default function Counter() {
	// Returns a count getter and a setter
	// I called the getter count() and the setter setCount() 
  const [count, setCount] = createSignal(0);

	const add = () =>{
		return setCount(count() + 1)
	}
	const remove = () =>{
		return setCount(count() - 1)
	}

  return (
    <div>
      <button onclick={add}>Add</button>
      <button onclick={remove}>Remove</button>
      <p>{`Counter is ${count()}`}</p>
    </div>
  );
}
