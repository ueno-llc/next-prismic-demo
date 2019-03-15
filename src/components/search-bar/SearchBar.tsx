import React, { useRef, useState } from 'react';
import { withRouter } from 'next/router'

import s from './SearchBar.scss';
import { useKeyDown } from 'hooks/use-keydown';

const Search = (props: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const keys = useKeyDown();

  const search = () => {
    if (!inputRef.current) return;

    const { router } = props;
    router.push(`/search?q=${inputRef.current.value}`);
  }


  React.useEffect(() => {
    if (keys.includes(13) && hasFocus) {
      search();
    }
  }, [keys]);


  return (
    <div className={s.search}>
      <input
        ref={inputRef}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        className={s.search__input}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}

export const SearchBar = withRouter(Search);

