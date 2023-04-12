import {
    MOMENT_SYSTEM_DATE_FORMAT,
    MOMENT_SYSTEM_DATE_TIME_FORMAT
} from "@/core/config/constant";

export const momentDateFormat  = (date) => {
    return date.format(MOMENT_SYSTEM_DATE_FORMAT);
};

export const momentDateTimeFormat = (dateTime) => {
    return dateTime.format(MOMENT_SYSTEM_DATE_TIME_FORMAT);
}