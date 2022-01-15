const pad = n => (n < 10 ? '0' : '') + n.toString();

const now = () => {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    return `${dateStr} ${timeStr}`;
}

module.exports = {
    new: slug => msg => console.log(`${slug} (${now()}): ${msg}`)
};
