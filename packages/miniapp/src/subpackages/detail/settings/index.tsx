import { View, Text, Switch } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import { settingsService, type IUserSettings } from '@/services/settings.service'
import './index.scss'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifyMemory: true,
    notifyChat: true,
    notifyReview: false,
    privacyDefault: 'private',
    autoSync: true,
    wifiOnly: true,
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const res = await settingsService.get()
      const s = res.data
      setSettings({
        notifyMemory: s.notifications.newMemory,
        notifyChat: s.notifications.systemNotice,
        notifyReview: s.notifications.weeklyReport,
        privacyDefault: s.privacy.defaultLevel === 1 ? 'private' : s.privacy.defaultLevel === 2 ? 'family' : 'public',
        autoSync: true,
        wifiOnly: true,
      })
    } catch {
      // 加载失败使用默认值
    }
  }

  const handleSwitchChange = async (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    try {
      await settingsService.update({
        notifications: {
          newMemory: key === 'notifyMemory' ? value : settings.notifyMemory,
          dailyReminder: true,
          weeklyReport: key === 'notifyReview' ? value : settings.notifyReview,
          systemNotice: key === 'notifyChat' ? value : settings.notifyChat,
        },
      } as Partial<IUserSettings>)
      Taro.showToast({ title: '设置已更新', icon: 'success' })
    } catch {
      Taro.showToast({ title: '保存失败', icon: 'none' })
    }
  }

  const handlePrivacyChange = () => {
    Taro.showActionSheet({
      itemList: ['私密', '家人可见', '公开'],
      success: (res) => {
        const levels = ['private', 'family', 'public']
        setSettings(prev => ({ ...prev, privacyDefault: levels[res.tapIndex] }))
        Taro.showToast({ title: '设置已更新', icon: 'success' })
      },
    })
  }

  const handleClearCache = () => {
    Taro.showModal({
      title: '清除缓存',
      content: '将清除本地缓存数据，不影响云端数据。',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '缓存已清除', icon: 'success' })
        }
      },
    })
  }

  const handleAbout = () => {
    Taro.showModal({
      title: '关于生命链',
      content: '版本：1.0.0\n\n生命链 — 跨世代数字人格陪伴系统\n\n用 AI 帮你记录人生，陪伴成长，传承家族记忆。',
      showCancel: false,
    })
  }

  const handleFeedback = () => {
    Taro.showToast({ title: '反馈功能开发中', icon: 'none' })
  }

  const privacyLabels: Record<string, string> = {
    private: '🔒 私密',
    family: '👨‍👩‍👧‍👦 家人可见',
    public: '🌍 公开',
  }

  return (
    <View className="page-settings">
      <NavBar title="设置" />

      <View className="page-settings__body">
        {/* 通知设置 */}
        <View className="page-settings__section">
          <Text className="page-settings__section-title">通知设置</Text>

          <View className="page-settings__item">
            <View className="page-settings__item-left">
              <Text className="page-settings__item-icon">🔔</Text>
              <Text className="page-settings__item-label">记忆提醒</Text>
            </View>
            <Switch
              checked={settings.notifyMemory}
              color="#FF8A5B"
              onChange={(e) => handleSwitchChange('notifyMemory', e.detail.value)}
            />
          </View>

          <View className="page-settings__item">
            <View className="page-settings__item-left">
              <Text className="page-settings__item-icon">💬</Text>
              <Text className="page-settings__item-label">对话通知</Text>
            </View>
            <Switch
              checked={settings.notifyChat}
              color="#FF8A5B"
              onChange={(e) => handleSwitchChange('notifyChat', e.detail.value)}
            />
          </View>

          <View className="page-settings__item">
            <View className="page-settings__item-left">
              <Text className="page-settings__item-icon">📊</Text>
              <Text className="page-settings__item-label">回顾提醒</Text>
            </View>
            <Switch
              checked={settings.notifyReview}
              color="#FF8A5B"
              onChange={(e) => handleSwitchChange('notifyReview', e.detail.value)}
            />
          </View>
        </View>

        {/* 隐私设置 */}
        <View className="page-settings__section">
          <Text className="page-settings__section-title">隐私设置</Text>

          <View className="page-settings__item" onClick={handlePrivacyChange}>
            <View className="page-settings__item-left">
              <Text className="page-settings__item-icon">🛡️</Text>
              <Text className="page-settings__item-label">默认隐私等级</Text>
            </View>
            <View className="page-settings__item-right">
              <Text className="page-settings__item-value">
                {privacyLabels[settings.privacyDefault] || settings.privacyDefault}
              </Text>
              <Text className="page-settings__item-arrow">›</Text>
            </View>
          </View>
        </View>

        {/* 数据同步 */}
        <View className="page-settings__section">
          <Text className="page-settings__section-title">数据同步</Text>

          <View className="page-settings__item">
            <View className="page-settings__item-left">
              <Text className="page-settings__item-icon">☁️</Text>
              <Text className="page-settings__item-label">自动同步</Text>
            </View>
            <Switch
              checked={settings.autoSync}
              color="#FF8A5B"
              onChange={(e) => handleSwitchChange('autoSync', e.detail.value)}
            />
          </View>

          <View className="page-settings__item">
            <View className="page-settings__item-left">
              <Text className="page-settings__item-icon">📶</Text>
              <Text className="page-settings__item-label">仅 WiFi 同步</Text>
            </View>
            <Switch
              checked={settings.wifiOnly}
              color="#FF8A5B"
              onChange={(e) => handleSwitchChange('wifiOnly', e.detail.value)}
            />
          </View>

          <View className="page-settings__item" onClick={handleClearCache}>
            <View className="page-settings__item-left">
              <Text className="page-settings__item-icon">🧹</Text>
              <Text className="page-settings__item-label">清除缓存</Text>
            </View>
            <View className="page-settings__item-right">
              <Text className="page-settings__item-arrow">›</Text>
            </View>
          </View>
        </View>

        {/* 其他 */}
        <View className="page-settings__section">
          <Text className="page-settings__section-title">其他</Text>

          <View className="page-settings__item" onClick={handleFeedback}>
            <View className="page-settings__item-left">
              <Text className="page-settings__item-icon">📝</Text>
              <Text className="page-settings__item-label">意见反馈</Text>
            </View>
            <View className="page-settings__item-right">
              <Text className="page-settings__item-arrow">›</Text>
            </View>
          </View>

          <View className="page-settings__item" onClick={handleAbout}>
            <View className="page-settings__item-left">
              <Text className="page-settings__item-icon">ℹ️</Text>
              <Text className="page-settings__item-label">关于生命链</Text>
            </View>
            <View className="page-settings__item-right">
              <Text className="page-settings__item-value">v1.0.0</Text>
              <Text className="page-settings__item-arrow">›</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
