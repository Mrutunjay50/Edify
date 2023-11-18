import React, { useEffect, useState } from 'react';

const LastSeen = ({ time, className }) => {
  const [timer, setTimer] = useState();
  const [timeDifference, setTimeDifference] = useState(null);

  const formatTimeDifference = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds < 60) {
      return `${seconds} sec ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} min ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hr ago`;
    } else if (seconds < 604800) {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    } else {
      const weeks = Math.floor(seconds / 604800);
      return `${weeks} weeks ago`;
    }
  };

  useEffect(() => {
    const currentDate = new Date().getTime();
    setTimer(currentDate);

    const timeDifferenceMilliseconds = currentDate - time;
    setTimeDifference(formatTimeDifference(timeDifferenceMilliseconds));
  }, [time]);

  return (
    <div className={className}>{timeDifference}</div>
  );
};

export default LastSeen;