import type { ITicket, IFeedback } from '@/services/support.service'

export const mockTicketData: ITicket[] = [
  { id: 'T20260224001', user: '张三', title: '无法上传语音记忆', priority: '高', status: '待处理', createdAt: '2026-02-24T14:30:00Z' },
  { id: 'T20260224002', user: '李四', title: '对话响应速度慢', priority: '中', status: '处理中', createdAt: '2026-02-24T10:15:00Z' },
  { id: 'T20260223003', user: '王五', title: '人格设置不生效', priority: '高', status: '待处理', createdAt: '2026-02-23T18:20:00Z' },
  { id: 'T20260223004', user: '赵六', title: '记忆时间轴显示异常', priority: '低', status: '已完成', createdAt: '2026-02-23T09:45:00Z' },
  { id: 'T20260222005', user: '孙七', title: '账号无法登录', priority: '高', status: '已完成', createdAt: '2026-02-22T20:00:00Z' },
  { id: 'T20260222006', user: '周八', title: '照片上传失败', priority: '中', status: '处理中', createdAt: '2026-02-22T16:30:00Z' },
  { id: 'T20260221007', user: '吴九', title: '通知设置无法保存', priority: '低', status: '待处理', createdAt: '2026-02-21T11:00:00Z' },
  { id: 'T20260220008', user: '郑雅', title: '小程序端闪退', priority: '高', status: '处理中', createdAt: '2026-02-20T09:20:00Z' },
  { id: 'T20260219009', user: '冯涛', title: '记忆搜索无结果', priority: '中', status: '待处理', createdAt: '2026-02-19T15:40:00Z' },
  { id: 'T20260218010', user: '陈慧', title: '修改密码后无法登录', priority: '高', status: '已完成', createdAt: '2026-02-18T08:00:00Z' },
  { id: 'T20260217011', user: '褚玲', title: '语音识别结果不准确', priority: '中', status: '已完成', createdAt: '2026-02-17T13:50:00Z' },
  { id: 'T20260216012', user: '卫东', title: '视频播放卡顿', priority: '低', status: '处理中', createdAt: '2026-02-16T17:25:00Z' },
  { id: 'T20260215013', user: '蒋明', title: '数据导出失败', priority: '中', status: '待处理', createdAt: '2026-02-15T10:10:00Z' },
]

export const mockFeedbackData: IFeedback[] = [
  { id: 'fb-001', user: '张三', type: 'Bug', summary: '在老年模式下字体大小调整无效', rating: 2, createdAt: '2026-02-24T15:00:00Z' },
  { id: 'fb-002', user: '李四', type: '建议', summary: '希望增加家庭相册功能', rating: 4, createdAt: '2026-02-24T12:30:00Z' },
  { id: 'fb-003', user: '王五', type: '投诉', summary: '对话内容审核误判导致记忆丢失', rating: 1, createdAt: '2026-02-23T19:00:00Z' },
  { id: 'fb-004', user: '赵六', type: '建议', summary: '希望支持方言语音识别', rating: 5, createdAt: '2026-02-23T08:20:00Z' },
  { id: 'fb-005', user: '孙七', type: 'Bug', summary: '小程序端图片加载缓慢', rating: 3, createdAt: '2026-02-22T21:10:00Z' },
  { id: 'fb-006', user: '周八', type: '建议', summary: '增加记忆导出为PDF的功能', rating: 4, createdAt: '2026-02-22T14:45:00Z' },
  { id: 'fb-007', user: '吴九', type: '投诉', summary: '付费后功能未及时开通', rating: 1, createdAt: '2026-02-21T10:30:00Z' },
  { id: 'fb-008', user: '郑雅', type: '建议', summary: '希望增加夜间模式自动切换', rating: 5, createdAt: '2026-02-20T16:00:00Z' },
  { id: 'fb-009', user: '冯涛', type: 'Bug', summary: '记忆分享链接打不开', rating: 2, createdAt: '2026-02-19T11:20:00Z' },
  { id: 'fb-010', user: '陈慧', type: '建议', summary: '增加生日提醒功能', rating: 4, createdAt: '2026-02-18T09:30:00Z' },
  { id: 'fb-011', user: '褚玲', type: '投诉', summary: '客服回复太慢', rating: 2, createdAt: '2026-02-17T14:15:00Z' },
  { id: 'fb-012', user: '卫东', type: 'Bug', summary: '安卓端通知推送不及时', rating: 3, createdAt: '2026-02-16T19:40:00Z' },
  { id: 'fb-013', user: '蒋明', type: '建议', summary: '希望支持多语言界面', rating: 5, createdAt: '2026-02-15T08:50:00Z' },
]

