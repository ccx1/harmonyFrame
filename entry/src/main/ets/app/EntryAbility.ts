
import BaseAbilityImp from '../base/BaseAbilityImp';
import { KV_STORE_IDS } from '../const/Conts';
import EntryPresenter from '../presenter/entry/EntryPresenter';
import { getIns } from '../utils/EventBus';
import { rq } from '../utils/HttpManager';
import { initStore } from '../utils/KVStoreUtils';
import Logger from '../utils/Logger'
import { setScreenLight } from '../utils/SystemUtils';
import Want from '@ohos.app.ability.Want';


// 单实例活动窗口
export default class EntryAbility extends BaseAbilityImp<EntryPresenter> {

  initView(want:Want): void {
    initStore(KV_STORE_IDS);

    getIns().register("aaa",()=>{
      // 点击
      // this.start('pages/Index2')
      console.log("1234")

    })

    getIns().register("bbb",()=>{
      Logger.log("收到页面2消息")
      setScreenLight(1)
    })

  }


  initPresenter(): EntryPresenter {
    return new EntryPresenter()
  }

  pageContent(): string {
    return 'pages/Index'
  }
}
