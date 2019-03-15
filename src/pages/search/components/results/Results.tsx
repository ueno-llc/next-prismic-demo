import React, { useRef, useEffect, useState } from 'react';
import { useKeyDown } from 'hooks/use-keydown';

import s from './styles.scss';

interface IProps {
  children: React.ReactNode;
  onSearch: (value: string) => void;
  query: string;
  count: number;
}

export const Results = ({ query, count, onSearch, children }: IProps) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const keys = useKeyDown();

  useEffect(() => {
    if (!inputRef.current) return;

    if (keys.includes(13) && hasFocus) {
      onSearch(inputRef.current.value);
    }
  }, [keys])

  return (
    <div className={s.results}>
      <div className={s.results__container}>
        <h1 className={s.results__header}>{query}, {count} results</h1>

        <input
          ref={inputRef}
          className={s.results__input}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          type="text"
          defaultValue={query}
        />

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
