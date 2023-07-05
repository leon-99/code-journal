function calcTime(offset) {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000*offset));
        return {
            hours: nd.getHours(),
            minutes: nd.getMinutes(),
            seconds: nd.getSeconds()
        }
    }
console.log(calcTime(-7)); // Pacific Time (PT)