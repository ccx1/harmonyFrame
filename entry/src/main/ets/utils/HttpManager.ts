import http from '@ohos.net.http';
import request from '@ohos.request';
import { getApplicationContext } from '../manager/AppManager';


const defaultRequestParamsParent = {
  header: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  },
}

const defaultRequestParams = {
  ...defaultRequestParamsParent,
  connectTimeout: 60000, // 可选，默认为60000ms
  readTimeout: 60000, // 可选，默认为60000ms,
  expectDataType: http.HttpDataType.STRING,
  usingCache: false, // 缓存
  priority: 1 // 优先级
}

const defaultDownloadFileParams = {
  ...defaultRequestParams,
  expectDataType: http.HttpDataType.ARRAY_BUFFER
}

const defaultUploadFileParams = {
  ...defaultRequestParams,
  expectDataType: http.HttpDataType.ARRAY_BUFFER

}

export interface BaseModel {
  code: number,
  data: any,
  message: string
}

export interface RequestModel {
  url: string,
  data?: any[],
  contentType?: string
}


export interface UploadFile {
  fileName: string,
  filePath: string
}


export interface UploadFileModel {
  url: string,
  data?: any[],
  upLoadFiles: UploadFile[]
}


interface  FileResCallback{
    onProgress?: Function,
    onComplete?: Function,
    onFail?: Function
}

export interface UploadResCallback extends FileResCallback {

}
export interface DownloadResCallback extends FileResCallback {

}


export interface DownloadModel {
  url: string,
  enableRoaming?: boolean,
  networkType?:number,
  filePath:string
}

const context = getApplicationContext()

function getFileSuffix(filePath: string): string {
  if (filePath.indexOf(".") > -1) {
    return filePath.substring(filePath.lastIndexOf(".") + 1)
  }
  return ""
}


export function rq(params: RequestModel): Promise<any> {

  let httpRequest = http.createHttp();

  const requestBody = Object.assign({}, {
    url: '',
    extraData: {},
    method: http.RequestMethod.GET
  }, defaultRequestParams, params)

  if (requestBody.contentType) {
    requestBody.header['Content-Type'] = requestBody.contentType
  }

  return new Promise((resolve, reject) => {
    httpRequest.request(
      requestBody.url,
      requestBody,
      (err, result) => {
        if (result?.responseCode != http.ResponseCode.OK && err?.code !=  http.ResponseCode.OK) {
          reject(err.message)
        } else {
          resolve(result.result)
        }
      }
    )
  })
}


export function downloadFile(params:DownloadModel,callback?:DownloadResCallback) {

  const downloadParams: any = Object.assign({}, {
    enableMetered:true,
    enableRoaming:true,
    filePath: `${context.filesDir}/${new Date().getTime()}.tmp`,
    networkType:request.NETWORK_MOBILE&request.NETWORK_WIFI
  }, defaultRequestParamsParent, params)


  try {
    request.downloadFile(context, downloadParams).then((data) => {
      data.on('progress', (receivedSize: number, totalSize: number) => {
        callback?.onProgress(receivedSize, totalSize)
      })

      data.on('complete', () => {
          callback?.onComplete()
      })

      data.on('fail', (err) => {
          callback?.onFail(err)
      })
    }).catch((err) => {
      callback?.onFail(err)
    });
  } catch (err) {
    console.error('err.code : ' + err.code + ', err.message : ' + err.message);
  }

}


export function uploadFile(params: UploadFileModel, callback?: UploadResCallback) {

  const files = []
  for (let index = 0; index < params.upLoadFiles.length; index++) {
    const uploadFile = params.upLoadFiles[index];
    const fileType = getFileSuffix(uploadFile.filePath)
    files.push({
      filename: uploadFile.fileName,
      name: uploadFile.fileName,
      uri: uploadFile.filePath,
      type: fileType
    })
  }

  const uploadParams: any = Object.assign({}, {
    method: http.RequestMethod.POST,
    files
  }, defaultRequestParamsParent, params)


  try {
    request.uploadFile(context, uploadParams).then((data: request.UploadTask) => {
      data.on('progress', (uploadSize: number, totalSize: number) => {
        callback?.onProgress(uploadSize, totalSize)
      })

      data.on('complete', (result: request.TaskState[]) => {
        result.forEach((item, index) => {
          callback?.onComplete(item.path,item.responseCode,item.message)
        })
      })

      data.on('fail', (result: request.TaskState[]) => {
        result.forEach((item, index) => {
          callback?.onFail(item.path,item.responseCode,item.message)
        })
      })
    }).catch((err) => {
      files.forEach((item,index) =>{
        callback?.onFail(item.uri, 400, '网络错误')
      })
    });
  } catch (err) {
    console.error('err.code : ' + err.code + ', err.message : ' + err.message);
  }


}

