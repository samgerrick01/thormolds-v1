import { useMemo, useState } from 'react';
import { Typography } from 'antd';
import { useOrderColumns } from '@/pages-admin/orders/components/OrderColumns';
import type { Order } from '@/pages-admin/orders/order.types';
import OrderFilters from '@/pages-admin/orders/components/OrderFilters';
import OrderTable from '@/pages-admin/orders/components/OrderTable';
import { t } from 'i18next';

const { Title } = Typography;

function OrdersPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>();
  const [orders] = useState<Order[]>([]); // API data
  const [loading] = useState(false);

  const columns = useOrderColumns();

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.product_name.toLowerCase().includes(search.toLowerCase()) ||
        o.buyer_name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status ? o.status === status : true;
      return matchSearch && matchStatus;
    });
  }, [orders, search, status]);

  return (
    <div className="orders-page">
      <Title level={4} className="orders-title">
        {t('headersCount.orderList')} ({t('headersCount.total')}{' '}
        {filteredOrders.length} {t('headersCount.dataEntries')})
      </Title>

      <div className="order-filters">
        <OrderFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />
      </div>

      <OrderTable orders={filteredOrders} loading={loading} columns={columns} />
    </div>
  );
}

export default OrdersPage;
