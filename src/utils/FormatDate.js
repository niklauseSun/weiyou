function formatDate(date) {
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    const h = date.getHours();
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second= date.getSeconds();
    second = minute < 10 ? ('0' + second) : second;
    return y + '.' + m + '.' + d+' '+h+':'+minute+':'+ second;
}

function formatDateToString(date) {
    // yyyy-MM-dd HH:mm
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h): h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second= date.getSeconds();
    second = minute < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute;
}

function formateDateType(date) {
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    const h = date.getHours();
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second= date.getSeconds();
    second = minute < 10 ? ('0' + second) : second;
    return y + '.' + m + '.' + d;
}

function formatHour(date) {
    const h = date.getHours();
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return h+':'+minute;
}

function formatHourWithString(dateString) {
    const t = Date.parse(dateString);
    const date = new Date(t);
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let h = date.getHours();
    h = h < 10 ? ('0' + h): h;
    return h + ':' + minute;
}

function formateDateHourWithString(dateString) {
    const t = Date.parse(dateString);
    const date = new Date(t);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h): h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second= date.getSeconds();
    second = minute < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute;
}
function formateDateWithString(dateString) {
    const t = Date.parse(dateString);
    const date = new Date(t);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    const h = date.getHours();
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second= date.getSeconds();
    second = minute < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d;
}

export {
    formatDate,
    formatHour,
    formatHourWithString,
    formateDateType,
    formateDateWithString,
    formatDateToString,
    formateDateHourWithString
}