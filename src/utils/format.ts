export default function format(
    time: ConstructorParameters<typeof Date>[0],
    fmt = 'yyyy-MM-dd hh:mm:ss'
) {
    if (!time) {
        return '';
    }
    const d = new Date(time);
    const o: any = {
        'M+': d.getMonth() + 1, // 月份
        'd+': d.getDate(), // 日
        'h+': d.getHours(), // 小时
        'm+': d.getMinutes(), // 分
        's+': d.getSeconds(), // 秒
        'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
        S: d.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, `${d.getFullYear()}`.substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
            );
        }
    }
    return fmt;
}
