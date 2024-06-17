export function timeFix(time){
    const date = new Date(time)
    return date.toLocaleDateString('ru-RU')
}