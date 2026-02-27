import { useMemo, useState } from 'react';
import { Input, Typography } from 'antd';
import type { User } from '@/pages-admin/users/user.types';
import { useUserColumns } from '@/pages-admin/users/components/userColumns';
import UserTable from '@/pages-admin/users/components/UserTable';
import { t } from 'i18next';

const { Title } = Typography;
const { Search } = Input;

function UsersPage() {
  const [users] = useState<User[]>([]);
  const [loading] = useState(false);
  const columns = useUserColumns();
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const term = search.toLowerCase();
      return (
        user.email.toLowerCase().includes(term) ||
        (user.id && user.id.toLowerCase().includes(term))
      );
    });
  }, [users, search]);

  return (
    <div className="users-page">
      <Title level={4} className="users-title">
        {t('headersCount.userList')} ({t('headersCount.total')}{' '}
        {filteredUsers.length} {t('headersCount.dataEntries')})
      </Title>

      <div className="users-search-container">
        <Search
          size="large"
          placeholder={t('users.placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={setSearch}
          allowClear
          className="users-search"
        />
      </div>

      <UserTable users={filteredUsers} loading={loading} columns={columns} />
    </div>
  );
}

export default UsersPage;
