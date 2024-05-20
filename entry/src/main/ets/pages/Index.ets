//代表入口组件
import { getIns } from '../utils/EventBus'
@Entry
@Component
struct Index {
  @State message: string = '1'

  build() {
    // StatusLayout(){
      Row() {
        Column() {
          Text(this.message)
            .fontSize(50)
            .fontWeight(FontWeight.Bold)
            .onClick(()=>{
              getIns().post("aaa","????")

            })
            .id("txt")
          Text(this.message)
            .fontSize(50)
            .fontWeight(FontWeight.Bold)
          Text(this.message)
            .fontSize(50)
            .fontWeight(FontWeight.Bold)
            .onClick(()=>{
              // globalThis.
            })
        }.id("txt1")
        .width('100%')
      }
      .height('100%')
    // }.height('100%')

  }
}