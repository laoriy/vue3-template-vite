export function hasClass(el: HTMLElement, className: string) {
    const reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
    return reg.test(el.className);
}

export function addClass(el: HTMLElement, className: string) {
    if (hasClass(el, className)) {
        return;
    }

    const newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}
