import { Input, Select, Space } from 'antd';
import { t } from 'i18next';

const { Search } = Input;

export interface OrderFiltersProps {
  search: string;
  status?: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value?: string) => void;
}

function OrderFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: OrderFiltersProps) {
  return (
    <Space
      style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}
    >
      <Search
        size="large"
        placeholder={t('orders.searchBuyer')}
        value={search}
        allowClear
        style={{ width: 260 }}
        onSearch={onSearchChange}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Select
        size="large"
        placeholder={t('orders.transactionStatus')}
        allowClear
        style={{ width: 200 }}
        value={status}
        onChange={onStatusChange}
        options={[
          { label: t('orders.pending'), value: 'pending' },
          { label: t('orders.paid'), value: 'paid' },
          { label: t('orders.shipped'), value: 'shipped' },
          { label: t('orders.completed'), value: 'completed' },
          { label: t('orders.cancelled'), value: 'cancelled' },
        ]}
      />
    </Space>
  );
}

export default OrderFilters;
