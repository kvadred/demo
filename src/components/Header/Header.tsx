import './styles.scss';
import {HeaderItem} from "@app/hooks";
import classNames from "classnames";
import {Link, useLocation} from "react-router-dom";

interface Props {
  items: HeaderItem[];
}

function Header(props: Props) {
  const {
    items,
  } = props;
  const location = useLocation();

  return (
    <div className={'header'}>
      <img src={'src/assets/icons/logo_black.svg'} height={64} alt={'logo'}/>
      {/*TODO: logo refactor*/}
      <div className={'header__items'}>
        {items.map(item => (
          <Link
            to={item.path}
            key={item.path}
            className={
              classNames('header__item', {
                'header__item--current': location.pathname.substring(1).split('/')[0] ===
                  item.path.substring(1).split('/')[0].toLocaleLowerCase(),
              })
            }
          >
            {item.label.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Header;
