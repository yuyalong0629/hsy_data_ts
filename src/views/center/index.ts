// 会员权限Tab Title
export const columns = [
  {
    title: '会员特权',
    dataIndex: 'privilege',
    align: 'center',
    width: 350,
    key: 'privilege'
  },
  {
    title: '高级版会员',
    dataIndex: 'senior',
    align: 'center',
    key: 'senior',
    scopedSlots: { customRender: 'senior' }
  },
  {
    title: '专业版会员',
    dataIndex: 'professional',
    align: 'center',
    key: 'professional',
    scopedSlots: { customRender: 'professional' }
  },
  {
    title: '企业版会员',
    dataIndex: 'enterprise',
    align: 'center',
    key: 'enterprise',
    scopedSlots: { customRender: 'enterprise' }
  }
]

// 会员权限Tab Data
// 会员权限Tab Data
export const data = [
  {
    key: '1',
    privilege: '电脑同时登录台数',
    senior: '5台',
    professional: '5台',
    enterprise: '5台'
  },
  {
    key: '2',
    privilege: '支持添加子账号数',
    senior: '5个',
    professional: '5个',
    enterprise: '5个'
  },
  {
    key: '3',
    privilege: '高级搜索',
    senior: '0',
    professional: '1',
    enterprise: '1'
  },
  {
    key: '4',
    privilege: '账号内作品内容搜索',
    senior: '0',
    professional: '1',
    enterprise: '1'
  },
  {
    key: '5',
    privilege: '全网作品内容搜索',
    senior: '0',
    professional: '1',
    enterprise: '1'
  },
  {
    key: '6',
    privilege: '搜索展示数量',
    senior: '前100',
    professional: '前100',
    enterprise: '前100'
  },
  {
    key: '7',
    privilege: '投前分析次数',
    senior: '200次/月',
    professional: '200次/月',
    enterprise: '200次/月'
  },
  {
    key: '8',
    privilege: '账号排行榜展示数量',
    senior: 'Top50',
    professional: 'Top50',
    enterprise: 'Top50'
  },
  {
    key: '9',
    privilege: '收藏账号数量',
    senior: '200个',
    professional: '200个',
    enterprise: '200个'
  },
  {
    key: '10',
    privilege: '对发布作品即时监控',
    senior: '100次/月',
    professional: '100次/月',
    enterprise: '100次/月'
  },
  {
    key: '11',
    privilege: '对账号预约监控',
    senior: '50次/月',
    professional: '50次/月',
    enterprise: '50次/月'
  },
  {
    key: '12',
    privilege: '数据监控时长',
    senior: '24小时',
    professional: '24小时',
    enterprise: '24小时'
  },
  {
    key: '13',
    privilege: '数据监控次数',
    senior: '15次/月',
    professional: '15次/月',
    enterprise: '15次/月'
  }
]
