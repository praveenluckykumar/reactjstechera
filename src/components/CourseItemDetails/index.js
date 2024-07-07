import React, {Components} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

export default class CourseItemDetails extends Components {
  state = {
    isLoading: true,
    isFailed: false,
    isSuccess: false,
    ItemDetails: true,
  }

  componentDidMount() {
    this.fetchCourseDetails()
  }

  fetchCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()
    if (response.ok) {
      const updateData = {
        description: data.course_details.description,
        id: data.course_details.id,
        name: data.course_details.name,
        imageuUrl: data.course_details.imageuUrl,
      }
      console.log(data)
      console.log(updateData)
      this.setState({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
        ItemDetails: updateData,
      })
    } else {
      this.setState({isLoading: false, isSuccess: false, isFailed: true})
    }
  }

  render() {
    const {isLoading, isFailed, isSuccess, ItemDetails} = this.state
    const {description, name, imageuUrl} = ItemDetails
    return (
      <div>
        {isLoading && (
          <div data-testid="loader" className="spinner">
            <TailSpin
              height="80"
              widht="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              warpperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {isSuccess && (
          <div className="fgh">
            <div>
              <img src={imageuUrl} alt={name} />
            </div>
            <div>
              <h1>{name}</h1>
              <p>{description}</p>
            </div>
          </div>
        )}
        {isFailed && (
          <div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                alt="failure view"
              />
            </div>
            <h1>Oops! Something went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" onClick={this.fetchCourseDetails}>
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }
}
