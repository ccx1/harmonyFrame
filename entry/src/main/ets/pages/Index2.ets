import router from '@ohos.router';
import EntryAbility from '../app/EntryAbility';
import common from '@ohos.app.ability.common';
import { getIns } from '../utils/EventBus';


@Entry
@Component
struct Index {
  @State message: string = '333333'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(()=>{

            getIns().post("bbb","????")
          })

      }.id("txt1")
      .width('100%')
    }
    .height('100%')
  }
}