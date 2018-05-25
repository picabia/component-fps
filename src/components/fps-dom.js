import { View, Dom } from '@picabia/picabia';

class FpsDom extends View {
  constructor (v, target) {
    super(v, target);

    this._dom = Dom.create(`
      <div id="picabia-fps">
        <span class="label"></span>
      </div>`);
    this._dom.style.position = 'absolute';
    this._dom.style.left = '0';
    this._dom.style.bottom = '0';
    this._dom.style.fontSize = '12px';
    this._dom.style.padding = '0px 5px';
    this._dom.style.background = 'rgba(0,0,0,0.3)';
    this._dom.style.lineHeight = '1.4';
    this._dom.style.zIndex = '1000';
    this._label = this._dom.querySelector('.label');
    this._v.container.append(this._dom);

    this._fps = 0;
    this._frameTs = null;
    this._frameCount = 0;

    this.resize();
  }

  // -- view

  render () {
    this._frameTs = this._frameTs || this._time.t;

    this._frameCount++;
    const seconds = Math.floor((this._time.t - this._frameTs) / 1000);
    if (seconds > 0) {
      this._frameTs = this._time.t;
      this._fps = this._frameCount / seconds;
      this._frameCount = 0;
    }

    this._label.innerText = this._fps.toFixed(1);
  }

  _destroy () {
    this._dom && this._dom.remove();
  }
}

export {
  FpsDom
};
