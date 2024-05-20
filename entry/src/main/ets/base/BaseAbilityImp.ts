import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';
import { getIns } from '../utils/EventBus';
import Logger from '../utils/Logger';
import BaseAbility from './BaseAbility';
import BasePresenter from './BasePresenter';
import router from '@ohos.router';
import featureAbility from '@ohos.ability.featureAbility'

export default abstract class BaseAbilityImp<T extends BasePresenter> extends UIAbility implements BaseAbility {

  presenter: T = null

  // 创建
  onCreate(want, launchParam) {


    this.presenter = this.initPresenter();
    this.presenter?.attachContext(this.context)
    this.presenter?.init()




    this.initView(want);
  }


  // 窗口创建
  onWindowStageCreate(windowStage: window.WindowStage) {
    // Main window is created, set main page for this ability
    windowStage.loadContent(this.pageContent(), (err, data) => {
    });
  }

  // 销毁
  onDestroy() {
    this.presenter?.onDestroy();
  }



  abstract initView(want): void;

  abstract initPresenter(): T;


  abstract pageContent(): string

  // window销毁
  onWindowStageDestroy() {

  }

  // 窗口前台
  onForeground() {

  }

  // 窗口后台
  onBackground() {

  }



  start(
    page: string,
    params?: any
  ) {
    router.pushUrl({
      url: page,
      params
    })
  }


  onSupportBack(): false {
    return false
  }

  back(option?) {
    if (this.onSupportBack()) {
      return;
    }
    router.back(option);
  }
}
