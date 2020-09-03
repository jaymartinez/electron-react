import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PokerService from '../../services/pokerService';
import routes from '../../constants/routes.json';
import styles from './Lobby.css';

export default function Lobby() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ps = new PokerService();

  return (
    <div>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <div className={styles.btnGroup}>
        <button
          className={styles.btn}
          onClick={async () => {
            // eslint-disable-next-line no-console
            console.log('button clicked');
          }}
          type="button"
        >
          <i className="fa fa-plus" />
        </button>
      </div>
    </div>
  );
}
