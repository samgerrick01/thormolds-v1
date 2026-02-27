import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Product } from '../product.types';

interface Props {
  products: Product[];
  loading: boolean;
  columns: ColumnsType<Product>;
}

function ProductTable({ products, loading, columns }: Props) {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={products}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
}

export default ProductTable;
