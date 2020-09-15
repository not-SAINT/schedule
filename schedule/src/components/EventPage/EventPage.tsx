import React from 'react';

const EventPage: React.FC = ({ location: { state } }: any) => {
  const { ts } = state;

  return (
    <>
      <div>{`EventPage for ${ts.name}`}</div>
    </>
  );
};

export default EventPage;
