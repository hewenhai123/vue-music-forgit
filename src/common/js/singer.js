
export default class Singer {
  constructor({ singer_id, singer_name, singer_mid,singer_index }) {
    this.id = singer_id
    this.mid = singer_mid
    this.name = singer_name
    this.index=singer_index
    this.avatar = `http://y.gtimg.cn/music/photo_new/T001R150x150M000${singer_mid}.webp`
  }
}
