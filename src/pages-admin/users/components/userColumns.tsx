import type { ColumnsType } from 'antd/es/table';
import { Avatar, Button, Space, Switch, Tag } from 'antd';
import type { User } from '../user.types';
import { useTranslation } from 'react-i18next';

export function useUserColumns(): ColumnsType<User> {
  const { t } = useTranslation();

  const membershipColor: Record<string, string> = {
    basic: 'default',
    silver: 'silver',
    gold: 'gold',
    vip: 'purple',
  };

  return [
    {
      title: t('users.id'),
      dataIndex: 'id',
      width: 100,
    },
    {
      title: t('users.avatar'),
      render: (_, r) => <Avatar src={r.avatar}>{r.email[0]}</Avatar>,
    },
    {
      title: t('users.username'),
      dataIndex: 'username',
    },
    {
      title: t('users.balance'),
      dataIndex: 'balance',
      render: (v) => `₱${v.toFixed(2)}`,
    },
    {
      title: t('users.consumption'),
      dataIndex: 'consumption_amount',
      render: (v) => `₱${v.toFixed(2)}`,
    },
    {
      title: t('users.membership'),
      dataIndex: 'membership_level',
      render: (level) => (
        <Tag color={membershipColor[level]}>{level.toUpperCase()}</Tag>
      ),
    },
    {
      title: t('users.active'),
      dataIndex: 'is_active',
      render: (active) => <Switch checked={active} />,
    },
    {
      title: t('users.actions'),
      render: () => (
        <Space>
          <Button type="link">{t('common.view')}</Button>
          <Button type="link" danger>
            {t('common.disable')}
          </Button>
        </Space>
      ),
    },
  ];
}
