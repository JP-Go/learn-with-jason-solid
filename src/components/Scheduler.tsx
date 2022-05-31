import {
  createResource,
  createSignal,
  For,
  ResourceReturn,
  Show,
} from "solid-js";

interface ScheduleItem {
  _id: string;
  title: string;
  description: string;
  slug: { current: string };
}

type Schedule = Array<ScheduleItem>;
type Episode = {
  slug: { current: string };
  title: string;
};

const getScheduleDataAsJSON = async () => {
  const scheduleData = await fetch(
    "https://www.learnwithjason.dev/api/episodes"
  );
  return scheduleData.json();
};

const getEpisodeDataAsJSON = async (slug: String | Boolean) => {
  //  return fetch(`https://www.learnwithjason.dev/api/episode/${slug}`).then(
  //    (res) => res.json()
  // );
  return fetch(`https://www.learnwithjason.dev/api/episode/${slug}`).then(
    (res) => res.json()
  );
};

export default function Scheduler() {
  const [slug, setSlug] = createSignal(false);
  // createResource(function => returns Promise)
  // Returns a getter to the Promise data
  // Used to get asynchronous data
  const [schedule]: ResourceReturn<Schedule> = createResource(
    getScheduleDataAsJSON
  );
  // Why slug must start with false?
  const [episode]: ResourceReturn<Episode> = createResource(
    slug,
    getEpisodeDataAsJSON
  );
  function handleSelect(event: InputEvent | null) {
    if (event === null) {
      setSlug(false);
      return;
    }
    setSlug(event.target?.value);
  }
  // Use the For directive to iterate a list
  // syntax: <For each={List}>{(item) => something to transform the item }</For>
  // Use the Show directive to show an item when some data is available
  // Syntax: <Show when={SomeBooleanLikeValue} >{what to show}</Show>
  return (
    <div>
      <select onInput={handleSelect}>
        <For each={schedule()}>
          {(item: ScheduleItem) => (
            <option value={item.slug.current}>{item.title}</option>
          )}
        </For>
      </select>
      <Show when={episode()}>
        <p>{episode().title}</p>
      </Show>
    </div>
  );
}
