import { View, Viewport, CanvasLayer2d } from '@picabia/picabia';

const PADDING = 3;

class FpsCanvas extends View {
  constructor (v, target, container) {
    super(v, target);
    const layerOptions = {
      pos: { x: 10, y: 10 },
      size: { w: 90, h: 35 },
      autoResize: false,
      zIndex: 9000
    };
    this._layer = new CanvasLayer2d('fps', container, layerOptions);
    this._v.add(this._layer);

    const viewportOptions = {
      pos: { x: 0, y: 0 }
    };
    this._viewport = new Viewport('fps', viewportOptions);
    this._v.add(this._viewport);

    this._rect = null;
    this._fontSize = null;

    this._fps = 0;
    this._frameTs = null;
    this._frameCount = 0;
  }

  // -- view

  _postResize () {
    this._fontSize = 20;
  }

  render (renderer) {
    this._frameTs = this._frameTs || this._time.t;

    this._frameCount++;
    const seconds = Math.floor((this._time.t - this._frameTs) / 1000);
    if (seconds > 0) {
      this._frameTs = this._time.t;
      this._fps = this._frameCount / seconds;
      this._frameCount = 0;
    }

    const text = this._fps.toFixed(1);

    renderer.setFont(this._fontSize, 'Arial');
    renderer.setTextAlign('left');
    renderer.setTextBaseline('top');

    const dim = renderer.measureText(text);
    const rect = [0, 0, 2 * PADDING + dim.width, this._fontSize + 2 * PADDING];

    renderer.setFillStyle('rgba(0,0,0,0.3)');
    renderer.fillRect(...rect);
    renderer.setFillStyle('white');
    renderer.fillText(text, PADDING - 2, PADDING + 2);

    this._lastRect = rect;
    this._lastRect[2] += 2;
    this._lastRect[3] += 2;
  }

  _destroy () {
    this._v.purge(this._layer);
    this._v.purge(this._viewport);
  }
}

export {
  FpsCanvas
};
