import { Dropdown, Space } from 'antd';

import chevronDown from '@assets/icons/arrows/chevron-down.svg';

const SortCatalog = ({ handleSort }) => {
  const sortingOptions = [
    { label: 'Newest', key: 'newest' },
    { label: 'Oldest', key: 'oldest' },
    { label: 'Highest Price', key: 'highPrice' },
    { label: 'Lowest Price', key: 'lowPrice' },
  ];

  return (
    <Dropdown
      menu={{
        items: sortingOptions.map(({ label, key }) => ({
          label: <a onClick={() => handleSort(key)}>{label}</a>,
          key,
        })),
      }}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Sort by
          <img src={chevronDown} alt="Sort icon" />
        </Space>
      </a>
    </Dropdown>
  );
};

export default SortCatalog;
