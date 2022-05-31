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

const getScheduleDataAsJSON = async () => {
  const scheduleData = await fetch(
    "https://www.learnwithjason.dev/api/episodes"
  );
  return scheduleData.json();
};

const getEpisodeDataAsJSON = async (slug: string) => {
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
  const [episode] = createResource(slug, getEpisodeDataAsJSON);
  function handleSelect(event: any) {
    setSlug(event.target.value);
  }
  // Use the For directive to iterate a list
  // syntax: <For each={List}>{(item) => something to transform the item }</>
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
