import UIAbility from '@ohos.app.ability.UIAbility';
import common from '@ohos.app.ability.common';


export default abstract class BasePresenter {

  context:common.UIAbilityContext = null

  attachContext(context:common.UIAbilityContext){
    this.context = context;
  }


  abstract init(): void;

  onDestroy(){

  }
}