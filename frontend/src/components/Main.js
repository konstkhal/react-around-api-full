/**
 * @format done by Prettier
 * @function Main returns Main element
 * @props array:
 * cards - array containing all of cards to be rendered
 * onEditProfileClick - handler @function on edit profile button click event
 * onAddPlaceClick - handler @function on add place button click event
 * onEditAvatarClick - handler @function on edit avatar button click event
 * onCardClick - handler @function on card click event
 * onCardDelete - handler @function on card delete button click event
 * onCardLike - handler @function on card like button click event
 */

import React, { useContext } from 'react';
import { UserContext } from '../contexts/CurrentUserContext';
import profileChangeImage from '../images/pen.svg';
import linkAddImage from '../images/Vector-1.svg';
import Card from './Card.js';

function Main({
  cards,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = useContext(UserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__photo-container'>
          <div className='profile__cover-overlay' />
          <img
            src={currentUser.avatar}
            className='profile__photo'
            alt='Alt placeholder'
          />
          <button
            type='button'
            className='button profile__link-change profile__link-change_place_image'
            onClick={onEditAvatarClick}>
            <img
              src={profileChangeImage}
              className='profile__image-change profile__image-change_place_image'
              alt='Alt placeholder'
            />
          </button>
        </div>

        <div className='profile__info'>
          <h1 className='profile__name'>
            {currentUser.name}
          </h1>

          <button
            type='button'
            className='button profile__link-change profile__link-change_place_profile'
            onClick={onEditProfileClick}>
            <img
              src={profileChangeImage}
              className='profile__image-change'
              alt='Alt placeholder'
            />
          </button>

          <p className='profile__role'>
            {currentUser.about}
          </p>
        </div>

        <button
          type='button'
          className='button profile__link-add'
          onClick={onAddPlaceClick}>
          <img
            src={linkAddImage}
            className='profile__image-add'
            alt='Alt placeholder'
          />
        </button>
      </section>

      <section className='photo-grid'>
        <ul className='photo-grid__list'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
