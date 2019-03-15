import React, { useState } from 'react';
import PropTypes from 'prop-types';

import s from './Author.scss';

export const AuthorBlock = ({ name, bio, image }) => (


  <>
    {image && image.url && (
      <div className={s.author__image}>
        <img alt="" src={image.url} />
      </div>
    )}

    <div className={s.author__text}>
      <div className={s.author__paragraph}>{name}</div>
      <div className={s.author__paragraph}>{bio}</div>
    </div>
  </>
);