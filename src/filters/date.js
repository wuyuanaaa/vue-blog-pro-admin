import dayjs from 'dayjs'

export function timeFromNow(val) {
  return dayjs(val).fromNow()
}

export function formatHMS(val) {
  return dayjs(val).format('HH:mm:ss')
}

export function formatComplete(val) {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}
