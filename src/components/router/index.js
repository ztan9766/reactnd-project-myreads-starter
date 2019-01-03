import Home from "../home"
import Search from "../search"

const routes = [
  { 
    path: '/',
    exact: true,
    component: Home
  },
  { 
    path: '/search',
    component: Search
  }
]

export default routes
