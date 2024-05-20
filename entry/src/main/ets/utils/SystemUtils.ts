import inputMethod from '@ohos.inputMethod';


export function inputManage(): Promise<boolean> {

  const inputMethodController = inputMethod.getController()

  return new Promise((resolve) => {
    try {
      inputMethodController.stopInputSession((error, result) => {
        if (error !== undefined) {
          resolve(false)
          return;
        }
        resolve(!!result)
      });
    } catch (error) {
      resolve(false)
    }
  })

}


// 屏幕亮度值，值为0-1之间。1表示最亮。
export async  function setScreenLight(brightness:number){

}



