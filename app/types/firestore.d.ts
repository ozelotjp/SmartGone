export interface CardDocument {
  user: string
}

export interface CheckDocument {
  date: firebase.firestore.Timestamp
  location: string
  type: 'checkin' | 'checkout' | 'checkpoint'
}

export interface HistoryDocument {
  date: firebase.firestore.Timestamp
  type: 'checkin' | 'checkout' | 'checkpoint'
  user: string
}

export interface UserDocument {
  name: string
  tags: string[]
  uuid: string
}
