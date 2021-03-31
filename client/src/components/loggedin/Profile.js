/*eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getPayloadFromToken } from '../../helpers/auth'
import { convertTimestamp } from '../../helpers/helperFunctions'
import EditProfile from '../Modals/Forms/EditProfile'
import Header from '../Header'
import ProfileReviews from './ProfileReviews'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [pubs, setPubs] = useState(null)

  const userID = getPayloadFromToken().sub

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/users/${userID}`)
      setUser(data)
    }
    getUser()
  }, [])
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/pubs')
      setPubs(data)
    }
    getUser()
  }, [])

  

  // const handleToggleEdit = () => {
  //   setIsEditActive(!isEditActive)
  // }
  // const handleToggleDelete = () => {
  //   setIsDeleteActive(!isDeleteActive)
  // }

  //console.log('Bearer', getTokenFromLocalStorage())

  // useEffect(() => {
  //   reviews.reverse()
  // }, [user])

  //prettier-ignore
  if (!user || !pubs) return null
  const {
    isLandlord,
    profileImage,
    username,
    email,
    createdAt,
    allReviews: reviews,
  } = user
  console.log('profile', reviews[0])
  return (
    <>
      <Header />
      {user && (
        <div className="profile-container">
          <div className="columns">
            <div className="column">
              {' '}
              <div className="profile-box">
                <img
                  className="profile-image"
                  src={profileImage}
                  alt="user profile image"
                />
              </div>
            </div>

            <div className="column">
              <div className="username">
                <h2>{`Hi, i'm ${username}`}</h2>
                <p>{`Joined in ${convertTimestamp(createdAt)} `}</p>
              </div>
              <Link to={`/profile/${userID}/edit`}>
                <div
                  className="edit-profile-button"
                  name="edit-profile">
                  Edit My Profile
                </div>
              </Link>
              <div className="card-rating">
                <div className="rating-star2">
                  <FontAwesomeIcon icon={faStar} className="fa-1x" />
                </div>

                <p className="overall-rating">
                  {reviews && `(${reviews.length} reviews)`}
                </p>
              </div>
              <hr />
              <p>Reviews by you</p>
              {reviews && (
                <ProfileReviews userID={userID} reviews={reviews} displayNumber={3} />
              )}
            </div>
          </div>

          <div>Email</div>
          <p>{email}</p>

          <Link to={`/profile/delete-account/${userID}`}>
            <button
              className="delete-account-button"
              name="delete-profile">
              Delete My Account
            </button>
          </Link>

          <section className="account-activity-section">
            <h2>Activity</h2>
            <div className="account-card-sub">
              <h2>Last Viewed Pub</h2>
              <p>use history to display</p>
            </div>
            <div className="account-card-sub">
              <div className="comments">
                <h3>Last Review Submitted</h3>
              </div>
            </div>
          </section>

          {isLandlord && (
            <>
              <section className="account-favourites-section">
                <h2>Favourites</h2>
              </section>
              <section className="account-pub-crawls">
                <h2>Saved Crawls</h2>
              </section>
              <section className="account-owned-pubs">
                <h2>Your Pubs</h2>
                {pubs
                  .filter(pub => pub.pubOwner === userID)
                  .map(pub => {
                    return (
                      <>
                        <div>
                          <div>{pub.nameOfPub}</div>
                          <Link to={`/pubs/${pub._id}`}><div><img src={pub.image} alt={`an image for the pub ${pub.name}`}/></div></Link>
                        </div>
                      </>
                    )
                  })
                }
              </section>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Profile
