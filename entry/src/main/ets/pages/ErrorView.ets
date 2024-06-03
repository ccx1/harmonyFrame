@Component
export struct ErrorView {

  @BuilderParam closer: () => void


  build() {
    Row(){
      this.closer()
    }
  }
}