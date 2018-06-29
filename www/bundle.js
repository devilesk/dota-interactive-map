(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/proj'), require('ol/proj/projection'), require('ol/extent'), require('ol/geom/point'), require('ol/style/style'), require('ol/style/fill'), require('ol/style/stroke'), require('ol/style/regularshape'), require('ol/style/icon'), require('ol/style/circle'), require('ol/source/vector'), require('ol/layer/vector'), require('ol/format/geojson'), require('ol/geom/polygon'), require('ol/feature'), require('ol/layer/group'), require('ol/collection'), require('ol/observable'), require('ol/geom/linearring'), require('ol/geom/linestring'), require('ol/geom/circle'), require('ol/interaction/draw'), require('ol/overlay'), require('ol/geom/multipolygon'), require('ol/control/mouseposition'), require('ol/coordinate'), require('ol/view'), require('ol/map'), require('ol/source/tileimage'), require('ol/layer/tile'), require('ol/tilegrid/tilegrid'), require('ol/control'), require('ol/interaction')) :
    typeof define === 'function' && define.amd ? define(['ol/proj', 'ol/proj/projection', 'ol/extent', 'ol/geom/point', 'ol/style/style', 'ol/style/fill', 'ol/style/stroke', 'ol/style/regularshape', 'ol/style/icon', 'ol/style/circle', 'ol/source/vector', 'ol/layer/vector', 'ol/format/geojson', 'ol/geom/polygon', 'ol/feature', 'ol/layer/group', 'ol/collection', 'ol/observable', 'ol/geom/linearring', 'ol/geom/linestring', 'ol/geom/circle', 'ol/interaction/draw', 'ol/overlay', 'ol/geom/multipolygon', 'ol/control/mouseposition', 'ol/coordinate', 'ol/view', 'ol/map', 'ol/source/tileimage', 'ol/layer/tile', 'ol/tilegrid/tilegrid', 'ol/control', 'ol/interaction'], factory) :
    (global.InteractiveMap = factory(global.ol.proj,global.ol.proj.Projection,global.ol.extent,global.ol.geom.Point,global.ol.style.Style,global.ol.style.Fill,global.ol.style.Stroke,global.ol.style.RegularShape,global.ol.style.Icon,global.ol.style.Circle,global.ol.source.Vector,global.ol.layer.Vector,global.ol.format.GeoJSON,global.ol.geom.Polygon,global.ol.Feature,global.ol.layer.Group,global.ol.Collection,global.ol.Observable,global.ol.geom.LinearRing,global.ol.geom.LineString,global.ol.geom.Circle,global.ol.interaction.Draw,global.ol.Overlay,global.ol.geom.MultiPolygon,global.ol.control.MousePosition,global.ol.coordinate,global.ol.View,global.ol.Map,global.ol.source.TileImage,global.ol.layer.Tile,global.ol.tilegrid.TileGrid,global.ol.control,global.ol.interaction));
}(this, (function (proj,Projection,extent,Point,Style,Fill,Stroke,RegularShape,Icon,Circle,SourceVector,LayerVector,GeoJSON,Polygon,Feature,LayerGroup,Collection,Observable,LinearRing,LineString,Circle$1,Draw,Overlay,MultiPolygon,MousePosition,coordinate,View,Map,TileImage,LayerTile,TileGrid,control,interaction) {
    proj = proj && proj.hasOwnProperty('default') ? proj['default'] : proj;
    Projection = Projection && Projection.hasOwnProperty('default') ? Projection['default'] : Projection;
    extent = extent && extent.hasOwnProperty('default') ? extent['default'] : extent;
    Point = Point && Point.hasOwnProperty('default') ? Point['default'] : Point;
    Style = Style && Style.hasOwnProperty('default') ? Style['default'] : Style;
    Fill = Fill && Fill.hasOwnProperty('default') ? Fill['default'] : Fill;
    Stroke = Stroke && Stroke.hasOwnProperty('default') ? Stroke['default'] : Stroke;
    RegularShape = RegularShape && RegularShape.hasOwnProperty('default') ? RegularShape['default'] : RegularShape;
    Icon = Icon && Icon.hasOwnProperty('default') ? Icon['default'] : Icon;
    Circle = Circle && Circle.hasOwnProperty('default') ? Circle['default'] : Circle;
    SourceVector = SourceVector && SourceVector.hasOwnProperty('default') ? SourceVector['default'] : SourceVector;
    LayerVector = LayerVector && LayerVector.hasOwnProperty('default') ? LayerVector['default'] : LayerVector;
    GeoJSON = GeoJSON && GeoJSON.hasOwnProperty('default') ? GeoJSON['default'] : GeoJSON;
    Polygon = Polygon && Polygon.hasOwnProperty('default') ? Polygon['default'] : Polygon;
    Feature = Feature && Feature.hasOwnProperty('default') ? Feature['default'] : Feature;
    LayerGroup = LayerGroup && LayerGroup.hasOwnProperty('default') ? LayerGroup['default'] : LayerGroup;
    Collection = Collection && Collection.hasOwnProperty('default') ? Collection['default'] : Collection;
    Observable = Observable && Observable.hasOwnProperty('default') ? Observable['default'] : Observable;
    LinearRing = LinearRing && LinearRing.hasOwnProperty('default') ? LinearRing['default'] : LinearRing;
    LineString = LineString && LineString.hasOwnProperty('default') ? LineString['default'] : LineString;
    Circle$1 = Circle$1 && Circle$1.hasOwnProperty('default') ? Circle$1['default'] : Circle$1;
    Draw = Draw && Draw.hasOwnProperty('default') ? Draw['default'] : Draw;
    Overlay = Overlay && Overlay.hasOwnProperty('default') ? Overlay['default'] : Overlay;
    MultiPolygon = MultiPolygon && MultiPolygon.hasOwnProperty('default') ? MultiPolygon['default'] : MultiPolygon;
    MousePosition = MousePosition && MousePosition.hasOwnProperty('default') ? MousePosition['default'] : MousePosition;
    coordinate = coordinate && coordinate.hasOwnProperty('default') ? coordinate['default'] : coordinate;
    View = View && View.hasOwnProperty('default') ? View['default'] : View;
    Map = Map && Map.hasOwnProperty('default') ? Map['default'] : Map;
    TileImage = TileImage && TileImage.hasOwnProperty('default') ? TileImage['default'] : TileImage;
    LayerTile = LayerTile && LayerTile.hasOwnProperty('default') ? LayerTile['default'] : LayerTile;
    TileGrid = TileGrid && TileGrid.hasOwnProperty('default') ? TileGrid['default'] : TileGrid;
    control = control && control.hasOwnProperty('default') ? control['default'] : control;
    interaction = interaction && interaction.hasOwnProperty('default') ? interaction['default'] : interaction;

    var worldMinX = -8288;
    var worldMaxX = 8288;
    var worldMinY = -8288;
    var worldMaxY = 8288;
    var worlddata = {
    	worldMinX: worldMinX,
    	worldMaxX: worldMaxX,
    	worldMinY: worldMinY,
    	worldMaxY: worldMaxY
    };

    const getParameterByName = name => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    const setQueryString = (key, value) => {
        if (history && history.replaceState) history.replaceState(null, "", updateQueryString(key, value));
    };

    const updateQueryString = (key, value, url) => {
        if (!url) url = window.location.href;
        const re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi");
        let hash;

        if (re.test(url)) {
            if (typeof value !== 'undefined' && value !== null)
                return url.replace(re, '$1' + key + "=" + value + '$2$3');
            else {
                hash = url.split('#');
                url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
                if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                    url += '#' + hash[1];
                return url;
            }
        } else {
            if (typeof value !== 'undefined' && value !== null) {
                const separator = url.indexOf('?') !== -1 ? '&' : '?';
                hash = url.split('#');
                url = hash[0] + separator + key + '=' + value;
                if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
                    url += '#' + hash[1];
                }
                return url;
            }
            return url;
        }
    };

    const mapConstants = {
        map_w: 16384,
        map_h: 16384,
        map_x_boundaries: [-8507.4, 9515],
        map_y_boundaries: [8888.12001679, -8953.45782627],
        resolutions: [
            16384 / 1024,
            16384 / 1024 / 2,
            16384 / 1024 / 4,
            16384 / 1024 / 8,
            16384 / 1024 / 16
        ],
        visionRadius: {
            observer: 1600,
            sentry: 850,
            darkness: 675
        },
        defaultMovementSpeed: 300,
        creepBaseMovementSpeed: 325,
        pullRangeTiming: [4, 2.25, 4.75]
    };
    mapConstants.imgCenter = [mapConstants.map_w / 2, mapConstants.map_h / 2];
    mapConstants.scale = Math.abs(mapConstants.map_x_boundaries[1] - mapConstants.map_x_boundaries[0]) / mapConstants.map_w;

    const lerp = (minVal, maxVal, pos_r) => pos_r * (maxVal - minVal) + minVal;

    const reverseLerp = (minVal, maxVal, pos) => (pos - minVal) / (maxVal - minVal);

    const latLonToWorld = coordinate$$1 => {
        const x_r = lerp(mapConstants.map_x_boundaries[0], mapConstants.map_x_boundaries[1], coordinate$$1[0] / mapConstants.map_w),
            y_r = lerp(mapConstants.map_y_boundaries[0], mapConstants.map_y_boundaries[1], (mapConstants.map_h - coordinate$$1[1]) / mapConstants.map_h);
        return [x_r, y_r];
    };

    const worldToLatLon = coordinate$$1 => {
        const x = reverseLerp(mapConstants.map_x_boundaries[0], mapConstants.map_x_boundaries[1], coordinate$$1[0]) * mapConstants.map_w,
            y = mapConstants.map_h - reverseLerp(mapConstants.map_y_boundaries[0], mapConstants.map_y_boundaries[1], coordinate$$1[1]) * mapConstants.map_h;
        return [x, y];
    };

    const getTileRadius = r => parseInt(Math.floor(r / 64));

    const getScaledRadius = r => r / (mapConstants.map_x_boundaries[1] - mapConstants.map_x_boundaries[0]) * mapConstants.map_w;

    const pixelProj = new Projection({
        code: 'pixel',
        units: 'pixels',
        extent: [0, 0, mapConstants.map_w, mapConstants.map_h]
    });

    const dotaProj = new Projection({
        code: 'dota',
        extent: [-8288, -8288, 8288, 8288],
        units: 'units'
    });

    proj.addProjection(pixelProj);
    proj.addCoordinateTransforms('pixel', dotaProj, latLonToWorld, worldToLatLon);

    proj.addProjection(dotaProj);
    proj.addCoordinateTransforms('dota', pixelProj, worldToLatLon, latLonToWorld);

    /*
     * Extracted from pdf.js
     * https://github.com/andreasgal/pdf.js
     *
     * Copyright (c) 2011 Mozilla Foundation
     *
     * Contributors: Andreas Gal <gal@mozilla.com>
     *               Chris G Jones <cjones@mozilla.com>
     *               Shaon Barman <shaon.barman@gmail.com>
     *               Vivien Nicolas <21@vingtetun.org>
     *               Justin D'Arcangelo <justindarc@gmail.com>
     *               Yury Delendik
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */

    var DecodeStream = (function() {
      function constructor() {
        this.pos = 0;
        this.bufferLength = 0;
        this.eof = false;
        this.buffer = null;
      }

      constructor.prototype = {
        ensureBuffer: function decodestream_ensureBuffer(requested) {
          var buffer = this.buffer;
          var current = buffer ? buffer.byteLength : 0;
          if (requested < current)
            return buffer;
          var size = 512;
          while (size < requested)
            size <<= 1;
          var buffer2 = new Uint8Array(size);
          for (var i = 0; i < current; ++i)
            buffer2[i] = buffer[i];
          return this.buffer = buffer2;
        },
        getByte: function decodestream_getByte() {
          var pos = this.pos;
          while (this.bufferLength <= pos) {
            if (this.eof)
              return null;
            this.readBlock();
          }
          return this.buffer[this.pos++];
        },
        getBytes: function decodestream_getBytes(length) {
          var pos = this.pos;

          if (length) {
            this.ensureBuffer(pos + length);
            var end = pos + length;

            while (!this.eof && this.bufferLength < end)
              this.readBlock();

            var bufEnd = this.bufferLength;
            if (end > bufEnd)
              end = bufEnd;
          } else {
            while (!this.eof)
              this.readBlock();

            var end = this.bufferLength;
          }

          this.pos = end;
          return this.buffer.subarray(pos, end);
        },
        lookChar: function decodestream_lookChar() {
          var pos = this.pos;
          while (this.bufferLength <= pos) {
            if (this.eof)
              return null;
            this.readBlock();
          }
          return String.fromCharCode(this.buffer[this.pos]);
        },
        getChar: function decodestream_getChar() {
          var pos = this.pos;
          while (this.bufferLength <= pos) {
            if (this.eof)
              return null;
            this.readBlock();
          }
          return String.fromCharCode(this.buffer[this.pos++]);
        },
        makeSubStream: function decodestream_makeSubstream(start, length, dict) {
          var end = start + length;
          while (this.bufferLength <= end && !this.eof)
            this.readBlock();
          return new Stream(this.buffer, start, length, dict);
        },
        skip: function decodestream_skip(n) {
          if (!n)
            n = 1;
          this.pos += n;
        },
        reset: function decodestream_reset() {
          this.pos = 0;
        }
      };

      return constructor;
    })();

    var FlateStream = (function() {
      var codeLenCodeMap = new Uint32Array([
        16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
      ]);

      var lengthDecode = new Uint32Array([
        0x00003, 0x00004, 0x00005, 0x00006, 0x00007, 0x00008, 0x00009, 0x0000a,
        0x1000b, 0x1000d, 0x1000f, 0x10011, 0x20013, 0x20017, 0x2001b, 0x2001f,
        0x30023, 0x3002b, 0x30033, 0x3003b, 0x40043, 0x40053, 0x40063, 0x40073,
        0x50083, 0x500a3, 0x500c3, 0x500e3, 0x00102, 0x00102, 0x00102
      ]);

      var distDecode = new Uint32Array([
        0x00001, 0x00002, 0x00003, 0x00004, 0x10005, 0x10007, 0x20009, 0x2000d,
        0x30011, 0x30019, 0x40021, 0x40031, 0x50041, 0x50061, 0x60081, 0x600c1,
        0x70101, 0x70181, 0x80201, 0x80301, 0x90401, 0x90601, 0xa0801, 0xa0c01,
        0xb1001, 0xb1801, 0xc2001, 0xc3001, 0xd4001, 0xd6001
      ]);

      var fixedLitCodeTab = [new Uint32Array([
        0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c0,
        0x70108, 0x80060, 0x80020, 0x900a0, 0x80000, 0x80080, 0x80040, 0x900e0,
        0x70104, 0x80058, 0x80018, 0x90090, 0x70114, 0x80078, 0x80038, 0x900d0,
        0x7010c, 0x80068, 0x80028, 0x900b0, 0x80008, 0x80088, 0x80048, 0x900f0,
        0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c8,
        0x7010a, 0x80064, 0x80024, 0x900a8, 0x80004, 0x80084, 0x80044, 0x900e8,
        0x70106, 0x8005c, 0x8001c, 0x90098, 0x70116, 0x8007c, 0x8003c, 0x900d8,
        0x7010e, 0x8006c, 0x8002c, 0x900b8, 0x8000c, 0x8008c, 0x8004c, 0x900f8,
        0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c4,
        0x70109, 0x80062, 0x80022, 0x900a4, 0x80002, 0x80082, 0x80042, 0x900e4,
        0x70105, 0x8005a, 0x8001a, 0x90094, 0x70115, 0x8007a, 0x8003a, 0x900d4,
        0x7010d, 0x8006a, 0x8002a, 0x900b4, 0x8000a, 0x8008a, 0x8004a, 0x900f4,
        0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cc,
        0x7010b, 0x80066, 0x80026, 0x900ac, 0x80006, 0x80086, 0x80046, 0x900ec,
        0x70107, 0x8005e, 0x8001e, 0x9009c, 0x70117, 0x8007e, 0x8003e, 0x900dc,
        0x7010f, 0x8006e, 0x8002e, 0x900bc, 0x8000e, 0x8008e, 0x8004e, 0x900fc,
        0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c2,
        0x70108, 0x80061, 0x80021, 0x900a2, 0x80001, 0x80081, 0x80041, 0x900e2,
        0x70104, 0x80059, 0x80019, 0x90092, 0x70114, 0x80079, 0x80039, 0x900d2,
        0x7010c, 0x80069, 0x80029, 0x900b2, 0x80009, 0x80089, 0x80049, 0x900f2,
        0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900ca,
        0x7010a, 0x80065, 0x80025, 0x900aa, 0x80005, 0x80085, 0x80045, 0x900ea,
        0x70106, 0x8005d, 0x8001d, 0x9009a, 0x70116, 0x8007d, 0x8003d, 0x900da,
        0x7010e, 0x8006d, 0x8002d, 0x900ba, 0x8000d, 0x8008d, 0x8004d, 0x900fa,
        0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c6,
        0x70109, 0x80063, 0x80023, 0x900a6, 0x80003, 0x80083, 0x80043, 0x900e6,
        0x70105, 0x8005b, 0x8001b, 0x90096, 0x70115, 0x8007b, 0x8003b, 0x900d6,
        0x7010d, 0x8006b, 0x8002b, 0x900b6, 0x8000b, 0x8008b, 0x8004b, 0x900f6,
        0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900ce,
        0x7010b, 0x80067, 0x80027, 0x900ae, 0x80007, 0x80087, 0x80047, 0x900ee,
        0x70107, 0x8005f, 0x8001f, 0x9009e, 0x70117, 0x8007f, 0x8003f, 0x900de,
        0x7010f, 0x8006f, 0x8002f, 0x900be, 0x8000f, 0x8008f, 0x8004f, 0x900fe,
        0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c1,
        0x70108, 0x80060, 0x80020, 0x900a1, 0x80000, 0x80080, 0x80040, 0x900e1,
        0x70104, 0x80058, 0x80018, 0x90091, 0x70114, 0x80078, 0x80038, 0x900d1,
        0x7010c, 0x80068, 0x80028, 0x900b1, 0x80008, 0x80088, 0x80048, 0x900f1,
        0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c9,
        0x7010a, 0x80064, 0x80024, 0x900a9, 0x80004, 0x80084, 0x80044, 0x900e9,
        0x70106, 0x8005c, 0x8001c, 0x90099, 0x70116, 0x8007c, 0x8003c, 0x900d9,
        0x7010e, 0x8006c, 0x8002c, 0x900b9, 0x8000c, 0x8008c, 0x8004c, 0x900f9,
        0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c5,
        0x70109, 0x80062, 0x80022, 0x900a5, 0x80002, 0x80082, 0x80042, 0x900e5,
        0x70105, 0x8005a, 0x8001a, 0x90095, 0x70115, 0x8007a, 0x8003a, 0x900d5,
        0x7010d, 0x8006a, 0x8002a, 0x900b5, 0x8000a, 0x8008a, 0x8004a, 0x900f5,
        0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cd,
        0x7010b, 0x80066, 0x80026, 0x900ad, 0x80006, 0x80086, 0x80046, 0x900ed,
        0x70107, 0x8005e, 0x8001e, 0x9009d, 0x70117, 0x8007e, 0x8003e, 0x900dd,
        0x7010f, 0x8006e, 0x8002e, 0x900bd, 0x8000e, 0x8008e, 0x8004e, 0x900fd,
        0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c3,
        0x70108, 0x80061, 0x80021, 0x900a3, 0x80001, 0x80081, 0x80041, 0x900e3,
        0x70104, 0x80059, 0x80019, 0x90093, 0x70114, 0x80079, 0x80039, 0x900d3,
        0x7010c, 0x80069, 0x80029, 0x900b3, 0x80009, 0x80089, 0x80049, 0x900f3,
        0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900cb,
        0x7010a, 0x80065, 0x80025, 0x900ab, 0x80005, 0x80085, 0x80045, 0x900eb,
        0x70106, 0x8005d, 0x8001d, 0x9009b, 0x70116, 0x8007d, 0x8003d, 0x900db,
        0x7010e, 0x8006d, 0x8002d, 0x900bb, 0x8000d, 0x8008d, 0x8004d, 0x900fb,
        0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c7,
        0x70109, 0x80063, 0x80023, 0x900a7, 0x80003, 0x80083, 0x80043, 0x900e7,
        0x70105, 0x8005b, 0x8001b, 0x90097, 0x70115, 0x8007b, 0x8003b, 0x900d7,
        0x7010d, 0x8006b, 0x8002b, 0x900b7, 0x8000b, 0x8008b, 0x8004b, 0x900f7,
        0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900cf,
        0x7010b, 0x80067, 0x80027, 0x900af, 0x80007, 0x80087, 0x80047, 0x900ef,
        0x70107, 0x8005f, 0x8001f, 0x9009f, 0x70117, 0x8007f, 0x8003f, 0x900df,
        0x7010f, 0x8006f, 0x8002f, 0x900bf, 0x8000f, 0x8008f, 0x8004f, 0x900ff
      ]), 9];

      var fixedDistCodeTab = [new Uint32Array([
        0x50000, 0x50010, 0x50008, 0x50018, 0x50004, 0x50014, 0x5000c, 0x5001c,
        0x50002, 0x50012, 0x5000a, 0x5001a, 0x50006, 0x50016, 0x5000e, 0x00000,
        0x50001, 0x50011, 0x50009, 0x50019, 0x50005, 0x50015, 0x5000d, 0x5001d,
        0x50003, 0x50013, 0x5000b, 0x5001b, 0x50007, 0x50017, 0x5000f, 0x00000
      ]), 5];
      
      function error(e) {
          throw new Error(e)
      }

      function constructor(bytes) {
        //var bytes = stream.getBytes();
        var bytesPos = 0;

        var cmf = bytes[bytesPos++];
        var flg = bytes[bytesPos++];
        if (cmf == -1 || flg == -1)
          error('Invalid header in flate stream');
        if ((cmf & 0x0f) != 0x08)
          error('Unknown compression method in flate stream');
        if ((((cmf << 8) + flg) % 31) != 0)
          error('Bad FCHECK in flate stream');
        if (flg & 0x20)
          error('FDICT bit set in flate stream');

        this.bytes = bytes;
        this.bytesPos = bytesPos;

        this.codeSize = 0;
        this.codeBuf = 0;

        DecodeStream.call(this);
      }

      constructor.prototype = Object.create(DecodeStream.prototype);

      constructor.prototype.getBits = function(bits) {
        var codeSize = this.codeSize;
        var codeBuf = this.codeBuf;
        var bytes = this.bytes;
        var bytesPos = this.bytesPos;

        var b;
        while (codeSize < bits) {
          if (typeof (b = bytes[bytesPos++]) == 'undefined')
            error('Bad encoding in flate stream');
          codeBuf |= b << codeSize;
          codeSize += 8;
        }
        b = codeBuf & ((1 << bits) - 1);
        this.codeBuf = codeBuf >> bits;
        this.codeSize = codeSize -= bits;
        this.bytesPos = bytesPos;
        return b;
      };

      constructor.prototype.getCode = function(table) {
        var codes = table[0];
        var maxLen = table[1];
        var codeSize = this.codeSize;
        var codeBuf = this.codeBuf;
        var bytes = this.bytes;
        var bytesPos = this.bytesPos;

        while (codeSize < maxLen) {
          var b;
          if (typeof (b = bytes[bytesPos++]) == 'undefined')
            error('Bad encoding in flate stream');
          codeBuf |= (b << codeSize);
          codeSize += 8;
        }
        var code = codes[codeBuf & ((1 << maxLen) - 1)];
        var codeLen = code >> 16;
        var codeVal = code & 0xffff;
        if (codeSize == 0 || codeSize < codeLen || codeLen == 0)
          error('Bad encoding in flate stream');
        this.codeBuf = (codeBuf >> codeLen);
        this.codeSize = (codeSize - codeLen);
        this.bytesPos = bytesPos;
        return codeVal;
      };

      constructor.prototype.generateHuffmanTable = function(lengths) {
        var n = lengths.length;

        // find max code length
        var maxLen = 0;
        for (var i = 0; i < n; ++i) {
          if (lengths[i] > maxLen)
            maxLen = lengths[i];
        }

        // build the table
        var size = 1 << maxLen;
        var codes = new Uint32Array(size);
        for (var len = 1, code = 0, skip = 2;
             len <= maxLen;
             ++len, code <<= 1, skip <<= 1) {
          for (var val = 0; val < n; ++val) {
            if (lengths[val] == len) {
              // bit-reverse the code
              var code2 = 0;
              var t = code;
              for (var i = 0; i < len; ++i) {
                code2 = (code2 << 1) | (t & 1);
                t >>= 1;
              }

              // fill the table entries
              for (var i = code2; i < size; i += skip)
                codes[i] = (len << 16) | val;

              ++code;
            }
          }
        }

        return [codes, maxLen];
      };

      constructor.prototype.readBlock = function() {
        function repeat(stream, array, len, offset, what) {
          var repeat = stream.getBits(len) + offset;
          while (repeat-- > 0)
            array[i++] = what;
        }

        // read block header
        var hdr = this.getBits(3);
        if (hdr & 1)
          this.eof = true;
        hdr >>= 1;

        if (hdr == 0) { // uncompressed block
          var bytes = this.bytes;
          var bytesPos = this.bytesPos;
          var b;

          if (typeof (b = bytes[bytesPos++]) == 'undefined')
            error('Bad block header in flate stream');
          var blockLen = b;
          if (typeof (b = bytes[bytesPos++]) == 'undefined')
            error('Bad block header in flate stream');
          blockLen |= (b << 8);
          if (typeof (b = bytes[bytesPos++]) == 'undefined')
            error('Bad block header in flate stream');
          var check = b;
          if (typeof (b = bytes[bytesPos++]) == 'undefined')
            error('Bad block header in flate stream');
          check |= (b << 8);
          if (check != (~blockLen & 0xffff))
            error('Bad uncompressed block length in flate stream');

          this.codeBuf = 0;
          this.codeSize = 0;

          var bufferLength = this.bufferLength;
          var buffer = this.ensureBuffer(bufferLength + blockLen);
          var end = bufferLength + blockLen;
          this.bufferLength = end;
          for (var n = bufferLength; n < end; ++n) {
            if (typeof (b = bytes[bytesPos++]) == 'undefined') {
              this.eof = true;
              break;
            }
            buffer[n] = b;
          }
          this.bytesPos = bytesPos;
          return;
        }

        var litCodeTable;
        var distCodeTable;
        if (hdr == 1) { // compressed block, fixed codes
          litCodeTable = fixedLitCodeTab;
          distCodeTable = fixedDistCodeTab;
        } else if (hdr == 2) { // compressed block, dynamic codes
          var numLitCodes = this.getBits(5) + 257;
          var numDistCodes = this.getBits(5) + 1;
          var numCodeLenCodes = this.getBits(4) + 4;

          // build the code lengths code table
          var codeLenCodeLengths = Array(codeLenCodeMap.length);
          var i = 0;
          while (i < numCodeLenCodes)
            codeLenCodeLengths[codeLenCodeMap[i++]] = this.getBits(3);
          var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);

          // build the literal and distance code tables
          var len = 0;
          var i = 0;
          var codes = numLitCodes + numDistCodes;
          var codeLengths = new Array(codes);
          while (i < codes) {
            var code = this.getCode(codeLenCodeTab);
            if (code == 16) {
              repeat(this, codeLengths, 2, 3, len);
            } else if (code == 17) {
              repeat(this, codeLengths, 3, 3, len = 0);
            } else if (code == 18) {
              repeat(this, codeLengths, 7, 11, len = 0);
            } else {
              codeLengths[i++] = len = code;
            }
          }

          litCodeTable =
            this.generateHuffmanTable(codeLengths.slice(0, numLitCodes));
          distCodeTable =
            this.generateHuffmanTable(codeLengths.slice(numLitCodes, codes));
        } else {
          error('Unknown block type in flate stream');
        }

        var buffer = this.buffer;
        var limit = buffer ? buffer.length : 0;
        var pos = this.bufferLength;
        while (true) {
          var code1 = this.getCode(litCodeTable);
          if (code1 < 256) {
            if (pos + 1 >= limit) {
              buffer = this.ensureBuffer(pos + 1);
              limit = buffer.length;
            }
            buffer[pos++] = code1;
            continue;
          }
          if (code1 == 256) {
            this.bufferLength = pos;
            return;
          }
          code1 -= 257;
          code1 = lengthDecode[code1];
          var code2 = code1 >> 16;
          if (code2 > 0)
            code2 = this.getBits(code2);
          var len = (code1 & 0xffff) + code2;
          code1 = this.getCode(distCodeTable);
          code1 = distDecode[code1];
          code2 = code1 >> 16;
          if (code2 > 0)
            code2 = this.getBits(code2);
          var dist = (code1 & 0xffff) + code2;
          if (pos + len >= limit) {
            buffer = this.ensureBuffer(pos + len);
            limit = buffer.length;
          }
          for (var k = 0; k < len; ++k, ++pos)
            buffer[pos] = buffer[pos - dist];
        }
      };

      return constructor;
    })();

    var zlib = FlateStream;

    // Generated by CoffeeScript 1.4.0

    /*
    # MIT LICENSE
    # Copyright (c) 2011 Devon Govett
    # 
    # Permission is hereby granted, free of charge, to any person obtaining a copy of this 
    # software and associated documentation files (the "Software"), to deal in the Software 
    # without restriction, including without limitation the rights to use, copy, modify, merge, 
    # publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
    # to whom the Software is furnished to do so, subject to the following conditions:
    # 
    # The above copyright notice and this permission notice shall be included in all copies or 
    # substantial portions of the Software.
    # 
    # THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
    # BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
    # NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
    # DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
    # OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    */



      var PNG;

      PNG = (function() {
        PNG.load = function(url, canvas, callback) {
          var xhr;
          if (typeof canvas === 'function') {
            callback = canvas;
          }
          xhr = new XMLHttpRequest;
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = function() {
            var err, data, png;
            if (xhr.status == 200) {
              data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
              try {
                png = new PNG(data);
                if (typeof (canvas != null ? canvas.getContext : void 0) === 'function') {
                  png.render(canvas);
                }
              }
              catch (e) {
                err = e;
              }
            }
            else {
              err = new Error("Image request failed " + xhr.status);
            }
            return typeof callback === "function" ? callback(err, png) : void 0;
          };
          return xhr.send(null);
        };

        function PNG(data) {
          var chunkSize, colors, frame, i, index, key, section, short, text, _i, _j, _ref;
          this.data = data;
          this.pos = 8;
          this.palette = [];
          this.imgData = [];
          this.transparency = {};
          this.text = {};
          frame = null;
          while (true) {
            chunkSize = this.readUInt32();
            section = ((function() {
              var _i, _results;
              _results = [];
              for (i = _i = 0; _i < 4; i = ++_i) {
                _results.push(String.fromCharCode(this.data[this.pos++]));
              }
              return _results;
            }).call(this)).join('');
            switch (section) {
              case 'IHDR':
                this.width = this.readUInt32();
                this.height = this.readUInt32();
                this.bits = this.data[this.pos++];
                this.colorType = this.data[this.pos++];
                this.compressionMethod = this.data[this.pos++];
                this.filterMethod = this.data[this.pos++];
                this.interlaceMethod = this.data[this.pos++];
                break;
              case 'PLTE':
                this.palette = this.read(chunkSize);
                break;
              case 'IDAT':
                if (section === 'fdAT') {
                  this.pos += 4;
                  chunkSize -= 4;
                }
                data = (frame != null ? frame.data : void 0) || this.imgData;
                for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i) {
                  data.push(this.data[this.pos++]);
                }
                break;
              case 'tRNS':
                this.transparency = {};
                switch (this.colorType) {
                  case 3:
                    this.transparency.indexed = this.read(chunkSize);
                    short = 255 - this.transparency.indexed.length;
                    if (short > 0) {
                      for (i = _j = 0; 0 <= short ? _j < short : _j > short; i = 0 <= short ? ++_j : --_j) {
                        this.transparency.indexed.push(255);
                      }
                    }
                    break;
                  case 0:
                    this.transparency.grayscale = this.read(chunkSize)[0];
                    break;
                  case 2:
                    this.transparency.rgb = this.read(chunkSize);
                }
                break;
              case 'tEXt':
                text = this.read(chunkSize);
                index = text.indexOf(0);
                key = String.fromCharCode.apply(String, text.slice(0, index));
                this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
                break;
              case 'IEND':
                if (frame) {
                  this.animation.frames.push(frame);
                }
                this.colors = (function() {
                  switch (this.colorType) {
                    case 0:
                    case 3:
                    case 4:
                      return 1;
                    case 2:
                    case 6:
                      return 3;
                  }
                }).call(this);
                this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
                colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
                this.pixelBitlength = this.bits * colors;
                this.colorSpace = (function() {
                  switch (this.colors) {
                    case 1:
                      return 'DeviceGray';
                    case 3:
                      return 'DeviceRGB';
                  }
                }).call(this);
                this.imgData = new Uint8Array(this.imgData);
                return;
              default:
                this.pos += chunkSize;
            }
            this.pos += 4;
            if (this.pos > this.data.length) {
              throw new Error("Incomplete or corrupt PNG file");
            }
          }
          return;
        }

        PNG.prototype.read = function(bytes) {
          var i, _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i) {
            _results.push(this.data[this.pos++]);
          }
          return _results;
        };

        PNG.prototype.readUInt32 = function() {
          var b1, b2, b3, b4;
          b1 = this.data[this.pos++] << 24;
          b2 = this.data[this.pos++] << 16;
          b3 = this.data[this.pos++] << 8;
          b4 = this.data[this.pos++];
          return b1 | b2 | b3 | b4;
        };

        PNG.prototype.readUInt16 = function() {
          var b1, b2;
          b1 = this.data[this.pos++] << 8;
          b2 = this.data[this.pos++];
          return b1 | b2;
        };

        PNG.prototype.decodePixels = function(data) {
          var byte, c, col, i, left, length, p, pa, paeth, pb, pc, pixelBytes, pixels, pos, row, scanlineLength, upper, upperLeft, _i, _j, _k, _l, _m;
          if (data == null) {
            data = this.imgData;
          }
          if (data.length === 0) {
            return new Uint8Array(0);
          }
          data = new zlib(data);
          data = data.getBytes();
          pixelBytes = this.pixelBitlength / 8;
          scanlineLength = pixelBytes * this.width;
          pixels = new Uint8Array(scanlineLength * this.height);
          length = data.length;
          row = 0;
          pos = 0;
          c = 0;
          while (pos < length) {
            switch (data[pos++]) {
              case 0:
                for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
                  pixels[c++] = data[pos++];
                }
                break;
              case 1:
                for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
                  byte = data[pos++];
                  left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
                  pixels[c++] = (byte + left) % 256;
                }
                break;
              case 2:
                for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
                  byte = data[pos++];
                  col = (i - (i % pixelBytes)) / pixelBytes;
                  upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
                  pixels[c++] = (upper + byte) % 256;
                }
                break;
              case 3:
                for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
                  byte = data[pos++];
                  col = (i - (i % pixelBytes)) / pixelBytes;
                  left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
                  upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
                  pixels[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
                }
                break;
              case 4:
                for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
                  byte = data[pos++];
                  col = (i - (i % pixelBytes)) / pixelBytes;
                  left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
                  if (row === 0) {
                    upper = upperLeft = 0;
                  } else {
                    upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
                    upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + (i % pixelBytes)];
                  }
                  p = left + upper - upperLeft;
                  pa = Math.abs(p - left);
                  pb = Math.abs(p - upper);
                  pc = Math.abs(p - upperLeft);
                  if (pa <= pb && pa <= pc) {
                    paeth = left;
                  } else if (pb <= pc) {
                    paeth = upper;
                  } else {
                    paeth = upperLeft;
                  }
                  pixels[c++] = (byte + paeth) % 256;
                }
                break;
              default:
                throw new Error("Invalid filter algorithm: " + data[pos - 1]);
            }
            row++;
          }
          return pixels;
        };

        PNG.prototype.decodePalette = function() {
          var c, i, length, palette, pos, ret, transparency, _i, _ref, _ref1;
          palette = this.palette;
          transparency = this.transparency.indexed || [];
          ret = new Uint8Array((transparency.length || 0) + palette.length);
          pos = 0;
          length = palette.length;
          c = 0;
          for (i = _i = 0, _ref = palette.length; _i < _ref; i = _i += 3) {
            ret[pos++] = palette[i];
            ret[pos++] = palette[i + 1];
            ret[pos++] = palette[i + 2];
            ret[pos++] = (_ref1 = transparency[c++]) != null ? _ref1 : 255;
          }
          return ret;
        };

        PNG.prototype.copyToImageData = function(imageData, pixels) {
          var alpha, colors, data, i, input, j, k, length, palette, v, _ref;
          colors = this.colors;
          palette = null;
          alpha = this.hasAlphaChannel;
          if (this.palette.length) {
            palette = (_ref = this._decodedPalette) != null ? _ref : this._decodedPalette = this.decodePalette();
            colors = 4;
            alpha = true;
          }
          data = imageData.data || imageData;
          length = data.length;
          input = palette || pixels;
          i = j = 0;
          if (colors === 1) {
            while (i < length) {
              k = palette ? pixels[i / 4] * 4 : j;
              v = input[k++];
              data[i++] = v;
              data[i++] = v;
              data[i++] = v;
              data[i++] = alpha ? input[k++] : 255;
              j = k;
            }
          } else {
            while (i < length) {
              k = palette ? pixels[i / 4] * 4 : j;
              data[i++] = input[k++];
              data[i++] = input[k++];
              data[i++] = input[k++];
              data[i++] = alpha ? input[k++] : 255;
              j = k;
            }
          }
        };

        PNG.prototype.decode = function() {
          var ret;
          ret = new Uint8Array(this.width * this.height * 4);
          this.copyToImageData(ret, this.decodePixels());
          return ret;
        };

        PNG.prototype.render = function(canvas) {
          var ctx, data;
          canvas.width = this.width;
          canvas.height = this.height;
          ctx = canvas.getContext("2d");
          data = ctx.createImageData(this.width, this.height);
          this.copyToImageData(data, this.decodePixels());
          return ctx.putImageData(data, 0, 0);
        };

        return PNG;

      })();

      var png = PNG;

    function ImageHandler(imagePath) {
        this.imagePath = imagePath;
        this.canvas = null;
        this.png = null;
        this.enabled = true;
    }
    ImageHandler.prototype.load = function (callback) {
        var self = this;
        try {
            self.canvas = document.createElement("canvas");
        }
        catch (e) {
            if (self.enabled) callback(e);
            return;
        }
        png.load(this.imagePath, self.canvas, function(err, png$$1) {
            self.png = png$$1;
            self.ctx = self.canvas.getContext("2d");
            if (self.enabled) callback(err);
        });
    };
    ImageHandler.prototype.disable = function () {
        this.enabled = false;
    };
    ImageHandler.prototype.scan = function (offset, width, height, pixelHandler, grid) {
        var imgData = this.ctx.getImageData(offset, 0, width, height);
        var data = imgData.data;

        for (var i = 0; i < data.length; i += 4) {
            var r = data[i];
            var g = data[i+1];
            var b = data[i+2];
            var alpha = data[i+3];
            var x = Math.floor((i/4) % width);
            var y = Math.floor((i/4) / height);
            pixelHandler(x, y, [r, g, b], grid);
        }
    };

    var imageHandler = ImageHandler;

    /*
    	This is rot.js, the ROguelike Toolkit in JavaScript.
    	Version 0.6~dev, generated on Tue Mar 17 16:16:31 CET 2015.
    */
    /**
     * @namespace Top-level ROT namespace
     */
    var ROT = {
    	/** Directional constants. Ordering is important! */
    	DIRS: {
    		"4": [
    			[ 0, -1],
    			[ 1,  0],
    			[ 0,  1],
    			[-1,  0]
    		],
    		"8": [
    			[ 0, -1],
    			[ 1, -1],
    			[ 1,  0],
    			[ 1,  1],
    			[ 0,  1],
    			[-1,  1],
    			[-1,  0],
    			[-1, -1]
    		],
    		"6": [
    			[-1, -1],
    			[ 1, -1],
    			[ 2,  0],
    			[ 1,  1],
    			[-1,  1],
    			[-2,  0]
    		]
    	}
    };
    /**
     * Always positive modulus
     * @param {int} n Modulus
     * @returns {int} this modulo n
     */
    Number.prototype.mod = function(n) {
    	return ((this%n)+n)%n;
    };
    if (!Object.create) {  
    	/**
    	 * ES5 Object.create
    	 */
    	Object.create = function(o) {  
    		var tmp = function() {};
    		tmp.prototype = o;
    		return new tmp();
    	};  
    }  
    /**
     * Sets prototype of this function to an instance of parent function
     * @param {function} parent
     */
    Function.prototype.extend = function(parent) {
    	this.prototype = Object.create(parent.prototype);
    	this.prototype.constructor = this;
    	return this;
    };
    if (typeof window != "undefined") {
    	window.requestAnimationFrame =
    		window.requestAnimationFrame
    		|| window.mozRequestAnimationFrame
    		|| window.webkitRequestAnimationFrame
    		|| window.oRequestAnimationFrame
    		|| window.msRequestAnimationFrame
    		|| function(cb) { return setTimeout(cb, 1000/60); };

    	window.cancelAnimationFrame =
    		window.cancelAnimationFrame
    		|| window.mozCancelAnimationFrame
    		|| window.webkitCancelAnimationFrame
    		|| window.oCancelAnimationFrame
    		|| window.msCancelAnimationFrame
    		|| function(id) { return clearTimeout(id); };
    }
    /**
     * @class Abstract FOV algorithm
     * @param {function} lightPassesCallback Does the light pass through x,y?
     * @param {object} [options]
     * @param {int} [options.topology=8] 4/6/8
     */
    ROT.FOV = function(lightPassesCallback, options) {
    	this._lightPasses = lightPassesCallback;
    	this._options = {
    		topology: 8
    	};
    	for (var p in options) { this._options[p] = options[p]; }
    };

    /**
     * Compute visibility for a 360-degree circle
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {function} callback
     */
    ROT.FOV.prototype.compute = function(x, y, R, callback) {};

    /**
     * Return all neighbors in a concentric ring
     * @param {int} cx center-x
     * @param {int} cy center-y
     * @param {int} r range
     */
    ROT.FOV.prototype._getCircle = function(cx, cy, r) {
    	var result = [];
    	var dirs, countFactor, startOffset;

    	switch (this._options.topology) {
    		case 4:
    			countFactor = 1;
    			startOffset = [0, 1];
    			dirs = [
    				ROT.DIRS[8][7],
    				ROT.DIRS[8][1],
    				ROT.DIRS[8][3],
    				ROT.DIRS[8][5]
    			];
    		break;

    		case 6:
    			dirs = ROT.DIRS[6];
    			countFactor = 1;
    			startOffset = [-1, 1];
    		break;

    		case 8:
    			dirs = ROT.DIRS[4];
    			countFactor = 2;
    			startOffset = [-1, 1];
    		break;
    	}

    	/* starting neighbor */
    	var x = cx + startOffset[0]*r;
    	var y = cy + startOffset[1]*r;

    	/* circle */
    	for (var i=0;i<dirs.length;i++) {
    		for (var j=0;j<r*countFactor;j++) {
    			result.push([x, y]);
    			x += dirs[i][0];
    			y += dirs[i][1];

    		}
    	}

    	return result;
    };
    /**
     * @class Precise shadowcasting algorithm
     * @augments ROT.FOV
     */
    ROT.FOV.PreciseShadowcasting = function(lightPassesCallback, options) {
    	ROT.FOV.call(this, lightPassesCallback, options);
    };
    ROT.FOV.PreciseShadowcasting.extend(ROT.FOV);

    ROT.FOV.PreciseShadowcasting.prototype.compute = function(x, y, R, callback) {
    	/* this place is always visible */
    	callback(x, y, 0, 1);
        
    	callback(x-1, y-1, 0, 1);
    	callback(x, y-1, 0, 1);
    	callback(x+1, y-1, 0, 1);
    	callback(x-1, y, 0, 1);
    	callback(x+1, y, 0, 1);
    	callback(x-1, y+1, 0, 1);
    	callback(x, y+1, 0, 1);
    	callback(x+1, y+1, 0, 1);
        
        callback(x-1, y-2, 0, 1);
        callback(x, y-2, 0, 1);
        callback(x+1, y-2, 0, 1);
        callback(x-2, y-1, 0, 1);
        callback(x-2, y, 0, 1);
        callback(x-2, y+1, 0, 1);
        callback(x+2, y-1, 0, 1);
        callback(x+2, y, 0, 1);
        callback(x+2, y+1, 0, 1);
        callback(x-1, y+2, 0, 1);
        callback(x, y+2, 0, 1);
        callback(x+1, y+2, 0, 1);

    	/* standing in a dark place. FIXME is this a good idea?  */
    	if (!this._lightPasses(x, y)) { return; }
    	
    	/* list of all shadows */
    	var SHADOWS = [];
    	var trees = {};
    	var totalNeighborCount = 1;
        var cx, cy, blocks, A1, A2, visibility,
            dx, dy, dd, a, b, radius,
            cx2, cy2, dd1,
            obstacleType;

    	/* analyze surrounding cells in concentric rings, starting from the center */
    	for (var r=1; r<=R; r++) {
    		var neighbors = this._getCircle(x, y, r);
    		var neighborCount = neighbors.length;
            totalNeighborCount += neighborCount;
            trees = {};
    		for (var i=0;i<neighborCount;i++) {
    			cx = neighbors[i][0];
    			cy = neighbors[i][1];
                var key = cx+","+cy;
                if ((x-cx)*(x-cx) + (y-cy)*(y-cy) >= R * R) {
                    totalNeighborCount--;
                    continue;
                }
                //if (key == "44,102") //console.log('KEY', key, !this._lightPasses(cx, cy));
                // if (key == "150,160") //console.log(key, obstacleType);
                // if (key == "151,161") //console.log(key, obstacleType);
                // if (key == "150,161") //console.log(key, obstacleType);
                var obstacleTypes = obstacleTypes = this.walls[key];
                if (obstacleTypes && obstacleTypes.length) {
                    var skipVisibility = false;
                    for (var j = 0; j < obstacleTypes.length; j++) {
                        var obstacleType = obstacleTypes[j];
                        cx2 = obstacleType[1];
                        cy2 = obstacleType[2];
                        radius = obstacleType[3];
                        
                        dx = cx2 - x;
                        dy = cy2 - y;
                        dd = Math.sqrt(dx * dx + dy * dy);
                        if (dd > 1/2) {
                            a = Math.asin(radius / dd);
                            b = Math.atan2(dy, dx),
                            A1 = normalize(b - a),
                            A2 = normalize(b + a);
                            blocks = !this._lightPasses(cx, cy);
                            
                            dx1 = cx - x;
                            dy1 = cy - y;
                            dd1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                            if (dd1 < dd) {
                                trees[obstacleType[1]+","+obstacleType[2]] = [obstacleType[1], obstacleType[2]];
                            }
                            
                            dx = cx - x;
                            dy = cy - y;
                            dd = Math.sqrt(dx * dx + dy * dy);
                            a = Math.asin(radius / dd);
                            b = Math.atan2(dy, dx),
                            A1 = normalize(b - a),
                            A2 = normalize(b + a);
                            visibility = this._checkVisibility(b, A1, A2, false, SHADOWS);
                            if (!visibility) skipVisibility = true;
                        }
                    }
                    if (visibility && !skipVisibility) { callback(cx, cy, r, visibility); }
                }
                else {
                    cx2 = cx;
                    cy2 = cy;
                    radius = Math.SQRT2 / 2;
                    
                    dx = cx2 - x;
                    dy = cy2 - y;
                    dd = Math.sqrt(dx * dx + dy * dy);
                    if (dd > 1/2) {
                        a = Math.asin(radius / dd);
                        b = Math.atan2(dy, dx),
                        A1 = normalize(b - a),
                        A2 = normalize(b + a);
                        blocks = !this._lightPasses(cx, cy);
                        
                        visibility = this._checkVisibility(b, A1, A2, blocks, SHADOWS);
                        if (visibility) { callback(cx, cy, r, visibility); }
                        if (this.done) return;
                    }
                }
                
                /*dx = cx2 - x;
                dy = cy2 - y;
                dd = Math.sqrt(dx * dx + dy * dy);
                if (dd > 1/2) {
                    a = Math.asin(radius / dd);
                    b = Math.atan2(dy, dx),
                    A1 = normalize(b - a),
                    A2 = normalize(b + a);
                    blocks = !this._lightPasses(cx, cy);
                    if (obstacleType && obstacleType[0] == 'tree') {
                        dx1 = cx - x;
                        dy1 = cy - y;
                        dd1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                        if (dd1 < dd) {
                            trees[obstacleType[1]+","+obstacleType[2]] = [obstacleType[1], obstacleType[2]];
                        }
                        
                        dx = cx - x;
                        dy = cy - y;
                        dd = Math.sqrt(dx * dx + dy * dy);
                        a = Math.asin(radius / dd);
                        b = Math.atan2(dy, dx),
                        A1 = normalize(b - a),
                        A2 = normalize(b + a);
                        visibility = this._checkVisibility(b, A1, A2, false, SHADOWS);
                        if (visibility) { callback(cx, cy, r, visibility); }
                    }
                    else {
                        //if (obstacleType) //console.log(obstacleType[0], radius);
                        //console.log('BLOCKS', cx, cy, blocks, b);
                        visibility = this._checkVisibility(b, A1, A2, blocks, SHADOWS);
                        if (visibility) { callback(cx, cy, r, visibility); }
                        if (this.done) return;
                    }
                }*/

    		} /* for all cells in this ring */
            
            // apply tree blockers
            for (var k in trees) {
                ////console.log('apply tree');
                cx2 = trees[k][0];
                cy2 = trees[k][1];
                dx = cx2 - x;
                dy = cy2 - y;
                dd = Math.sqrt(dx * dx + dy * dy);
                radius = Math.SQRT2 - .01;
                if (dd > 1/2) {
                    a = Math.asin(radius / dd);
                    b = Math.atan2(dy, dx),
                    A1 = normalize(b - a),
                    A2 = normalize(b + a);
                    visibility = this._checkVisibility(b, A1, A2, true, SHADOWS);
                    if (this.done) return;
                }
            }
    	} /* for all rings */
        
        return totalNeighborCount;
    };

    /**
     * @param {int[2]} A1 arc start
     * @param {int[2]} A2 arc end
     * @param {bool} blocks Does current arc block visibility?
     * @param {int[][]} SHADOWS list of active shadows
     */
    ROT.FOV.PreciseShadowcasting.prototype._checkVisibility = function(b, A1, A2, blocks, SHADOWS) {
        ////console.log('_checkVisibility', b, A1, A2, blocks, SHADOWS);
        // check if target center is inside a shadow
        var visible = !blocks;
        //console.log('_checkVisibility', b, visible);
    	for (var i = 0; i < SHADOWS.length; i++) {
    		var old = SHADOWS[i];
            if (isBetween(b, old[0], old[1])) {
                if (blocks) {
                    ////console.log('blocks but not visible', SHADOWS.length);
                    visible = false;
                }
                else {
                    //console.log(i, b, JSON.stringify(SHADOWS));
                    return false; // not visible, return
                }
            }
    	}
        
        if (blocks) {
            if (A1 < 0 && A2 >= 0) {
                //console.log('splitting');
                this._mergeShadows(b, 0, A2, blocks, SHADOWS);
                this.done = false;
                this._mergeShadows(b, A1, 0, blocks, SHADOWS);
            }
            else {
                //console.log('not splitting', blocks, visible, b);
                this._mergeShadows(b, A1, A2, blocks, SHADOWS);
            }
            //console.log('end', A1, A2, JSON.stringify(SHADOWS), !isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]), !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1]));
            if (SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1])) && A1 != SHADOWS[0][0] && A2 != SHADOWS[0][1] ) {
                this.done = true;
            }
        }
        
        return visible;
    };

    ROT.FOV.PreciseShadowcasting.prototype._mergeShadows = function(b, A1, A2, blocks, SHADOWS) {
        ////console.log('merging', b, A1, A2);
        // check if target first edge is inside a shadow or which shadows it is between
        var index1 = 0,
            edge1 = false,
            firstIndex = 0;
        while (index1 < SHADOWS.length) {
            var old = SHADOWS[index1];
            firstIndex = index1;
            if (isBetween(A1, old[0], old[1])) {
                edge1 = true;
                break;
            }
            if (index1 > 0 && isBetween(A1, SHADOWS[index1 - 1][1], old[0])) {
                edge1 = false;
                break;
            }
            if (!isBefore(A1, old[1])) {
                index1++;
                firstIndex = index1;
                continue;
            }
            if (isBefore(A1, old[0])) {
                break;
            }
            index1++;
        }
        
        // check if target second edge is inside a shadow or which shadows it is between
        var index2 = SHADOWS.length - 1,
            edge2 = false,
            secondIndex = 0;
        while (index2 >= 0) {
            var old = SHADOWS[index2];
            secondIndex = index2;
            ////console.log(A2, old[0], old[1], isBetween(A2, old[0], old[1]))
            if (isBetween(A2, old[0], old[1])) {
                edge2 = true;
                break;
            }
            if (isBefore(A2, old[0])) {
                index2--;
                secondIndex = index2;
                continue;
            }
            if (!isBefore(A2, old[1])) {
                break;
            }
            index2--;
        }
        
        ////console.log(firstIndex, secondIndex, edge1, edge2, A1, A2);
        if (firstIndex == SHADOWS.length && !edge1 && secondIndex == 0 && edge2) firstIndex = 0;
        //if (secondIndex == -1) secondIndex = SHADOWS.length - 1;
        //console.log(firstIndex, secondIndex, edge1, edge2, A1, A2);
        //console.log(JSON.stringify(SHADOWS));
        if (SHADOWS.length == 0) {
            //console.log('empty shadows pushing', [A1, A2]);
            SHADOWS.push([A1, A2]);
        }
        /*else if (SHADOWS.length > 1 && firstIndex == SHADOWS.length && secondIndex == 0 && !edge1 && edge2) {
        
        }*/
        else {
            var new_shadow = [edge1 ? SHADOWS[firstIndex][0] : A1, edge2 ? SHADOWS[secondIndex][1] : A2];
            //console.log('new_shadow', new_shadow);
            secondIndex = Math.max(firstIndex, secondIndex);
            var sum1 = diff_sum(SHADOWS);
            var doShift = false;
            if (isBetween(0, new_shadow[0], new_shadow[1]) && new_shadow[0] != 0 && new_shadow[1] != 0) {
                //console.log('crosses 0');
                SHADOWS.splice(firstIndex, firstIndex == secondIndex && edge1 == edge2 && !edge1 ? 0 : secondIndex - firstIndex + 1, [new_shadow[0], 0]);
                //console.log([new_shadow[0], 0], JSON.stringify(SHADOWS));
                if (SHADOWS[0][0] != 0 && SHADOWS[0][1] != new_shadow[1]) {
                    SHADOWS.splice(firstIndex + 1, 0, [0, new_shadow[1]]);
                    //console.log([0, new_shadow[1]], JSON.stringify(SHADOWS));
                }
                //console.log(JSON.stringify(SHADOWS));
                doShift = true;
            }
            else {
                SHADOWS.splice(firstIndex, firstIndex == secondIndex && edge1 == edge2 && !edge1 ? 0 : secondIndex - firstIndex + 1, new_shadow);
            }
            var sum2 = diff_sum(SHADOWS);
            //console.log('sum1', sum1, 'sum2', sum2, sum2 < sum1, SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1])));
            if (sum2 < sum1) this.done = true;
            /*if (SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1]))) {
                this.done = true;
            }*/
            if (new_shadow[0] == 0 || doShift) {
                var count = 0;
                //console.log('shifting');
                while (SHADOWS[0][0] != 0) {
                    SHADOWS.push(SHADOWS.shift());
                    if (count >= SHADOWS.length) break;
                    count++;
                    //console.log(JSON.stringify(SHADOWS));
                }
                //console.log('end shifting', JSON.stringify(SHADOWS));
            }
            //console.log(JSON.stringify(SHADOWS));
            //console.log(diff_sum(SHADOWS));
        }
    };

    function isBefore(A1, A2) {
        if (A1 > 0 && A2 < 0) { // A1 in bottom half, A2 in top half
            return true;
        }
        else if (A2 > 0 && A1 < 0) { // A1 in top half, A2 in bottom half
            return false;
        }
        else {
            return A1 < A2;
        }
    }

    function isAfter(A1, A2) {
        return !isBefore(A1, A2);
    }

    function isBetween(b, A1, A2) {
        if (A1 < A2) {
            return ((A1 <= b) && (b <= A2));
        }
        else {
            return ((A1 <= b) && (b <= Math.PI)) || ((-Math.PI <= b) && (b <= A2));
        }
    }

    function normalize(x) {
        if (x > Math.PI) {
            return -(2 * Math.PI - x);
        }
        else if ( x < -Math.PI) {
            return 2 * Math.PI + x;
        }
        else {
            return x;
        }
    }

    function diff(A1, A2) {
        if (A1 > 0 && A2 < 0) { // A1 in bottom half, A2 in top half
            return Math.abs((Math.PI - A1) - (-Math.PI - A2));
        }
        else if (A2 > 0 && A1 < 0) { // A1 in top half, A2 in bottom half
            return Math.abs(-A1 + A2);
        }
        if (A1 <= 0 && A2 <= 0) { // A1,A2 in bottom half
            if (isAfter(A1, A2)) { // A1 after A2
                return -A1 + Math.PI - (-Math.PI - A2)
            }
            else {
                return Math.abs(A2 - A1);
            }
        }
        else {
            if (isAfter(A1, A2)) {
                return Math.PI + (Math.PI - A1) + A2
            }
            else {
                return Math.abs(A2 - A1);
            }
        }
    }

    function diff_sum(SHADOWS) {
        var sum = 0;
        for (var i = 0; i < SHADOWS.length; i++) {
            ////console.log(SHADOWS[i][0], SHADOWS[i][1], diff(SHADOWS[i][0], SHADOWS[i][1]));
            sum += diff(SHADOWS[i][0], SHADOWS[i][1]);
        }
        return sum;
    }

    var rot6 = ROT;

    var key2pt_cache = {};
    function key2pt(key) {
        if (key in key2pt_cache) return key2pt_cache[key];
        var p = key.split(',').map(function (c) { return parseInt(c) });
        var pt = {x: p[0], y: p[1], key: key};
        key2pt_cache[key] = pt;
        return pt;
    }

    function xy2key(x, y) {
        return x + "," + y;
    }

    function xy2pt(x, y) {
        return {x: x, y: y, key: x + "," + y};
    }

    function pt2key(pt) {
        return pt.x + "," + pt.y;
    }

    function generateElevationWalls(data, elevation) {
        var t1 = Date.now();
        var walls = {};
        for (var key in data) {
            var pt = data[key];
            if (pt.z > elevation) {
                adjLoop:
                for (var i = -1; i <= 1; i++) {
                    for (var j = -1; j <= 1; j++) {
                        if (0 !== i || 0 !== j) {
                            var k = (pt.x + i) + "," + (pt.y + j);
                            if (data[k] && data[k].z <= elevation) {
                                walls[pt.key] = pt;
                                break adjLoop;
                            }
                        }
                    }
                }
            }
        }
        console.log('generateElevationWalls', Date.now() - t1 + 'ms');
        return walls;
    }

    function setTreeWalls(obj, elevation, tree, tree_elevations, tree_state, tree_blocks) {
        for (var i in tree) {
            if (elevation < tree_elevations[i]) {
                if (tree_state[i]) {
                    //obj[i] = ['tree', tree[i].x, tree[i].y, Math.SQRT2];
                    tree_blocks[i].forEach(function (pt) {
                        var k = pt.x + "," + pt.y;
                        obj[k] = (obj[k] || []).concat([['tree', tree[i].x, tree[i].y, Math.SQRT2]]);
                    });
                }
            }
        }
    }

    function parseImage(imageHandler$$1, offset, width, height, pixelHandler) {
        var grid = {};
        imageHandler$$1.scan(offset, width, height, pixelHandler, grid);
        return grid;
    }

    function VisionSimulation(worlddata, opts) {
        var self = this;
        
        this.opts = opts || {};
        this.radius = this.opts.radius || parseInt(1600 / 64);
        this.worldMinX = worlddata.worldMinX;
        this.worldMinY = worlddata.worldMinY;
        this.worldMaxX = worlddata.worldMaxX;
        this.worldMaxY = worlddata.worldMaxY;
        this.worldWidth = this.worldMaxX - this.worldMinX;
        this.worldHeight = this.worldMaxY - this.worldMinY;
        this.gridWidth = this.worldWidth / 64 + 1;
        this.gridHeight = this.worldHeight / 64 + 1;
        this.ready = false;

        this.lightPassesCallback = function (x, y) {
            var key = x + ',' + y;
            return !(key in self.elevationWalls[self.elevation]) && !(key in self.ent_fow_blocker_node) && !(key in self.treeWalls[self.elevation] && self.treeWalls[self.elevation][key].length > 0) ;
        };
        
        this.fov = new rot6.FOV.PreciseShadowcasting(this.lightPassesCallback, {topology:8});
    }
    VisionSimulation.prototype.initialize = function (mapDataImagePath, onReady) {
        var self = this;
        this.ready = false;
        this.grid = [];
        this.gridnav = null;
        this.ent_fow_blocker_node = null;
        this.tools_no_wards = null;
        this.elevationValues = [];
        this.elevationGrid = null;
        this.elevationWalls = {};
        this.treeWalls = {};
        this.tree = {}; // center key to point map
        this.tree_blocks = {}; // center to corners map
        this.tree_relations = {}; // corner to center map
        this.tree_elevations = {};
        this.tree_state = {};
        this.walls = {};
        this.lights = {};
        this.area = 0;
        if (this.imageHandler) this.imageHandler.disable();
        this.imageHandler = new imageHandler(mapDataImagePath);
        var t1 = Date.now();
        this.imageHandler.load(function (err) {
            if (!err) {
                var t2 = Date.now();
                console.log('image load', t2 - t1 + 'ms');
                self.gridnav = parseImage(self.imageHandler, self.gridWidth * 2, self.gridWidth, self.gridHeight, self.blackPixelHandler.bind(self));
                self.ent_fow_blocker_node = parseImage(self.imageHandler, self.gridWidth * 3, self.gridWidth, self.gridHeight, self.blackPixelHandler.bind(self));
                self.tools_no_wards = parseImage(self.imageHandler, self.gridWidth * 4, self.gridWidth, self.gridHeight, self.blackPixelHandler.bind(self));
                parseImage(self.imageHandler, self.gridWidth, self.gridWidth, self.gridHeight, self.treeElevationPixelHandler.bind(self));
                self.elevationGrid = parseImage(self.imageHandler, 0, self.gridWidth, self.gridHeight, self.elevationPixelHandler.bind(self));
                var t3 = Date.now();
                console.log('image process', t3 - t2 + 'ms');
                self.elevationValues.forEach(function (elevation) {
                    //self.elevationWalls[elevation] = generateElevationWalls(self.elevationGrid, elevation);
                    self.treeWalls[elevation] = {};
                    setTreeWalls(self.treeWalls[elevation], elevation, self.tree, self.tree_elevations, self.tree_state, self.tree_blocks);
                });
                var t4 = Date.now();
                console.log('walls generation', t4 - t3 + 'ms');
                for (var i = 0; i < self.gridWidth; i++) {
                    self.grid[i] = [];
                    for (var j = 0; j < self.gridHeight; j++) {
                        var pt = xy2pt(i, j);
                        key2pt_cache[pt.key] = pt;
                        self.grid[i].push(pt);
                    }
                }
                var t5 = Date.now();
                console.log('cache prime', t5 - t4 + 'ms');
                self.ready = true;
            }
            onReady(err);
        });
    };

    VisionSimulation.prototype.blackPixelHandler = function (x, y, p, grid) {
        var pt = this.ImageXYtoGridXY(x, y);
        if (p[0] === 0) {
            grid[pt.x + "," + pt.y] = pt;
        }
    };
    VisionSimulation.prototype.elevationPixelHandler = function (x, y, p, grid) {
        var pt = this.ImageXYtoGridXY(x, y);
        pt.z = p[0];
        grid[pt.x + "," + pt.y] = pt;
        if (this.elevationValues.indexOf(p[0]) == -1) {
            this.elevationValues.push(p[0]);
        }
    };
    VisionSimulation.prototype.treeElevationPixelHandler = function (x, y, p, grid) {
        var self = this;
        var pt = this.ImageXYtoGridXY(x, y);
        if (p[1] == 0 && p[2] == 0) {
            // trees are 2x2 in grid
            // tree origins rounded up when converted to grid, so they represent top right corner. subtract 0.5 to get grid origin
            var treeOrigin = xy2pt(pt.x - 0.5, pt.y - 0.5);
            var treeElevation = p[0] + 40;
            var kC = treeOrigin.key;
            this.tree[kC] = treeOrigin;
            this.tree_elevations[kC] = treeElevation;
            this.tree_blocks[kC] = [];
            this.tree_state[kC] = true;
            // iterate through tree 2x2 by taking floor and ceil of tree grid origin
            [Math.floor, Math.ceil].forEach(function (i) {
                [Math.floor, Math.ceil].forEach(function (j) {
                    var treeCorner = xy2pt(i(treeOrigin.x), j(treeOrigin.y));
                    self.tree_relations[treeCorner.key] = (self.tree_relations[treeCorner.key] || []).concat(treeOrigin);
                    self.tree_blocks[kC].push(treeCorner);
                });
            });
        }
    };
    VisionSimulation.prototype.updateVisibility = function (gX, gY, radius) {
        var self = this,
            key = xy2key(gX, gY);

        radius = radius || self.radius;
        this.elevation = this.elevationGrid[key].z;
        this.walls = this.treeWalls[this.elevation];
        if (!this.elevationWalls[this.elevation]) this.elevationWalls[this.elevation] = generateElevationWalls(this.elevationGrid, this.elevation);
        //setElevationWalls(this.walls, this.elevationWalls, this.elevation)
        //setWalls(this.walls, this.ent_fow_blocker_node);
        //setWalls(this.walls, this.tools_no_wards);
        //setTreeWalls(this.walls, this.elevation, this.tree, this.tree_elevations, this.tree_state, this.tree_blocks);

        this.fov.walls = this.walls;
        this.lights = {};
        this.area = this.fov.compute(gX, gY, radius, function(x2, y2, r, vis) {
            var key = xy2key(x2, y2);
            if (!self.elevationGrid[key]) return;
            var treePts = self.tree_relations[key];
            var treeBlocking = false;
            if (treePts) {
                for (var i = 0; i < treePts.length; i++) {
                    var treePt = treePts[i];
                    treeBlocking = self.tree_state[treePt.key] && self.tree_elevations[treePt.key] > self.elevation;
                    if (treeBlocking) break;
                }
            }
            if (vis == 1 && !self.ent_fow_blocker_node[key] && !treeBlocking) {
                self.lights[key] = 255;
            }
        });
        this.lightArea = Object.keys(this.lights).length;
    };

    VisionSimulation.prototype.isValidXY = function (x, y, bCheckGridnav, bCheckToolsNoWards, bCheckTreeState) {
        if (!this.ready) return false;
        
        var key = xy2key(x, y),
            treeBlocking = false;
            
        if (bCheckTreeState) {
            var treePts = this.tree_relations[key];
            if (treePts) {
                for (var i = 0; i < treePts.length; i++) {
                    var treePt = treePts[i];
                    treeBlocking = this.tree_state[treePt.key];
                    if (treeBlocking) break;
                }
            }
        }
        
        return x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight && (!bCheckGridnav || !this.gridnav[key]) && (!bCheckToolsNoWards || !this.tools_no_wards[key]) && (!bCheckTreeState || !treeBlocking);
    };

    VisionSimulation.prototype.toggleTree = function (x, y) {
        var self = this;
        var key = xy2key(x, y);
        var isTree = !!this.tree_relations[key];
        if (isTree) {
            var treePts = this.tree_relations[key];
            for (var i = 0; i < treePts.length; i++) {
                var pt = treePts[i];
                this.tree_state[pt.key] = !this.tree_state[pt.key];
                
                this.elevationValues.forEach(function (elevation) {
                    if (elevation < self.tree_elevations[pt.key]) {
                        self.tree_blocks[pt.key].forEach(function (ptB) {
                            for (var j = self.treeWalls[elevation][ptB.key].length - 1; j >= 0; j--) {
                                if (pt.x == self.treeWalls[elevation][ptB.key][j][1] && pt.y == self.treeWalls[elevation][ptB.key][j][2]) {
                                    self.treeWalls[elevation][ptB.key].splice(j, 1);
                                }
                            }
                        });
                        if (self.tree_state[pt.key]) {
                            self.tree_blocks[pt.key].forEach(function (ptB) {
                                self.treeWalls[elevation][ptB.key] = (self.treeWalls[elevation][ptB.key] || []).concat([['tree', pt.x, pt.y, Math.SQRT2]]);
                            });
                        }
                    }
                });
            }
        }

        return isTree;
    };
    VisionSimulation.prototype.setRadius = function (r) {
        this.radius = r;
    };
    VisionSimulation.prototype.WorldXYtoGridXY = function (wX, wY, bNoRound) {
        var x = (wX - this.worldMinX) / 64,
            y = (wY - this.worldMinY) / 64;
        if (!bNoRound) {
            x = parseInt(Math.round(x));
            y = parseInt(Math.round(y));
        }
        return {x: x, y: y, key: x + ',' + y};
    };
    VisionSimulation.prototype.GridXYtoWorldXY = function (gX, gY) {
        return {x: gX * 64 + this.worldMinX, y: gY * 64 + this.worldMinY};
    };

    VisionSimulation.prototype.GridXYtoImageXY = function (gX, gY) {
        return {x: gX, y: this.gridHeight - gY - 1};
    };

    VisionSimulation.prototype.ImageXYtoGridXY = function (x, y) {
        var gY = this.gridHeight - y - 1;
        return {x: x, y: gY, key: x + ',' + gY};
    };

    VisionSimulation.prototype.WorldXYtoImageXY = function (wX, wY) {
        var pt = this.WorldXYtoGridXY(wX, wY);
        return this.GridXYtoImageXY(pt.x, pt.y);
    };

    VisionSimulation.prototype.key2pt = key2pt;
    VisionSimulation.prototype.xy2key = xy2key;
    VisionSimulation.prototype.xy2pt = xy2pt;
    VisionSimulation.prototype.pt2key = pt2key;

    var visionSimulation = VisionSimulation;

    const getFeatureCenter = feature => {
        const ext = feature.getGeometry().getExtent();
        const center = extent.getCenter(ext);
        return new Point(center);
    };

    const defaultStyle = new Style({
        fill: new Fill({
            color: 'rgba(255,255,255,0.4)'
        }),
        stroke: new Stroke({
            color: '#3399CC',
            width: 1.25
        })
    });

    const styles = {
        creepSpawn: new Style({
            image: new RegularShape({
                points: 6,
                radius: 8,
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.3)'
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 255, 0.7)',
                    width: 2
                })
            })
        }),
        neutralCamp: [
            new Style({
                image: new RegularShape({
                    points: 3,
                    radius: 8,
                    fill: new Fill({
                        color: 'rgba(0, 255, 0, 0.3)'
                    }),
                    stroke: new Stroke({
                        color: 'rgba(0, 255, 0, 0.7)',
                        width: 2
                    })
                })
            }),
            new Style({
                image: new RegularShape({
                    points: 3,
                    radius: 9,
                    fill: new Fill({
                        color: 'rgba(255, 255, 0, 0.3)'
                    }),
                    stroke: new Stroke({
                        color: 'rgba(255, 255, 0, 0.7)',
                        width: 2
                    })
                })
            }),
            new Style({
                image: new RegularShape({
                    points: 3,
                    radius: 10,
                    fill: new Fill({
                        color: 'rgba(255, 150, 0, 0.3)'
                    }),
                    stroke: new Stroke({
                        color: 'rgba(255, 150, 0, 0.7)',
                        width: 2
                    })
                })
            }),
            new Style({
                image: new RegularShape({
                    points: 3,
                    radius: 11,
                    fill: new Fill({
                        color: 'rgba(255, 0, 0, 0.3)'
                    }),
                    stroke: new Stroke({
                        color: 'rgba(255, 0, 0, 0.7)',
                        width: 2
                    })
                })
            })
        ],
        dire: new Style({
            fill: new Fill({
                color: 'rgba(255, 51, 51, 0.2)'
            }),
            stroke: new Stroke({
                color: '#FF3333',
                width: 2
            })
        }),
        radiant: new Style({
            fill: new Fill({
                color: 'rgba(51, 255, 51, 0.2)'
            }),
            stroke: new Stroke({
                color: '#33FF33',
                width: 2
            })
        }),
        direCreep: new Style({
            fill: new Fill({
                color: 'rgba(255, 51, 51, 0.2)'
            }),
            stroke: new Stroke({
                color: '#FF3333',
                width: 10
            })
        }),
        radiantCreep: new Style({
            fill: new Fill({
                color: 'rgba(51, 255, 51, 0.2)'
            }),
            stroke: new Stroke({
                color: '#33FF33',
                width: 10
            })
        }),
        highlight: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 0, 0.2)'
            }),
            stroke: new Stroke({
                color: '#ffff00',
                width: 2
            })
        }),
        select: new Style({
            fill: new Fill({
                color: 'rgba(0, 255, 0, 0.2)'
            }),
            stroke: new Stroke({
                color: '#00ff00',
                width: 2
            })
        }),
        cursor: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new Stroke({
                color: 'rgba(255, 255, 255, 1)',
                width: 1
            })
        }),
        visionSimulation: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 0, 0.2)'
            }),
            stroke: new Stroke({
                color: 'rgba(255, 255, 0, 1)',
                width: 1
            })
        }),
        dayVision: new Style({
            fill: new Fill({
                color: 'rgba(238, 153, 0, 0.1)'
            }),
            stroke: new Stroke({
                color: 'rgba(238, 153, 0, 0.5)',
                width: 2
            })
        }),
        nightVision: new Style({
            fill: new Fill({
                color: 'rgba(0, 127, 255, 0.1)'
            }),
            stroke: new Stroke({
                color: 'rgba(0, 0, 255, 0.5)',
                width: 2
            })
        }),
        trueSight: new Style({
            fill: new Fill({
                color: 'rgba(0, 127, 255, 0.1)'
            }),
            stroke: new Stroke({
                color: 'rgba(0, 127, 255, 0.5)',
                width: 2
            })
        }),
        attackRange: new Style({
            fill: new Fill({
                color: 'rgba(255, 0, 0, 0.1)'
            }),
            stroke: new Stroke({
                color: 'rgba(255, 0, 0, 0.5)',
                width: 2
            })
        }),
        ent_dota_fountain: [
            defaultStyle,
            new Style({
                image: new Icon({
                    src: 'img/svgs/water-15.svg',
                    anchor: [0.5, 0.5],
                    imgSize: [21, 21]
                }),
                geometry: getFeatureCenter
            })
        ],
        npc_dota_barracks: [
            defaultStyle,
            new Style({
                image: new Icon({
                    src: 'img/svgs/stadium-15.svg',
                    anchor: [0.5, 0.5],
                    imgSize: [21, 21]
                }),
                geometry: getFeatureCenter
            })
        ],
        npc_dota_filler: [
            defaultStyle,
            new Style({
                image: new Icon({
                    src: 'img/svgs/landmark-15.svg',
                    anchor: [0.5, 0.5],
                    imgSize: [21, 21]
                }),
                geometry: getFeatureCenter
            })
        ],
        npc_dota_tower: [
            defaultStyle,
            new Style({
                image: new Icon({
                    src: 'img/svgs/castle-15.svg',
                    anchor: [0.5, 0.5],
                    imgSize: [21, 21]
                }),
                geometry: getFeatureCenter
            })
        ],
        ent_dota_shop: [
            defaultStyle,
            new Style({
                image: new Icon({
                    src: 'img/svgs/shop-15.svg',
                    anchor: [0.5, 0.5],
                    imgSize: [21, 21]
                }),
                geometry: getFeatureCenter
            })
        ],
        npc_dota_fort: [
            defaultStyle,
            new Style({
                image: new Icon({
                    src: 'img/svgs/town-hall-15.svg',
                    anchor: [0.5, 0.5],
                    imgSize: [21, 21]
                }),
                geometry: getFeatureCenter
            })
        ],
        npc_dota_healer: [
            defaultStyle,
            new Style({
                image: new Icon({
                    src: 'img/svgs/place-of-worship-15.svg',
                    anchor: [0.5, 0.5],
                    imgSize: [21, 21]
                }),
                geometry: getFeatureCenter
            })
        ],
        measure: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.3)'
            }),
            stroke: new Stroke({
                color: 'rgba(255,165,0, 0.7)',
                lineDash: [10, 10],
                width: 3
            }),
            image: new Circle({
                radius: 5,
                stroke: new Stroke({
                    color: 'rgba(255,165,0, 0.7)',
                    width: 2
                }),
                fill: new Fill({
                    color: 'rgba(255,165,0, 0.3)'
                })
            })
        }),
        observer: {
            normal: new Style({
                image: new Icon({
                    src: 'img/ward_observer.png',
                    anchor: [0.5, 1]
                })
            }),
            highlight: new Style({
                image: new Icon({
                    src: 'img/ward_observer.png',
                    anchor: [0.5, 1],
                    color: '#0000ff'
                })
            }),
            remove: new Style({
                image: new Icon({
                    src: 'img/ward_observer.png',
                    anchor: [0.5, 1],
                    color: '#ff0000'
                })
            })
        },
        sentry: {
            normal: new Style({
                image: new Icon({
                    src: 'img/ward_sentry.png',
                    anchor: [0.5, 1]
                })
            }),
            highlight: new Style({
                image: new Icon({
                    src: 'img/ward_sentry.png',
                    anchor: [0.5, 1],
                    color: '#0000ff'
                })
            }),
            remove: new Style({
                image: new Icon({
                    src: 'img/ward_sentry.png',
                    anchor: [0.5, 1],
                    color: '#ff0000'
                })
            })
        },
        tree: {
            alive: new Style({
                fill: new Fill({color: [0, 255, 0, 0.3]}),
                stroke: new Stroke({color: [0, 255, 0, 0.8]})
            }),
            dead: new Style({
                fill: new Fill({color: [51, 25, 0, 0.7]}),
                stroke: new Stroke({color: [255, 128, 0, 0.8]})
            })
        },
        bountyRune: new Style({
            image: new Icon({
                src: 'img/bountyrune.png',
                anchor: [0.5, 0.5]
            })
        }),
        rune: new Style({
            image: new Icon({
                src: 'img/doubledamage.png',
                anchor: [0.5, 0.5]
            })
        }),
        roshan: new Style({
            image: new Icon({
                src: 'img/roshan.png',
                anchor: [0.5, 0.5]
            })
        }),
        pullRange: new Style({
            fill: new Fill({
                color: 'rgba(0, 153, 238, 0.1)'
            }),
            stroke: new Stroke({
                color: 'rgba(0, 153, 238, 0.5)',
                width: 2
            })
        }),
    };

    styles.teamColor = (feature, resolution) => {
        if (feature.getId().indexOf('_bad_') == -1) {
            return styles.radiant;
        }
        else {
            return styles.dire;
        }
    };

    styles.creepColor = (feature, resolution) => {
        if (feature.getId().indexOf('_bad_') == -1) {
            return styles.radiantCreep;
        }
        else {
            return styles.direCreep;
        }
    };

    const loadGeoJSON = (map, layerDef, data, version) => {
        try {
            const source = new SourceVector({
                url: 'data/' + version + '/' + layerDef.filename,
                format: new GeoJSON({dataProjection: layerDef.projection || pixelProj})
            });
            return new LayerVector({
                title: layerDef.name,
                projection: layerDef.projection || pixelProj,
                source: source,
                visible: !!layerDef.visible,
                style: layerDef.style
            });
        }
        catch (e) {
        
        }
    };

    const loadPolygon = (map, layerDef, data, layer) => {
        const features = data.data[layerDef.id].map(obj => {
            const points = obj.points;
            const ring = points.map(point => proj.transform([point.x, point.y], dotaProj, pixelProj));
            ring.push(proj.transform([points[0].x, points[0].y], dotaProj, pixelProj));
            const geom = new Polygon([ring]);
            const feature = new Feature(geom);
            obj.id = layerDef.id;
            feature.set('dotaProps', obj, true);
            return feature;
        });
        
        const vectorSource = new SourceVector({
            features: features
        });
        
        if (layer) {
            layer.setSource(vectorSource);
        }
        else {
            layer = new LayerVector({
                title: layerDef.name,
                source: vectorSource,
                visible: !!layerDef.visible,
                style: layerDef.style
            });
            layer.set('layerId', layerDef.id, true);
            layer.set('layerDef', layerDef, true);
            layer.set('showInfo', false, true);
        }

        return layer;
    };

    const loadJSON = (map, layerDef, data, layer) => {
        const features = data.data[layerDef.id].map(point => {
            const unitClass = point.subType ? layerDef.id + '_' + point.subType : layerDef.id;
            const stats = data.stats[unitClass];
            const bounds = layerDef.id == "ent_dota_tree" ? [64, 64] : stats.bounds;
            const geom = (bounds && bounds[0] > 0 && bounds[1] > 0)
                ? new Polygon([[
                    proj.transform([point.x-bounds[0], point.y-bounds[1]], dotaProj, pixelProj),
                    proj.transform([point.x-bounds[0], point.y+bounds[1]], dotaProj, pixelProj),
                    proj.transform([point.x+bounds[0], point.y+bounds[1]], dotaProj, pixelProj),
                    proj.transform([point.x+bounds[0], point.y-bounds[1]], dotaProj, pixelProj),
                    proj.transform([point.x-bounds[0], point.y-bounds[1]], dotaProj, pixelProj)
                ]])
                : new Point(proj.transform([point.x, point.y], dotaProj, pixelProj));

            const feature = new Feature(geom);
            
            point.id = layerDef.id;
            point.unitClass = unitClass;
            feature.set('dotaProps', point, true);
            
            return feature;
        });
        
        const vectorSource = new SourceVector({
            features: features
        });
        
        if (layer) {
            layer.setSource(vectorSource);
        }
        else {
            layer = new LayerVector({
                title: layerDef.name,
                source: vectorSource,
                visible: !!layerDef.visible,
                style: layerDef.style
            });
            layer.set('layerId', layerDef.id, true);
            layer.set('layerDef', layerDef, true);
            layer.set('showInfo', false, true);
        }

        return layer;
    };

    const loadNeutralPullRange = (InteractiveMap, layerDef, data, layer) => {
        const vectorSource = new SourceVector({
            features: []
        });
        
        if (layer) {
            layer.setSource(vectorSource);
        }
        else {
            layer = new LayerVector({
                title: layerDef.name,
                source: vectorSource,
                visible: !!layerDef.visible,
                style: layerDef.style
            });
            layer.set('layerId', layerDef.id, true);
            layer.set('layerDef', layerDef, true);
            layer.set('showInfo', false, true);
        }

        return layer;
    };

    const loadLayerGroupFromData = (InteractiveMap, data, version, layersIndex, layerDefs) => {
        const layers = [];
        for (let i = 0; i < layerDefs.length; i++) {
            const layerDef = layerDefs[i];
            if (!data.data[layerDef.id] && ((layerDef.type !== 'pullRange' && layerDef.type !== 'GeoJSON') || version == '688')) continue;
            let layer;
            switch (layerDef.type) {
                case 'GeoJSON':
                    layer = loadGeoJSON(InteractiveMap.map, layerDef, layersIndex[layerDef.id], version);
                break;
                case 'polygon':
                    layer = loadPolygon(InteractiveMap.map, layerDef, data, layersIndex[layerDef.id]);
                break;
                case 'pullRange':
                    layer = loadNeutralPullRange(InteractiveMap, layerDef, data, layersIndex[layerDef.id]);
                break;
                default:
                    layer = loadJSON(InteractiveMap.map, layerDef, data, layersIndex[layerDef.id]);
                break;
            }
            if (layer) {
                layersIndex[layerDef.id] = layer;
                layers.push(layer);
            }
        }
        return new LayerGroup({
            title: 'Layers',
            layers: new Collection(layers)
        });
    };

    const getJSON = (path, callback) => {
        let retries = 3;
        
        const makeReq = () => {
            const request = new XMLHttpRequest();

            request.open('GET', path, true);
            let err;
            request.onload = () => {
                let data;
                if (request.status == 200) {
                    console.log(request);
                    console.log(request.status);
                    try {
                        data = JSON.parse(request.responseText);
                    }
                    catch (e) {
                        err = e;
                    }
                }
                else {
                    err = new Error("Error loading json " + request.status);
                }
                callback(err, data);
            };
            request.onerror = () => {
                retries--;
                if (retries > 0) {
                    setTimeout(makeReq, 1000);
                }
                else {
                    err = new Error("Error loading json " + request.status);
                    callback(err);
                }
            };
            request.send();
        };
        
        makeReq();
    };

    const baseLayerDefinitions = [
        {
            id: '715',
            name: '7.15',
            tilesets: [
                {
                    id: 'default',
                    name: 'Default'
                }
            ]
        },
        {
            id: '709',
            name: '7.09',
            tilesets: [
                {
                    id: 'default',
                    name: 'Default'
                }
            ]
        },
        {
            id: '707',
            name: '7.07',
            tilesets: [
                {
                    id: 'default',
                    name: 'Default'
                }
            ]
        },
        {
            id: '706',
            name: '7.06',
            tilesets: [
                {
                    id: 'default',
                    name: 'Default'
                },
                {
                    id: 'autumn',
                    name: 'Autumn'
                },
                {
                    id: 'desert',
                    name: 'Desert'
                },
                {
                    id: 'immortalgardens',
                    name: 'Immortal Gardens'
                },
                {
                    id: 'journey',
                    name: 'New Journey'
                },
                {
                    id: 'reef',
                    name: 'Reef\'s Edge'
                },
                {
                    id: 'spring',
                    name: 'Spring'
                },
                {
                    id: 'winter',
                    name: 'Winter'
                }
            ]
        },
        {
            id: '700',
            name: '7.00',
            tilesets: [
                {
                    id: 'default',
                    name: 'Default'
                }
            ]
        },
        {
            id: '688',
            name: '6.88',
            tilesets: [
                {
                    id: 'default',
                    name: 'Default'
                }
            ]
        }
    ];

    const layerDefinitions = [
        {
            id: 'path_corner',
            name: 'Lanes',
            filename: 'path_corner.json',
            type: 'GeoJSON',
            group: 'overlay',
            projection: dotaProj,
            style: styles.teamColor
        },
        {
            id: 'npc_dota_spawner',
            name: 'Lane Spawns',
            filename: 'npc_dota_spawner.json',
            type: 'GeoJSON',
            group: 'overlay',
            projection: dotaProj,
            style: styles.creepSpawn
        },
        {
            id: 'ent_fow_blocker_node',
            name: 'Vision Blocker',
            filename: 'ent_fow_blocker_node.json',
            type: 'GeoJSON',
            group: 'overlay',
            projection: dotaProj,
            style: new Style({
                fill: new Fill({color: [0, 0, 255, 0.3]}),
                stroke: new Stroke({color: [0, 0, 255, 0.8]})
            })
        },
        {
            id: 'no_wards',
            name: 'Invalid Wards',
            filename: 'no_wards.json',
            type: 'GeoJSON',
            group: 'overlay',
            projection: dotaProj,
            style: new Style({
                fill: new Fill({color: [255, 0, 0, 0.3]}),
                stroke: new Stroke({color: [255, 0, 0, 0.8]})
            })
        },
        {
            id: 'trigger_multiple',
            name: 'Spawn Boxes',
            type: 'polygon',
            group: 'overlay',
            style: new Style({
                fill: new Fill({color: [0, 255, 125, 0.3]}),
                stroke: new Stroke({color: [0, 255, 125, 0.8]})
            })
        },
        {
            id: 'npc_dota_neutral_spawner',
            name: 'Neutral Camps',
            group: 'object',
            style: (feature, resolution) => styles.neutralCamp[parseInt(feature.get('dotaProps').neutralType)]
        },
        {
            id: 'ent_dota_tree',
            name: 'Trees',
            group: 'object',
            style: (feature, resolution) => feature.get('isCut') ? styles.tree.dead : styles.tree.alive,
            toggle: true
        },
        {
            id: 'npc_dota_roshan_spawner',
            name: 'Roshan',
            group: 'object',
            style: styles.roshan
        },
        {
            id: 'dota_item_rune_spawner_powerup',
            name: 'Runes',
            group: 'object',
            style: styles.rune
        },
        {
            id: 'dota_item_rune_spawner_bounty',
            name: 'Bounty Runes',
            group: 'object',
            style: styles.bountyRune
        },
        {
            id: 'ent_dota_fountain',
            name: 'Fountain',
            group: 'structure',
            style: styles.ent_dota_fountain,
            toggle: true
        },
        {
            id: 'npc_dota_barracks',
            name: 'Barracks',
            group: 'structure',
            style: styles.npc_dota_barracks,
            toggle: true
        },
        {
            id: 'npc_dota_filler',
            name: 'Buildings',
            group: 'structure',
            style: styles.npc_dota_filler,
            toggle: true
        },
        {
            id: 'npc_dota_tower',
            name: 'Towers',
            group: 'structure',
            style: styles.npc_dota_tower,
            toggle: true
        },
        {
            id: 'ent_dota_shop',
            name: 'Shops',
            group: 'structure',
            style: styles.ent_dota_shop
        },
        {
            id: 'npc_dota_fort',
            name: 'Ancients',
            group: 'structure',
            style: styles.npc_dota_fort,
            toggle: true
        },
        {
            id: 'npc_dota_healer',
            name: 'Shrines',
            group: 'structure',
            style: styles.npc_dota_healer,
            toggle: true
        },
        {
            id: 'pullRange',
            name: 'Pull Range',
            type: 'pullRange',
            group: 'overlay',
            style: styles.pullRange,
            visible: true
        }
    ];

    class MenuPanel {
        constructor(panelId, openId, closeId, fullscreen) {
            this.panelId = panelId;
            this.openId = openId;
            this.closeId = closeId;
            this.fullscreen = fullscreen;

            this.panel = document.getElementById(this.panelId);
            
            this.openBtn = document.getElementById(this.openId);
            this.openBtn.addEventListener("click", this.open.bind(this), false);
            
            this.closeBtn = document.getElementById(this.closeId);
            this.closeBtn.addEventListener("click", this.close.bind(this), false);
        }

        open() {
            this.panel.classList.add('expand-horizontal');
            this.panel.classList.remove('collapsed-horizontal');
            this.openBtn.classList.add('collapsed-horizontal');
            this.openBtn.classList.remove('expand-horizontal');
            this.otherMenu.close();
        }
            
        close() {
            this.panel.classList.remove('expand-horizontal');
            this.panel.classList.add('collapsed-horizontal');
            this.openBtn.classList.remove('collapsed-horizontal');
            this.openBtn.classList.add('expand-horizontal');
        }
            
        static createToggle(layerDef, handler) {
            const toggle = document.createElement('div');
                toggle.classList.add('btn-toggle');
                
            const toggleCb = document.createElement('input');
                toggleCb.setAttribute("type", "checkbox");
                toggleCb.id = 'toggle-' + layerDef.id;
                toggleCb.addEventListener("change", handler, false);
            toggle.appendChild(toggleCb);

            const toggleLbl = document.createElement('label');
                toggleLbl.setAttribute("for", toggleCb.id);
            toggle.appendChild(toggleLbl);
            
            return toggle;
        }

        static createMenuPanelItem(InteractiveMap, layerDef, handler, inputType, inputName) {
            let optionId = layerDef.id;
            
            const menuItem = document.createElement('div');
                menuItem.classList.add('menu-item');
                menuItem.classList.add(inputName || 'data-layer');
                
            const menuItemCb = document.createElement('input');
                menuItemCb.setAttribute("type", inputType || "checkbox");
                if (inputType == "radio") {
                    optionId = layerDef.group + '-' + layerDef.id;
                    menuItemCb.setAttribute("name", inputName);
                    menuItemCb.setAttribute("value", optionId);
                }
                menuItemCb.id = 'option-' + optionId;
                menuItemCb.setAttribute("data-layer-id", optionId);
                menuItemCb.addEventListener("change", handler, false);
            menuItem.appendChild(menuItemCb);
            
            const menuItemLbl = document.createElement('label');
                menuItemLbl.classList.add('checkbox');
                menuItemLbl.setAttribute("for", menuItemCb.id);
                menuItemLbl.innerHTML = layerDef.name;
            menuItem.appendChild(menuItemLbl);
            
            if (layerDef.toggle) {
                const toggle = MenuPanel.createToggle(layerDef, e => {
                    const el = e.currentTarget;
                    const layer = InteractiveMap.getMapLayer(layerDef.id);
                    if (layerDef.id == 'ent_dota_tree') {
                        InteractiveMap.controls.tree.toggleAllTrees(el.checked);
                    }
                    else {
                        InteractiveMap.controls.ward.toggleAll(layer, el.checked);
                    }
                });
                menuItem.appendChild(toggle);
            }
            
            return menuItem;
        }
        
        static createBaseLayerMenuItem(id, name, checked) {
            const menuItem = document.createElement('div');
                menuItem.classList.add('menu-item');
                
            const menuItemRb = document.createElement('input');
                menuItemRb.id = `base-${id}-option`;
                menuItemRb.checked = checked;
                menuItemRb.setAttribute("type", "radio");
                menuItemRb.setAttribute("name", "base-type");
                menuItemRb.setAttribute("value", id);
                menuItem.appendChild(menuItemRb);
                
            const menuItemLbl = document.createElement('label');
                menuItemLbl.classList.add('checkbox');
                menuItemLbl.setAttribute("for", menuItemRb.id);
                menuItemLbl.innerHTML = name;
                menuItem.appendChild(menuItemLbl);
                
            const subMenuItem = document.createElement('div');
                subMenuItem.id = `base-${id}-menu`;
                subMenuItem.classList.add('menu-item-group');
                subMenuItem.classList.add('sub-menu');
                menuItem.appendChild(subMenuItem);
                
            return menuItem;
        }
    }

    class MenuControl {
        constructor(InteractiveMap) {
            this.InteractiveMap = InteractiveMap;
            this.leftPanel = new MenuPanel("menu-left", "menu-left-open-btn", "menu-left-close-btn");
            this.rightPanel = new MenuPanel("menu-right", "menu-right-open-btn", "menu-right-close-btn");
            this.leftPanel.otherMenu = this.rightPanel;
            this.rightPanel.otherMenu = this.leftPanel;
            
            const layerToggleHandler = e => this.updateLayerAndQueryString(e.currentTarget);
            
            this.InteractiveMap.layerDefs.forEach(layerDef => {
                const group = layerDef.group;
                const menu = document.querySelector('#' + group + '-menu');
                const menuItem = MenuPanel.createMenuPanelItem(this.InteractiveMap, layerDef, layerToggleHandler);
                menu.appendChild(menuItem);
            });
            
            const baseLayerToggleHandler = e => {
                const layerId = e.currentTarget.getAttribute('data-layer-id');
                this.InteractiveMap.baseLayers.forEach(layer => layer.setVisible(layer.get('layerId') === layerId));
                setQueryString('BaseLayer', layerId);
            };

            const versionSelect = document.getElementById('version-select');
            const baseMenu = document.getElementById('base-menu');
            var checked = true;
            this.InteractiveMap.baseLayerDefs.forEach(group => {
                const baseLayerMenu = MenuPanel.createBaseLayerMenuItem(group.id, group.name, checked);
                baseMenu.appendChild(baseLayerMenu);
                if (checked) checked = false;
                
                group.tilesets.forEach(tileset => {
                    const menu = document.querySelector('#base-' + group.id + '-menu');
                    const layerDef = {...tileset, group: group.id};
                    const menuItem = MenuPanel.createMenuPanelItem(this.InteractiveMap, layerDef, baseLayerToggleHandler, 'radio', 'base-layer');
                    menu.appendChild(menuItem);
                });
                
                const versionOption = document.createElement('option');
                versionOption.setAttribute("value", group.id);
                versionOption.innerHTML = group.name;
                versionSelect.appendChild(versionOption);
            });
        }
        
        updateLayerAndQueryString(element, layerId) {
            layerId = layerId || element.getAttribute('data-layer-id');
            const layer = this.InteractiveMap.getMapLayer(layerId);
            if (layer) {
                layer.setVisible(element.checked);
                const param = layer.get("title").replace(/ /g, '');
                setQueryString(param, element.checked ? true : null);
                if (layerId == 'ent_dota_tree') {
                    document.getElementById('btn-tree').setAttribute('trees-enabled', element.checked ? "yes" : "no");
                }
            }
        }
        
        toggleLayerMenuOption(layerId, state) {
            const element = document.querySelector('input[data-layer-id="' + layerId + '"]');
            if (state != null) element.checked = state;
            this.updateLayerAndQueryString(element, layerId);
        }
    }

    const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

    const unitNames = {
        npc_dota_roshan_spawner: "Roshan",
        dota_item_rune_spawner_powerup: "Rune",
        dota_item_rune_spawner_bounty: "Bounty Rune",
        ent_dota_tree: "Tree",
        npc_dota_healer: "Shrine",
        ent_dota_fountain: "Fountain",
        npc_dota_fort: "Ancient",
        ent_dota_shop: "Shop",
        npc_dota_tower: "Tower",
        npc_dota_barracks: "Barracks",
        npc_dota_filler: "Building",
        trigger_multiple: "Neutral Camp Spawn Box",
        npc_dota_neutral_spawner: "Neutral Camp",
        observer: "Observer Ward",
        sentry: "Sentry Ward"
    };
        
    const getUnitName = (unitType, unitSubType) => (unitSubType
                                                    ? capitalize(unitSubType.replace('tower', 'Tier ').replace('range', 'Ranged')) + ' '
                                                    : '') + unitNames[unitType];
        
    const pullTypes = ['Normal', 'Fast', 'Slow'];
    const neutralTypes = ['Easy', 'Medium', 'Hard', 'Ancient'];

    const getPopupContent = (stats, feature) => {
        const dotaProps = feature.get('dotaProps');
        const unitClass = dotaProps.subType ? dotaProps.id + '_' + dotaProps.subType : dotaProps.id;
        const unitStats = stats[unitClass];
        let htmlContent = '<div class="info"><span class="info-header">' + getUnitName(dotaProps.id, dotaProps.subType) + '</span><span class="info-body">';
        if (dotaProps.pullType != null) {
            htmlContent += '<br><span class="info-line">Pull Type: ' + pullTypes[dotaProps.pullType] + '</span>';
        }
        if (dotaProps.neutralType != null) {
            htmlContent += '<br><span class="info-line">Difficulty: ' + neutralTypes[dotaProps.neutralType] + '</span>';
        }
        if (stats && unitStats) {
            if (unitStats.hasOwnProperty('damageMin') && unitStats.hasOwnProperty('damageMax')) {
                htmlContent += '<br><span class="info-line">Damage: ' + unitStats.damageMin + "&ndash;" + unitStats.damageMax + '</span>';
            }
            if (unitStats.hasOwnProperty('bat')) {
                htmlContent += '<br><span class="info-line">BAT: ' + unitStats.bat + '</span>';
            }
            if (unitStats.hasOwnProperty('attackRange')) {
                htmlContent += '<br><span class="info-line">Attack Range: ' + unitStats.attackRange + '</span>';
            }
            if (unitStats.hasOwnProperty('health')) {
                htmlContent += '<br><span class="info-line">Health: ' + unitStats.health + '</span>';
            }
            if (unitStats.hasOwnProperty('armor')) {
                htmlContent += '<br><span class="info-line">Armor: ' + unitStats.armor + '</span>';
            }
            if (unitStats.hasOwnProperty('dayVision') && unitStats.hasOwnProperty('nightVision')) {
                htmlContent += '<br><span class="info-line">Vision: ' + unitStats.dayVision + "/" + unitStats.nightVision + '</span>';
            }
        }
        htmlContent += '</span></div>';
        return htmlContent;
    };

    const createCirclePointCoords = (circleCenterX, circleCenterY, circleRadius, pointsToFind) => {
        const angleToAdd = 360/pointsToFind;
        const coords = [];  
        let angle = 0;
        for (let i = 0; i < pointsToFind; i++) {
            angle += angleToAdd;
            const coordX = circleCenterX + circleRadius * Math.cos(angle * Math.PI/180);
            const coordY = circleCenterY + circleRadius * Math.sin(angle * Math.PI/180);
            coords.push([coordX,coordY]);
        }
        return coords;
    };

    class InfoControl {
        constructor(InteractiveMap, id) {
            this.InteractiveMap = InteractiveMap;
            //this.highlight = null;
            this.lastPointerMoveTime = Date.now();
            this.pointerMoveListener = null;
            this.clickListener = null;
            
            this.id = id;
            this.info = document.getElementById(id);
            this.infoContent = document.querySelector('#' + id + ' .message-content');
            this.closeBtn = document.querySelector('#' + id + ' .btn-close');
            this.closeBtn.addEventListener('click', evt => this.close(true), false);
        }
        
        activate() {
            if (!this.pointerMoveListener) {
                this.pointerMoveListener = this.InteractiveMap.map.on('pointermove', evt => {
                    // When user was dragging map, then coordinates didn't change and there's
                    // no need to continue
                    if (evt.dragging) {
                        return;
                    }

                    const pixel = this.InteractiveMap.map.getEventPixel(evt.originalEvent);
                    
                    // if mouse over a building feature, show info and highlight
                    let feature = this.InteractiveMap.map.forEachFeatureAtPixel(pixel, feature => feature, {
                        layerFilter: this.InteractiveMap.layerFilters.marker
                    });
                    if (feature) {
                        if (!this.isActive()) {
                            this.displayFeatureInfo(feature, false);
                        }
                        this.highlight(feature);
                    }
                    else {
                        this.close(false);
                
                        // if mouse over a ward feature, highlight
                        feature = this.InteractiveMap.checkAndHighlightWard(pixel);
                        
                        if (feature) {
                            this.InteractiveMap.controls.ward.showVisibilityInfo(feature.get('visionFeature'));
                        }
                        // no highlighted feature so unhighlight current feature
                        else if (!this.isActive()) {
                            this.unhighlight();
                        }
                    }
                });
            }
            if (!this.clickListener) {
                this.clickListener = this.InteractiveMap.map.on('click', evt => {
                    this.unhighlight();
                    let feature = this.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, feature => feature, {
                        layerFilter: this.InteractiveMap.layerFilters.marker
                    });
                    if (feature) {
                        if (!feature.get("clicked")) {
                            this.InteractiveMap.deselectAll();
                            const dotaProps = feature.get('dotaProps');
                            if (feature.get('dotaProps').id == "ent_dota_tree") {
                                this.InteractiveMap.controls.tree.toggleTree(feature, dotaProps);
                            }
                            else {
                                this.displayFeatureInfo(feature, true);
                                this.select(feature);
                                this.InteractiveMap.panTo(evt.coordinate);
                            }
                        }
                        else {
                            this.InteractiveMap.deselectAll();
                            this.close(true);
                        }
                    }
                    else {
                        // if clicked a ward feature, highlight
                        feature = this.InteractiveMap.checkAndHighlightWard(evt.pixel);
                        
                        if (feature) {
                            const visionFeature = feature.get('visionFeature');
                            if (visionFeature) {
                                this.InteractiveMap.controls.ward.showVisibilityInfo(feature.get('visionFeature'), true);
                            }
                            else {
                                this.close(true);
                            }
                            this.InteractiveMap.panTo(evt.coordinate);
                        }
                        // no highlighted feature so unhighlight current feature
                        else if (!this.isActive()) {
                            this.unhighlight();            
                            this.close(true);
                        }
                        this.InteractiveMap.deselectAll();
                    }
                });
            }
        }
        
        deactivate() {
            this.InteractiveMap.unhighlightWard();
            Observable.unByKey(this.pointerMoveListener);
            this.pointerMoveListener = null;
            Observable.unByKey(this.clickListener);
            this.clickListener = null;
        }

        setContent(html) {
            this.infoContent.innerHTML = html;
        }

        isActive() {
            return this.info.classList.contains('active');
        }

        open(bClicked) {
            this.info.classList.add('slideUp');
            this.info.classList.remove('slideDown');
            if (bClicked) {
                this.info.classList.add('active');
            }
        }

        close(bOverrideActive) {
            if (!this.isActive() || bOverrideActive) {
                this.info.classList.add('slideDown');
                this.info.classList.remove('slideUp');
                this.info.classList.remove('active');
            }
        }

        displayFeatureInfo(feature, bClicked) {
            this.setContent(getPopupContent(this.InteractiveMap.getStatData(), feature));
            this.open(bClicked);
        };

        unhighlight(feature) {
            const highlightedFeature = feature || this.InteractiveMap.highlightedFeature;
            if (highlightedFeature && !highlightedFeature.get("clicked")) {
                const dotaProps = highlightedFeature.get('dotaProps');
                if (dotaProps) {
                    if (dotaProps.id == 'npc_dota_neutral_spawner') {
                        const pullRange = highlightedFeature.get('pullRange');
                        if (pullRange) {
                            this.InteractiveMap.getMapLayer('pullRange').getSource().removeFeature(pullRange);
                            highlightedFeature.set("pullRange", null, true);
                        }
                        const guardRange = highlightedFeature.get('guardRange');
                        if (guardRange) {
                            this.InteractiveMap.getMapLayer('pullRange').getSource().removeFeature(guardRange);
                            highlightedFeature.set("guardRange", null, true);
                        }
                    }
                }
            }
            this.InteractiveMap.unhighlight();
        }

        highlight(feature) {
            this.unhighlight();
            const dotaProps = feature.get('dotaProps');
            if (dotaProps) {
                if (dotaProps.id == 'npc_dota_neutral_spawner') {
                    if (!feature.get('pullRange')) {
                        let circle = this.InteractiveMap.getRangeCircle(feature, null, null, null, 400);
                        feature.set("guardRange", circle, true);
                        this.InteractiveMap.getMapLayer('pullRange').getSource().addFeature(circle);
                        
                        const center = worldToLatLon([dotaProps.x, dotaProps.y]);
                        const pullTiming = mapConstants.pullRangeTiming[dotaProps.pullType];
                        const pullMaxCoords = createCirclePointCoords(center[0], center[1], 400 + pullTiming * 350, 360);
                        const pullMinCoords = createCirclePointCoords(center[0], center[1], 400 + pullTiming * 270, 360);
                        const geom = new Polygon([pullMaxCoords]);
                        geom.appendLinearRing(new LinearRing(pullMinCoords));
                        circle = new Feature(geom);
                        feature.set("pullRange", circle, true);
                        this.InteractiveMap.getMapLayer('pullRange').getSource().addFeature(circle);
                    }
                }
            }
            this.InteractiveMap.highlight(feature);
        }

        select(feature) {    
            if (feature && !feature.get("clicked")) {
                if (feature == this.InteractiveMap.highlightedFeature) {
                    this.unhighlight();
                }
                this.InteractiveMap.selectSource.addFeature(feature);
                feature.set("clicked", true, true);
            }
        }

    }

    class NotificationControl {
        constructor(id) {
            this.timer = null;
            this.id = id;
            this.info = document.getElementById(id);
            this.infoContent = document.querySelector('#' + id + ' .message-content');
        }
        
        show(message) {
            this.setContent(message);
            this.info.classList.remove('slideUp');
            this.info.classList.add('slideDown');
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.info.classList.add('slideUp');
                this.info.classList.remove('slideDown');
            }, 1500);
        }

        setContent(html) {
            this.infoContent.innerHTML = html;
        }

        open() {
            this.info.classList.add('slideDown');
            this.info.classList.remove('slideUp');
        }

        close() {
            this.info.classList.add('slideUp');
            this.info.classList.remove('slideDown');
        }

    }

    const formatRadius = circle => {
        const length = Math.round(circle.getRadius());
        const output = 'Radius: ' + length + ' ' + 'units<br>Area: ' + (Math.PI * length * length).toFixed(2) + ' units<sup>2</sup>';
        return output;
    };

    /**
     * Format length output.
     * @param {ol.geom.LineString} line The line.
     * @return {string} The formatted length.
     */
    const formatLength = (InteractiveMap, line) => {
        const length = Math.round(line.getLength());
        const output = 'Distance: ' + length + ' ' + 'units<br>Travel Time: ' + (length / InteractiveMap.movementSpeed).toFixed(2) + 's at ' + InteractiveMap.movementSpeed + 'ms';
        return output;
    };
            
    class MeasureControl {
        constructor(InteractiveMap) {
            this.InteractiveMap = InteractiveMap;
            this.map = InteractiveMap.map;
            this.source = new SourceVector({});
            
            this.layer =  new LayerVector({
                source: this.source
            });

            /**
             * Currently drawn feature.
             * @type {ol.Feature}
             */
            this.sketch = null;

            /**
             * The help tooltip element.
             * @type {Element}
             */
            this.helpTooltipElement = null;

            /**
             * Overlay to show the help messages.
             * @type {ol.Overlay}
             */
            this.helpTooltip = null;

            /**
             * The measure tooltip element.
             * @type {Element}
             */
            this.measureTooltipElement = null;

            /**
             * Overlay to show the measurement.
             * @type {ol.Overlay}
             */
            this.measureTooltip = null;
            
            /**
             * Message to show when the user is drawing a polygon.
             * @type {string}
             */
            this.continuePolygonMsg = 'Click to continue drawing the polygon';
            
            /**
             * Message to show when the user is drawing a line.
             * @type {string}
             */
            this.continueLineMsg = 'Click to continue drawing the line';
            
            /**
             * Handle pointer move.
             * @param {ol.MapBrowserEvent} evt The event.
             */
            
            this.pointerMoveListener = null;
            
            this.mouseOutHandler = () => this.helpTooltipElement.classList.add('hidden');

            this.type = 'line';

            this.draw = null; // global so we can remove it later

            this.active = false;

        }

        /**
         * Creates a new measure tooltip
         */
        createMeasureTooltip() {
            if (this.measureTooltipElement) {
                this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
            }
            this.measureTooltipElement = document.createElement('div');
            this.measureTooltipElement.className = 'tooltip tooltip-measure';
            this.measureTooltip = new Overlay({
                element: this.measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            this.map.addOverlay(this.measureTooltip);
        }
            
        /**
         * Creates a new help tooltip
         */
        createHelpTooltip() {
            if (this.helpTooltipElement) {
                this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
            }
            this.helpTooltipElement = document.createElement('div');
            this.helpTooltipElement.className = 'tooltip hidden';
            this.helpTooltip = new Overlay({
                element: this.helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left'
            });
            this.map.addOverlay(this.helpTooltip);
        }
        
        addInteraction() {
            const type = (this.type == 'circle' ? 'Circle' : 'LineString');
            this.draw = new Draw({
                source: this.source,
                type: /** @type {ol.geom.GeometryType} */ (type),
                style: styles.measure
            });
            this.map.addInteraction(this.draw);

            this.createHelpTooltip();

            let listener;
            this.draw.on('drawstart', evt => {
                this.source.clear(true);
                this.InteractiveMap.controls.info.setContent("");
                this.InteractiveMap.controls.info.close(true);
                // set sketch
                this.sketch = evt.feature;
                /** @type {ol.Coordinate|undefined} */
                let tooltipCoord = evt.coordinate;

                listener = this.sketch.getGeometry().on('change', evt => {
                    const geom = evt.target;
                    let output;
                    if (geom instanceof Circle$1) {
                        output = formatRadius(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    } else if (geom instanceof LineString) {
                        output = formatLength(this.InteractiveMap, geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    this.InteractiveMap.controls.info.setContent(output);
                    this.InteractiveMap.controls.info.open(true);
                });
            });

            this.draw.on('drawend', () => {
                // unset sketch
                this.sketch = null;
                // unset tooltip so that a new one can be created
                Observable.unByKey(listener);
            });
        }
        
        change(type) {
            this.type = type;
            Observable.unByKey(this.pointerMoveListener);
            this.map.getViewport().removeEventListener('mouseout', this.mouseOutHandler);
            this.map.removeInteraction(this.draw);
            this.source.clear(true);
            this.addInteraction();
            this.active = true;
        }
        
        activate() {
            if (!this.active) {
                this.pointerMoveListener = this.map.on('pointermove', evt => {
                    if (evt.dragging) {
                        return;
                    }
                    /** @type {string} */
                    let helpMsg = 'Click to start drawing';

                    if (this.sketch) {
                        const geom = (this.sketch.getGeometry());
                        if (geom instanceof Polygon) {
                            helpMsg = this.continuePolygonMsg;
                        } else if (geom instanceof LineString) {
                            helpMsg = this.continueLineMsg;
                        }
                    }

                    this.helpTooltipElement.innerHTML = helpMsg;
                    this.helpTooltip.setPosition(evt.coordinate);

                    this.helpTooltipElement.classList.remove('hidden');
                });
                this.map.getViewport().addEventListener('mouseout', this.mouseOutHandler);
                this.addInteraction();
            }
            this.active = true;
        }
        
        deactivate() {
            Observable.unByKey(this.pointerMoveListener);
            this.map.getViewport().removeEventListener('mouseout', this.mouseOutHandler);
            this.map.removeInteraction(this.draw);
            this.source.clear(true);
            this.active = false;
        }
    }

    const laneData = {
        700: {
            npc_dota_spawner_good_bot: [1.25, 10],
            npc_dota_spawner_bad_bot: [0.75, 22],
            npc_dota_spawner_good_top: [0.75, 2],
            npc_dota_spawner_bad_top: [1.25, 2]
        },
        706: {
            npc_dota_spawner_good_bot: [1.3, 16],
            npc_dota_spawner_bad_bot: [0.65, 22],
            npc_dota_spawner_good_top: [1.3, 8],
            npc_dota_spawner_bad_top: [0.65, 8]
        },
        707: {
            npc_dota_spawner_good_bot: [1.3, 4],
            npc_dota_spawner_bad_bot: [0.65, 6],
            npc_dota_spawner_good_top: [1.3, 2],
            npc_dota_spawner_bad_top: [0.65, 2]
        },
        709: {
            npc_dota_spawner_good_bot: [1.3, 4],
            npc_dota_spawner_bad_bot: [0.65, 6],
            npc_dota_spawner_good_top: [1.3, 2],
            npc_dota_spawner_bad_top: [0.65, 2]
        },
        715: {
            npc_dota_spawner_good_bot: [1.3, 4],
            npc_dota_spawner_bad_bot: [0.65, 6],
            npc_dota_spawner_good_top: [1.3, 2],
            npc_dota_spawner_bad_top: [0.65, 2]
        }
    };

    const getDistance = (speed, elapsedTime) => speed * elapsedTime / 1000 * mapConstants.scale;

    const getElapsedDistance = (version, id, elapsedTime, playbackSpeed, bNoAdjust) => {
        elapsedTime = elapsedTime * playbackSpeed;
        const base = mapConstants.creepBaseMovementSpeed;
        if (bNoAdjust) return getDistance(base, elapsedTime);

        switch (id) {
            case 'npc_dota_spawner_good_bot':
            case 'npc_dota_spawner_bad_top':
            case 'npc_dota_spawner_good_top':
            case 'npc_dota_spawner_bad_bot':
                const boostMultiplier = laneData[version][id][0];
                const boostDuration = laneData[version][id][1] * 1000;
                if (elapsedTime < boostDuration) {
                    return getDistance(base * boostMultiplier, elapsedTime);
                }
                else {
                    return getDistance(base * boostMultiplier, boostDuration) + getDistance(base, elapsedTime - boostDuration);
                }
            break;
            default:
                return getDistance(base, elapsedTime);
            break;
        }
    };

    class CreepControl {
        constructor(InteractiveMap, id) {
            this.InteractiveMap = InteractiveMap;
            this.postComposeListener = null;
            this.postComposeHandler = this.animateCreeps.bind(this);
            this.playbackSpeed = 1;
            this.paused = true;
            this.pauseTime = null;
            this.title = 'Lane Animation';
            
            this.id = id;
            this.info = document.getElementById(id);
            this.infoContent = document.querySelector('#timer-time');
            this.playPauseBtn = document.querySelector('#timer-playPause');
            this.playPauseBtn.addEventListener('click', () => this.playPause(true), false);
            
            this.stopBtn = document.querySelector('#timer-stop');
            this.stopBtn.addEventListener('click', () => this.stop(true), false);
            
            this.fasterBtn = document.querySelector('#timer-faster');
            this.fasterBtn.addEventListener('click', () => this.faster(true), false);
            
            this.slowerBtn = document.querySelector('#timer-slower');
            this.slowerBtn.addEventListener('click', () => this.slower(true), false);
        }
        
        show(message) {
            this.setContent(message);
            this.info.classList.remove('slideUp');
            this.info.classList.add('slideDown');
        }
        
        setContent(html) {
            this.infoContent.innerHTML = html;
        }
        
        open() {
            this.info.classList.add('slideDown');
            this.info.classList.remove('slideUp');
        }
        
        close() {
            this.info.classList.add('slideUp');
            this.info.classList.remove('slideDown');
        }
        
        slower() {
            const oldVal = this.playbackSpeed;
            this.playbackSpeed = Math.max(1, this.playbackSpeed - 1);
            this.updatePlayback(oldVal, this.playbackSpeed);
        }

        faster() {
            const oldVal = this.playbackSpeed;
            this.playbackSpeed += 1;
            this.updatePlayback(oldVal, this.playbackSpeed);
        }

        updatePlayback(oldVal, newVal) {
            const layer = this.InteractiveMap.getMapLayer('npc_dota_spawner');
            if (layer) {
                const features = layer.getSource().getFeatures();
                let elapsedTime = this.currentTime - this.startTime;
                let adjustedElapsedTime = elapsedTime * oldVal / newVal;
                this.startTime = this.currentTime - adjustedElapsedTime;
                for (let i = 0; i < features.length; i++) {
                    const feature = features[i];
                    const waveTimes = feature.get('waveTimes');
                    if (waveTimes) {
                        let j = waveTimes.length;
                        while (j--) {
                            elapsedTime = this.currentTime - waveTimes[j];
                            adjustedElapsedTime = elapsedTime * oldVal / newVal;
                            waveTimes[j] = this.currentTime - adjustedElapsedTime;
                        }
                    }
                }
            }
        }

        start() {
            if (!this.postComposeListener) {
                this.postComposeListener = this.InteractiveMap.map.on('postcompose', this.postComposeHandler);
            }
            if (this.paused) this.playPause();
            this.InteractiveMap.map.render();
        }

        stop() {
            Observable.unByKey(this.postComposeListener);
            this.postComposeListener = null;
            const layer = this.InteractiveMap.getMapLayer('npc_dota_spawner');
            if (layer) {
                const features = layer.getSource().getFeatures();
                for (let i = 0; i < features.length; i++) {
                    const feature = features[i];
                    feature.set('waveTimes', null, true);
                }
            }
            this.startTime = null;
            if (!this.paused) this.playPause();
            this.pauseTime = null;
            this.InteractiveMap.map.render();
            this.setContent(this.title);
        }

        playPause() {
            this.paused = !this.paused;
            if (this.paused) {
                this.playPauseBtn.classList.add('icon-play');
                this.playPauseBtn.classList.remove('icon-pause');
            }
            else {
                this.playPauseBtn.classList.add('icon-pause');
                this.playPauseBtn.classList.remove('icon-play');
                this.start();
            }
        }

        activate() {
            this.show(this.title);
        }

        deactivate() {
            this.stop();
            this.close();
        }

        animateCreeps(event) {
            const vectorContext = event.vectorContext;
            const frameState = event.frameState;
            this.currentTime = frameState.time;
            const layer = this.InteractiveMap.getMapLayer('npc_dota_spawner');
            const pathLayer = this.InteractiveMap.getMapLayer('path_corner');
            if (!layer || !pathLayer) return;
            const features = layer.getSource().getFeatures();
            if (!this.startTime) this.startTime = this.currentTime;
            if (this.paused) {
                if (this.pauseTime == null) this.pauseTime = frameState.time;
                this.currentTime = this.pauseTime;
            }
            else {
                if (this.pauseTime != null) {
                    for (let i = 0; i < features.length; i++) {
                        const feature = features[i];
                        const waveTimes = feature.get('waveTimes');
                        if (waveTimes) {
                            let j = waveTimes.length;
                            while (j--) {
                                waveTimes[j] += (this.currentTime - this.pauseTime);
                            }
                        }
                    }
                    this.startTime += (this.currentTime - this.pauseTime);
                    this.pauseTime = null;
                }
            }
            for (let i = 0; i < features.length; i++) {
                const feature = features[i];
                const id = feature.getId();
                const pathFeature = pathLayer.getSource().getFeatureById(id);
                let waveTimes = feature.get('waveTimes');
                if (!waveTimes) {
                    waveTimes = [this.currentTime];
                    feature.set('waveTimes', waveTimes, true);
                }
                if (this.currentTime - waveTimes[waveTimes.length - 1] >= 30000 / this.playbackSpeed) {
                    waveTimes.push(this.currentTime);
                }
                let j = waveTimes.length;
                while (j--) {                
                    let path = feature.get('path');
                    let coords;
                    if (!path) {
                        path = pathFeature.getGeometry().clone();
                        coords = path.getCoordinates();
                        coords[0] = feature.getGeometry().getCoordinates();
                        path.setCoordinates(coords);
                        feature.set('path', path, true);
                    }
                    const pathLength = path.getLength();
                    coords = path.getCoordinates();
                    const elapsedTime = this.currentTime - waveTimes[j];
                    const elapsedDistance = getElapsedDistance(this.InteractiveMap.version, id, elapsedTime, this.playbackSpeed);
                    const elapsedFraction = Math.max(0, elapsedDistance / pathLength);
                    let endPoint;
                    if (elapsedFraction >= 1) {
                        endPoint = coords[coords.length - 1];
                        waveTimes.splice(j, 1);
                    }
                    else {
                        endPoint = path.getCoordinateAt(elapsedFraction);
                    }

                    const point = new Circle$1(endPoint);
                    vectorContext.setStyle(styles.creepColor(feature));
                    vectorContext.drawCircle(point);
                }
            }
            let timeText = (((this.currentTime - this.startTime) % (60000 / this.playbackSpeed)) / 1000 * this.playbackSpeed).toFixed(1) + 's';
            if (this.playbackSpeed > 1) timeText += ', ' + this.playbackSpeed + 'x';
            this.setContent(timeText);
            frameState.animate = true;
        }
    }

    const key2pt$1 = visionSimulation.prototype.key2pt;
    const xy2pt$1 = visionSimulation.prototype.xy2pt;

    const processNeighbors = (grid, lights, components, key, index) => {
        const pt = key2pt$1(key);
        const dirs = [[1, 0], [0, -1], [-1, 0], [0, 1]];
        for (let i = 0; i < dirs.length; i++) {
            const aX = pt.x+dirs[i][0];
            const aY = pt.y+dirs[i][1];
            if (!grid[aX] || !grid[aX][aY]) continue;
            const keyAdj = grid[aX][aY].key;
            if (components[keyAdj] || !lights[keyAdj]) continue;
            components[keyAdj] = index;
            processNeighbors(grid, lights, components, keyAdj, index);
        }
    };

    const getLightUnion = (grid, lights) => {
        const components = {};
        let index = 1;
        for (let key in lights) {
            if (!components[key]) {
                components[key] = index;
                processNeighbors(grid, lights, components, key, index);
                index++;
            }
        }
        
        const outlines = [];
        for (let i = 1; i < index; i++) {
            outlines.push(getOutline(grid, components, i));
        }
        return outlines;
    };

    const isSideFree = (grid, components, pt, dir) => {
        const aX = pt.x+dir[0];
        const aY = pt.y+dir[1];
        if (!grid[aX] || !grid[aX][aY]) return true;
        const keyAdj = grid[aX][aY].key;
        return !components[keyAdj];
    };

    const notSurrounded = (grid, components, pt) => {
        for (let i = 0; i < 8; i+=2) {
            const aX = pt.x+Math.round(Math.cos(2 * Math.PI - Math.PI/4 * i));
            const aY = pt.y+Math.round(Math.sin(2 * Math.PI - Math.PI/4 * i));
            if (!grid[aX] || !grid[aX][aY]) return i;
            const keyAdj = grid[aX][aY].key;
            if (!components[keyAdj]) return i;
        }
        return null;
    };

    const mod = (n, m) => ((n % m) + m) % m;

    const getOutline = (grid, components, index) => {
        const outlinePoints = [];
        let startKey;
        let dir = null;
        for (let key in components) {
            const pt = key2pt$1(key);
            dir = notSurrounded(grid, components, pt);
            if (components[key] == index && dir !== null) {
                startKey = key;
                break;
            }
        }
        let next = processNext(grid, components, startKey, dir);
        while (startKey !== next.key || dir !== next.dir) {
            outlinePoints.push(next.point);
            next = processNext(grid, components, next.key, next.dir);
        }
        outlinePoints.push(next.point);
        return outlinePoints;
    };

    const checkAdj = (grid, components, pt, key, dir, i, adjDir) => {
        const aX = pt.x+dir[0];
        const aY = pt.y+dir[1];
        if (!grid[aX] || !grid[aX][aY]) return;
        const ptAdj = grid[pt.x+dir[0]][pt.y+dir[1]];
        if (components[ptAdj.key] == components[key] && isSideFree(grid, components, ptAdj, adjDir)) {
            return {
                key: ptAdj.key,
                dir: i
            }
        }
    };

    const processNext = (grid, components, key, i) => {
        const pt = key2pt$1(key);

        const x = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * i));
        const y = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * i));
        
        const nI = mod(i+2, 8);
        const nX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * nI));
        const nY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * nI));
        
        const bI = mod(i-1, 8);
        const bX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * bI));
        const bY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * bI));

        if (isSideFree(grid, components, pt, [nX, nY])) {
            return {
                key: key,
                dir: mod(i+2, 8),
                point: xy2pt$1(pt.x+bX/2, pt.y+bY/2)
            }
        }
        let next = checkAdj(grid, components, pt, key, [nX, nY], i, [x, y]);
        if (!next) {
            const aI = mod(i + 1, 8);
            const aX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * aI));
            const aY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * aI));
            const pI = mod(i - 2, 8);
            const pX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * pI));
            const pY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * pI));
            next = checkAdj(grid, components, pt, key, [aX, aY], pI, [pX, pY]);
        }
        if (next) {
            next.point = xy2pt$1(pt.x+bX/2, pt.y+bY/2);
            return next;
        }
        else {
            console.log('error');
        }
    };

    class VisionControl {
        constructor(InteractiveMap) {
            this.InteractiveMap = InteractiveMap;
            this.source = new SourceVector({});
            this.layer =  new LayerVector({
                source: this.source,
                style: styles.visionSimulation
            });
        }
        
        getVisionFeature(feature, coordinate$$1, radius) {
            const vs = this.InteractiveMap.vs;

            // get coordinate from feature if not provided
            let worldCoordinate;
            let dotaProps;
            if (!coordinate$$1) {
                dotaProps = feature.get('dotaProps');
                worldCoordinate = [dotaProps.x, dotaProps.y];
            }
            else {
                worldCoordinate = latLonToWorld(coordinate$$1);
            }
            
            // get radius from feature if not provided
            radius = radius || this.InteractiveMap.getFeatureVisionRadius(feature, dotaProps);
            if (radius == null) return;
            
            const gridXY = vs.WorldXYtoGridXY(worldCoordinate[0], worldCoordinate[1]);
            if (vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
                vs.updateVisibility(gridXY.x, gridXY.y, getTileRadius(radius));
                
                const outlines = getLightUnion(vs.grid, vs.lights)
                    .map(ring => ring.map(point => {
                            const worldXY = vs.GridXYtoWorldXY(point.x, point.y);
                            return worldToLatLon([worldXY.x, worldXY.y]);
                        })
                    );
                const multiPolygon = new MultiPolygon([outlines], 'XY');
                const feature = new Feature({
                    geometry: multiPolygon
                });
                feature.set('visionData', {
                    area: vs.area,
                    lightArea: vs.lightArea
                }, false);
                return feature;
            }
        }

        toggleVisionFeature(feature) {
            const visionFeature = feature.get('visionFeature');
            if (visionFeature) {
                this.source.removeFeature(visionFeature);
                feature.set('visionFeature', null);
                return null;
            }
            else {
                return this.setVisionFeature(feature);
            }
        }

        removeVisionFeature(feature) {
            const visionFeature = feature.get('visionFeature');
            if (visionFeature) {
                this.source.removeFeature(visionFeature);
                feature.set('visionFeature', null);
            }
        }

        setVisionFeature(feature, coordinate$$1, unitClass) {
            // remove existing visionFeature for feature
            this.removeVisionFeature(feature);
            
            // determine radius according to unit type
            const radius = this.InteractiveMap.getFeatureVisionRadius(feature, feature.get('dotaProps'), unitClass);
            // create and add vision feature
            const visionFeature = this.getVisionFeature(feature, coordinate$$1, radius);
            if (visionFeature) {
                this.source.addFeature(visionFeature);
            }
            feature.set('visionFeature', visionFeature, true);
            return visionFeature;
        }

    }

    class WardControl {
        constructor(InteractiveMap, throttleTime) {
            this.InteractiveMap = InteractiveMap;
            this.throttleTime = throttleTime;
            this.source = new SourceVector({});
            this.layer =  new LayerVector({
                source: this.source
            });
            this.layerFilter = layer => layer === this.layer;
            
            this.placedWardCoordinates = {
                observer: {},
                sentry: {}
            };
            
            this.lastPointerMoveTime = Date.now();
            this.pointerMoveListener = null;
            this.clickListener = null;
        }
        
        toggleAll(layer, state) {
            if (state) {
                this.showAll(layer);
            }
            else {
                this.hideAll(layer);
            }
        }

        showAll(layer) {
            const source = layer.getSource();
            const features = source.getFeatures();
            features.forEach(feature => {
                this.InteractiveMap.select(feature);
                this.highlight(feature);
            });
        }

        hideAll(layer) {
            const source = layer.getSource();
            const features = source.getFeatures();
            features.forEach(feature => {
                this.InteractiveMap.deselect(feature);
                this.unhighlight(feature);
            });
        }

        showVisibilityInfo(visionFeature, bClicked) {
            const info = this.InteractiveMap.controls.info;
            const vs = this.InteractiveMap.vs;
            let lightArea = vs.lightArea;
            let area = vs.area;
            if (visionFeature) {
                const visionData = visionFeature.get('visionData');
                if (visionData) {
                    lightArea = visionData.lightArea;
                    area = visionData.area;
                    info.setContent("Visibility: " + (lightArea / area * 100).toFixed() + '% ' + lightArea + "/" + area);
                    info.open(bClicked);
                }
            }
            else {
                info.setContent("Visibility: " + (lightArea / area * 100).toFixed() + '% ' + lightArea + "/" + area);
                info.open(bClicked);
            }
        }

        clearInfo(bOverrideActive) {
            this.InteractiveMap.controls.info.setContent("");
            this.InteractiveMap.controls.info.close(bOverrideActive);
        }

        activate() {
            if (!this.pointerMoveListener) {
                this.pointerMoveListener = this.InteractiveMap.map.on('pointermove', evt => {
                    if (evt.dragging) {
                        return;
                    }
                    
                    const pixel = this.InteractiveMap.map.getEventPixel(evt.originalEvent);
                    
                    // if mouse over a building feature, show info and highlight
                    let bBuildingHover = false;
                    let feature = this.InteractiveMap.map.forEachFeatureAtPixel(pixel, feature => feature, {
                        layerFilter: this.InteractiveMap.layerFilters.marker
                    });
                    if (feature) {
                        bBuildingHover = this.highlight(feature);
                        
                        if (bBuildingHover) {
                            this.showVisibilityInfo();
                        }
                    }
                    else {
                        // if mouse over a ward feature, highlight
                        feature = this.InteractiveMap.checkAndHighlightWard(pixel);

                        // no highlighted feature so unhighlight current feature
                        if (!feature) {
                            this.unhighlight();
                        }
                        else {
                            this.showVisibilityInfo();
                        }
                    }
                    
                    // vision cursor
                    if (Date.now() - this.lastPointerMoveTime < this.throttleTime) {
                        return;
                    }
                    this.lastPointerMoveTime = Date.now();
                    let hoverFeature;
                    if (bBuildingHover) {
                        if (!feature.get('visionFeature')) {
                            hoverFeature = this.InteractiveMap.controls.vision.getVisionFeature(feature);
                        }
                        else {
                            this.InteractiveMap.controls.cursor.source.clear(true);
                        }
                    }
                    else {
                        hoverFeature = this.InteractiveMap.controls.vision.getVisionFeature(null, evt.coordinate, this.InteractiveMap.visionRadius);
                    }
                    if (hoverFeature) {
                        this.InteractiveMap.controls.cursor.source.clear(true);
                        this.InteractiveMap.controls.cursor.source.addFeature(hoverFeature);
                        
                        if (!bBuildingHover) {
                            this.showVisibilityInfo();
                        }
                    }
                    else if (!bBuildingHover) {
                        this.clearInfo();
                    }
                });
            }
            if (!this.clickListener) {
                this.clickListener = this.InteractiveMap.map.on('click', evt => {
                    this.unhighlight();
                    let feature = this.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, feature => feature, {
                        layerFilter: this.InteractiveMap.layerFilters.marker
                    });
                    if (feature && this.InteractiveMap.hasVisionRadius(feature)) {
                        this.InteractiveMap.toggle(feature);
                        if (this.InteractiveMap.controls.vision.toggleVisionFeature(feature)) {
                            this.showVisibilityInfo();
                        }
                        else {
                            this.clearInfo();
                        }
                        this.InteractiveMap.controls.cursor.source.clear(true);
                    }
                    else {
                        feature = this.InteractiveMap.map.forEachFeatureAtPixel(evt.pixel, feature => feature, {
                            layerFilter: this.layerFilter
                        });
                        if (feature) {
                            this.removeWard(feature);
                            this.clearInfo(true);
                        }
                        else {
                            this.addWard(evt.coordinate, this.InteractiveMap.MODE);
                            this.InteractiveMap.controls.cursor.source.clear(true);
                        }
                    }
                });
            }
        }

        deactivate() {
            this.InteractiveMap.unhighlightWard();
            this.InteractiveMap.controls.cursor.source.clear(true);
            Observable.unByKey(this.pointerMoveListener);
            this.pointerMoveListener = null;
            Observable.unByKey(this.clickListener);
            this.clickListener = null;
        }

        parseQueryString() {
            ['observer', 'sentry'].forEach(wardType => {
                let values = getParameterByName(wardType);
                if (values) {
                    values = values.split(';');
                    values.forEach(worldXY => {
                        worldXY = worldXY.split(',');
                        if (worldXY.length == 2) {
                            worldXY = worldXY.map(parseFloat);
                            if (!worldXY.some(isNaN)) {
                                const coordinate$$1 = worldToLatLon(worldXY);
                                this.addWard(coordinate$$1, wardType, true);
                            }
                        }
                    });
                }
                this.updateQueryString(wardType);
            });
        }

        updateQueryString(wardType) {
            const values = Object.keys(this.placedWardCoordinates[wardType]).join(';');
            setQueryString(wardType, values || null);
        }

        addWard(coordinate$$1, wardType, bSkipQueryStringUpdate) {
            if (coordinate$$1[0] < 0 || coordinate$$1[0] > mapConstants.map_w || coordinate$$1[1] < 0 || coordinate$$1[1] > mapConstants.map_h) return;
            const geom = new Point(coordinate$$1);
            const feature = new Feature(geom);
            feature.set('wardType', wardType, true);
            feature.setStyle(styles[wardType].normal);
            this.source.addFeature(feature);
            if (wardType == 'observer') {
                if (this.InteractiveMap.controls.vision.setVisionFeature(feature, coordinate$$1, wardType)) {
                    this.showVisibilityInfo();
                }
            }
            
            const circle = this.InteractiveMap.getRangeCircle(feature, coordinate$$1, wardType);
            if (circle) {
                circle.setStyle(wardType == 'observer' ? styles.dayVision : styles.trueSight);
                feature.set('wardRange', circle, true);
                this.InteractiveMap.wardRangeSource.addFeature(circle);
            }
            const worldXY = latLonToWorld(coordinate$$1).map(Math.round).join(',');
            this.placedWardCoordinates[wardType][worldXY] = true;
            if (!bSkipQueryStringUpdate) this.updateQueryString(wardType);
        }

        updateAllWardVision() {
            this.source.forEachFeature(f => {
                const wardType = f.get('wardType');
                const coordinate$$1 = f.getGeometry().getCoordinates();
                this.InteractiveMap.controls.vision.setVisionFeature(f, coordinate$$1, wardType);
            });
        }

        clearWards() {
            const features = this.source.getFeatures();
            features.forEach(feature => this.removeWard(feature, true));
            this.updateQueryString('observer');
            this.updateQueryString('sentry');
        }

        removeWard(feature, bSkipQueryStringUpdate) {
            const wardRange = feature.get('wardRange');
            if (wardRange) {
                // loop to check that feature exists before trying to remove
                this.InteractiveMap.wardRangeSource.forEachFeature(f => {
                    if (f == wardRange) this.InteractiveMap.wardRangeSource.removeFeature(f);
                });
            }
            // loop to check that feature exists before trying to remove
            this.source.forEachFeature(f => {
                if (f == feature) this.source.removeFeature(f);
            });
            this.InteractiveMap.controls.vision.removeVisionFeature(feature);
            
            const worldXY = latLonToWorld(feature.getGeometry().getCoordinates()).map(Math.round).join(',');
            const wardType = feature.get('wardType');
            delete this.placedWardCoordinates[wardType][worldXY];
            if (!bSkipQueryStringUpdate) this.updateQueryString(wardType);
        }

        highlight(feature) {
            this.InteractiveMap.controls.cursor.source.clear(true);
            this.unhighlight();
            const visionFeature = this.InteractiveMap.controls.vision.setVisionFeature(feature);
            this.addRangeCircles(feature);
            this.InteractiveMap.highlight(feature);
            return visionFeature;
        }

        unhighlight(feature) {
            const highlightedFeature = feature || this.InteractiveMap.highlightedFeature;
            if (highlightedFeature && !highlightedFeature.get("clicked")) {
                this.InteractiveMap.controls.vision.removeVisionFeature(highlightedFeature);
                this.removeRangeCircles(highlightedFeature);
            }
            this.InteractiveMap.unhighlight();
        }

        addRangeCircles(feature) {
            this.addRangeCircle(feature, 'dayVision');
            this.addRangeCircle(feature, 'nightVision');
            this.addRangeCircle(feature, 'trueSight');
            this.addRangeCircle(feature, 'attackRange');
        }

        removeRangeCircles(feature) {
            this.removeRangeCircle(feature, 'dayVision');
            this.removeRangeCircle(feature, 'nightVision');
            this.removeRangeCircle(feature, 'trueSight');
            this.removeRangeCircle(feature, 'attackRange');
        }

        addRangeCircle(feature, rangeType) {
            if (!feature.get(rangeType)) {
                const circle = this.InteractiveMap.getRangeCircle(feature, null, null, rangeType);
                if (circle) {
                    feature.set(rangeType, circle, true);
                    this.InteractiveMap.rangeSources[rangeType].addFeature(circle);
                }
            }
        }

        removeRangeCircle(feature, rangeType) {
            const circle = feature.get(rangeType);
            if (circle) {
                feature.set(rangeType, null, true);
                this.InteractiveMap.rangeSources[rangeType].removeFeature(circle);
            }
        }

    }

    class TreeControl {
        constructor(InteractiveMap) {
            this.InteractiveMap = InteractiveMap;
            this.allTreesCutState = false;
        }
        
        updateQueryString() {
            const keys = ['cut_trees', 'uncut_trees'];
            const layer = this.InteractiveMap.getMapLayer('ent_dota_tree');
            const source = layer.getSource();
            const features = source.getFeatures();
            const values = features
                .filter(feature => !!feature.get('isCut') != this.allTreesCutState)
                .map(feature => {
                    const dotaProps = feature.get('dotaProps');
                    return dotaProps.x + ',' + dotaProps.y;
                })
                .join(';');
            setQueryString(keys[this.allTreesCutState ? 1 : 0], values || null);
            setQueryString(keys[this.allTreesCutState ? 0 : 1], null);
            document.getElementById('toggle-ent_dota_tree').checked = this.allTreesCutState;
        }

        parseQueryString() {
            const layer = this.InteractiveMap.getMapLayer('ent_dota_tree');
            const source = layer.getSource();
            const features = source.getFeatures();
            const treeMap = {};
            features.forEach(feature => {
                const dotaProps = feature.get('dotaProps');
                const worldXY = dotaProps.x + ',' + dotaProps.y;
                treeMap[worldXY] = feature;
            });
            ['uncut_trees', 'cut_trees'].forEach((treeCutState, index) => {
                let values = getParameterByName(treeCutState);
                if (values) {
                    this.toggleAllTrees(!index, true);
                    values = values.split(';');
                    values.forEach(worldXY => {
                        const feature = treeMap[worldXY];
                        if (feature) {
                            if (!!feature.get('isCut') == !index) {
                                this.toggleTree(feature, feature.get('dotaProps'), true, true);
                            }
                        }
                    });
                }
            });
            this.updateQueryString();
            
            this.InteractiveMap.controls.ward.updateAllWardVision();
        }

        toggleTree(feature, dotaProps, bSkipQueryStringUpdate, bSkipWardVisionUpdate) {
            const gridXY = this.InteractiveMap.vs.WorldXYtoGridXY(dotaProps.x, dotaProps.y);
            this.InteractiveMap.vs.toggleTree(gridXY.x, gridXY.y);
            feature.set('isCut', !feature.get('isCut'));
            if (!bSkipQueryStringUpdate) this.updateQueryString();
            
            if (!bSkipWardVisionUpdate) this.InteractiveMap.controls.ward.updateAllWardVision();
        }

        toggleAllTrees(state, bSkipQueryStringUpdate, bSkipWardVisionUpdate) {
            this.allTreesCutState = state;
            const layer = this.InteractiveMap.getMapLayer('ent_dota_tree');
            const source = layer.getSource();
            const features = source.getFeatures();
            features.forEach(feature => {
                if (!!feature.get('isCut') != state) {
                    this.toggleTree(feature, feature.get('dotaProps'), true, true);
                }
            });
            if (!bSkipQueryStringUpdate) this.updateQueryString();
            
            if (!bSkipWardVisionUpdate) this.InteractiveMap.controls.ward.updateAllWardVision();
        }

    }

    class CursorControl {
        constructor(InteractiveMap) {
            this.InteractiveMap = InteractiveMap;
            this.source = new SourceVector({});
            this.layer =  new LayerVector({
                source: this.source,
                style: styles.cursor
            });
            this.layerFilter = layer => layer === this.layer;
        }
    }

    class CoordinateControl {
        constructor(InteractiveMap, elementId) {
            this.InteractiveMap = InteractiveMap;
            this.mousePosition = new MousePosition({
                coordinateFormat: coordinate.createStringXY(),
                projection: dotaProj,
                target: document.getElementById(elementId),
                undefinedHTML: '&nbsp;'
            });
            this.InteractiveMap.map.addControl(this.mousePosition);
        }
    }

    class InteractiveMap {
        constructor(map_tile_path, version, vision_data_image_path, worlddata) {
            this.map_tile_path = map_tile_path;
            this.vision_data_image_path = vision_data_image_path;
            this.vs = new visionSimulation(worlddata);
            this.MODE = 'navigation';
            this.layerDefs = layerDefinitions;
            this.baseLayerDefs = baseLayerDefinitions;
            this.view = new View({
                zoom: 1,
                center: mapConstants.imgCenter,
                projection: pixelProj,
                resolutions: [32,16,8,4,2,1],
                extent: [0, 0, mapConstants.map_w, mapConstants.map_h]
            });
            this.data = {};
            this.layerIndex = {};
            this.version = version;
            this.visionRadius = mapConstants.visionRadius.observer;
            this.movementSpeed = mapConstants.defaultMovementSpeed;
            this.isNight = false;
            this.isDarkness = false;
            this.layerFilters = {
                marker: layer => {
                    const layerDef = layer.get('layerDef');
                    return layer.getVisible() && layerDef && (layerDef.group == 'structure' || layerDef.group == 'object');
                }
            };
            this.map = new Map({
                controls: control.defaults({ zoom: false, attribution: false, rotate: false }),
                interactions: interaction.defaults({altShiftDragRotate:false, pinchRotate:false}),
                target: 'map',
                view: this.view
            });
            
            this.highlightSource = new SourceVector({});
            this.highlightLayer =  new LayerVector({
                source: this.highlightSource,
                style: styles.highlight
            });

            this.selectSource = new SourceVector({});
            this.selectLayer =  new LayerVector({
                source: this.selectSource,
                style: styles.select
            });

            this.wardRangeSource = new SourceVector({});
            this.wardRangeLayer =  new LayerVector({
                source: this.wardRangeSource
            });

            this.rangeSources = {
                dayVision: new SourceVector({}),
                nightVision: new SourceVector({}),
                trueSight: new SourceVector({}),
                attackRange: new SourceVector({})
            };
            this.rangeLayers = {
                dayVision: new LayerVector({
                    source: this.rangeSources.dayVision,
                    style: styles.dayVision
                }),
                nightVision: new LayerVector({
                    source: this.rangeSources.nightVision,
                    style: styles.nightVision
                }),
                trueSight: new LayerVector({
                    source: this.rangeSources.trueSight,
                    style: styles.trueSight
                }),
                attackRange: new LayerVector({
                    source: this.rangeSources.attackRange,
                    style: styles.attackRange
                })
            };

            // setup base layers
            this.baseLayers = this.baseLayerDefs.reduce((baseLayers, group) => {
                return baseLayers.concat(group.tilesets.map(tileset => {
                    const layerDef = {...tileset, group: group.id};
                    const layer = new LayerTile({
                        title: layerDef.name,
                        type: 'base',
                        extent: pixelProj.getExtent(), //proj.pixel.getExtent()
                        source: new TileImage({
                            tileGrid: new TileGrid({
                                origin: [0, mapConstants.map_h],
                                resolutions: mapConstants.resolutions
                            }),
                            projection: pixelProj,
                            url: this.map_tile_path + layerDef.group + '/' + layerDef.id + '/{z}/tile_{x}_{y}.jpg'
                        }),
                        visible: !!layerDef.visible
                    });
                    layer.set('layerId', layerDef.group + '-' + layerDef.id, true);
                    layer.set('layerDef', layerDef, true);
                    return layer;
                }));
            }, []);
            
            this.baseLayerGroup = new LayerGroup({
                title: 'Base Layers',
                layers: new Collection(this.baseLayers)
            });
            
            this.controls = {
                menu: new MenuControl(this),
                info: new InfoControl(this, 'info'),
                notification: new NotificationControl('notification'),
                vision: new VisionControl(this),
                ward: new WardControl(this),
                tree: new TreeControl(this),
                cursor: new CursorControl(this),
                coordinate: new CoordinateControl(this, 'coordinates'),
                measure: new MeasureControl(this),
                creep: new CreepControl(this, 'timer')
            };
        }
        
        getMapData(version) {
            return this.data[version || this.version] || {};
        }

        getData(version) {
            return this.getMapData(version).data || {};
        }

        getOverlayData(version) {
            return this.getData(version).data || {};
        }

        getStatData(version) {
            return this.getData(version).stats || {};
        }

        getMapLayerIndex(version) {
            version = version || this.version;
            if (!this.layerIndex[version]) this.layerIndex[version] = {};
            return this.layerIndex[version];
        }

        getMapLayer(layerId, version) {
            return this.getMapLayerIndex(version)[layerId];
        }

        getMapDataPath(version) {
            version = version || this.version;
            return 'data/' + version + '/mapdata.json';
        }

        setMapLayers(version, callback) {
            this.getDataJSON(version, (err, data) => {
                if (!err) {
                    const currentLayerGroup = this.map.getLayerGroup();
                    currentLayerGroup.setVisible(false);
                    this.map.setLayerGroup(data.layerGroup);
                    this.map.getLayerGroup().setVisible(true);
                }
            
                this.map.addLayer(this.controls.measure.layer);
                this.map.addLayer(this.controls.cursor.layer);
                this.map.addLayer(this.controls.vision.layer);
                this.map.addLayer(this.controls.ward.layer);
                this.map.addLayer(this.highlightLayer);
                this.map.addLayer(this.selectLayer);
                this.map.addLayer(this.wardRangeLayer);
                this.map.addLayer(this.rangeLayers.dayVision);
                this.map.addLayer(this.rangeLayers.nightVision);
                this.map.addLayer(this.rangeLayers.trueSight);
                this.map.addLayer(this.rangeLayers.attackRange);
                
                if (callback) callback(err);
            });
        }

        getDataJSON(version, callback) {
            if (this.data[version]) {
                callback(null, this.data[version]);
            }
            else {
                getJSON(this.getMapDataPath(version), (err, data) => {
                    if (!err) {
                        this.data[version] = {
                            data: data,
                            layerGroup: new LayerGroup({
                                title: version + ' Layers',
                                layers: new Collection([
                                    this.baseLayerGroup,
                                    loadLayerGroupFromData(this, data, version, this.getMapLayerIndex(version), this.layerDefs)
                                ])
                            })
                        };
                    }
                    callback(err, this.data[version]);
                });
            }
        }

        panTo(coordinate$$1, duration) {
            if (duration == null) duration = 1000;
            this.view.animate({
              center: coordinate$$1,
              duration: 1000
            });
        }

        checkAndHighlightWard(pixel) {
            const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature, {
                layerFilter: this.controls.ward.layerFilter
            });
            this.highlightWard(feature);
            return feature;
        }

        highlightWard(feature) {
            if (feature !== this.highlightedWard) {
                if (this.highlightedWard) {
                    this.highlightedWard.setStyle(styles[this.highlightedWard.get('wardType')].normal);
                }
                if (feature) {
                    feature.setStyle(styles[feature.get('wardType')][this.MODE == 'navigate' ? 'highlight' : 'remove']);
                }
                this.highlightedWard = feature;
            }
        }

        unhighlightWard() {
            if (this.highlightedWard) {
                this.highlightedWard.setStyle(styles[this.highlightedWard.get('wardType')].normal);
            }
            this.highlightedWard = null;
        }

        highlight(feature) {
            if (feature !== this.highlightedFeature) {
                if (this.highlightedFeature) {
                    this.highlightSource.removeFeature(this.highlightedFeature);
                }
                if (feature) {
                    this.highlightSource.addFeature(feature);
                }
                this.highlightedFeature = feature;
            }
        }

        unhighlight() {
            if (this.highlightedFeature) {
                this.highlightSource.removeFeature(this.highlightedFeature);
            }
            this.highlightedFeature = null;
        }

        toggle(feature) {    
            if (feature) {
                if (feature.get("clicked")) {
                    this.deselect(feature);
                    return false;
                }
                else {
                    this.select(feature);
                    return true;
                }
            }
        }

        select(feature) {    
            if (feature && !feature.get("clicked")) {
                if (feature == this.highlightedFeature) {
                    this.unhighlight();
                }
                this.selectSource.addFeature(feature);
                feature.set("clicked", true, true);
            }
        }

        deselectAll() {
            this.selectSource.getFeatures().forEach(feature => feature.set("clicked", false, true));
            this.selectSource.clear();
        }
        deselect(feature) {
            if (feature && feature.get("clicked")) {
                if (feature == this.highlightedFeature) {
                    this.unhighlight();
                }
                
                this.selectSource.removeFeature(feature);
                feature.set("clicked", false, true);
            }
        }

        hasVisionRadius(feature) {
            return this.getFeatureVisionRadius(feature) != null;
        }

        getFeatureVisionRadius(feature, dotaProps, unitClass, rangeType) {
            dotaProps = dotaProps || feature.get('dotaProps');
            unitClass = unitClass || dotaProps.unitClass;
            const unitStats = this.getStatData()[unitClass] || {};
            let radius;
            if (unitClass == 'observer') {
                radius = this.visionRadius || mapConstants.visionRadius[unitClass];
                if (this.isDarkness) {
                    radius = Math.min(mapConstants.visionRadius.darkness, radius);
                }
            }
            else if (unitClass == 'sentry') {
                radius = mapConstants.visionRadius[unitClass];
            }
            else {
                if (rangeType && !unitStats.hasOwnProperty(rangeType)) return null;
                
                switch (rangeType) {
                    case 'dayVision':
                    case 'nightVision':
                        radius = unitStats[rangeType];
                        if (this.isDarkness) {
                            radius = Math.min(mapConstants.visionRadius.darkness, radius);
                        }
                    case 'trueSight':
                    case 'attackRange':
                        radius = unitStats[rangeType];
                    break;
                    default:
                        if (this.isNight) {
                            radius = unitStats.nightVision;
                        }
                        else {
                            radius = unitStats.dayVision;
                        }
                        if (this.isDarkness) {
                            radius = Math.min(mapConstants.visionRadius.darkness, radius);
                        }
                    break;
                }
            }
            return radius;
        }

        getRangeCircle(feature, coordinate$$1, unitClass, rangeType, radius) {
            const dotaProps = feature.get('dotaProps');
            radius = radius || this.getFeatureVisionRadius(feature, dotaProps, unitClass, rangeType);
            if (radius == null) return null;
            if (!coordinate$$1) {
                coordinate$$1 = worldToLatLon([dotaProps.x, dotaProps.y]);
            }
            const circle = new Feature(new Circle$1(coordinate$$1, getScaledRadius(radius)));
            return circle;
        }

    }

    const modeNotificationText = {
        observer: "Ward Mode: Observer",
        sentry: "Ward Mode: Sentry",
        navigate: "Navigation Mode",
        line: "Measure Mode: Line",
        circle: "Measure Mode: Circle",
        treeEnable: "<span>Navigation Mode</span><span>Trees: On</span>",
        treeDisable: "<span>Navigation Mode</span><span>Trees: Off</span>",
        nightOn: "Nighttime Vision",
        nightOff: "Daytime Vision",
        darknessOn: "Darkness: On",
        darknessOff: "Darkness: Off"
    };

    const forEach = (array, callback, scope) => {
        for (let i = 0; i < array.length; i++) {
            callback.call(scope, array[i], i); // passes back stuff we need
        }
    };

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var rollbar_umd_min = createCommonjsModule(function (module, exports) {
    !function(t,e){module.exports=e();}(commonjsGlobal,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1);},function(t,e,n){var r=n(2),o="undefined"!=typeof window&&window._rollbarConfig,i=o&&o.globalAlias||"Rollbar",a="undefined"!=typeof window&&window[i]&&"function"==typeof window[i].shimId&&void 0!==window[i].shimId();if("undefined"==typeof window||window._rollbarStartTime||(window._rollbarStartTime=(new Date).getTime()),!a&&o){var s=new r(o);window[i]=s;}else"undefined"!=typeof window?(window.rollbar=r,window._rollbarDidLoad=!0):"undefined"!=typeof self&&(self.rollbar=r,self._rollbarDidLoad=!0);t.exports=r;},function(t,e,n){function r(t,e){this.options=c.merge(x,t);var n=new l(this.options,h,d);this.client=e||new u(this.options,n,p,"browser");var r="undefined"!=typeof window&&window||"undefined"!=typeof self&&self,o="undefined"!=typeof document&&document;i(this.client.notifier),a(this.client.queue),(this.options.captureUncaught||this.options.handleUncaughtExceptions)&&(f.captureUncaughtExceptions(r,this),f.wrapGlobals(r,this)),(this.options.captureUnhandledRejections||this.options.handleUnhandledRejections)&&f.captureUnhandledRejections(r,this),this.instrumenter=new w(this.options,this.client.telemeter,this,r,o),this.instrumenter.instrument();}function o(t){var e="Rollbar is not initialized";p.error(e),t&&t(new Error(e));}function i(t){t.addTransform(m.handleItemWithError).addTransform(m.ensureItemHasSomethingToSay).addTransform(m.addBaseInfo).addTransform(m.addRequestInfo(window)).addTransform(m.addClientInfo(window)).addTransform(m.addPluginInfo(window)).addTransform(m.addBody).addTransform(g.addMessageWithError).addTransform(g.addTelemetryData).addTransform(g.addConfigToPayload).addTransform(m.scrubPayload).addTransform(g.userTransform(p)).addTransform(g.itemToPayload);}function a(t){t.addPredicate(y.checkLevel).addPredicate(v.checkIgnore).addPredicate(y.userCheckIgnore(p)).addPredicate(y.urlIsNotBlacklisted(p)).addPredicate(y.urlIsWhitelisted(p)).addPredicate(y.messageIsIgnored(p));}function s(t){for(var e=0,n=t.length;e<n;++e)if(c.isFunction(t[e]))return t[e]}var u=n(3),c=n(6),l=n(11),p=n(13),f=n(16),h=n(17),d=n(18),m=n(19),g=n(23),v=n(24),y=n(25),b=n(20),w=n(26),_=null;r.init=function(t,e){return _?_.global(t).configure(t):_=new r(t,e)},r.prototype.global=function(t){return this.client.global(t),this},r.global=function(t){return _?_.global(t):void o()},r.prototype.configure=function(t,e){var n=this.options,r={};return e&&(r={payload:e}),this.options=c.merge(n,t,r),this.client.configure(t,e),this.instrumenter.configure(t),this},r.configure=function(t,e){return _?_.configure(t,e):void o()},r.prototype.lastError=function(){return this.client.lastError},r.lastError=function(){return _?_.lastError():void o()},r.prototype.log=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.log(t),{uuid:e}},r.log=function(){if(_)return _.log.apply(_,arguments);var t=s(arguments);o(t);},r.prototype.debug=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.debug(t),{uuid:e}},r.debug=function(){if(_)return _.debug.apply(_,arguments);var t=s(arguments);o(t);},r.prototype.info=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.info(t),{uuid:e}},r.info=function(){if(_)return _.info.apply(_,arguments);var t=s(arguments);o(t);},r.prototype.warn=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.warn(t),{uuid:e}},r.warn=function(){if(_)return _.warn.apply(_,arguments);var t=s(arguments);o(t);},r.prototype.warning=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.warning(t),{uuid:e}},r.warning=function(){if(_)return _.warning.apply(_,arguments);var t=s(arguments);o(t);},r.prototype.error=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.error(t),{uuid:e}},r.error=function(){if(_)return _.error.apply(_,arguments);var t=s(arguments);o(t);},r.prototype.critical=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.critical(t),{uuid:e}},r.critical=function(){if(_)return _.critical.apply(_,arguments);var t=s(arguments);o(t);},r.prototype.handleUncaughtException=function(t,e,n,r,o,i){var a,s=c.makeUnhandledStackInfo(t,e,n,r,o,"onerror","uncaught exception",b);c.isError(o)?(a=this._createItem([t,o,i]),a._unhandledStackInfo=s):c.isError(e)?(a=this._createItem([t,e,i]),a._unhandledStackInfo=s):(a=this._createItem([t,i]),a.stackInfo=s),a.level=this.options.uncaughtErrorLevel,a._isUncaught=!0,this.client.log(a);},r.prototype.handleUnhandledRejection=function(t,e){var n="unhandled rejection was null or undefined!";n=t?t.message||String(t):n;var r,o=t&&t._rollbarContext||e&&e._rollbarContext;c.isError(t)?r=this._createItem([n,t,o]):(r=this._createItem([n,t,o]),r.stackInfo=c.makeUnhandledStackInfo(n,"",0,0,null,"unhandledrejection","",b)),r.level=this.options.uncaughtErrorLevel,r._isUncaught=!0,r._originalArgs=r._originalArgs||[],r._originalArgs.push(e),this.client.log(r);},r.prototype.wrap=function(t,e,n){try{var r;if(r=c.isFunction(e)?e:function(){return e||{}},!c.isFunction(t))return t;if(t._isWrap)return t;if(!t._rollbar_wrapped&&(t._rollbar_wrapped=function(){n&&c.isFunction(n)&&n.apply(this,arguments);try{return t.apply(this,arguments)}catch(n){var e=n;throw e&&(c.isType(e,"string")&&(e=new String(e)),e._rollbarContext=r()||{},e._rollbarContext._wrappedSource=t.toString(),window._rollbarWrappedError=e),e}},t._rollbar_wrapped._isWrap=!0,t.hasOwnProperty))for(var o in t)t.hasOwnProperty(o)&&(t._rollbar_wrapped[o]=t[o]);return t._rollbar_wrapped}catch(e){return t}},r.wrap=function(t,e){return _?_.wrap(t,e):void o()},r.prototype.captureEvent=function(t,e){return this.client.captureEvent(t,e)},r.captureEvent=function(t,e){return _?_.captureEvent(t,e):void o()},r.prototype.captureDomContentLoaded=function(t,e){return e||(e=new Date),this.client.captureDomContentLoaded(e)},r.prototype.captureLoad=function(t,e){return e||(e=new Date),this.client.captureLoad(e)},r.prototype._createItem=function(t){return c.createItem(t,p,this)};var x={version:"2.4.1",scrubFields:["pw","pass","passwd","password","secret","confirm_password","confirmPassword","password_confirmation","passwordConfirmation","access_token","accessToken","secret_key","secretKey","secretToken"],logLevel:"debug",reportLevel:"debug",uncaughtErrorLevel:"error",endpoint:"api.rollbar.com/api/1/item/",verbose:!1,enabled:!0,sendConfig:!1,includeItemsInTelemetry:!0,captureIp:!0};t.exports=r;},function(t,e,n){function r(t,e,n,o){this.options=u.merge(t),this.logger=n,r.rateLimiter.configureGlobal(this.options),r.rateLimiter.setPlatformOptions(o,this.options),this.queue=new i(r.rateLimiter,e,n,this.options),this.notifier=new a(this.queue,this.options),this.telemeter=new s(this.options),this.lastError=null;}var o=n(4),i=n(5),a=n(9),s=n(10),u=n(6),c={maxItems:0,itemsPerMinute:60};r.rateLimiter=new o(c),r.prototype.global=function(t){return r.rateLimiter.configureGlobal(t),this},r.prototype.configure=function(t,e){this.notifier&&this.notifier.configure(t),this.telemeter&&this.telemeter.configure(t);var n=this.options,r={};return e&&(r={payload:e}),this.options=u.merge(n,t,r),this.global(this.options),this},r.prototype.log=function(t){var e=this._defaultLogLevel();return this._log(e,t)},r.prototype.debug=function(t){this._log("debug",t);},r.prototype.info=function(t){this._log("info",t);},r.prototype.warn=function(t){this._log("warning",t);},r.prototype.warning=function(t){this._log("warning",t);},r.prototype.error=function(t){this._log("error",t);},r.prototype.critical=function(t){this._log("critical",t);},r.prototype.wait=function(t){this.queue.wait(t);},r.prototype.captureEvent=function(t,e){return this.telemeter.captureEvent(t,e)},r.prototype.captureDomContentLoaded=function(t){return this.telemeter.captureDomContentLoaded(t)},r.prototype.captureLoad=function(t){return this.telemeter.captureLoad(t)},r.prototype._log=function(t,e){if(this._sameAsLastError(e))return void(e.callback&&e.callback());try{var n=null;e.callback&&(n=e.callback,delete e.callback),e.level=e.level||t,this.telemeter._captureRollbarItem(e),e.telemetryEvents=this.telemeter.copyEvents(),this.notifier.log(e,n);}catch(t){this.logger.error(t);}},r.prototype._defaultLogLevel=function(){return this.options.logLevel||"debug"},r.prototype._sameAsLastError=function(t){return !(!this.lastError||this.lastError!==t.err)||(this.lastError=t.err,!1)},t.exports=r;},function(t,e){function n(t){this.startTime=(new Date).getTime(),this.counter=0,this.perMinCounter=0,this.platform=null,this.platformOptions={},this.configureGlobal(t);}function r(t,e,n){return !t.ignoreRateLimit&&e>=1&&n>e}function o(t,e,n,r,o,a,s){var u=null;return n&&(n=new Error(n)),n||r||(u=i(t,e,o,a,s)),{error:n,shouldSend:r,payload:u}}function i(t,e,n,r,o){var i,a=e.environment||e.payload&&e.payload.environment;i=o?"item per minute limit reached, ignoring errors until timeout":"maxItems has been hit, ignoring errors until reset.";var s={body:{message:{body:i,extra:{maxItems:n,itemsPerMinute:r}}},language:"javascript",environment:a,notifier:{version:e.notifier&&e.notifier.version||e.version}};return "browser"===t?(s.platform="browser",s.framework="browser-js",s.notifier.name="rollbar-browser-js"):"server"===t?(s.framework=e.framework||"node-js",s.notifier.name=e.notifier.name):"react-native"===t&&(s.framework=e.framework||"react-native",s.notifier.name=e.notifier.name),s}n.globalSettings={startTime:(new Date).getTime(),maxItems:void 0,itemsPerMinute:void 0},n.prototype.configureGlobal=function(t){void 0!==t.startTime&&(n.globalSettings.startTime=t.startTime),void 0!==t.maxItems&&(n.globalSettings.maxItems=t.maxItems),void 0!==t.itemsPerMinute&&(n.globalSettings.itemsPerMinute=t.itemsPerMinute);},n.prototype.shouldSend=function(t,e){e=e||(new Date).getTime(),e-this.startTime>=6e4&&(this.startTime=e,this.perMinCounter=0);var i=n.globalSettings.maxItems,a=n.globalSettings.itemsPerMinute;if(r(t,i,this.counter))return o(this.platform,this.platformOptions,i+" max items reached",!1);if(r(t,a,this.perMinCounter))return o(this.platform,this.platformOptions,a+" items per minute reached",!1);this.counter++,this.perMinCounter++;var s=!r(t,i,this.counter),u=s;return s=s&&!r(t,a,this.perMinCounter),o(this.platform,this.platformOptions,null,s,i,a,u)},n.prototype.setPlatformOptions=function(t,e){this.platform=t,this.platformOptions=e;},t.exports=n;},function(t,e,n){function r(t,e,n,r){this.rateLimiter=t,this.api=e,this.logger=n,this.options=r,this.predicates=[],this.pendingItems=[],this.pendingRequests=[],this.retryQueue=[],this.retryHandle=null,this.waitCallback=null,this.waitIntervalID=null;}var o=n(6);r.prototype.configure=function(t){this.api&&this.api.configure(t);var e=this.options;return this.options=o.merge(e,t),this},r.prototype.addPredicate=function(t){return o.isFunction(t)&&this.predicates.push(t),this},r.prototype.addPendingItem=function(t){this.pendingItems.push(t);},r.prototype.removePendingItem=function(t){var e=this.pendingItems.indexOf(t);e!==-1&&this.pendingItems.splice(e,1);},r.prototype.addItem=function(t,e,n,r){e&&o.isFunction(e)||(e=function(){});var i=this._applyPredicates(t);if(i.stop)return this.removePendingItem(r),void e(i.err);this._maybeLog(t,n),this.removePendingItem(r),this.pendingRequests.push(t);try{this._makeApiRequest(t,function(n,r){this._dequeuePendingRequest(t),e(n,r);}.bind(this));}catch(n){this._dequeuePendingRequest(t),e(n);}},r.prototype.wait=function(t){o.isFunction(t)&&(this.waitCallback=t,this._maybeCallWait()||(this.waitIntervalID&&(this.waitIntervalID=clearInterval(this.waitIntervalID)),this.waitIntervalID=setInterval(function(){this._maybeCallWait();}.bind(this),500)));},r.prototype._applyPredicates=function(t){for(var e=null,n=0,r=this.predicates.length;n<r;n++)if(e=this.predicates[n](t,this.options),!e||void 0!==e.err)return {stop:!0,err:e.err};return {stop:!1,err:null}},r.prototype._makeApiRequest=function(t,e){var n=this.rateLimiter.shouldSend(t);n.shouldSend?this.api.postItem(t,function(n,r){n?this._maybeRetry(n,t,e):e(n,r);}.bind(this)):n.error?e(n.error):this.api.postItem(n.payload,e);};var i=["ECONNRESET","ENOTFOUND","ESOCKETTIMEDOUT","ETIMEDOUT","ECONNREFUSED","EHOSTUNREACH","EPIPE","EAI_AGAIN"];r.prototype._maybeRetry=function(t,e,n){var r=!1;if(this.options.retryInterval)for(var o=0,a=i.length;o<a;o++)if(t.code===i[o]){r=!0;break}r?this._retryApiRequest(e,n):n(t);},r.prototype._retryApiRequest=function(t,e){this.retryQueue.push({item:t,callback:e}),this.retryHandle||(this.retryHandle=setInterval(function(){for(;this.retryQueue.length;){var t=this.retryQueue.shift();this._makeApiRequest(t.item,t.callback);}}.bind(this),this.options.retryInterval));},r.prototype._dequeuePendingRequest=function(t){var e=this.pendingRequests.indexOf(t);e!==-1&&(this.pendingRequests.splice(e,1),this._maybeCallWait());},r.prototype._maybeLog=function(t,e){if(this.logger&&this.options.verbose){var n=e;if(n=n||o.get(t,"body.trace.exception.message"),n=n||o.get(t,"body.trace_chain.0.exception.message"))return void this.logger.error(n);n=o.get(t,"body.message.body"),n&&this.logger.log(n);}},r.prototype._maybeCallWait=function(){return !(!o.isFunction(this.waitCallback)||0!==this.pendingItems.length||0!==this.pendingRequests.length)&&(this.waitIntervalID&&(this.waitIntervalID=clearInterval(this.waitIntervalID)),this.waitCallback(),!0)},t.exports=r;},function(t,e,n){function r(){if(!A&&(A=!0,c(JSON)&&(s(JSON.stringify)&&(R.stringify=JSON.stringify),s(JSON.parse)&&(R.parse=JSON.parse)),!a(R.stringify)||!a(R.parse))){var t=n(8);t(R);}}function o(t,e){return e===i(t)}function i(t){var e=typeof t;return "object"!==e?e:t?t instanceof Error?"error":{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase():"null"}function a(t){return o(t,"function")}function s(t){var e=/[\\^$.*+?()[\]{}|]/g,n=Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(e,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?"),r=RegExp("^"+n+"$");return u(t)&&r.test(t)}function u(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function c(t){return !o(t,"undefined")}function l(t){var e=i(t);return "object"===e||"array"===e}function p(t){return o(t,"error")}function f(t,e,n){var r,i,a,s=o(t,"object"),u=o(t,"array"),c=[];if(s&&n.indexOf(t)!==-1)return t;if(n.push(t),s)for(r in t)Object.prototype.hasOwnProperty.call(t,r)&&c.push(r);else if(u)for(a=0;a<t.length;++a)c.push(a);var l=s?{}:[];for(a=0;a<c.length;++a)r=c[a],i=t[r],l[r]=e(r,i,n);return 0!=c.length?l:t}function h(){return "********"}function d(){var t=N(),e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===e?n:7&n|8).toString(16)});return e}function m(t){var e=g(t);return ""===e.anchor&&(e.source=e.source.replace("#","")),t=e.source.replace("?"+e.query,"")}function g(t){if(!o(t,"string"))throw new Error("received invalid input");for(var e=D,n=e.parser["loose"].exec(t),r={},i=e.key.length;i--;)r[e.key[i]]=n[i]||"";return r[e.q.name]={},r[e.key[12]].replace(e.q.parser,function(t,n,o){n&&(r[e.q.name][n]=o);}),r}function v(t,e,n){n=n||{},n.access_token=t;var r,o=[];for(r in n)Object.prototype.hasOwnProperty.call(n,r)&&o.push([r,n[r]].join("="));var i="?"+o.sort().join("&");e=e||{},e.path=e.path||"";var a,s=e.path.indexOf("?"),u=e.path.indexOf("#");s!==-1&&(u===-1||u>s)?(a=e.path,e.path=a.substring(0,s)+i+"&"+a.substring(s+1)):u!==-1?(a=e.path,e.path=a.substring(0,u)+i+a.substring(u)):e.path=e.path+i;}function y(t,e){if(e=e||t.protocol,!e&&t.port&&(80===t.port?e="http:":443===t.port&&(e="https:")),e=e||"https:",!t.hostname)return null;var n=e+"//"+t.hostname;return t.port&&(n=n+":"+t.port),t.path&&(n+=t.path),n}function b(t,e){var n,r;try{n=R.stringify(t);}catch(o){if(e&&a(e))try{n=e(t);}catch(t){r=t;}else r=o;}return {error:r,value:n}}function w(t){var e,n;try{e=R.parse(t);}catch(t){n=t;}return {error:n,value:e}}function _(t,e,n,r,o,i,a,s){var u={url:e||"",line:n,column:r};u.func=s.guessFunctionName(u.url,u.line),u.context=s.gatherContext(u.url,u.line);var c=document&&document.location&&document.location.href,l=window&&window.navigator&&window.navigator.userAgent;return {mode:i,message:o?String(o):t||a,url:c,stack:[u],useragent:l}}function x(t,e){return function(n,r){try{e(n,r);}catch(e){t.error(e);}}}function k(t,e,n,r,o){for(var a,s,u,c,l,p,f=[],h=0,m=t.length;h<m;++h){p=t[h];var g=i(p);switch(g){case"undefined":break;case"string":a?f.push(p):a=p;break;case"function":c=x(e,p);break;case"date":f.push(p);break;case"error":case"domexception":s?f.push(p):s=p;break;case"object":case"array":if(p instanceof Error||"undefined"!=typeof DOMException&&p instanceof DOMException){s?f.push(p):s=p;break}if(r&&"object"===g&&!l){for(var v=0,y=r.length;v<y;++v)if(void 0!==p[r[v]]){l=p;break}if(l)break}u?f.push(p):u=p;break;default:if(p instanceof Error||"undefined"!=typeof DOMException&&p instanceof DOMException){s?f.push(p):s=p;break}f.push(p);}}f.length>0&&(u=j(u),u.extraArgs=f);var b={message:a,err:s,custom:u,timestamp:N(),callback:c,uuid:d()};return u&&void 0!==u.level&&(b.level=u.level,delete u.level),r&&l&&(b.request=l),o&&(b.lambdaContext=o),b._originalArgs=t,b}function E(t,e){if(t){var n=e.split("."),r=t;try{for(var o=0,i=n.length;o<i;++o)r=r[n[o]];}catch(t){r=void 0;}return r}}function I(t,e,n){if(t){var r=e.split("."),o=r.length;if(!(o<1)){if(1===o)return void(t[r[0]]=n);try{for(var i=t[r[0]]||{},a=i,s=1;s<o-1;s++)i[r[s]]=i[r[s]]||{},i=i[r[s]];i[r[o-1]]=n,t[r[0]]=a;}catch(t){return}}}}function T(t,e){function n(t,e,n,r,o,i){return e+h(i)}function r(t){var e;if(o(t,"string"))for(e=0;e<u.length;++e)t=t.replace(u[e],n);return t}function i(t,e){var n;for(n=0;n<s.length;++n)if(s[n].test(t)){e=h(e);break}return e}function a(t,e,n){var s=i(t,e);return s===e?o(e,"object")||o(e,"array")?f(e,a,n):r(s):s}e=e||[];var s=S(e),u=O(e);return f(t,a,[])}function S(t){for(var e,n=[],r=0;r<t.length;++r)e="^\\[?(%5[bB])?"+t[r]+"\\[?(%5[bB])?\\]?(%5[dD])?$",n.push(new RegExp(e,"i"));return n}function O(t){for(var e,n=[],r=0;r<t.length;++r)e="\\[?(%5[bB])?"+t[r]+"\\[?(%5[bB])?\\]?(%5[dD])?",n.push(new RegExp("("+e+"=)([^&\\n]+)","igm"));return n}function L(t){var e,n,r,o=[];for(e=0,n=t.length;e<n;e++)r=t[e],"object"==typeof r?(r=b(r),r=r.error||r.value,r.length>500&&(r=r.substr(0,500)+"...")):"undefined"==typeof r&&(r="undefined"),o.push(r);return o.join(" ")}function N(){return Date.now?+Date.now():+new Date}function C(t,e){if(t&&t.user_ip&&e!==!0){var n=t.user_ip;if(e)try{var r;if(n.indexOf(".")!==-1)r=n.split("."),r.pop(),r.push("0"),n=r.join(".");else if(n.indexOf(":")!==-1){if(r=n.split(":"),r.length>2){var o=r.slice(0,3),i=o[2].indexOf("/");i!==-1&&(o[2]=o[2].substring(0,i));var a="0000:0000:0000:0000:0000";n=o.concat(a).join(":");}}else n=null;}catch(t){n=null;}else n=null;t.user_ip=n;}}var j=n(7),R={},A=!1;r();var q={debug:0,info:1,warning:2,error:3,critical:4},D={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};t.exports={isType:o,typeName:i,isFunction:a,isNativeFunction:s,isIterable:l,isError:p,merge:j,traverse:f,redact:h,uuid4:d,LEVELS:q,sanitizeUrl:m,addParamsAndAccessTokenToPath:v,formatUrl:y,stringify:b,jsonParse:w,makeUnhandledStackInfo:_,createItem:k,get:E,set:I,scrub:T,formatArgsAsString:L,now:N,filterIp:C};},function(t,e){function n(){var t,e,r,o,a,s={},u=null,c=arguments.length;for(t=0;t<c;t++)if(u=arguments[t],null!=u)for(a in u)e=s[a],r=u[a],s!==r&&(r&&i(r)?(o=e&&i(e)?e:{},s[a]=n(o,r)):"undefined"!=typeof r&&(s[a]=r));return s}var r=Object.prototype.hasOwnProperty,o=Object.prototype.toString,i=function(t){if(!t||"[object Object]"!==o.call(t))return !1;var e=r.call(t,"constructor"),n=t.constructor&&t.constructor.prototype&&r.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!e&&!n)return !1;var i;for(i in t);return "undefined"==typeof i||r.call(t,i)};t.exports=n;},function(t,e){var n=function(t){function e(t){return t<10?"0"+t:t}function n(){return this.valueOf()}function r(t){return i.lastIndex=0,i.test(t)?'"'+t.replace(i,function(t){var e=u[t];return "string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function o(t,e){var n,i,u,l,p,f=a,h=e[t];switch(h&&"object"==typeof h&&"function"==typeof h.toJSON&&(h=h.toJSON(t)),"function"==typeof c&&(h=c.call(e,t,h)),typeof h){case"string":return r(h);case"number":return isFinite(h)?String(h):"null";case"boolean":case"null":return String(h);case"object":if(!h)return "null";if(a+=s,p=[],"[object Array]"===Object.prototype.toString.apply(h)){for(l=h.length,n=0;n<l;n+=1)p[n]=o(n,h)||"null";return u=0===p.length?"[]":a?"[\n"+a+p.join(",\n"+a)+"\n"+f+"]":"["+p.join(",")+"]",a=f,u}if(c&&"object"==typeof c)for(l=c.length,n=0;n<l;n+=1)"string"==typeof c[n]&&(i=c[n],u=o(i,h),u&&p.push(r(i)+(a?": ":":")+u));else for(i in h)Object.prototype.hasOwnProperty.call(h,i)&&(u=o(i,h),u&&p.push(r(i)+(a?": ":":")+u));return u=0===p.length?"{}":a?"{\n"+a+p.join(",\n"+a)+"\n"+f+"}":"{"+p.join(",")+"}",a=f,u}}var i=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+e(this.getUTCMonth()+1)+"-"+e(this.getUTCDate())+"T"+e(this.getUTCHours())+":"+e(this.getUTCMinutes())+":"+e(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=n,Number.prototype.toJSON=n,String.prototype.toJSON=n);var a,s,u,c;"function"!=typeof t.stringify&&(u={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},t.stringify=function(t,e,n){var r;if(a="",s="","number"==typeof n)for(r=0;r<n;r+=1)s+=" ";else"string"==typeof n&&(s=n);if(c=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return o("",{"":t})}),"function"!=typeof t.parse&&(t.parse=function(){function t(t){return t.replace(/\\(?:u(.{4})|([^u]))/g,function(t,e,n){return e?String.fromCharCode(parseInt(e,16)):a[n]})}var e,n,r,o,i,a={"\\":"\\",'"':'"',"/":"/",t:"\t",n:"\n",r:"\r",f:"\f",b:"\b"},s={go:function(){e="ok";},firstokey:function(){o=i,e="colon";},okey:function(){o=i,e="colon";},ovalue:function(){e="ocomma";},firstavalue:function(){e="acomma";},avalue:function(){e="acomma";}},u={go:function(){e="ok";},ovalue:function(){e="ocomma";},firstavalue:function(){e="acomma";},avalue:function(){e="acomma";}},c={"{":{go:function(){n.push({state:"ok"}),r={},e="firstokey";},ovalue:function(){n.push({container:r,state:"ocomma",key:o}),r={},e="firstokey";},firstavalue:function(){n.push({container:r,state:"acomma"}),r={},e="firstokey";},avalue:function(){n.push({container:r,state:"acomma"}),r={},e="firstokey";}},"}":{firstokey:function(){var t=n.pop();i=r,r=t.container,o=t.key,e=t.state;},ocomma:function(){var t=n.pop();r[o]=i,i=r,r=t.container,o=t.key,e=t.state;}},"[":{go:function(){n.push({state:"ok"}),r=[],e="firstavalue";},ovalue:function(){n.push({container:r,state:"ocomma",key:o}),r=[],e="firstavalue";},firstavalue:function(){n.push({container:r,state:"acomma"}),r=[],e="firstavalue";},avalue:function(){n.push({container:r,state:"acomma"}),r=[],e="firstavalue";}},"]":{firstavalue:function(){var t=n.pop();i=r,r=t.container,o=t.key,e=t.state;},acomma:function(){var t=n.pop();r.push(i),i=r,r=t.container,o=t.key,e=t.state;}},":":{colon:function(){if(Object.hasOwnProperty.call(r,o))throw new SyntaxError("Duplicate key '"+o+'"');e="ovalue";}},",":{ocomma:function(){r[o]=i,e="okey";},acomma:function(){r.push(i),e="avalue";}},true:{go:function(){i=!0,e="ok";},ovalue:function(){i=!0,e="ocomma";},firstavalue:function(){i=!0,e="acomma";},avalue:function(){i=!0,e="acomma";}},false:{go:function(){i=!1,e="ok";},ovalue:function(){i=!1,e="ocomma";},firstavalue:function(){i=!1,e="acomma";},avalue:function(){i=!1,e="acomma";}},null:{go:function(){i=null,e="ok";},ovalue:function(){i=null,e="ocomma";},firstavalue:function(){i=null,e="acomma";},avalue:function(){i=null,e="acomma";}}};return function(r,o){var a,l=/^[\u0020\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;e="go",n=[];try{for(;;){if(a=l.exec(r),!a)break;a[1]?c[a[1]][e]():a[2]?(i=+a[2],u[e]()):(i=t(a[3]),s[e]()),r=r.slice(a[0].length);}}catch(t){e=t;}if("ok"!==e||/[^\u0020\t\n\r]/.test(r))throw e instanceof SyntaxError?e:new SyntaxError("JSON");return "function"==typeof o?function t(e,n){var r,a,s=e[n];if(s&&"object"==typeof s)for(r in i)Object.prototype.hasOwnProperty.call(s,r)&&(a=t(s,r),void 0!==a?s[r]=a:delete s[r]);return o.call(e,n,s)}({"":i},""):i}}());};t.exports=n;},function(t,e,n){function r(t,e){this.queue=t,this.options=e,this.transforms=[];}var o=n(6);r.prototype.configure=function(t){this.queue&&this.queue.configure(t);var e=this.options;return this.options=o.merge(e,t),this},r.prototype.addTransform=function(t){return o.isFunction(t)&&this.transforms.push(t),this},r.prototype.log=function(t,e){if(e&&o.isFunction(e)||(e=function(){}),!this.options.enabled)return e(new Error("Rollbar is not enabled"));this.queue.addPendingItem(t);var n=t.err;this._applyTransforms(t,function(r,o){return r?(this.queue.removePendingItem(t),e(r,null)):void this.queue.addItem(o,e,n,t)}.bind(this));},r.prototype._applyTransforms=function(t,e){var n=-1,r=this.transforms.length,o=this.transforms,i=this.options,a=function(t,s){return t?void e(t,null):(n++,n===r?void e(null,s):void o[n](s,i,a))};a(null,t);},t.exports=r;},function(t,e,n){function r(t){this.queue=[],this.options=i.merge(t);var e=this.options.maxTelemetryEvents||a;this.maxQueueSize=Math.max(0,Math.min(e,a));}function o(t,e){if(e)return e;var n={error:"error",manual:"info"};return n[t]||"info"}var i=n(6),a=100;r.prototype.configure=function(t){var e=this.options;this.options=i.merge(e,t);var n=this.options.maxTelemetryEvents||a,r=Math.max(0,Math.min(n,a)),o=0;this.maxQueueSize>r&&(o=this.maxQueueSize-r),this.maxQueueSize=r,this.queue.splice(0,o);},r.prototype.copyEvents=function(){return Array.prototype.slice.call(this.queue,0)},r.prototype.capture=function(t,e,n,r,a){var s={level:o(t,n),type:t,timestamp_ms:a||i.now(),body:e,source:"client"};r&&(s.uuid=r);try{if(i.isFunction(this.options.filterTelemetry)&&this.options.filterTelemetry(s))return !1}catch(t){this.options.filterTelemetry=null;}return this.push(s),s},r.prototype.captureEvent=function(t,e,n){return this.capture("manual",t,e,n)},r.prototype.captureError=function(t,e,n,r){var o={message:t.message||String(t)};return t.stack&&(o.stack=t.stack),this.capture("error",o,e,n,r)},r.prototype.captureLog=function(t,e,n,r){return this.capture("log",{message:t},e,n,r)},r.prototype.captureNetwork=function(t,e,n,r){e=e||"xhr",t.subtype=t.subtype||e,r&&(t.request=r);var o=this.levelFromStatus(t.status_code);return this.capture("network",t,o,n)},r.prototype.levelFromStatus=function(t){return t>=200&&t<400?"info":0===t||t>=400?"error":"info"},r.prototype.captureDom=function(t,e,n,r,o){var i={subtype:t,element:e};return void 0!==n&&(i.value=n),void 0!==r&&(i.checked=r),this.capture("dom",i,"info",o)},r.prototype.captureNavigation=function(t,e,n){return this.capture("navigation",{from:t,to:e},"info",n)},r.prototype.captureDomContentLoaded=function(t){return this.capture("navigation",{subtype:"DOMContentLoaded"},"info",void 0,t&&t.getTime())},r.prototype.captureLoad=function(t){return this.capture("navigation",{subtype:"load"},"info",void 0,t&&t.getTime())},r.prototype.captureConnectivityChange=function(t,e){return this.captureNetwork({change:t},"connectivity",e)},r.prototype._captureRollbarItem=function(t){if(this.options.includeItemsInTelemetry)return t.err?this.captureError(t.err,t.level,t.uuid,t.timestamp):t.message?this.captureLog(t.message,t.level,t.uuid,t.timestamp):t.custom?this.capture("log",t.custom,t.level,t.uuid,t.timestamp):void 0},r.prototype.push=function(t){this.queue.push(t),this.queue.length>this.maxQueueSize&&this.queue.shift();},t.exports=r;},function(t,e,n){function r(t,e,n,r){this.options=t,this.transport=e,this.url=n,this.jsonBackup=r,this.accessToken=t.accessToken,this.transportOptions=o(t,n);}function o(t,e){return a.getTransportFromOptions(t,s,e)}var i=n(6),a=n(12),s={hostname:"api.rollbar.com",path:"/api/1/item/",search:null,version:"1",protocol:"https:",port:443};r.prototype.postItem=function(t,e){var n=a.transportOptions(this.transportOptions,"POST"),r=a.buildPayload(this.accessToken,t,this.jsonBackup);this.transport.post(this.accessToken,n,r,e);},r.prototype.configure=function(t){var e=this.oldOptions;return this.options=i.merge(e,t),this.transportOptions=o(this.options,this.url),void 0!==this.options.accessToken&&(this.accessToken=this.options.accessToken),this},t.exports=r;},function(t,e,n){function r(t,e,n){if(!s.isType(e.context,"string")){var r=s.stringify(e.context,n);r.error?e.context="Error: could not serialize 'context'":e.context=r.value||"",e.context.length>255&&(e.context=e.context.substr(0,255));}return {access_token:t,data:e}}function o(t,e,n){var r=e.hostname,o=e.protocol,i=e.port,a=e.path,s=e.search,u=t.proxy;if(t.endpoint){var c=n.parse(t.endpoint);r=c.hostname,o=c.protocol,i=c.port,a=c.pathname,s=c.search;}return {hostname:r,protocol:o,port:i,path:a,search:s,proxy:u}}function i(t,e){var n=t.protocol||"https:",r=t.port||("http:"===n?80:"https:"===n?443:void 0),o=t.hostname,i=t.path;return t.search&&(i+=t.search),t.proxy&&(i=n+"//"+o+i,o=t.proxy.host||t.proxy.hostname,r=t.proxy.port,n=t.proxy.protocol||n),{protocol:n,hostname:o,path:i,port:r,method:e}}function a(t,e){var n=/\/$/.test(t),r=/^\//.test(e);return n&&r?e=e.substring(1):n||r||(e="/"+e),t+e}var s=n(6);t.exports={buildPayload:r,getTransportFromOptions:o,transportOptions:i,appendPathToPath:a};},function(t,e,n){function r(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.error(s.formatArgsAsString(t)):console.error.apply(console,t);}function o(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.info(s.formatArgsAsString(t)):console.info.apply(console,t);}function i(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.log(s.formatArgsAsString(t)):console.log.apply(console,t);}n(14);var a=n(15),s=n(6);t.exports={error:r,info:o,log:i};},function(t,e){!function(t){t.console||(t.console={});for(var e,n,r=t.console,o=function(){},i=["memory"],a="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(",");e=i.pop();)r[e]||(r[e]={});for(;n=a.pop();)r[n]||(r[n]=o);}("undefined"==typeof window?this:window);},function(t,e){function n(){var t;if(!document)return t;for(var e=3,n=document.createElement("div"),r=n.getElementsByTagName("i");n.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->",r[0];);return e>4?e:t}var r={ieVersion:n};t.exports=r;},function(t,e){function n(t,e,n){
    if(t){var o;"function"==typeof e._rollbarOldOnError?o=e._rollbarOldOnError:t.onerror&&!t.onerror.belongsToShim&&(o=t.onerror,e._rollbarOldOnError=o);var i=function(){var n=Array.prototype.slice.call(arguments,0);r(t,e,o,n);};i.belongsToShim=n,t.onerror=i;}}function r(t,e,n,r){t._rollbarWrappedError&&(r[4]||(r[4]=t._rollbarWrappedError),r[5]||(r[5]=t._rollbarWrappedError._rollbarContext),t._rollbarWrappedError=null),e.handleUncaughtException.apply(e,r),n&&n.apply(t,r);}function o(t,e,n){if(t){"function"==typeof t._rollbarURH&&t._rollbarURH.belongsToShim&&t.removeEventListener("unhandledrejection",t._rollbarURH);var r=function(t){var n,r,o;try{n=t.reason;}catch(t){n=void 0;}try{r=t.promise;}catch(t){r="[unhandledrejection] error getting `promise` from event";}try{o=t.detail,!n&&o&&(n=o.reason,r=o.promise);}catch(t){o="[unhandledrejection] error getting `detail` from event";}n||(n="[unhandledrejection] error getting `reason` from event"),e&&e.handleUnhandledRejection&&e.handleUnhandledRejection(n,r);};r.belongsToShim=n,t._rollbarURH=r,t.addEventListener("unhandledrejection",r);}}function i(t,e,n){if(t){var r,o,i="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(r=0;r<i.length;++r)o=i[r],t[o]&&t[o].prototype&&a(e,t[o].prototype,n);}}function a(t,e,n){if(e.hasOwnProperty&&e.hasOwnProperty("addEventListener")){for(var r=e.addEventListener;r._rollbarOldAdd&&r.belongsToShim;)r=r._rollbarOldAdd;var o=function(e,n,o){r.call(this,e,t.wrap(n),o);};o._rollbarOldAdd=r,o.belongsToShim=n,e.addEventListener=o;for(var i=e.removeEventListener;i._rollbarOldRemove&&i.belongsToShim;)i=i._rollbarOldRemove;var a=function(t,e,n){i.call(this,t,e&&e._rollbar_wrapped||e,n);};a._rollbarOldRemove=i,a.belongsToShim=n,e.removeEventListener=a;}}t.exports={captureUncaughtExceptions:n,captureUnhandledRejections:o,wrapGlobals:i};},function(t,e,n){function r(t,e,n,r,o){r&&l.isFunction(r)||(r=function(){}),l.addParamsAndAccessTokenToPath(t,e,n);var a="GET",s=l.formatUrl(e);i(t,s,a,null,r,o);}function o(t,e,n,r,o){if(r&&l.isFunction(r)||(r=function(){}),!n)return r(new Error("Cannot send empty request"));var a=l.stringify(n);if(a.error)return r(a.error);var s=a.value,u="POST",c=l.formatUrl(e);i(t,c,u,s,r,o);}function i(t,e,n,r,o,i){var f;if(f=i?i():a(),!f)return o(new Error("No way to send a request"));try{try{var h=function(){try{if(h&&4===f.readyState){h=void 0;var t=l.jsonParse(f.responseText);if(s(f))return void o(t.error,t.value);if(u(f)){if(403===f.status){var e=t.value&&t.value.message;p.error(e);}o(new Error(String(f.status)));}else{var n="XHR response had no status code (likely connection failure)";o(c(n));}}}catch(t){var r;r=t&&t.stack?t:new Error(t),o(r);}};f.open(n,e,!0),f.setRequestHeader&&(f.setRequestHeader("Content-Type","application/json"),f.setRequestHeader("X-Rollbar-Access-Token",t)),f.onreadystatechange=h,f.send(r);}catch(t){if("undefined"!=typeof XDomainRequest){if(!window||!window.location)return o(new Error("No window available during request, unknown environment"));"http:"===window.location.href.substring(0,5)&&"https"===e.substring(0,5)&&(e="http"+e.substring(5));var d=new XDomainRequest;d.onprogress=function(){},d.ontimeout=function(){var t="Request timed out",e="ETIMEDOUT";o(c(t,e));},d.onerror=function(){o(new Error("Error during request"));},d.onload=function(){var t=l.jsonParse(d.responseText);o(t.error,t.value);},d.open(n,e,!0),d.send(r);}else o(new Error("Cannot find a method to transport a request"));}}catch(t){o(t);}}function a(){var t,e,n=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],r=n.length;for(e=0;e<r;e++)try{t=n[e]();break}catch(t){}return t}function s(t){return t&&t.status&&200===t.status}function u(t){return t&&l.isType(t.status,"number")&&t.status>=400&&t.status<600}function c(t,e){var n=new Error(t);return n.code=e||"ENOTFOUND",n}var l=n(6),p=n(13);t.exports={get:r,post:o};},function(t,e){function n(t){var e,n,r={protocol:null,auth:null,host:null,path:null,hash:null,href:t,hostname:null,port:null,pathname:null,search:null,query:null};if(e=t.indexOf("//"),e!==-1?(r.protocol=t.substring(0,e),n=e+2):n=0,e=t.indexOf("@",n),e!==-1&&(r.auth=t.substring(n,e),n=e+1),e=t.indexOf("/",n),e===-1){if(e=t.indexOf("?",n),e===-1)return e=t.indexOf("#",n),e===-1?r.host=t.substring(n):(r.host=t.substring(n,e),r.hash=t.substring(e)),r.hostname=r.host.split(":")[0],r.port=r.host.split(":")[1],r.port&&(r.port=parseInt(r.port,10)),r;r.host=t.substring(n,e),r.hostname=r.host.split(":")[0],r.port=r.host.split(":")[1],r.port&&(r.port=parseInt(r.port,10)),n=e;}else r.host=t.substring(n,e),r.hostname=r.host.split(":")[0],r.port=r.host.split(":")[1],r.port&&(r.port=parseInt(r.port,10)),n=e;if(e=t.indexOf("#",n),e===-1?r.path=t.substring(n):(r.path=t.substring(n,e),r.hash=t.substring(e)),r.path){var o=r.path.split("?");r.pathname=o[0],r.query=o[1],r.search=r.query?"?"+r.query:null;}return r}t.exports={parse:n};},function(t,e,n){function r(t,e,n){if(t.data=t.data||{},t.err)try{t.stackInfo=t.err._savedStackTrace||d.parse(t.err);}catch(e){m.error("Error while parsing the error object.",e),t.message=t.err.message||t.err.description||t.message||String(t.err),delete t.err;}n(null,t);}function o(t,e,n){t.message||t.stackInfo||t.custom||n(new Error("No message, stack info, or custom data"),null),n(null,t);}function i(t,e,n){var r=e.payload&&e.payload.environment||e.environment;t.data=h.merge(t.data,{environment:r,level:t.level,endpoint:e.endpoint,platform:"browser",framework:"browser-js",language:"javascript",server:{},uuid:t.uuid,notifier:{name:"rollbar-browser-js",version:e.version}}),n(null,t);}function a(t){return function(e,n,r){if(!t||!t.location)return r(null,e);var o="$remote_ip";n.captureIp?n.captureIp!==!0&&(o+="_anonymize"):o=null,h.set(e,"data.request",{url:t.location.href,query_string:t.location.search,user_ip:o}),r(null,e);}}function s(t){return function(e,n,r){if(!t)return r(null,e);var o=t.navigator||{},i=t.screen||{};h.set(e,"data.client",{runtime_ms:e.timestamp-t._rollbarStartTime,timestamp:Math.round(e.timestamp/1e3),javascript:{browser:o.userAgent,language:o.language,cookie_enabled:o.cookieEnabled,screen:{width:i.width,height:i.height}}}),r(null,e);}}function u(t){return function(e,n,r){if(!t||!t.navigator)return r(null,e);for(var o,i=[],a=t.navigator.plugins||[],s=0,u=a.length;s<u;++s)o=a[s],i.push({name:o.name,description:o.description});h.set(e,"data.client.javascript.plugins",i),r(null,e);}}function c(t,e,n){t.stackInfo?p(t,e,n):l(t,e,n);}function l(t,e,n){var r=t.message,o=t.custom;if(!r)if(o){var i=e.scrubFields,a=h.stringify(h.scrub(o,i));r=a.error||a.value||"";}else r="";var s={body:r};o&&(s.extra=h.merge(o)),h.set(t,"data.body",{message:s}),n(null,t);}function p(t,e,n){var r=t.data.description,o=t.stackInfo,i=t.custom,a=d.guessErrorClass(o.message),s=o.name||a[0],u=a[1],c={exception:{class:s,message:u}};r&&(c.exception.description=r);var p=o.stack;if(p&&0===p.length&&t._unhandledStackInfo&&t._unhandledStackInfo.stack&&(p=t._unhandledStackInfo.stack),p){0===p.length&&(c.exception.stack=o.rawStack,c.exception.raw=String(o.rawException));var f,m,g,v,y,b,w,_;for(c.frames=[],w=0;w<p.length;++w)f=p[w],m={filename:f.url?h.sanitizeUrl(f.url):"(unknown)",lineno:f.line||null,method:f.func&&"?"!==f.func?f.func:"[anonymous]",colno:f.column},m.method&&m.method.endsWith&&m.method.endsWith("_rollbar_wrapped")||(g=v=y=null,b=f.context?f.context.length:0,b&&(_=Math.floor(b/2),v=f.context.slice(0,_),g=f.context[_],y=f.context.slice(_)),g&&(m.code=g),(v||y)&&(m.context={},v&&v.length&&(m.context.pre=v),y&&y.length&&(m.context.post=y)),f.args&&(m.args=f.args),c.frames.push(m));c.frames.reverse(),i&&(c.extra=h.merge(i)),h.set(t,"data.body",{trace:c}),n(null,t);}else t.message=s+": "+u,l(t,e,n);}function f(t,e,n){var r=e.scrubFields;t.data=h.scrub(t.data,r),n(null,t);}var h=n(6),d=n(20),m=n(13);t.exports={handleItemWithError:r,ensureItemHasSomethingToSay:o,addBaseInfo:i,addRequestInfo:a,addClientInfo:s,addPluginInfo:u,addBody:c,scrubPayload:f};},function(t,e,n){function r(){return l}function o(){return null}function i(t){var e={};return e._stackFrame=t,e.url=t.fileName,e.line=t.lineNumber,e.func=t.functionName,e.column=t.columnNumber,e.args=t.args,e.context=o(e.url,e.line),e}function a(t){function e(){var e,n=[];if(t.stack)e=t;else try{throw t}catch(t){e=t;}try{n=c.parse(e);}catch(t){n=[];}for(var r=[],o=0;o<n.length;o++)r.push(new i(n[o]));return r}return {stack:e(),message:t.message,name:t.name,rawStack:t.stack,rawException:t}}function s(t){return new a(t)}function u(t){if(!t||!t.match)return ["Unknown error. There was no error message to display.",""];var e=t.match(p),n="(unknown)";return e&&(n=e[e.length-1],t=t.replace((e[e.length-2]||"")+n+":",""),t=t.replace(/(^[\s]+|[\s]+$)/g,"")),[n,t]}var c=n(21),l="?",p=new RegExp("^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ");t.exports={guessFunctionName:r,guessErrorClass:u,gatherContext:o,parse:s,Stack:a,Frame:i};},function(t,e,n){var r,o,i;!function(a,s){o=[n(22)],r=s,i="function"==typeof r?r.apply(e,o):r,!(void 0!==i&&(t.exports=i));}(this,function(t){function e(t,e,n){if("function"==typeof Array.prototype.map)return t.map(e,n);for(var r=new Array(t.length),o=0;o<t.length;o++)r[o]=e.call(n,t[o]);return r}function n(t,e,n){if("function"==typeof Array.prototype.filter)return t.filter(e,n);for(var r=[],o=0;o<t.length;o++)e.call(n,t[o])&&r.push(t[o]);return r}var r=/(^|@)\S+\:\d+/,o=/^\s*at .*(\S+\:\d+|\(native\))/m,i=/^(eval@)?(\[native code\])?$/;return {parse:function(t){if("undefined"!=typeof t.stacktrace||"undefined"!=typeof t["opera#sourceloc"])return this.parseOpera(t);if(t.stack&&t.stack.match(o))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},extractLocation:function(t){if(t.indexOf(":")===-1)return [t];var e=t.replace(/[\(\)\s]/g,"").split(":"),n=e.pop(),r=e[e.length-1];if(!isNaN(parseFloat(r))&&isFinite(r)){var o=e.pop();return [e.join(":"),o,n]}return [e.join(":"),n,void 0]},parseV8OrIE:function(r){var i=n(r.stack.split("\n"),function(t){return !!t.match(o)},this);return e(i,function(e){e.indexOf("(eval ")>-1&&(e=e.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var n=e.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),r=this.extractLocation(n.pop()),o=n.join(" ")||void 0,i="eval"===r[0]?void 0:r[0];return new t(o,void 0,i,r[1],r[2],e)},this)},parseFFOrSafari:function(r){var o=n(r.stack.split("\n"),function(t){return !t.match(i)},this);return e(o,function(e){if(e.indexOf(" > eval")>-1&&(e=e.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":$1")),e.indexOf("@")===-1&&e.indexOf(":")===-1)return new t(e);var n=e.split("@"),r=this.extractLocation(n.pop()),o=n.shift()||void 0;return new t(o,void 0,r[0],r[1],r[2],e)},this)},parseOpera:function(t){return !t.stacktrace||t.message.indexOf("\n")>-1&&t.message.split("\n").length>t.stacktrace.split("\n").length?this.parseOpera9(t):t.stack?this.parseOpera11(t):this.parseOpera10(t)},parseOpera9:function(e){for(var n=/Line (\d+).*script (?:in )?(\S+)/i,r=e.message.split("\n"),o=[],i=2,a=r.length;i<a;i+=2){var s=n.exec(r[i]);s&&o.push(new t(void 0,void 0,s[2],s[1],void 0,r[i]));}return o},parseOpera10:function(e){for(var n=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,r=e.stacktrace.split("\n"),o=[],i=0,a=r.length;i<a;i+=2){var s=n.exec(r[i]);s&&o.push(new t(s[3]||void 0,void 0,s[2],s[1],void 0,r[i]));}return o},parseOpera11:function(o){var i=n(o.stack.split("\n"),function(t){return !!t.match(r)&&!t.match(/^Error created at/)},this);return e(i,function(e){var n,r=e.split("@"),o=this.extractLocation(r.pop()),i=r.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(n=i.replace(/^[^\(]+\(([^\)]*)\)$/,"$1"));var s=void 0===n||"[arguments not available]"===n?void 0:n.split(",");return new t(a,s,o[0],o[1],o[2],e)},this)}}});},function(t,e,n){var r,o,i;!function(n,a){o=[],r=a,i="function"==typeof r?r.apply(e,o):r,!(void 0!==i&&(t.exports=i));}(this,function(){function t(t){return !isNaN(parseFloat(t))&&isFinite(t)}function e(t,e,n,r,o,i){void 0!==t&&this.setFunctionName(t),void 0!==e&&this.setArgs(e),void 0!==n&&this.setFileName(n),void 0!==r&&this.setLineNumber(r),void 0!==o&&this.setColumnNumber(o),void 0!==i&&this.setSource(i);}return e.prototype={getFunctionName:function(){return this.functionName},setFunctionName:function(t){this.functionName=String(t);},getArgs:function(){return this.args},setArgs:function(t){if("[object Array]"!==Object.prototype.toString.call(t))throw new TypeError("Args must be an Array");this.args=t;},getFileName:function(){return this.fileName},setFileName:function(t){this.fileName=String(t);},getLineNumber:function(){return this.lineNumber},setLineNumber:function(e){if(!t(e))throw new TypeError("Line Number must be a Number");this.lineNumber=Number(e);},getColumnNumber:function(){return this.columnNumber},setColumnNumber:function(e){if(!t(e))throw new TypeError("Column Number must be a Number");this.columnNumber=Number(e);},getSource:function(){return this.source},setSource:function(t){this.source=String(t);},toString:function(){var e=this.getFunctionName()||"{anonymous}",n="("+(this.getArgs()||[]).join(",")+")",r=this.getFileName()?"@"+this.getFileName():"",o=t(this.getLineNumber())?":"+this.getLineNumber():"",i=t(this.getColumnNumber())?":"+this.getColumnNumber():"";return e+n+r+o+i}},e});},function(t,e,n){function r(t,e,n){var r=e.payload||{};r.body&&delete r.body;var o=u.merge(t.data,r);t._isUncaught&&(o._isUncaught=!0),t._originalArgs&&(o._originalArgs=t._originalArgs),n(null,o);}function o(t,e,n){t.telemetryEvents&&u.set(t,"data.body.telemetry",t.telemetryEvents),n(null,t);}function i(t,e,n){if(!t.message)return void n(null,t);var r="data.body.trace_chain.0",o=u.get(t,r);if(o||(r="data.body.trace",o=u.get(t,r)),o){if(!o.exception||!o.exception.description)return u.set(t,r+".exception.description",t.message),void n(null,t);var i=u.get(t,r+".extra")||{},a=u.merge(i,{message:t.message});u.set(t,r+".extra",a);}n(null,t);}function a(t){return function(e,n,r){var o=u.merge(e);try{u.isFunction(n.transform)&&n.transform(o.data);}catch(o){return n.transform=null,t.error("Error while calling custom transform() function. Removing custom transform().",o),void r(null,e)}r(null,o);}}function s(t,e,n){if(!e.sendConfig)return n(null,t);var r="_rollbarConfig",o=u.get(t,"data.custom")||{};o[r]=e,t.data.custom=o,n(null,t);}var u=n(6);t.exports={itemToPayload:r,addTelemetryData:o,addMessageWithError:i,userTransform:a,addConfigToPayload:s};},function(t,e,n){function r(t,e){return !o.get(e,"plugins.jquery.ignoreAjaxErrors")||!o.get(t,"body.message.extra.isAjax")}var o=n(6);t.exports={checkIgnore:r};},function(t,e,n){function r(t,e){var n=t.level,r=c.LEVELS[n]||0,o=e.reportLevel,i=c.LEVELS[o]||0;return !(r<i)}function o(t){return function(e,n){var r=!!e._isUncaught;delete e._isUncaught;var o=e._originalArgs;delete e._originalArgs;try{c.isFunction(n.onSendCallback)&&n.onSendCallback(r,o,e);}catch(e){n.onSendCallback=null,t.error("Error while calling onSendCallback, removing",e);}try{if(c.isFunction(n.checkIgnore)&&n.checkIgnore(r,o,e))return !1}catch(e){n.checkIgnore=null,t.error("Error while calling custom checkIgnore(), removing",e);}return !0}}function i(t){return function(e,n){return !s(e,n,"blacklist",t)}}function a(t){return function(e,n){return s(e,n,"whitelist",t)}}function s(t,e,n,r){var o=!1;"blacklist"===n&&(o=!0);var i,a,s,u,l,p,f,h,d,m;try{if(i=o?e.hostBlackList:e.hostWhiteList,f=i&&i.length,a=c.get(t,"body.trace"),!i||0===f)return !o;if(!a||!a.frames||0===a.frames.length)return !o;for(l=a.frames.length,d=0;d<l;d++){if(s=a.frames[d],u=s.filename,!c.isType(u,"string"))return !o;for(m=0;m<f;m++)if(p=i[m],h=new RegExp(p),h.test(u))return !0}}catch(t){o?e.hostBlackList=null:e.hostWhiteList=null;var g=o?"hostBlackList":"hostWhiteList";return r.error("Error while reading your configuration's "+g+" option. Removing custom "+g+".",t),!o}return !1}function u(t){return function(e,n){var r,o,i,a,s,u,l,p,f;try{if(s=!1,i=n.ignoredMessages,!i||0===i.length)return !0;if(l=e.body,p=c.get(l,"trace.exception.message"),f=c.get(l,"message.body"),r=p||f,!r)return !0;for(a=i.length,o=0;o<a&&(u=new RegExp(i[o],"gi"),!(s=u.test(r)));o++);}catch(e){n.ignoredMessages=null,t.error("Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.");}return !s}}var c=n(6);t.exports={checkLevel:r,userCheckIgnore:o,urlIsNotBlacklisted:i,urlIsWhitelisted:a,messageIsIgnored:u};},function(t,e,n){function r(t,e,n,r,o){var i=t[e];t[e]=n(i),r&&r[o].push([t,e,i]);}function o(t,e){for(var n;t[e].length;)n=t[e].shift(),n[0][n[1]]=n[2];}function i(t,e,n,r,o){var i=t.autoInstrument;t.enabled===!1||i===!1?this.autoInstrument={}:(a.isType(i,"object")||(i=c),this.autoInstrument=a.merge(c,i)),this.scrubTelemetryInputs=!!t.scrubTelemetryInputs,this.telemetryScrubber=t.telemetryScrubber,this.telemeter=e,this.rollbar=n,this._window=r||{},this._document=o||{},this.replacements={network:[],log:[],navigation:[],connectivity:[]},this.eventRemovers={dom:[],connectivity:[]},this._location=this._window.location,this._lastHref=this._location&&this._location.href;}var a=n(6),s=n(18),u=n(27),c={network:!0,networkResponseHeaders:!1,networkResponseBody:!1,networkRequestBody:!1,log:!0,dom:!0,navigation:!0,connectivity:!0};i.prototype.configure=function(t){var e=t.autoInstrument,n=a.merge(this.autoInstrument);t.enabled===!1||e===!1?this.autoInstrument={}:(a.isType(e,"object")||(e=c),this.autoInstrument=a.merge(c,e)),this.instrument(n),void 0!==t.scrubTelemetryInputs&&(this.scrubTelemetryInputs=!!t.scrubTelemetryInputs),void 0!==t.telemetryScrubber&&(this.telemetryScrubber=t.telemetryScrubber);},i.prototype.instrument=function(t){!this.autoInstrument.network||t&&t.network?!this.autoInstrument.network&&t&&t.network&&this.deinstrumentNetwork():this.instrumentNetwork(),!this.autoInstrument.log||t&&t.log?!this.autoInstrument.log&&t&&t.log&&this.deinstrumentConsole():this.instrumentConsole(),!this.autoInstrument.dom||t&&t.dom?!this.autoInstrument.dom&&t&&t.dom&&this.deinstrumentDom():this.instrumentDom(),!this.autoInstrument.navigation||t&&t.navigation?!this.autoInstrument.navigation&&t&&t.navigation&&this.deinstrumentNavigation():this.instrumentNavigation(),!this.autoInstrument.connectivity||t&&t.connectivity?!this.autoInstrument.connectivity&&t&&t.connectivity&&this.deinstrumentConnectivity():this.instrumentConnectivity();},i.prototype.deinstrumentNetwork=function(){o(this.replacements,"network");},i.prototype.instrumentNetwork=function(){function t(t,n){t in n&&a.isFunction(n[t])&&r(n,t,function(t){return e.rollbar.wrap(t)});}var e=this;if("XMLHttpRequest"in this._window){var n=this._window.XMLHttpRequest.prototype;r(n,"open",function(t){return function(e,n){return a.isType(n,"string")&&(this.__rollbar_xhr={method:e,url:n,status_code:null,start_time_ms:a.now(),end_time_ms:null}),t.apply(this,arguments)}},this.replacements,"network"),r(n,"send",function(n){return function(o){function i(){if(s.__rollbar_xhr&&(1===s.readyState||4===s.readyState)){if(null===s.__rollbar_xhr.status_code){s.__rollbar_xhr.status_code=0;var t=null;e.autoInstrument.networkRequestBody&&(t=o),s.__rollbar_event=e.telemeter.captureNetwork(s.__rollbar_xhr,"xhr",void 0,t);}if(1===s.readyState)s.__rollbar_xhr.start_time_ms=a.now();else{s.__rollbar_xhr.end_time_ms=a.now();var n=null;if(e.autoInstrument.networkResponseHeaders){var r=e.autoInstrument.networkResponseHeaders;n={};try{var i,u;if(r===!0){var c=s.getAllResponseHeaders();if(c){var l,p,f=c.trim().split(/[\r\n]+/);for(u=0;u<f.length;u++)l=f[u].split(": "),i=l.shift(),p=l.join(": "),n[i]=p;}}else for(u=0;u<r.length;u++)i=r[u],n[i]=s.getResponseHeader(i);}catch(t){}}var h=null;if(e.autoInstrument.networkResponseBody)try{h=s.responseText;}catch(t){}var d=null;(h||n)&&(d={},h&&(d.body=h),n&&(d.headers=n)),d&&(s.__rollbar_xhr.response=d);}try{var m=s.status;m=1223===m?204:m,s.__rollbar_xhr.status_code=m,s.__rollbar_event.level=e.telemeter.levelFromStatus(m);}catch(t){}}}var s=this;return t("onload",s),t("onerror",s),t("onprogress",s),"onreadystatechange"in s&&a.isFunction(s.onreadystatechange)?r(s,"onreadystatechange",function(t){return e.rollbar.wrap(t,void 0,i)}):s.onreadystatechange=i,n.apply(this,arguments)}},this.replacements,"network");}"fetch"in this._window&&r(this._window,"fetch",function(t){return function(n,r){for(var o=new Array(arguments.length),i=0,s=o.length;i<s;i++)o[i]=arguments[i];var u,c=o[0],l="GET";a.isType(c,"string")?u=c:c&&(u=c.url,c.method&&(l=c.method)),o[1]&&o[1].method&&(l=o[1].method);var p={method:l,url:u,status_code:null,start_time_ms:a.now(),end_time_ms:null},f=null;return e.autoInstrument.networkRequestBody&&(o[1]&&o[1].body?f=o[1].body:o[0]&&!a.isType(o[0],"string")&&o[0].body&&(f=o[0].body)),e.telemeter.captureNetwork(p,"fetch",void 0,f),t.apply(this,o).then(function(t){p.end_time_ms=a.now(),p.status_code=t.status;var n=null;if(e.autoInstrument.networkResponseHeaders){var r=e.autoInstrument.networkResponseHeaders;n={};try{if(r===!0);else for(var o=0;o<r.length;o++){var i=r[o];n[i]=t.headers.get(i);}}catch(t){}}var s=null;return n&&(s={headers:n}),s&&(p.response=s),t})}},this.replacements,"network");},i.prototype.deinstrumentConsole=function(){if("console"in this._window&&this._window.console.log)for(var t;this.replacements.log.length;)t=this.replacements.log.shift(),this._window.console[t[0]]=t[1];},i.prototype.instrumentConsole=function(){function t(t){var r=n[t],o=n,i="warn"===t?"warning":t;n[t]=function(){var t=Array.prototype.slice.call(arguments),n=a.formatArgsAsString(t);e.telemeter.captureLog(n,i),r&&Function.prototype.apply.call(r,o,t);},e.replacements.log.push([t,r]);}if("console"in this._window&&this._window.console.log)for(var e=this,n=this._window.console,r=["debug","info","warn","error","log"],o=0,i=r.length;o<i;o++)t(r[o]);},i.prototype.deinstrumentDom=function(){("addEventListener"in this._window||"attachEvent"in this._window)&&this.removeListeners("dom");},i.prototype.instrumentDom=function(){if("addEventListener"in this._window||"attachEvent"in this._window){var t=this.handleClick.bind(this),e=this.handleBlur.bind(this);this.addListener("dom",this._window,"click","onclick",t,!0),this.addListener("dom",this._window,"blur","onfocusout",e,!0);}},i.prototype.handleClick=function(t){try{var e=u.getElementFromEvent(t,this._document),n=e&&e.tagName,r=u.isDescribedElement(e,"a")||u.isDescribedElement(e,"button");n&&(r||u.isDescribedElement(e,"input",["button","submit"]))?this.captureDomEvent("click",e):u.isDescribedElement(e,"input",["checkbox","radio"])&&this.captureDomEvent("input",e,e.value,e.checked);}catch(t){}},i.prototype.handleBlur=function(t){try{var e=u.getElementFromEvent(t,this._document);e&&e.tagName&&(u.isDescribedElement(e,"textarea")?this.captureDomEvent("input",e,e.value):u.isDescribedElement(e,"select")&&e.options&&e.options.length?this.handleSelectInputChanged(e):u.isDescribedElement(e,"input")&&!u.isDescribedElement(e,"input",["button","submit","hidden","checkbox","radio"])&&this.captureDomEvent("input",e,e.value));}catch(t){}},i.prototype.handleSelectInputChanged=function(t){if(t.multiple)for(var e=0;e<t.options.length;e++)t.options[e].selected&&this.captureDomEvent("input",t,t.options[e].value);else t.selectedIndex>=0&&t.options[t.selectedIndex]&&this.captureDomEvent("input",t,t.options[t.selectedIndex].value);},i.prototype.captureDomEvent=function(t,e,n,r){if(void 0!==n)if(this.scrubTelemetryInputs||"password"===u.getElementType(e))n="[scrubbed]";else if(this.telemetryScrubber){var o=u.describeElement(e);this.telemetryScrubber(o)&&(n="[scrubbed]");}var i=u.elementArrayToString(u.treeToArray(e));this.telemeter.captureDom(t,i,n,r);},i.prototype.deinstrumentNavigation=function(){var t=this._window.chrome,e=t&&t.app&&t.app.runtime,n=!e&&this._window.history&&this._window.history.pushState;n&&o(this.replacements,"navigation");},i.prototype.instrumentNavigation=function(){var t=this._window.chrome,e=t&&t.app&&t.app.runtime,n=!e&&this._window.history&&this._window.history.pushState;if(n){var o=this;r(this._window,"onpopstate",function(t){return function(){var e=o._location.href;o.handleUrlChange(o._lastHref,e),t&&t.apply(this,arguments);}},this.replacements,"navigation"),r(this._window.history,"pushState",function(t){return function(){var e=arguments.length>2?arguments[2]:void 0;return e&&o.handleUrlChange(o._lastHref,e+""),t.apply(this,arguments)}},this.replacements,"navigation");}},i.prototype.handleUrlChange=function(t,e){var n=s.parse(this._location.href),r=s.parse(e),o=s.parse(t);this._lastHref=e,n.protocol===r.protocol&&n.host===r.host&&(e=r.path+(r.hash||"")),n.protocol===o.protocol&&n.host===o.host&&(t=o.path+(o.hash||"")),this.telemeter.captureNavigation(t,e);},i.prototype.deinstrumentConnectivity=function(){("addEventListener"in this._window||"body"in this._document)&&(this._window.addEventListener?this.removeListeners("connectivity"):o(this.replacements,"connectivity"));},i.prototype.instrumentConnectivity=function(){if("addEventListener"in this._window||"body"in this._document)if(this._window.addEventListener)this.addListener("connectivity",this._window,"online",void 0,function(){this.telemeter.captureConnectivityChange("online");}.bind(this),!0),this.addListener("connectivity",this._window,"offline",void 0,function(){this.telemeter.captureConnectivityChange("offline");}.bind(this),!0);else{var t=this;r(this._document.body,"ononline",function(e){return function(){t.telemeter.captureConnectivityChange("online"),e&&e.apply(this,arguments);}},this.replacements,"connectivity"),r(this._document.body,"onoffline",function(e){return function(){t.telemeter.captureConnectivityChange("offline"),e&&e.apply(this,arguments);}},this.replacements,"connectivity");}},i.prototype.addListener=function(t,e,n,r,o,i){e.addEventListener?(e.addEventListener(n,o,i),this.eventRemovers[t].push(function(){e.removeEventListener(n,o,i);})):r&&(e.attachEvent(r,o),this.eventRemovers[t].push(function(){e.detachEvent(r,o);}));},i.prototype.removeListeners=function(t){for(var e;this.eventRemovers[t].length;)(e=this.eventRemovers[t].shift())();},t.exports=i;},function(t,e){function n(t){return (t.getAttribute("type")||"").toLowerCase()}function r(t,e,r){if(t.tagName.toLowerCase()!==e.toLowerCase())return !1;if(!r)return !0;t=n(t);for(var o=0;o<r.length;o++)if(r[o]===t)return !0;return !1}function o(t,e){return t.target?t.target:e&&e.elementFromPoint?e.elementFromPoint(t.clientX,t.clientY):void 0}function i(t){for(var e,n=5,r=[],o=0;t&&o<n&&(e=u(t),"html"!==e.tagName);o++)r.unshift(e),t=t.parentNode;return r}function a(t){for(var e,n,r=80,o=" > ",i=o.length,a=[],u=0,c=t.length-1;c>=0;c--){if(e=s(t[c]),n=u+a.length*i+e.length,c<t.length-1&&n>=r+3){a.unshift("...");break}a.unshift(e),u+=e.length;}return a.join(o)}function s(t){if(!t||!t.tagName)return "";var e=[t.tagName];t.id&&e.push("#"+t.id),t.classes&&e.push("."+t.classes.join("."));for(var n=0;n<t.attributes.length;n++)e.push("["+t.attributes[n].key+'="'+t.attributes[n].value+'"]');return e.join("")}function u(t){if(!t||!t.tagName)return null;var e,n,r,o,i={};i.tagName=t.tagName.toLowerCase(),t.id&&(i.id=t.id),e=t.className,e&&"string"==typeof e&&(i.classes=e.split(/\s+/));var a=["type","name","title","alt"];for(i.attributes=[],o=0;o<a.length;o++)n=a[o],r=t.getAttribute(n),r&&i.attributes.push({key:n,value:r});return i}t.exports={describeElement:u,descriptionToString:s,elementArrayToString:a,treeToArray:i,getElementFromEvent:o,isDescribedElement:r,getElementType:n};}])});
    //# sourceMappingURL=rollbar.umd.min.js.map
    });
    var rollbar_umd_min_1 = rollbar_umd_min.rollbar;

    const rollbarConfig = {
        accessToken: "fe7cf327f2b24bb8991e252239f6200f",
        captureUncaught: true,
        ignoredMessages: [
            "Error:  DOM Exception 18",
            "SecurityError: DOM Exception 18: An attempt was made to break through the security policy of the user agent.",
            "SecurityError:  An attempt was made to break through the security policy of the user agent.",
            "Script error."
        ],
        payload: {
            environment: "development",
            client: {
                javascript: {
                    source_map_enabled: true,
                    code_version: "c093b5858277b556944f4706112fb596b04866ea",
                    // Optionally have Rollbar guess which frames the error was thrown from
                    // when the browser does not provide line and column numbers.
                    guess_uncaught_frames: true
                }
            }
        }
    };

    const rollbar = new rollbar_umd_min(rollbarConfig);

    class ModalControl {
        constructor(id, openBtnId, closeBtnId) {
            this.modal = document.getElementById(id);
            
            this.openBtn = document.getElementById(openBtnId);
            this.openBtn.addEventListener('click', () => {
                this.modal.classList.add('modal-open');
                this.modal.classList.remove('modal-close');
            }, false);
            
            this.closeBtn = document.getElementById(closeBtnId);
            const closeHandler = evt => {
                if (evt.target == this.modal || evt.target == this.closeBtn) {
                    this.modal.classList.add('modal-close');
                    this.modal.classList.remove('modal-open');
                }
            };
            
            this.closeBtn.addEventListener('click', closeHandler, false);
            window.addEventListener('click', closeHandler, false);
        }
    }

    const aboutModal = new ModalControl('about', 'about-open', 'about-close');
    const helpModal = new ModalControl('help', 'help-open', 'help-close');

    const buildDate = "2018-06-29 20:30:39 UTC";
    document.getElementById('buildDate').innerHTML = buildDate;

    const releaseTag = "4.12.1";
    document.getElementById('releaseTag').innerHTML = releaseTag;

    const codeVersion = "c093b5858277b556944f4706112fb596b04866ea";
    document.getElementById('codeVersion').innerHTML = codeVersion;

    class App {
        constructor (map_tile_path, vision_data_image_path, version) {
            const interactiveMap = new InteractiveMap(map_tile_path, version, vision_data_image_path, worlddata);
            
            this.interactiveMap = interactiveMap;
            
            interactiveMap.vs.initialize(vision_data_image_path, this.initialize.bind(this));
        }
        
        changeMode(mode) {
            const interactiveMap = this.interactiveMap;
            switch (mode) {
                case 'observer':
                case 'sentry':
                    document.querySelector('input[name="ward-type"][value="' + mode + '"]').checked = true;
                case 'ward':
                    document.querySelector('input[name="mode"][value="ward"]').checked = true;
                    interactiveMap.MODE = document.querySelector('input[name="ward-type"]:checked').value;
                    document.getElementById('btn-ward').setAttribute('ward-type', interactiveMap.MODE);
                    document.getElementById('btn-ward').classList.add('active');
                    document.getElementById('btn-tree').classList.remove('active');
                    document.getElementById('btn-measure').classList.remove('active');
                    setQueryString('mode', interactiveMap.MODE);
                    interactiveMap.controls.measure.deactivate();
                    interactiveMap.controls.ward.activate();
                    interactiveMap.controls.info.deactivate();
                break;
                case 'line':
                case 'circle':
                    document.querySelector('input[name="measure-type"][value="' + mode + '"]').checked = true;
                case 'measure':
                    document.querySelector('input[name="mode"][value="measure"]').checked = true;
                    interactiveMap.MODE = document.querySelector('input[name="measure-type"]:checked').value;
                    document.getElementById('btn-ward').classList.remove('active');
                    document.getElementById('btn-tree').classList.remove('active');
                    document.getElementById('btn-measure').classList.add('active');
                    document.getElementById('btn-measure').setAttribute('measure-type', interactiveMap.MODE);
                    setQueryString('mode', interactiveMap.MODE);
                    interactiveMap.controls.measure.change(interactiveMap.MODE);
                    interactiveMap.controls.ward.deactivate();
                    interactiveMap.controls.info.deactivate();
                    
                break;
                default:
                    document.querySelector('input[name="mode"][value="navigate"]').checked = true;
                    interactiveMap.MODE = mode || "navigate";
                    document.getElementById('btn-ward').classList.remove('active');
                    document.getElementById('btn-tree').classList.add('active');
                    document.getElementById('btn-measure').classList.remove('active');
                    setQueryString('mode', interactiveMap.MODE == 'navigate' ? null : interactiveMap.MODE);
                    interactiveMap.controls.measure.deactivate();
                    interactiveMap.controls.ward.deactivate();
                    interactiveMap.controls.info.activate();
                break;
            }
            interactiveMap.controls.notification.show(modeNotificationText[interactiveMap.MODE]);
        }

        // updates element visibility based on map layer index
        // updates layer visibility based on element state
        updateOverlayMenu() {
            forEach(document.querySelectorAll('.data-layer > input'), element => {
                const label = element.nextSibling;
                const layerId = element.getAttribute('data-layer-id');
                const layer = this.interactiveMap.getMapLayer(layerId);
                if (!layer) {
                    label.style.display = "none";
                }
                else {
                    label.style.display = "block";
                    layer.setVisible(element.checked);
                }
            }, this);
        }

        setDefaults() {
            const x = getParameterByName('x');
            const y = getParameterByName('y');
            const zoom = getParameterByName('zoom');
            if (zoom) {
                this.interactiveMap.view.setZoom(zoom);
            }
            if (x && y) {
                const coordinate$$1 = proj.transform([x, y], dotaProj, pixelProj);
                if (extent.containsXY([-100, -100, mapConstants.map_w+100, mapConstants.map_h+100], coordinate$$1[0], coordinate$$1[1])) {
                    this.interactiveMap.panTo(coordinate$$1);
                }
            }
            
            document.getElementById('btn-ward').setAttribute('ward-type', 'observer');
            const mode = getParameterByName('mode');
            this.changeMode(mode);

            const baseLayerName = getParameterByName('BaseLayer');
            let element;
            if (baseLayerName) {
                element = document.querySelector('input[name="base-layer"][value="' + baseLayerName + '"]');
                if (element) {
                    element.checked = true;
                    this.interactiveMap.baseLayers.filter(layer => layer.get("layerId") == baseLayerName)[0].setVisible(true);
                }
            }
            if (!element) {
                setQueryString('BaseLayer', null);
                this.interactiveMap.baseLayers[0].setVisible(true);
                document.querySelector('input[name="base-layer"][value="' + this.interactiveMap.baseLayers[0].get("layerId") + '"]').checked = true;
            }
            
            this.interactiveMap.layerDefs.forEach(layerDef => {
                const param = layerDef.name.replace(/ /g, '');
                const value = getParameterByName(param);
                if (value && value !== "false") {
                    layerDef.visible = true;
                    document.querySelector('input[data-layer-id="' + layerDef.id + '"]').checked = true;
                    setQueryString(param, true);
                }
                else {
                    setQueryString(param, null);
                }
                if (layerDef.id == 'ent_dota_tree') {
                    document.getElementById('btn-tree').setAttribute('trees-enabled', layerDef.visible ? "yes" : "no");
                }
            });
        }

        initialize(err) {
            this.interactiveMap.controls.info.activate();
            
            this.setDefaults();

            this.interactiveMap.setMapLayers(this.interactiveMap.version, err => {
                if (!err) {
                    this.updateOverlayMenu();
                    this.interactiveMap.controls.tree.parseQueryString();
                    this.interactiveMap.controls.ward.parseQueryString();
                }
                else {
                    rollbar.log("Vision simulation load error.", err);
                }
            });
            
            this.interactiveMap.map.on('moveend', evt => {
                const map = evt.map;
                const ext = map.getView().calculateExtent(map.getSize());
                const center = extent.getCenter(ext);
                const worldXY = proj.transform(center, pixelProj, dotaProj);
                const coordinate$$1 = [Math.round(worldXY[0]), Math.round(worldXY[1])];
                setQueryString('x', coordinate$$1[0]);
                setQueryString('y', coordinate$$1[1]);
                setQueryString('zoom', Math.round(this.interactiveMap.view.getZoom()));
            });
            
            forEach(document.querySelectorAll('input[name="mode"], input[name="ward-type"], input[name="measure-type"]'), element => {
                element.addEventListener("change", e => {
                    this.changeMode(e.currentTarget.value);
                }, false);
            }, this);
            
            document.getElementById('nightControl').addEventListener('change', e => {
                const el = e.currentTarget;
                this.interactiveMap.isNight = el.checked;
                if (el.checked) {
                    this.interactiveMap.controls.notification.show(modeNotificationText.nightOn);
                }
                else {
                    this.interactiveMap.controls.notification.show(modeNotificationText.nightOff);
                }
            });

            document.getElementById('darknessControl').addEventListener('change', e => {
                const el = e.currentTarget;
                this.interactiveMap.isDarkness = el.checked;
                if (el.checked) {
                    this.interactiveMap.controls.notification.show(modeNotificationText.darknessOn);
                }
                else {
                    this.interactiveMap.controls.notification.show(modeNotificationText.darknessOff);
                }
            });

            document.getElementById('creepControl').addEventListener('change', e => {
                this.interactiveMap.controls.menu.toggleLayerMenuOption('npc_dota_spawner', e.currentTarget.checked);
                this.interactiveMap.controls.menu.toggleLayerMenuOption('path_corner', e.currentTarget.checked);
                if (e.currentTarget.checked) {
                    this.interactiveMap.controls.creep.activate();
                }
                else {
                    this.interactiveMap.controls.creep.deactivate();
                }
            });

            document.getElementById('vision-radius').addEventListener('change', e => this.interactiveMap.visionRadius = e.currentTarget.value);

            document.getElementById('movementSpeed').addEventListener('change', e => this.interactiveMap.movementSpeed = e.currentTarget.value);
                
            document.getElementById('option-dayVision').addEventListener('change', e => this.interactiveMap.rangeLayers.dayVision.setVisible(e.currentTarget.checked));
                
            document.getElementById('option-nightVision').addEventListener('change', e => this.interactiveMap.rangeLayers.nightVision.setVisible(e.currentTarget.checked));
                
            document.getElementById('option-trueSight').addEventListener('change', e => this.interactiveMap.rangeLayers.trueSight.setVisible(e.currentTarget.checked));
                
            document.getElementById('option-attackRange').addEventListener('change', e => this.interactiveMap.rangeLayers.attackRange.setVisible(e.currentTarget.checked));
                
            document.getElementById('version-select').addEventListener('change', e => {
                const el = e.currentTarget;
                this.interactiveMap.setMapLayers(el.value, err => {
                    if (!err) {
                        this.interactiveMap.controls.creep.deactivate();
                        this.interactiveMap.version = el.value;
                        document.getElementById('creepControl').disabled = !this.interactiveMap.getMapLayer('npc_dota_spawner');
                        document.getElementById('creepControl').checked = false;
                    }
                    else {
                        el.value = this.interactiveMap.version;
                        alert('Version change failed.');
                    }
                });
            });
                
            document.getElementById('btn-zoom-in').addEventListener('click', () => this.interactiveMap.view.animate({zoom: this.interactiveMap.view.getZoom() + 1}));
                
            document.getElementById('btn-zoom-out').addEventListener('click', () => this.interactiveMap.view.animate({zoom: this.interactiveMap.view.getZoom() - 1}));

            document.getElementById('reset').addEventListener('click', () => {
                if (history && history.replaceState) history.replaceState(null, "", window.location.href.split("?")[0]);
                this.setDefaults();
                this.updateOverlayMenu();
                this.interactiveMap.controls.tree.toggleAllTrees(false, true);
                this.interactiveMap.controls.tree.parseQueryString();
                this.interactiveMap.controls.ward.clearWards();
                this.interactiveMap.controls.ward.parseQueryString();
            });

            document.getElementById('btn-tree').addEventListener('click', e => {
                const el = e.currentTarget;
                if (el.classList.contains('active')) {
                    el.setAttribute('trees-enabled', el.getAttribute('trees-enabled') == "yes" ? "no" : "yes");
                }
                el.classList.add('active');
                document.getElementById('btn-ward').classList.remove('active');
                document.getElementById('btn-measure').classList.remove('active');
                this.interactiveMap.controls.menu.toggleLayerMenuOption("ent_dota_tree", el.getAttribute('trees-enabled') == "yes");
                this.changeMode('navigate');
                this.interactiveMap.controls.notification.show(el.getAttribute('trees-enabled') == "yes" ? modeNotificationText.treeEnable : modeNotificationText.treeDisable);
            });

            document.getElementById('btn-ward').addEventListener('click', e => {
                const el = e.currentTarget;
                if (el.classList.contains('active')) {
                    el.setAttribute('ward-type', el.getAttribute('ward-type') == 'observer' ? 'sentry' : 'observer');
                }
                if (el.getAttribute('ward-type') == 'sentry') {
                    document.querySelector('input[name="mode"][value="ward"]').checked = true;
                    document.querySelector('input[name="ward-type"][value="sentry"]').checked = true;
                }
                else {
                    document.querySelector('input[name="mode"][value="ward"]').checked = true;
                    document.querySelector('input[name="ward-type"][value="observer"]').checked = true;
                }
                el.classList.add('active');
                document.getElementById('btn-tree').classList.remove('active');
                document.getElementById('btn-measure').classList.remove('active');
                this.changeMode('ward');
            });

            document.getElementById('btn-measure').addEventListener('click', e => {
                const el = e.currentTarget;
                if (el.classList.contains('active')) {
                    el.setAttribute('measure-type', el.getAttribute('measure-type') == 'line' ? 'circle' : 'line');
                }
                if (el.getAttribute('measure-type') == 'circle') {
                    document.querySelector('input[name="mode"][value="measure"]').checked = true;
                    document.querySelector('input[name="measure-type"][value="circle"]').checked = true;
                }
                else {
                    document.querySelector('input[name="mode"][value="measure"]').checked = true;
                    document.querySelector('input[name="measure-type"][value="line"]').checked = true;
                }
                el.classList.add('active');
                document.getElementById('btn-tree').classList.remove('active');
                document.getElementById('btn-ward').classList.remove('active');
                this.changeMode('measure');
            });
        }
    }

    return App;

})));
//# sourceMappingURL=bundle.js.map
