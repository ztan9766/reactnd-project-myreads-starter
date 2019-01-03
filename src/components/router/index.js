import home from "../home"
import search from "../search"

const routes = [
  { 
    path: '/',
    exact: true,
    component: home
  },
  { 
    path: '/search',
    component: search
  }
]

export default routes
