export interface StopWatchControlsProps {
    onPause: () => void,
    onResume: () => void,
    onStop: () => void,
    isStopWatchOn: boolean
}