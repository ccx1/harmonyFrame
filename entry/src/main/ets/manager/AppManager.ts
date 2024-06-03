
import common from '@ohos.app.ability.common'
let AppContext:common.AbilityStageContext = null


let AbilityContext:common.UIAbilityContext = null

export function registerApplicationContext(context:common.AbilityStageContext){
    AppContext = context
}


export function getApplicationContext(): common.ApplicationContext{
    return AppContext.getApplicationContext()
}

export function registerAbilityContext(context:common.UIAbilityContext){
    AbilityContext = context
}


export function getAbilityContext(){
    return AbilityContext
}