import ClipLoader from 'react-spinners/ClipLoader';

import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloaderIcon}>
        <ClipLoader
          color="rgb(207, 207, 207)"
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Preloader;
