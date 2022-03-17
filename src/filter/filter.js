// 播放量过滤器
let formatPlayer = val => {
  if (val < 10000) { return val } else {
    return (val / 10000) >= 10000 ? (val / 100000000).toFixed(1) + '亿' : (val / 10000).toFixed(1) + '万';
  }
}

// 歌曲时间过滤器
let formatPlayTime = time => {
    // 1. 将毫秒转化为分
    let m = parseInt(time / (1000 * 60))
    let s = parseInt(((time % (1000 * 60)) / 1000) % 60)
    if (m <= 9) {
      m = "0" + m
    }
    if (s < 10) {
      s = "0" + s
    }
    return m + ":" + s
}

export { formatPlayer, formatPlayTime };