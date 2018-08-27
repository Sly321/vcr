export const MINUTES_OF_HOUR = 60
export const HOURS_OF_DAY = 24

export default class TimeUtil {
    public static minutesToReadableTimeString(minutes: number) {
        let m = minutes

        const days = Math.floor(m / (MINUTES_OF_HOUR * HOURS_OF_DAY))
        m -= days * MINUTES_OF_HOUR * HOURS_OF_DAY
        const hrs = Math.floor(m / MINUTES_OF_HOUR)
        m -= hrs * MINUTES_OF_HOUR
        return `${days !== 0 ? `${days}d ` : ""}${hrs !== 0 ? `${hrs}h ` : ""}${m !== 0 ? `${m}m` : ""}`
    }
}