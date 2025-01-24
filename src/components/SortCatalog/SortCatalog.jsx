import { Dropdown, Space } from 'antd';

import chevronDown from './chevron-down.svg';

const SortCatalog = ({ handleSort }) => {
  const sortMenu = {
    items: [
      {
        label: <a onClick={() => handleSort('newest')}>Newest</a>, // додано сортування по даті
        key: 'newest',
      },
      {
        label: <a onClick={() => handleSort('oldest')}>Oldest</a>, // додано сортування по даті
        key: 'oldest',
      },
      // {
      //   label: <a onClick={() => handleSort('bestRating')}>Best Rating</a>,
      //   key: 'bestRating',
      // },
      // {
      //   label: <a onClick={() => handleSort('worstRating')}>Worst Rating</a>,
      //   key: 'worstRating',
      // },
      {
        label: <a onClick={() => handleSort('highPrice')}>Highest Price</a>,
        key: 'highPrice',
      },
      {
        label: <a onClick={() => handleSort('lowPrice')}>Lowest Price</a>,
        key: 'lowPrice',
      },
    ],
  };

  return (
    <Dropdown menu={sortMenu} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Sort by
          <img
            src={chevronDown}
            alt="Sort icon"
            style={{ verticalAlign: 'sub' }}
          />
        </Space>
      </a>
    </Dropdown>
  );
};

export default SortCatalog;
