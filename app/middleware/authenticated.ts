import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = ({ redirect, app: { $accessor } }) => {
  if ($accessor.auth.authenticated === false) {
    redirect('/auth/signin')
  }
}

export default myMiddleware
