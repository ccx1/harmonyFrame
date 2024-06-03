import { EmptyView } from './EmptyView'
import { ErrorView } from './ErrorView'

export let showEmptyView: () => void

export let showContentView: () => void

export let showErrorView: () => void

@Component
export struct StatusLayout {
  @BuilderParam closer: () => void

  @State emptyShow: boolean = false
  @State errorShow: boolean = false
  @State contentShow: boolean = true

  showEmpty() {
    this.emptyShow = true
    this.errorShow = false
    this.contentShow = false
  }

  showContent() {
    this.emptyShow = false
    this.errorShow = false
    this.contentShow = true
  }

  showError() {
    this.emptyShow = false
    this.errorShow = true
    this.contentShow = false
  }

  @Builder customEmptyBuilder() {
    Text('父类布局')
  }

  @Builder
  emptyView() {
    Text("我是空布局")
  }

  // 组件生命周期-开始-build之前
  aboutToAppear() {
    showEmptyView = (): void => this.showEmpty()
    showContentView = (): void => this.showContent()
    showErrorView = (): void => this.showError()
    console.info('MyComponent aboutToAppear');
  }

  // 组件生命周期-销毁-build之后2
  aboutToDisappear() {
    console.info('MyComponent aboutToDisappear');
  }



  @Builder
  contentView() {
    Scroll() {
      Row() {
        this.closer()
      }
    }
  }


  build() {
    Stack({}) {

      if (this.errorShow) {
        ErrorView() {

        }
      }

      if (this.emptyShow) {
        EmptyView() {

        }
      }

      if (this.contentShow) {
        this.contentView()
      }

    }
  }
}