import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = ({ redirect, app: { $firebase } }) => {
  if ($firebase.auth().currentUser === null) {
    redirect('/auth/signin')
  }
}

export default myMiddleware
