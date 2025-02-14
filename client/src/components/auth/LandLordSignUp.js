/*eslint-disable no-unused-vars*/

import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'
import axios from 'axios'
//prettier-ignore
import {
  getPayloadFromToken,
  getTokenFromLocalStorage
} from '../../helpers/auth'
import { ImageUploadField } from '../ImageUploadField'

import drinks from '../../styles/assets/drinks.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//prettier-ignore
import {
  faDog,
  faChair,
  faUtensils,
  faFutbol
} from '@fortawesome/free-solid-svg-icons'

const LandLordSignUp = () => {
  const [user, setUser] = useState({})

  const userID = getPayloadFromToken().sub

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/users/${userID}`)
      setUser(data)
    }
    getUser()
  }, [])

  //prettier-ignore
  const {

    username,


  } = user

  const history = useHistory()

  const handleUserSubmit = async () => {
    await axios.put(
      `/api/users/${userID}`,
      { isLandlord: true },
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
    )
  }

  //prettier-ignore
  const [formData, setFormData] = useState({
    nameOfPub: '',
    line1: '',
    line2: '',
    town: '',
    city: '',
    postCode: '',
    description: '',
    isOutsideSeating: false,
    isPetFriendly: false,
    isFoodServed: false,
    isLiveSports: false,
    image: '',
  })

  //prettier-ignore
  const [errors, setErrors] = useState({
    nameOfPub: '',
    line1: '',
    line2: '',
    town: '',
    city: '',
    postCode: '',
    description: '',
    isOutsideSeating: false,
    isPetFriendly: false,
    isFoodServed: false,
    isLiveSports: false,
    image: '',
  })

  const handleChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value

    setFormData({ ...formData, [event.target.name]: value })
  }

  const handleImageUrl = (url) =>
    setFormData({ ...formData, image: url })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleUserSubmit()
    try {
      //prettier-ignore
      const response = await axios.post('/api/pubs', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })

      history.push('/pubs')
    } catch (err) {
      console.log(err.response)
    }
  }

  const clickHandler = (e) => {
    e.preventDefault()

    const currentStep = document.querySelector('.step-one')
    const nextStep = document.querySelector('.step-two')

    const currentButton = document.querySelector('.button-one')
    const nextButton = document.querySelector('.button-two')

    const backButton = document.querySelector('.back-one')
    const nextBackButton = document.querySelector('.backtwo')

    currentStep.classList.add('hide')
    currentButton.classList.add('hide')
    backButton.classList.add('hide')

    nextStep.classList.remove('hide')
    nextButton.classList.remove('hide')
    nextBackButton.classList.remove('hide')
  }

  const backOne = (e) => {
    e.preventDefault()

    history.push('/landlord')
  }

  const clickHandlerTwo = (e) => {
    e.preventDefault()

    const currentStep = document.querySelector('.step-two')
    const nextStep = document.querySelector('.step-three')
    const currentButton = document.querySelector('.button-two')
    const nextButton = document.querySelector('.button-three')
    const backButton = document.querySelector('.backtwo')
    const nextBackButton = document.querySelector('.backthree')

    currentStep.classList.add('hide')
    currentButton.classList.add('hide')
    backButton.classList.add('hide')
    nextStep.classList.remove('hide')
    nextButton.classList.remove('hide')

    nextBackButton.classList.remove('hide')
  }

  const backTwo = (e) => {
    e.preventDefault()

    const currentStep = document.querySelector('.step-one')
    const nextStep = document.querySelector('.step-two')

    const currentButton = document.querySelector('.button-one')
    const nextButton = document.querySelector('.button-two')

    const backButton = document.querySelector('.back-one')
    const nextBackButton = document.querySelector('.backtwo')

    currentStep.classList.remove('hide')
    currentButton.classList.remove('hide')
    backButton.classList.remove('hide')

    nextStep.classList.add('hide')
    nextButton.classList.add('hide')
    nextBackButton.classList.add('hide')
  }

  const backThree = (e) => {
    e.preventDefault()

    const currentStep = document.querySelector('.step-two')
    const nextStep = document.querySelector('.step-three')
    const currentButton = document.querySelector('.button-two')
    const nextButton = document.querySelector('.button-three')
    const backButton = document.querySelector('.backtwo')
    const nextBackButton = document.querySelector('.backthree')

    currentStep.classList.remove('hide')
    currentButton.classList.remove('hide')
    backButton.classList.remove('hide')
    nextStep.classList.add('hide')
    nextButton.classList.add('hide')

    nextBackButton.classList.add('hide')
  }

  return (
    <div className="landlord-sign-container container">
      <div className="columns">
        <div className="landlord-sign-up column">
          <h1>{`Hi, ${username}! Lets get started Listing your Pub`}</h1>
          <br></br>

          <form onSubmit={handleSubmit}>
            <div className="step-one">
              <b>STEP 1</b>
              <h2>Where is your Pub located?</h2>

              <h2>Name of Pub</h2>
              <input
                className="input"
                name="nameOfPub"
                value={formData.nameOfPub}
                onChange={handleChange}
              ></input>
              {/* {errors.nameOfPub && (<p className="help is-danger">{errors.nameOfPub}</p>)} */}
              <br />

              <h2>Line 1</h2>
              <input
                className="input"
                name="line1"
                value={formData.line1}
                onChange={handleChange}
              ></input>
              {/* {errors.line1 && (<p className="help is-danger">{errors.line1}</p>)} */}
              <br />

              <h2>Line 2</h2>
              <input
                className="input"
                name="line2"
                value={formData.line2}
                onChange={handleChange}
              ></input>
              <br />

              <h2>Town</h2>
              <input
                className="input"
                name="town"
                value={formData.town}
                onChange={handleChange}
              ></input>
              <br />

              <h2>City</h2>
              <input
                className="input"
                name="city"
                value={formData.city}
                onChange={handleChange}
              ></input>
              {/* {errors.city && (<p className="help is-danger">{errors.city}</p>)} */}
              <br />

              <h2>Postcode</h2>
              <input
                className="input"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
              ></input>
              {/* {errors.postCode && (<p className="help is-danger">{errors.postCode}</p>)} */}
              <br />

              <h2>Description</h2>
              <input
                className="input"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></input>
              {/* {errors.description && (<p className="help is-danger">{errors.description}</p>)} */}
              <br />
            </div>
            <div className="form-nav">
              <div className="back-one back-button">
                <p onClick={backOne}>{'<< Back'}</p>
              </div>

              <button
                className="button-one landlord-sign-up-button button"
                onClick={clickHandler}
              >
                Continue
              </button>
            </div>

            <div className="hide step-two">
              <b>STEP 2</b>
              <h2>What are your pubs features?</h2>
              <br />
              <div className="feature-checkbox">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faDog} className="fa-2x" />
                </div>
                <div className="feature-text">
                  <p>Is your pub dog friendly ?</p>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="isPetFriendly"
                    checked={formData.isPetFriendly}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="feature-checkbox">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faChair} className="fa-2x" />
                </div>
                <div className="feature-text">
                  <p>Do you have outdoor seating at your pub ?</p>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="isOutsideSeating"
                    checked={formData.isOutsideSeating}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="feature-checkbox">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faUtensils} className="fa-2x" />
                </div>
                <div className="feature-text">
                  <p>Do you serve food at your pub ?</p>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="isFoodServed"
                    checked={formData.isFoodServed}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="feature-checkbox">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faFutbol} className="fa-2x" />
                </div>
                <div className="feature-text">
                  <p>Do you your show live sports at your pub?</p>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="isLiveSports"
                    checked={formData.isLiveSports}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-nav">
              <div className="hide backtwo back-button">
                <p onClick={backTwo}> {'<< Back'}</p>
              </div>
              <button
                className="hide button-two landlord-sign-up-button button"
                onClick={clickHandlerTwo}
              >
                Next
              </button>
            </div>

            <div className=" hide step-three">
              <b>STEP 3</b>
              <h2>Lets see what your pub looks like?</h2>
              <br />
              <ImageUploadField
                value={formData.image}
                name="image"
                handleImageUrl={handleImageUrl}
                formData={formData}
              />
            </div>
            <div className="form-nav">
              <div className="hide backthree back-button">
                <p onClick={backThree}> {'<< Back'}</p>
              </div>
              <button
                className="hide button-three landlord-sign-up-button button"
                onClick={handleSubmit}
              >
                Next
              </button>
            </div>
          </form>
        </div>
        <div className="column">
          <img src={drinks}></img>
        </div>
      </div>
    </div>
  )
}

export default LandLordSignUp
