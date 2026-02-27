import { useMemo, useState } from 'react';
import { Button, Input, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useProducts,
  useCategories,
  useCreateProduct,
} from '@/features/products/hooks';
import { useProductColumns } from '@/pages-admin/products/components/productColumns';
import ProductTable from '@/pages-admin/products/components/ProductTable';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

export default function ProductsPage() {
  const { t } = useTranslation();
  const { data: products, isLoading: isProductsLoading } = useProducts();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const create = useCreateProduct();

  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<string>();

  const columns = useProductColumns();

  const filteredProducts = useMemo(() => {
    return (products || []).filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryId ? p.category?.id === categoryId : true;
      return matchSearch && matchCategory;
    });
  }, [products, search, categoryId]);

  return (
    <div className="products-page">
      <Title level={4} className="products-title">
        {t('headersCount.productList')} ({t('headersCount.total')}{' '}
        {filteredProducts.length} {t('headersCount.dataEntries')})
      </Title>

      <div className="products-header">
        <Button
          type="primary"
          size="large"
          onClick={() =>
            create.mutate({
              name: 'New Product',
              price: 100,
              stock: 10,
            })
          }
        >
          {t('common.addProduct')}
        </Button>

        <Select
          size="large"
          placeholder={t('common.selectCategory')}
          loading={isCategoriesLoading}
          disabled={isCategoriesLoading || !categories?.length}
          className="products-select"
          allowClear
          value={categoryId}
          onChange={setCategoryId}
        >
          {categories?.map((cat: any) => (
            <Option key={cat.id} value={cat.id}>
              {cat.name}
            </Option>
          ))}
        </Select>

        <Search
          size="large"
          placeholder={t('common.searchProducts')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={setSearch}
          allowClear
          className="products-search"
        />
      </div>

      <ProductTable
        products={filteredProducts}
        loading={isProductsLoading}
        columns={columns}
      />
    </div>
  );
}
