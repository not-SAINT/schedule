import React from 'react';

const TestComponent: React.FC = (props: any) => {
  const {
    location: {
      state: {
        testvalue: { event },
      },
    },
  } = props;
  return (
    <>
      <span>{event.name}</span>
      <span>{event.id}</span>
      <span>{event.comment}</span>
      <span>{event.description}</span>
      {console.log(event)}
    </>
  );
};

export default TestComponent;
