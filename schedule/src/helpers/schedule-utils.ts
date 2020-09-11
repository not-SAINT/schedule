import { EVENT_PALETTE, TaskType, DEADLINE } from '../constants/settings';
import { IEvent } from '../interfaces/serverData/serverData';

export const getTimeLeft = (deadline: number): string => {
  const now = Date.now();
  const deadlineTime = deadline;
  const timeLeft = deadlineTime - now;
  const daysLeft = Math.trunc(timeLeft / 1000 / 3600 / 24);

  if (deadline === undefined) {
    return '';
  }

  if (timeLeft < 0) {
    return '';
  }

  if (daysLeft >= 1) {
    return `Days left: ${daysLeft}`;
  }

  return `Hours left: ${Math.trunc(timeLeft / 1000 / 3600)}`;
};

export const getSpecTags = (comment: string): string[] | '' => {
  const index = comment.indexOf('^');

  if (index === -1) {
    return '';
  }

  const tags = comment.slice(index + 1);

  return tags.split(';');
};

export const getTagColorByEventType = (taskType: TaskType): string => {
  return EVENT_PALETTE[taskType];
};

export const addDeadlineEvents = (data: IEvent[]): IEvent[] => {
  const tasksWithDeadline = data.filter(({ deadline }) => deadline > 0);
  const deadlineVirtualTasks = tasksWithDeadline.map((task, index) => {
    return {
      ...task,
      dateTime: task.deadline,
      type: DEADLINE,
      id: `${Date.now() + index}`,
    };
  });

  return data.concat(deadlineVirtualTasks);
};
