export const formatNumber = (number: number) => String(number).padStart(2, '0');

export const formatMinSecToTime = ({ minutes, seconds }: { minutes: number, seconds: number }) =>
`${formatNumber(minutes)}:${formatNumber(seconds)}`;

export const convertSecondsToMinutesSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);

    return {
        minutes,
        seconds: seconds - minutes * 60
    }
};
