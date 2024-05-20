import UIAbility from '@ohos.app.ability.UIAbility';


export default abstract class BasePresenter {

  context = null

  attachContext(context){
    this.context = context;
  }


  abstract init(): void;

  onDestroy(){

  }
}