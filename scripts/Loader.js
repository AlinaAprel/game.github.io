export class Loader {
  constructor(loadingWidth, isReadyToShoot) {
    this.loadingWidth = loadingWidth;
    this.isReadyToShoot = isReadyToShoot;
  }

  increaseLoadingWidth(loading, bomb) {
    if (this.loadingWidth < 40) {
      this.loadingWidth += 4;
      loading.style.width = this.loadingWidth + 'px';
      this.isReadyToShoot = false;
      bomb.style.backgroundColor = '#773838';
    } else {
      this.isReadyToShoot = true;
      bomb.style.backgroundColor = '#A55B5B';
    }
  }

  getIsReadyToShoot() {
    return this.isReadyToShoot;
  }

  resetLoadingWidth() {
    this.loadingWidth = 0;
  }
}
