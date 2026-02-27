import type { ColumnsType } from 'antd/es/table';
import { Button, Space } from 'antd';
import type { Product } from '../product.types';
import { useTranslation } from 'react-i18next';

export function useProductColumns(): ColumnsType<Product> {
  const { t } = useTranslation();

  return [
    {
      title: t('tables.id'),
      dataIndex: 'id',
      width: 100,
    },
    {
      title: t('tables.name'),
      dataIndex: 'name',
    },
    {
      title: t('tables.stock'),
      dataIndex: 'stock',
    },
    {
      title: t('tables.price'),
      dataIndex: 'price',
      render: (v) => `₱${v.toFixed(2)}`,
    },
    {
      title: t('tables.category'),
      dataIndex: ['category', 'name'],
      render: (v) => v || '-',
    },
    {
      title: t('tables.sales'),
      dataIndex: 'sales',
      render: (v) => v || 0, // assuming sales is a number in Product type
    },
    {
      title: t('common.action'),
      render: () => (
        <Space>
          <Button type="link">{t('common.edit')}</Button>
          <Button type="link" danger>
            {t('common.delete')}
          </Button>
        </Space>
      ),
    },
  ];
}
