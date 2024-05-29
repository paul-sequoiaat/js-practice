function calculateAge(dob) {
    const dobTimestamp = dob.getTime();
    const currentTimestamp = Date.now();
    const diff = currentTimestamp - dobTimestamp;
    const days = convertMillisToDays(diff);
    const year = days/365;
    return `${parseInt(year)} years`;
}

function convertMillisToDays(millis) {
    return millis/(1000 * 60 * 60 * 24);
}

const val = calculateAge(new Date("1970-01-01"))
console.log(val);