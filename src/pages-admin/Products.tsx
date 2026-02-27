import { useCreateProduct, useProducts } from '@/features/products/hooks';
import { Table, Button } from 'antd';

export default function AdminProducts() {
  const { data, isLoading } = useProducts();
  const create = useCreateProduct();

  return (
    <>
      <Button
        type="primary"
        onClick={() =>
          create.mutate({
            name: 'New Product',
            price: 100,
            stock: 10,
          })
        }
      >
        Add Product
      </Button>

      <Table
        loading={isLoading}
        dataSource={data}
        rowKey="id"
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Price', dataIndex: 'price' },
          { title: 'Stock', dataIndex: 'stock' },
        ]}
      />
    </>
  );
}
