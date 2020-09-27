import { tasksListSelector } from "./tasks.selectors";

export const TASKS_LIST_RECEIVED = "TASKS_LIST_RECEIVED";

export const tasksListReceived = (tasksList) => {
  return {
    type: TASKS_LIST_RECEIVED,
    payload: {
      tasksList,
    },
  };
};
