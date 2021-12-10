//pure functions(не работают с глобальными переменными, только лок)
export function capitlize(string) {
    if(typeof string !== 'string'){
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}