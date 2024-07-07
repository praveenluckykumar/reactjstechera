import React, {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'
import './index.css'

export default class Home extends Component {
  state = {isLoading: true, isFaild: false, isSuccess: false, courseList: true}
  componentDidMount() {
    this.fetchApiDetails()
  }

  fetchApiDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_Url,
        name: each.name,
      }))
      console.log(updatedData)
      this.setState({
        isLoading: false,
        isSuccess: true,
        isFaild: false,
        courseList: updatedData,
      })
    } else {
      this.setState({isLoading: false, isSuccess: false, isFaild: true})
    }
  }
  render() {
    const {isLoading, isSuccess, isFaild, courseList} = this.state
    return (
      <div>
        <Header />
        <div>
          {isLoading && (
            <div data-testid="loader" classaName="Spinner">
              <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          {isSuccess && (
            <div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                  alt="failure view"
                  className="failure-view"
                />
              </div>
              <h1>Oops! Something Went Wrong </h1>
              <p>We cannot seem to find the page you are looking for</p>
              <div>
                <button onClick={this.fetchApiDetails}>Retry</button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
