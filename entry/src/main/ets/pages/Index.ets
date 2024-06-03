//代表入口组件
import { StatusLayout, showEmptyView, showErrorView, showContentView } from './StatusLayout'

@Entry
@Component
struct Index {


  @Builder
  customEmptyBuilder() {
    Text("我是来自子布局的空")
  }
  // 组件生命周期-开始-build之后
  onPageShow(): void {
    console.info('MyComponent onPageShow');
  }

  // 组件生命周期-销毁-build之后1
  onPageHide(): void {
    console.info('MyComponent onPageHide');
  }

  build() {
    Row() {
      StatusLayout() {
        Column() {
          Text('展示空布局')
            .fontSize(10)
            .fontWeight(FontWeight.Bold)
            .onClick(() => {
              showEmptyView()
            })
          Text('展示错误布局')
            .fontSize(10)
            .fontWeight(FontWeight.Bold)
            .onClick(() => {
              showErrorView()
            })
          Text('展示内容布局')
            .fontSize(10)
            .fontWeight(FontWeight.Bold)
            .onClick(() => {
              showContentView()
            })
        }
        .width('100%')
        .height('100%')
      }
    }

  }
}


