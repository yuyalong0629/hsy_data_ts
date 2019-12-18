// rank tabs
export const rankColumns = [
  {
    title: '排行',
    dataIndex: 'top',
    width: 80,
    align: 'center'
  },
  {
    title: '媒体主',
    dataIndex: 'media',
    className: 'rank-tab-media',
    scopedSlots: { customRender: 'media' },
    width: 280
  },
  {
    // title: '粉丝数',
    slots: { title: 'fansTitle' },
    dataIndex: 'fansNum',
    align: 'center'
  },
  {
    title: '平均播放数',
    dataIndex: 'avgPlayNum',
    align: 'center'
  },
  {
    title: '平均评论数',
    dataIndex: 'avgCommentNum',
    align: 'center'
  },
  {
    slots: { title: 'cloudsTitle' },
    dataIndex: 'indexNum',
    align: 'center'
  },
  {
    title: '其他操作',
    dataIndex: 'kolId',
    scopedSlots: { customRender: 'kolId' },
    align: 'center'
  }
]

// 涨粉榜
export const rankRose = [
  {
    title: '排行',
    dataIndex: 'top',
    width: 100,
    align: 'center'
  },
  {
    title: '媒体主',
    dataIndex: 'media',
    scopedSlots: { customRender: 'media' },
    width: 280
  },
  {
    title: '涨粉数',
    dataIndex: 'fansNum',
    scopedSlots: { customRender: 'fansNum' },
    align: 'center'
  }
  // {
  //   title: '其他操作',
  //   dataIndex: 'kolId',
  //   scopedSlots: { customRender: 'kolId' },
  //   align: 'center'
  // }
]

// 掉粉榜
export const rankOff = [
  {
    title: '排行',
    dataIndex: 'top',
    width: 100,
    align: 'center'
  },
  {
    title: '媒体主',
    dataIndex: 'media',
    scopedSlots: { customRender: 'media' },
    width: 280
  },
  {
    title: '掉粉数',
    dataIndex: 'fansNum',
    scopedSlots: { customRender: 'fansNum' },
    align: 'center'
  }
  // {
  //   title: '其他操作',
  //   dataIndex: 'kolId',
  //   scopedSlots: { customRender: 'kolId' },
  //   align: 'center'
  // }
]

// 收藏列表
export const collection = [
  {
    title: '特权功能',
    dataIndex: 'media',
    scopedSlots: { customRender: 'media' },
    width: 300
  },
  {
    title: '分组',
    dataIndex: 'sortFlag',
    width: 320
  },
  {
    title: '收藏',
    dataIndex: 'createTime'
  },
  {
    title: '查看详情',
    dataIndex: 'kolId',
    scopedSlots: { customRender: 'kolId' }
  },
  {
    title: '其他操作',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  }
]

// 会员权限Tab Title
export const permissionColumns = [
  {
    slots: { title: 'summaryTitle' },
    dataIndex: 'summary',
    align: 'center',
    width: 220,
    key: 'summary'
  },
  {
    slots: { title: 'LV-1Title' },
    dataIndex: 'LV-1',
    align: 'center',
    width: 150,
    key: 'LV-1',
    scopedSlots: { customRender: 'LV-1' }
  },
  {
    slots: { title: 'LV0Title' },
    dataIndex: 'LV0',
    align: 'center',
    width: 160,
    key: 'LV0',
    scopedSlots: { customRender: 'LV0' }
  },
  {
    slots: { title: 'LV1Title' },
    dataIndex: 'LV1',
    align: 'center',
    key: 'LV1',
    scopedSlots: { customRender: 'LV1' }
  },
  {
    slots: { title: 'LV2Title' },
    dataIndex: 'LV2',
    align: 'center',
    key: 'LV2',
    scopedSlots: { customRender: 'LV2' }
  },
  {
    slots: { title: 'LV3Title' },
    dataIndex: 'LV3',
    align: 'center',
    key: 'LV3',
    scopedSlots: { customRender: 'LV3' }
  }
]
