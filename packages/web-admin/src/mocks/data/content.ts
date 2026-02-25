import type { IComfortContent, ICorpus, IReviewItem } from '@/services/content.service'

export const mockComfortData: IComfortContent[] = [
  { id: 'comfort-001', title: '星空下的小熊', type: '故事', stage: 'childhood', status: '已发布', createdAt: '2026-02-20T10:00:00Z' },
  { id: 'comfort-002', title: '雨后的彩虹', type: '故事', stage: 'childhood', status: '草稿', createdAt: '2026-02-19T14:30:00Z' },
  { id: 'comfort-003', title: '轻柔钢琴曲集', type: '音乐', stage: 'youth', status: '已发布', createdAt: '2026-02-18T09:15:00Z' },
  { id: 'comfort-004', title: '冥想引导视频', type: '视频', stage: 'middle_age', status: '已发布', createdAt: '2026-02-17T16:00:00Z' },
  { id: 'comfort-005', title: '晚安故事系列', type: '故事', stage: 'old_age', status: '已发布', createdAt: '2026-02-16T20:00:00Z' },
  { id: 'comfort-006', title: '自然白噪音', type: '音乐', stage: 'adolescence', status: '草稿', createdAt: '2026-02-15T11:30:00Z' },
  { id: 'comfort-007', title: '呼吸练习教程', type: '视频', stage: 'youth', status: '已发布', createdAt: '2026-02-14T08:45:00Z' },
  { id: 'comfort-008', title: '森林漫步音频', type: '音乐', stage: 'middle_age', status: '已发布', createdAt: '2026-02-13T15:20:00Z' },
  { id: 'comfort-009', title: '小王子有声书', type: '故事', stage: 'childhood', status: '已发布', createdAt: '2026-02-12T10:10:00Z' },
  { id: 'comfort-010', title: '瑜伽放松指南', type: '视频', stage: 'youth', status: '草稿', createdAt: '2026-02-11T17:00:00Z' },
  { id: 'comfort-011', title: '古典音乐精选', type: '音乐', stage: 'old_age', status: '已发布', createdAt: '2026-02-10T09:30:00Z' },
  { id: 'comfort-012', title: '青春成长日记', type: '故事', stage: 'adolescence', status: '已发布', createdAt: '2026-02-09T14:00:00Z' },
  { id: 'comfort-013', title: '正念冥想入门', type: '视频', stage: 'middle_age', status: '草稿', createdAt: '2026-02-08T11:45:00Z' },
]

export const mockCorpusData: ICorpus[] = [
  { id: 'corpus-001', category: '日常问候', question: '你好，今天过得怎么样？', template: '你好呀！今天{weather}，希望你心情和天气一样好~', frequency: 1280 },
  { id: 'corpus-002', category: '情绪安抚', question: '我今天心情不好', template: '我能感受到你现在不太开心，愿意和我说说发生了什么吗？', frequency: 892 },
  { id: 'corpus-003', category: '记忆引导', question: '帮我记录一下今天的事', template: '好的，让我们一起记录这个美好的瞬间吧。今天发生了什么特别的事呢？', frequency: 756 },
  { id: 'corpus-004', category: '睡前陪伴', question: '我睡不着', template: '夜深了还没睡着呀，要不要我给你讲个轻松的故事？', frequency: 634 },
  { id: 'corpus-005', category: '节日祝福', question: '今天是什么节日', template: '今天是{holiday}，祝你{wish}！要不要记录一下今天的感受？', frequency: 423 },
  { id: 'corpus-006', category: '健康关怀', question: '我头疼', template: '头疼可要注意休息哦，多喝温水，如果持续不舒服建议去看医生。', frequency: 312 },
  { id: 'corpus-007', category: '学习鼓励', question: '考试没考好', template: '一次考试说明不了什么，重要的是你一直在努力。我们来聊聊接下来怎么调整吧？', frequency: 567 },
  { id: 'corpus-008', category: '亲情引导', question: '想念爸妈了', template: '思念亲人是很温暖的情感呢。要不要给他们打个电话，或者写一段想说的话？', frequency: 489 },
  { id: 'corpus-009', category: '人生哲理', question: '感觉生活没有意义', template: '每个人都会有这样的时刻。让我们一起回顾一下那些让你感到快乐的记忆吧。', frequency: 345 },
  { id: 'corpus-010', category: '运动激励', question: '不想运动', template: '哪怕散步十分钟也很棒！身体动起来，心情也会跟着变好的~', frequency: 278 },
  { id: 'corpus-011', category: '社交引导', question: '不知道怎么交朋友', template: '交朋友最重要的是真诚。试着从共同的兴趣开始，你有什么爱好呢？', frequency: 198 },
  { id: 'corpus-012', category: '工作减压', question: '工作压力好大', template: '工作辛苦了！先深呼吸三次，然后我们一起想想怎么把大任务拆解成小步骤？', frequency: 721 },
]

