import BaseAbilityImp from '../base/BaseAbilityImp';
import { KV_STORE_IDS } from '../const/Conts';
import EntryPresenter from '../presenter/entry/EntryPresenter';
import { getIns } from '../utils/EventBus';
import { initStore } from '../utils/KVStoreUtils';
import Logger from '../utils/Logger'
import { setScreenLight } from '../utils/SystemUtils';


// 单实例活动窗口
export default class EntryAbility extends BaseAbilityImp<EntryPresenter> {

  initView(want): void {
    initStore(KV_STORE_IDS);
    getIns().register("aaa",()=>{
      // 点击
      this.start('pages/Index2')
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
