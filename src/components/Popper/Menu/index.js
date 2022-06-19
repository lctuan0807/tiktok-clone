import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import { Wrapper as PopperWraper } from '~/components/Popper';
import MenuItem from './MenuItem';
import { Children } from 'react';

const cx = classNames.bind(styles);

function Menu({ items, children }) {
  const renderItems = () => {
    return items.map((item, index) => <MenuItem key={index} item={item} />);
  };

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
          <PopperWraper className={cx('menu-popper')}>{renderItems()}</PopperWraper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
