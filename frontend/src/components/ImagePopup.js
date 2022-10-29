/**
 * @format done by Prettier
 * @function ImagePopup
 * @props:
 * card - state @variable about open / close ImagePopup condition.
 * Used to choose current card to be showed in popup
 * onClose - handler @function closing all of popups on page
 *
 */

import React from 'react';

export default function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_preview ${
        card ? 'popup_opened' : ''
      }`}>
      <div className='popup__window popup__window_type_preview'>
        <button
          type='button'
          className='popup__close-button popup__close-button_place_preview'
          aria-label='close'
          onClick={onClose}
        />
        <img
          src={card ? card.link : ''}
          alt={card ? card.name : ''}
          className='popup__preview-image'
        />
        <p className='popup__description'>
          {card ? card.name : ''}
        </p>
      </div>
    </div>
  );
}