export const mockReviewData: IReviewItem[] = [
  { id: 'review-001', summary: '用户自创故事：我的童年小狗', submitter: '张三', type: '故事', submitTime: '2026-02-24 14:30', status: '待审核' },
  { id: 'review-002', summary: '用户上传音频：妈妈的摇篮曲', submitter: '李四', type: '音频', submitTime: '2026-02-24 10:15', status: '待审核' },
  { id: 'review-003', summary: '用户分享记忆：毕业典礼照片', submitter: '王五', type: '图片', submitTime: '2026-02-23 18:20', status: '已通过' },
  { id: 'review-004', summary: '用户自创对话模板', submitter: '赵六', type: '文本', submitTime: '2026-02-23 09:45', status: '已拒绝' },
  { id: 'review-005', summary: '用户上传视频：家庭聚会', submitter: '孙七', type: '视频', submitTime: '2026-02-22 20:00', status: '待审核' },
  { id: 'review-006', summary: '用户分享故事：外婆的厨房', submitter: '周八', type: '故事', submitTime: '2026-02-22 16:30', status: '已通过' },
  { id: 'review-007', summary: '用户上传照片：第一次骑自行车', submitter: '吴九', type: '图片', submitTime: '2026-02-21 12:00', status: '待审核' },
  { id: 'review-008', summary: '用户自创诗歌：致青春', submitter: '郑雅', type: '文本', submitTime: '2026-02-21 09:30', status: '已通过' },
  { id: 'review-009', summary: '用户上传音频：爷爷讲的故事', submitter: '冯涛', type: '音频', submitTime: '2026-02-20 21:15', status: '待审核' },
  { id: 'review-010', summary: '用户分享记忆：第一份工作', submitter: '陈慧', type: '故事', submitTime: '2026-02-20 15:45', status: '已拒绝' },
  { id: 'review-011', summary: '用户上传视频：孩子学走路', submitter: '褚玲', type: '视频', submitTime: '2026-02-19 18:30', status: '待审核' },
  { id: 'review-012', summary: '用户自创故事：海边的夏天', submitter: '卫东', type: '故事', submitTime: '2026-02-19 10:00', status: '已通过' },
]

// ============ 阶段素材库 ============

export interface IStageMaterial {
  id: string
  title: string
  type: string
  stage: string
  category: string
  fileSize: string
  status: string
  uploadedBy: string
  createdAt: string
}

export const mockStageMaterials: IStageMaterial[] = [
  { id: 'sm-001', title: '儿童成长里程碑图集', type: '图片', stage: 'childhood', category: '成长记录', fileSize: '15.2 MB', status: '已发布', uploadedBy: 'admin', createdAt: '2026-02-20 10:00' },
  { id: 'sm-002', title: '青少年情绪管理指南', type: '文档', stage: 'adolescence', category: '心理辅导', fileSize: '3.4 MB', status: '已发布', uploadedBy: 'admin', createdAt: '2026-02-19 14:30' },
  { id: 'sm-003', title: '青年职场故事集', type: '音频', stage: 'youth', category: '职业发展', fileSize: '28.7 MB', status: '已发布', uploadedBy: '运营', createdAt: '2026-02-18 09:15' },
  { id: 'sm-004', title: '中年家庭关系课程', type: '视频', stage: 'middle_age', category: '家庭关系', fileSize: '156 MB', status: '审核中', uploadedBy: '运营', createdAt: '2026-02-17 16:00' },
  { id: 'sm-005', title: '老年回忆访谈模板', type: '文档', stage: 'old_age', category: '回忆录', fileSize: '1.2 MB', status: '已发布', uploadedBy: 'admin', createdAt: '2026-02-16 20:00' },
  { id: 'sm-006', title: '儿童睡前故事音频包', type: '音频', stage: 'childhood', category: '安抚内容', fileSize: '45.8 MB', status: '已发布', uploadedBy: '运营', createdAt: '2026-02-15 11:30' },
  { id: 'sm-007', title: '青少年学习激励视频', type: '视频', stage: 'adolescence', category: '学习激励', fileSize: '89 MB', status: '草稿', uploadedBy: 'admin', createdAt: '2026-02-14 08:45' },
  { id: 'sm-008', title: '中年健康管理素材', type: '图片', stage: 'middle_age', category: '健康管理', fileSize: '22.3 MB', status: '已发布', uploadedBy: '运营', createdAt: '2026-02-13 15:20' },
  { id: 'sm-009', title: '老年太极教学视频', type: '视频', stage: 'old_age', category: '健康运动', fileSize: '234 MB', status: '已发布', uploadedBy: 'admin', createdAt: '2026-02-12 10:10' },
  { id: 'sm-010', title: '全阶段节日贺卡模板', type: '图片', stage: 'all', category: '节日素材', fileSize: '8.5 MB', status: '已发布', uploadedBy: '运营', createdAt: '2026-02-11 17:00' },
]
