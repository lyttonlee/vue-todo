import moment from 'moment'
moment.locale('zh-cn')
export const TodayTime: string = moment().format('YYYY-MM-DD')
export const TomorrowTime: string = moment().add(1, 'days').format('YYYY-MM-DD')

export const GetLastThreeDays = () => {
  const LastThreeDays: string[] = []
  for (let index = 0; index < 3; index++) {
    const day: string = moment().add(index - 3, 'days').format('YYYY-MM-DD')
    LastThreeDays.push(day)
  }
  return LastThreeDays
}
