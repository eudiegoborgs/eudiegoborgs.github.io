import ReactGA from 'react-ga'

ReactGA.initialize('UA-149356099-1')

export default class AnalyticsService {
  static pageview(page) {
    ReactGA.pageview(page)
  }

  static event(data) {
    ReactGA.event(data)
  }
}