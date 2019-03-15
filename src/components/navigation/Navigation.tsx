
import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { Portal } from 'react-overlays';
import { Query } from 'react-apollo';
import { RichText, Link } from 'prismic-reactjs';
import { headerNavigation } from 'graphql/header-navigation';
import { get } from 'lodash';
import Error from 'next/error'
import { useResize } from 'hooks/use-resize';
import { Button } from 'components/button/Button';
import { Mobile } from './Mobile';
import { linkResolver } from 'utils/linkResolver';


import { Link as RouterLink } from 'components/link/Link';

import s from './Navigation.scss';
import Router from 'next/router';

interface IProps {
  children?: React.ReactNode;
}

export const Navigation = ({ children } : IProps) => {

  const [isMenuOpen, setMenuIsOpen] = React.useState(false);
  const { isMobile } = useResize();

  const toggleMenu = () => {
    setMenuIsOpen(!isMenuOpen)
  }

  const link = (c: any) => {
    const evt = { className: s.navigation__link };

    if (isMobile) {
      evt.onClick = toggleMenu;
    }

    return (
      <li className={s.navigation__item}>
        {React.cloneElement(c, { ...evt })}
      </li>
    );
  }

  const mobileNavigation = () => (
    <div>
      <button
        className={s(s.navigation__button, { isMenuOpen })}
        onClick={toggleMenu}
      >
        open
      </button>

      <Portal>
        <TransitionGroup>
          {isMenuOpen && (
            <Mobile>
              {React.Children.map(children, c => link(c))}
            </Mobile>
          )}
        </TransitionGroup>
      </Portal>
    </div>
  )

  const desktopNavigation = () => (
    <nav className={s.navigation}>
      <ul className={s.navigation__list}>
        {React.Children.map(children, (c) => {
          if (c.key === 'contact') {
            return (
              <div className={s.navigation__cta}>
                <Button to="/contact">Contact</Button>
              </div>
            );
          }

          return link(c);
        })}
      </ul>
    </nav>
  )

  return isMobile ? mobileNavigation(): desktopNavigation()
}

