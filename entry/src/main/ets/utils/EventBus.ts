import BaseAbilityImp from '../base/BaseAbilityImp';
import Ability from '@ohos.app.ability.Ability';
import UIAbility from '@ohos.app.ability.UIAbility';
interface Event{
    event:string,
    callback: Function
}

class EventBus {

    eventBus:Map<string,Function> = new Map()


    register(event:string, callback:Function){
        this.eventBus.set(event,callback)
    }


    post(event, params){
        const callback = this.eventBus.get(event)
        callback && callback(params)
    }

}

const event = new EventBus();


export function getIns(){
    return event;
}