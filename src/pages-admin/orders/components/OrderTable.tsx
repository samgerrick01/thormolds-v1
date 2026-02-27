import { Table } from 'antd';
import type { Order } from '../order.types';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  orders: Order[];
  loading: boolean;
  columns: ColumnsType<Order>;
}

function OrderTable({ orders, loading, columns }: Props) {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={orders}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
}

export default OrderTable;
