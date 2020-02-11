export interface CardDocument {
  user: string
}

export interface CheckDocument {
  date: firebase.firestore.Timestamp
  location: string
  type: 'checkin' | 'checkout' | 'dropin'
}

export interface HistoryDocument {
  date: firebase.firestore.Timestamp
  type: 'checkin' | 'checkout' | 'dropin'
  user: string
}

export interface UserDocument {
  name: string
  tags: string[]
  uuid: string
}
