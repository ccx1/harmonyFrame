import document from '@ohos.document'

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Column() {
      Index2() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {

          })
      }
    }
  }
}


@Component
struct ErrorPage {
  @State message: string = '出错了'
  @BuilderParam closer: () => void

  build() {
    Row() {
      Text(this.message)
        .fontSize(50)
        .fontWeight(FontWeight.Bold)
    }
  }
}

enum StatusEnums{
  NORMAL,
  ERROR
}

@Component
struct Index2 {

  @StorageLink @Watch('OnStatusUpdate') statusEnums: StatusEnums = StatusEnums.NORMAL
  @BuilderParam closer: () => void

  OnStatusUpdate(propName:string){

  }

  build() {
    Stack({}) {

      ErrorPage() {

      }

      Scroll() {
        Row() {
          this.closer()
        }
      }

    }
  }
}