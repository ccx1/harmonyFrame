import zlib from '@ohos.zlib';


let options = {
  //默认压缩等级。
  level: zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION,
  // zip 接口在压缩过程中默认使用内存。
  memLevel: zlib.MemLevel.MEM_LEVEL_DEFAULT,
  // 常规数据策略。
  strategy: zlib.CompressStrategy.COMPRESS_STRATEGY_DEFAULT_STRATEGY
};


export function zipFile(inFile, outFile):Promise<void>{
  return zlib.compressFile(inFile, outFile, options)
}

export function unzip(inFile, outFile){

    zlib.decompressFile(inFile, outFile, options, (errData) => {
        Promise.resolve(errData)
    })

}
