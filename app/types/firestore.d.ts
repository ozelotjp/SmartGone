import firebase from 'firebase/app'

export interface CardDocument {
  user: string
}

export interface HistoryDocument {
  date: firebase.firestore.Timestamp
  location: string
  type: 'checkin' | 'checkout' | 'checkpoint'
  user: string
}

export interface ScheduleDocument {
  location: string
  time: {
    end: firebase.firestore.Timestamp
    start: firebase.firestore.Timestamp
  }
  timetable: number
}

export interface TerminalDocument {
  location: string
  type: 'checkin' | 'checkout' | 'checkpoint'
}

export interface UserDocument {
  location: string
  name: string
  tags: string[]
}
