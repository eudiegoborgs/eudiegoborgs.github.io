import React from "react";

const pad = d => (d < 10) ? '0' + d.toString() : d.toString();

const getTime = (d) => pad(Math.floor((d)));

const calculateTimeLeft = initialTime => {
    let timeLeft = {};
    if (typeof initialTime.getTime !== 'function') {
        return timeLeft
    }
    const now = new Date;
    let difference = initialTime.getTime() - now.getTime();
  
    if (difference > 0) {
      timeLeft = {
        d: getTime((difference / (1000 * 60 * 60 * 24))),
        h: getTime((difference / (1000 * 60 * 60)) % 24),
        m: getTime((difference / 1000 / 60) % 60),
        s: getTime((difference / 1000) % 60)
      };
    }
  
    return timeLeft;
}

export const Countdown = ({
    toTime
}) => {
    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft(toTime));


    React.useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(toTime));
        }, 1000);

        return () => clearTimeout(timer);
    }, [toTime, timeLeft]);
  
    return (
        <span>
          {`${timeLeft.d} dias ${timeLeft.h}:${timeLeft.m}:${timeLeft.s}`}
        </span>
    );
}