import {Switch, Route, Redirect} from 'react-router-dom'
import House from './components/Home'
import CourseItemDetails from './components/CourseItemDetails'
import './App.css'
import NotFound from './components/NotFound'

const App = () => (
  <div>
    <Switch>
      <Route exact path="" component={House} />
      <Route exact path="/courses/:id" component={CourseItemDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
