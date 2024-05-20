import hilog from '@ohos.hilog';


export interface Message {
  domain?: number,
  tag?: string,
  msg: string,
  format?: string,
  args?: Array<any>
}

let getType = function (obj) {
  // tostring会返回对应不同的标签的构造函数
  let toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };

  return map[toString.call(obj)];
};


export default {
  info(message: Message): void {
    const logBody = Object.assign({}, {
      domain: 0xFFFF,
      tag: 'ZXRAIL_LOGGER',
      msg: '',
      format: '',
      args: []
    }, message)
    hilog.info(logBody.domain, logBody.tag, logBody.msg || logBody.format,!!logBody.format ? logBody.args : [])
  },

  debug(message: Message) {
    const logBody = Object.assign({}, {
      domain: 0xFFFF,
      tag: 'ZXRAIL_LOGGER',
      msg: '',
      format: '',
      args: []
    }, message)
    hilog.debug(logBody.domain, logBody.tag, logBody.msg || logBody.format,!!logBody.format ? logBody.args : [])
  },

  error(message: Message) {
    const logBody = Object.assign({}, {
      domain: 0xFFFF,
      tag: 'ZXRAIL_LOGGER',
      msg: '',
      format: '',
      args: []
    }, message)
    hilog.error(logBody.domain, logBody.tag, logBody.msg || logBody.format,!!logBody.format ? logBody.args : [])
  },


  warn(message: Message) {
    const logBody = Object.assign({}, {
      domain: 0xFFFF,
      tag: 'ZXRAIL_LOGGER',
      msg: '',
      format: '',
      args: []
    }, message)
    hilog.warn(logBody.domain, logBody.tag, logBody.msg || logBody.format,!!logBody.format ? logBody.args : [])
  },

  log(message) {
    if (getType(message) === 'object') {
      message = JSON.stringify(message)
    }
    this.info({
      msg: message
    })
  },
}