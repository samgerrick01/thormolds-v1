import { Button, Space } from 'antd';
import i18n from 'i18next';

export function LanguageToggle() {
  const toggleLanguage = () => {
    const next = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <Space>
      <Button onClick={toggleLanguage}>
        {i18n.language === 'en' ? '中文' : 'EN'}
      </Button>
    </Space>
  );
}
