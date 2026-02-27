import type { User } from '@/pages-admin/users/user.types';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  users: User[];
  loading: boolean;
  columns: ColumnsType<User>;
}

function UserTable({ users, loading, columns }: Props) {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={users}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
}

export default UserTable;
