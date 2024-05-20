
let AppContext = null


let AbilityContext = null

export function registerApplicationContext(context){
    AppContext = context
}


export function getApplicationContext(){
    return AppContext
}

export function registerAbilityContext(context){
    AbilityContext = context
}


export function getAbilityContext(){
    return AbilityContext
}