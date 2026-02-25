export const mockStageConfigs: Record<string, Record<string, unknown>> = {
  childhood: {
    milestones: [
      { name: '第一次微笑', monthAge: 2, description: '社交性微笑的出现', enabled: true },
      { name: '翻身', monthAge: 4, description: '从仰卧翻到俯卧', enabled: true },
      { name: '独坐', monthAge: 6, description: '能够独自坐稳', enabled: true },
      { name: '爬行', monthAge: 8, description: '开始手膝爬行', enabled: true },
      { name: '站立', monthAge: 10, description: '扶站到独站', enabled: true },
      { name: '行走', monthAge: 12, description: '独立行走', enabled: true },
      { name: '说话', monthAge: 14, description: '有意义的词语表达', enabled: true },
    ],
    comfortConfig: { maxDailyPush: 5, minInterval: 30 },
  },
  adolescence: {
    learningModes: [
      { name: '番茄学习法', trigger: '用户启动学习模式', timeLimit: '25分钟', enabled: true },
      { name: '深度阅读模式', trigger: '检测到长时间阅读行为', timeLimit: '45分钟', enabled: true },
      { name: '考试冲刺模式', trigger: '用户手动设定考试日期', timeLimit: '2小时', enabled: false },
    ],
    diaryPrompts: [
      { prompt: '今天最让你开心的一件事是什么？', emotion: '积极', priority: 1 },
      { prompt: '有什么烦心事想跟我说说吗？', emotion: '消极', priority: 2 },
      { prompt: '今天学到了什么新东西？', emotion: '中性', priority: 3 },
      { prompt: '给自己今天的表现打个分吧！', emotion: '中性', priority: 4 },
    ],
  },
  youth: {
    lifeChoices: [
      { name: '职业发展', optionCount: 8, description: '就业、创业、深造、转行等' },
      { name: '感情生活', optionCount: 5, description: '恋爱、婚姻、分手应对等' },
      { name: '生活方式', optionCount: 6, description: '独居、合租、城市选择等' },
      { name: '财务规划', optionCount: 4, description: '储蓄、投资、消费观等' },
    ],
    valueLabels: [
      { label: '自由', color: 'blue', usageCount: 1256 },
      { label: '成长', color: 'green', usageCount: 1089 },
      { label: '家庭', color: 'orange', usageCount: 987 },
      { label: '创造', color: 'purple', usageCount: 756 },
      { label: '健康', color: 'red', usageCount: 654 },
      { label: '友情', color: 'cyan', usageCount: 543 },
    ],
  },
  middle_age: {
    familyEvents: [
      { category: '子女教育', subCount: 6, description: '入学、考试、兴趣培养', priority: '高' },
      { category: '家庭健康', subCount: 4, description: '体检、慢病管理、健康习惯', priority: '高' },
      { category: '亲子关系', subCount: 5, description: '沟通方式、代沟处理', priority: '中' },
      { category: '婚姻维护', subCount: 3, description: '纪念日、情感交流', priority: '中' },
      { category: '赡养父母', subCount: 4, description: '健康照护、情感陪伴', priority: '高' },
      { category: '职业平衡', subCount: 3, description: '加班管理、家庭时间', priority: '低' },
    ],
  },
  old_age: {
    interviewTemplates: [
      { name: '童年回忆', topic: '儿时的家、学校和玩伴', questionCount: 12, duration: '30分钟' },
      { name: '青春岁月', topic: '求学、初恋和梦想', questionCount: 15, duration: '40分钟' },
      { name: '家庭故事', topic: '婚姻、子女和家庭大事', questionCount: 18, duration: '45分钟' },
      { name: '职业生涯', topic: '工作经历、成就和挑战', questionCount: 14, duration: '35分钟' },
      { name: '人生智慧', topic: '感悟、建议和遗愿', questionCount: 10, duration: '25分钟' },
    ],
  },
}
