import { useEffect, useRef, useState } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import * as searchServices from '~/apiServices/searchServices';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWraper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { SearchIcon } from '~/components/Icons';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchInput, 600);

  const inputRef = useRef();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResults([]);
      return;
    }

    // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debouncedValue)}&type=less`)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setSearchResults(res.data);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchServices.search(debouncedValue);
      setSearchResults(result);
      setLoading(false);
    };
    fetchApi();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchInput('');
    setSearchResults([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchInput(e.target.value);
    }
  };

  return (
    // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.dlessTippy>
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResults.length > 0}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWraper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {searchResults.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
            </PopperWraper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchInput}
            placeholder="Search accounts and videos"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchInput && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
