
function padStart0(val) {
  return ('' + val).padStart(2, '0')
}

// 格式化时间 YY-MM-DD hh-mm-ss
export function completeTime(date) {
  if (date === null) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date)
  }

  const Y = date.getFullYear()
  const M = padStart0(date.getMonth() + 1)
  const D = padStart0(date.getDate())
  const h = padStart0(date.getHours())
  const m = padStart0(date.getMinutes())
  const s = padStart0(date.getSeconds())

  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

export function simpleTime(date) {
  if (date === null) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date)
  }

  const h = padStart0(date.getHours())
  const m = padStart0(date.getMinutes())
  const s = padStart0(date.getSeconds())

  return `${h}:${m}:${s}`
}

