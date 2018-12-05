import moment from 'moment'
moment.locale('zh-cn')
export const TodayTime: string = moment().format('YYYY-MM-DD')
export const TomorrowTime: string = moment().add(1, 'days').format('YYYY-MM-DD')
