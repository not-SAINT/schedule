import React from 'react';
import { YoutubeOutlined, GithubOutlined, ChromeOutlined } from '@ant-design/icons';

interface ITaskUrlIco {
  url: string;
}

const TaskUrlIco: React.FC<ITaskUrlIco> = ({ url }: ITaskUrlIco): React.ReactElement => {
  const lowerUrl = url.toLowerCase();
  const isGithubLink = lowerUrl.includes('github');
  const isYoutubeLink = lowerUrl.includes('youtube');
  const isYoutubeLink2 = lowerUrl.includes('youtu.be');

  if (isGithubLink) {
    return <GithubOutlined />;
  }

  if (isYoutubeLink || isYoutubeLink2) {
    return <YoutubeOutlined />;
  }

  return <ChromeOutlined />;
};

export default TaskUrlIco;
