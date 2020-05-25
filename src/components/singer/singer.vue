<template>
  <div class="singer">
     <listview :data="singers" ></listview>
  </div>
</template>

<script>
import pinyin from 'js-pinyin'

import Singer from 'common/js/singer'
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import listview  from 'base/listview/listview'

const HOT_LEN = 10
const HOT_NAME = '热门'

export default {
  data() {
    return {
      a: 32,
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.data.code === ERR_OK) {
          // this.singers = res.data
          this.singers=this._normalizeSinger(res.data.data.singerlist)
        }
      })
    },
    _normalizeSinger(list) {
      let singerMap = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.sort((a, b) => {
        let aInitials = pinyin.getCamelChars(a.singer_name).toUpperCase().charAt(0)
        let bInitials = pinyin.getCamelChars(b.singer_name).toUpperCase().charAt(0)
        a['singer_index'] = aInitials
        b['singer_index'] = bInitials
        return aInitials.charCodeAt() - bInitials.charCodeAt()
      })
      list.forEach((item, index) => {
        let singer = new Singer({
          singer_id: item.singer_id,
          singer_name: item.singer_name,
          singer_mid: item.singer_mid,
          singer_index: item.singer_index
        })
        if (index < HOT_LEN) {
          singerMap.hot.items.push(singer)
        }
        if (!singerMap[singer.index]) {
          singerMap[singer.index] = {
            title: singer.index,
            items: []
          }
          singerMap[singer.index].items.push(singer)
        } else {
          singerMap[singer.index].items.push(singer)
        }
      })
    
      let ret=[];

      for(let key in singerMap){
            ret.push(singerMap[key])
      }
     return ret
    }
  },
  components:{
    listview
    }
  
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
