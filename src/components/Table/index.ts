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
    width: 80,
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
    align: 'center'
  },
  {
    title: '其他操作',
    dataIndex: 'kolId',
    scopedSlots: { customRender: 'kolId' },
    align: 'center'
  }
]

// 掉粉榜
export const rankOff = [
  {
    title: '排行',
    dataIndex: 'top',
    width: 80,
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
    align: 'center'
  },
  {
    title: '其他操作',
    dataIndex: 'kolId',
    scopedSlots: { customRender: 'kolId' },
    align: 'center'
  }
]
