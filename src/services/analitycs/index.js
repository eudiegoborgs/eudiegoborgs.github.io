import ReactGA from 'react-ga'

if (process.env.NODE_ENV !== 'test') {
  ReactGA.initialize('UA-149356099-1', {
    debug: true,
  });
}


export default class AnalyticsService {
  static pageview(page) {
    if (process.env.NODE_ENV !== 'test') {
      const result = ReactGA.pageview(page)
    }
  }

  static event(data) {
    if (process.env.NODE_ENV !== 'test') {
      const result = ReactGA.event(data)
    }
  }
}