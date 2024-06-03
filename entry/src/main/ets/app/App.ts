
import AbilityStage from '@ohos.app.ability.AbilityStage'

import { registerApplicationContext } from '../manager/AppManager'


export default class App extends AbilityStage{
  onCreate() {
    registerApplicationContext(this.context)
  }

}