// ============ 人工介入记录 ============

export const mockInterventions = [
  { id: 'iv-001', user: '王五', trigger: '持续悲伤预警', emotion: '悲伤', startTime: '2026-02-24 10:30', endTime: '2026-02-24 11:15', operator: '客服-小李', result: '情绪缓解', notes: '用户因家庭矛盾情绪低落，经安抚后情绪恢复' },
  { id: 'iv-002', user: '孙七', trigger: '焦虑加重预警', emotion: '焦虑', startTime: '2026-02-23 15:00', endTime: '2026-02-23 16:00', operator: '心理咨询师-王老师', result: '转介专业服务', notes: '用户持续焦虑，建议寻求专业心理咨询' },
  { id: 'iv-003', user: '冯涛', trigger: '愤怒频发预警', emotion: '愤怒', startTime: '2026-02-21 14:00', endTime: '2026-02-21 14:30', operator: '客服-小张', result: '情绪缓解', notes: '用户因工作压力情绪激动，引导放松后好转' },
  { id: 'iv-004', user: '郑雅', trigger: '情绪波动预警', emotion: '波动', startTime: '2026-02-22 09:30', endTime: '2026-02-22 10:00', operator: '客服-小李', result: '自然恢复', notes: '用户情绪自行恢复，仅做记录跟踪' },
  { id: 'iv-005', user: '陈慧', trigger: '长期低落预警', emotion: '悲伤', startTime: '2026-02-20 08:45', endTime: '2026-02-20 10:00', operator: '心理咨询师-刘老师', result: '持续关注', notes: '用户丧亲后长期低落，安排定期回访' },
  { id: 'iv-006', user: '张三', trigger: '手动触发', emotion: '恐惧', startTime: '2026-02-19 22:00', endTime: '2026-02-19 22:40', operator: '客服-小张', result: '情绪缓解', notes: '用户深夜恐惧求助，陪伴安抚后入睡' },
]

// ============ FAQ 管理 ============

export const mockFAQs = [
  { id: 'faq-001', question: '如何录入语音记忆？', answer: '在APP首页点击"+"按钮，选择"语音记录"，按住录音按钮开始录制，松开即可保存。', category: '功能使用', views: 1245, helpful: 892, createdAt: '2026-01-10', updatedAt: '2026-02-20' },
  { id: 'faq-002', question: '如何修改数字人的性格？', answer: '进入"我的数字人"页面，点击"人格设置"，可以调整语气、性格倾向、兴趣标签等参数。', category: '功能使用', views: 987, helpful: 756, createdAt: '2026-01-10', updatedAt: '2026-02-18' },
  { id: 'faq-003', question: '记忆数据会被泄露吗？', answer: '您的记忆数据使用端到端加密存储，仅您本人和授权的继承人可以访问。我们严格遵守数据保护法规。', category: '隐私安全', views: 2340, helpful: 2100, createdAt: '2026-01-10', updatedAt: '2026-02-15' },
  { id: 'faq-004', question: '如何设置数字遗产继承人？', answer: '在"设置 > 数字资产 > 继承人管理"中，添加继承人信息并完成身份验证即可。', category: '数字资产', views: 567, helpful: 423, createdAt: '2026-01-15', updatedAt: '2026-02-10' },
  { id: 'faq-005', question: '支持哪些语言的语音识别？', answer: '目前支持普通话、粤语和英语，方言识别功能正在测试中，敬请期待。', category: 'AI功能', views: 789, helpful: 534, createdAt: '2026-01-20', updatedAt: '2026-02-12' },
  { id: 'faq-006', question: '如何导出我的所有记忆？', answer: '在"设置 > 数据管理 > 导出数据"中选择导出范围和格式（PDF/JSON），系统将在24小时内生成下载链接。', category: '数据管理', views: 432, helpful: 356, createdAt: '2026-02-01', updatedAt: '2026-02-22' },
  { id: 'faq-007', question: '硬件设备如何配对？', answer: '打开设备电源，确保蓝牙/WiFi开启，在APP中进入"设备管理"扫描附近设备，按提示完成配对。', category: '硬件设备', views: 345, helpful: 267, createdAt: '2026-02-05', updatedAt: '2026-02-20' },
  { id: 'faq-008', question: '情绪危机时会自动通知家人吗？', answer: '当检测到严重情绪危机时，系统会根据您的设置通知紧急联系人。您可以在"设置 > 紧急联系人"中配置。', category: '健康安全', views: 1123, helpful: 980, createdAt: '2026-02-08', updatedAt: '2026-02-24' },
]
