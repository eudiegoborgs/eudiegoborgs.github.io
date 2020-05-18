import ReactGA from 'react-ga'

ReactGA.initialize('UA-149356099-1', {
  debug: true,
});


export default class AnalyticsService {
  static pageview(page) {
    const result = ReactGA.pageview(page)
  }

  static event(data) {
    const result = ReactGA.event(data)
  }
}