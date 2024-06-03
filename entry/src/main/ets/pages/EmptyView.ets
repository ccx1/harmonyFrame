@Component
export struct EmptyView {

  @BuilderParam closer: () => void


  build() {
    Row(){
      this.closer()
    }
  }
}