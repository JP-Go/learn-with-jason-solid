import { createResource, For, ResourceReturn } from "solid-js";

interface ScheduleItem {
  _id: string;
  title: string;
  description: string;
}

type Schedule = Array<ScheduleItem>;

const getScheduleDataAsJSON = async () => {
  const scheduleData = await fetch(
    "https://www.learnwithjason.dev/api/schedule"
  );
  return scheduleData.json();
};

export default function Scheduler() {
  // createResource(function => returns Promise)
  // Returns a getter to the Promise data
  // Used to get asynchronous data
  const [schedule]: ResourceReturn<Schedule> = createResource(
    getScheduleDataAsJSON
  );
  // Use the For directive to iterate a list
  // syntax: <For each={List}>{(item) => something to transform the item }</>
  return (
    <>
      <For each={schedule()}>
        {(item: ScheduleItem) => {
          return (
            <li>
              <h2>{item.title}</h2>
              <p style="width:80%">{item.description}</p>
            </li>
          );
        }}
      </For>
    </>
  );
}
