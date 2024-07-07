import React, {Components} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

export default class Course extends Components {
  render() {
    const {details} = this.props
    const {id, logoUrl, name} = details

    return (
      <Link to={`Course/${id}`}>
        <li>
          <div>
            <img src={logoUrl} alt={name} />
          </div>
          <p>{name}</p>
        </li>
      </Link>
    )
  }
}
