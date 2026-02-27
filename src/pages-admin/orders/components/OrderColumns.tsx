import type { ColumnsType } from 'antd/es/table';
import { Button, Image, Space, Tag } from 'antd';
import type { Order } from '../order.types';
import { useTranslation } from 'react-i18next';

export function useOrderColumns(): ColumnsType<Order> {
  const { t } = useTranslation();

  return [
    {
      title: t('orders.products'),
      render: (_, r) => (
        <Space>
          {r.product_image && <Image width={40} src={r.product_image} />}
          <div>
            <div>{r.product_name}</div>
            <small>{r.id}</small>
          </div>
        </Space>
      ),
    },
    {
      title: t('orders.unitPrice-Quantity'),
      render: (_, r) => `₱${r.unit_price} × ${r.quantity}`,
    },
    {
      title: t('orders.actualPayment'),
      dataIndex: 'actual_payment',
      render: (v) => `₱${v}`,
    },
    {
      title: t('orders.buyer'),
      render: (_, r) => (
        <div>
          <div>{r.buyer_name}</div>
          <small>{r.buyer_email}</small>
        </div>
      ),
    },
    {
      title: t('orders.payment'),
      dataIndex: 'payment_method',
    },
    {
      title: t('orders.delivery'),
      dataIndex: 'delivery_method',
    },
    {
      title: t('orders.status'),
      dataIndex: 'status',
      render: (status) => {
        const colors: Record<string, string> = {
          pending: 'orange',
          paid: 'blue',
          shipped: 'purple',
          completed: 'green',
          cancelled: 'red',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: t('orders.action'),
      render: () => (
        <Space>
          <Button type="link">{t('common.view')}</Button>
          <Button type="link">{t('common.update')}</Button>
        </Space>
      ),
    },
  ];
}
