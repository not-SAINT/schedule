import React from 'react';
import { YoutubeOutlined, GithubOutlined, ChromeOutlined } from '@ant-design/icons';

interface ITaskUrlIco {
  url: string;
}

const TaskUrlIco: React.FC<ITaskUrlIco> = ({ url }: ITaskUrlIco): React.ReactElement => {
  const lowerUrl = url.toLowerCase();
  const isGithubLink = lowerUrl.indexOf('github');
  const isYoutubeLink = lowerUrl.indexOf('youtube');
  const isYoutubeLink2 = lowerUrl.indexOf('youtu.be');

  if (isGithubLink > 0) {
    return <GithubOutlined />;
  }

  if (isYoutubeLink > 0 || isYoutubeLink2 > 0) {
    return <YoutubeOutlined />;
  }

  return <ChromeOutlined />;
};

export default TaskUrlIco;
