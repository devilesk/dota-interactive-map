(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/proj'), require('ol/proj/Projection'), require('ol/extent'), require('ol/geom/Point'), require('ol/style/Style'), require('ol/style/Fill'), require('ol/style/Stroke'), require('ol/style/RegularShape'), require('ol/style/Icon'), require('ol/style/Circle'), require('ol/source/Vector'), require('ol/layer/Vector'), require('ol/format/GeoJSON'), require('ol/geom/Polygon'), require('ol/Feature'), require('ol/layer/Group'), require('ol/Collection'), require('ol/Observable'), require('ol/geom/LinearRing'), require('ol/geom/LineString'), require('ol/geom/Circle'), require('ol/interaction/Draw'), require('ol/Overlay'), require('ol/geom/MultiPolygon'), require('ol/control/MousePosition'), require('ol/coordinate'), require('ol/interaction/Pointer'), require('ol/geom/GeometryCollection'), require('ol/style/Text'), require('ol/events/condition'), require('ol/interaction'), require('ol/color'), require('ol/format'), require('ol/View'), require('ol/Map'), require('ol/source/TileImage'), require('ol/layer/Tile'), require('ol/tilegrid/TileGrid'), require('ol/control')) :
  typeof define === 'function' && define.amd ? define(['ol/proj', 'ol/proj/Projection', 'ol/extent', 'ol/geom/Point', 'ol/style/Style', 'ol/style/Fill', 'ol/style/Stroke', 'ol/style/RegularShape', 'ol/style/Icon', 'ol/style/Circle', 'ol/source/Vector', 'ol/layer/Vector', 'ol/format/GeoJSON', 'ol/geom/Polygon', 'ol/Feature', 'ol/layer/Group', 'ol/Collection', 'ol/Observable', 'ol/geom/LinearRing', 'ol/geom/LineString', 'ol/geom/Circle', 'ol/interaction/Draw', 'ol/Overlay', 'ol/geom/MultiPolygon', 'ol/control/MousePosition', 'ol/coordinate', 'ol/interaction/Pointer', 'ol/geom/GeometryCollection', 'ol/style/Text', 'ol/events/condition', 'ol/interaction', 'ol/color', 'ol/format', 'ol/View', 'ol/Map', 'ol/source/TileImage', 'ol/layer/Tile', 'ol/tilegrid/TileGrid', 'ol/control'], factory) :
  (global.InteractiveMap = factory(global.ol.proj,global.ol.proj.Projection,global.ol.extent,global.ol.geom.Point,global.ol.style.Style,global.ol.style.Fill,global.ol.style.Stroke,global.ol.style.RegularShape,global.ol.style.Icon,global.ol.style.Circle,global.ol.source.Vector,global.ol.layer.Vector,global.ol.format.GeoJSON,global.ol.geom.Polygon,global.ol.Feature,global.ol.layer.Group,global.ol.Collection,global.ol.Observable,global.ol.geom.LinearRing,global.ol.geom.LineString,global.ol.geom.Circle,global.ol.interaction.Draw,global.ol.Overlay,global.ol.geom.MultiPolygon,global.ol.control.MousePosition,global.ol.coordinate,global.ol.interaction.Pointer,global.ol.geom.GeometryCollection,global.ol.style.Text,global.ol.events.condition,global.ol.interaction,global.ol.color,global.ol.format,global.ol.View,global.ol.Map,global.ol.source.TileImage,global.ol.layer.Tile,global.ol.tilegrid.TileGrid,global.ol.control));
}(this, (function (proj,Projection,extent,Point,Style,Fill,Stroke,RegularShape,Icon,Circle,SourceVector,LayerVector,GeoJSON,Polygon,Feature,LayerGroup,Collection,Observable,LinearRing,LineString,Circle$1,Draw,Overlay,MultiPolygon,MousePosition,coordinate,PointerInteraction,GeometryCollection,Text,condition,interaction,color,format,View,Map,TileImage,LayerTile,TileGrid,control) {
  Projection = Projection && Projection.hasOwnProperty('default') ? Projection['default'] : Projection;
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
  LinearRing = LinearRing && LinearRing.hasOwnProperty('default') ? LinearRing['default'] : LinearRing;
  LineString = LineString && LineString.hasOwnProperty('default') ? LineString['default'] : LineString;
  Circle$1 = Circle$1 && Circle$1.hasOwnProperty('default') ? Circle$1['default'] : Circle$1;
  var Draw__default = 'default' in Draw ? Draw['default'] : Draw;
  Overlay = Overlay && Overlay.hasOwnProperty('default') ? Overlay['default'] : Overlay;
  MultiPolygon = MultiPolygon && MultiPolygon.hasOwnProperty('default') ? MultiPolygon['default'] : MultiPolygon;
  MousePosition = MousePosition && MousePosition.hasOwnProperty('default') ? MousePosition['default'] : MousePosition;
  PointerInteraction = PointerInteraction && PointerInteraction.hasOwnProperty('default') ? PointerInteraction['default'] : PointerInteraction;
  GeometryCollection = GeometryCollection && GeometryCollection.hasOwnProperty('default') ? GeometryCollection['default'] : GeometryCollection;
  Text = Text && Text.hasOwnProperty('default') ? Text['default'] : Text;
  View = View && View.hasOwnProperty('default') ? View['default'] : View;
  Map = Map && Map.hasOwnProperty('default') ? Map['default'] : Map;
  TileImage = TileImage && TileImage.hasOwnProperty('default') ? TileImage['default'] : TileImage;
  LayerTile = LayerTile && LayerTile.hasOwnProperty('default') ? LayerTile['default'] : LayerTile;
  TileGrid = TileGrid && TileGrid.hasOwnProperty('default') ? TileGrid['default'] : TileGrid;

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
          sentry: 1000,
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

  const baseLayerDefinitions = [
      {
          id: '720',
          name: '7.20',
          tilesets: [
              {
                  id: 'default',
                  name: 'Default'
              }
          ]
      },
      {
          id: '719',
          name: '7.19',
          tilesets: [
              {
                  id: 'default',
                  name: 'Default'
              }
          ]
      },
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
      }
  ];

  const modeNotificationText = {
      observer: "Ward Mode: Observer",
      sentry: "Ward Mode: Sentry",
      navigate: "Navigation Mode",
      brush: "Draw Mode: Brush",
      icon: "Draw Mode: Icon",
      point: "Draw Mode: Point",
      linestring: "Draw Mode: Line",
      polygon: "Draw Mode: Polygon",
      shape: "Draw Mode: Shape",
      modify: "Draw Mode: Modify",
      rotate: "Draw Mode: Rotate",
      scale: "Draw Mode: Scale",
      skew: "Draw Mode: Skew",
      drag: "Draw Mode: Drag",
      delete: "Draw Mode: Delete",
      line: "Measure Mode: Line",
      circle: "Measure Mode: Circle",
      treeEnable: "<span>Navigation Mode</span><span>Trees: On</span>",
      treeDisable: "<span>Navigation Mode</span><span>Trees: Off</span>",
      nightOn: "Nighttime Vision",
      nightOff: "Daytime Vision",
      darknessOn: "Darkness: On",
      darknessOff: "Darkness: Off",
      saveSuccess: "Map saved.",
      saveFailed: "Map save failed.",
      share: "Map url copied to clipboard."
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

  const forEach = (array, callback, scope) => {
      for (let i = 0; i < array.length; i++) {
          callback.call(scope, array[i], i); // passes back stuff we need
      }
  };

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
          
          document.getElementById('option-draw-layer').addEventListener("change", layerToggleHandler, false);
          document.getElementById('option-ward-layer').addEventListener("change", layerToggleHandler, false);
          
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
          let layer = this.InteractiveMap.getMapLayer(layerId);
          if (layerId === 'ward-layer') {
              layer = this.InteractiveMap.controls.ward.layer;
              this.InteractiveMap.controls.vision.layer.setVisible(element.checked);
              this.InteractiveMap.wardRangeLayer.setVisible(element.checked);
              layer.setVisible(element.checked);
          }
          else if (layerId === 'draw-layer') {
              layer = this.InteractiveMap.controls.draw.layer;
              layer.setVisible(element.checked);
          }
          else if (layer) {
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

      // updates element visibility based on map layer index
      // updates layer visibility based on element state
      updateOverlayMenu() {
          forEach(document.querySelectorAll('.data-layer > input'), element => {
              const label = element.nextSibling;
              const layerId = element.getAttribute('data-layer-id');
              const layer = this.InteractiveMap.getMapLayer(layerId);
              if (!layer) {
                  label.style.display = "none";
              }
              else {
                  label.style.display = "block";
                  layer.setVisible(element.checked);
              }
          }, this);
      }
      
      changeMode(mode) {
          const interactiveMap = this.InteractiveMap;
          switch (mode) {
              case 'observer':
              case 'sentry':
                  document.querySelector('input[name="ward-type"][value="' + mode + '"]').checked = true;
              case 'ward':
                  document.querySelector('input[name="mode"][value="ward"]').checked = true;
                  interactiveMap.mode = document.querySelector('input[name="ward-type"]:checked').value;
                  document.getElementById('btn-ward').setAttribute('ward-type', interactiveMap.mode);
                  document.getElementById('btn-ward').classList.add('active');
                  document.getElementById('btn-tree').classList.remove('active');
                  document.getElementById('btn-measure').classList.remove('active');
                  document.getElementById('menu-left').classList.remove('draw');
                  setQueryString('mode', interactiveMap.mode);
                  interactiveMap.controls.measure.deactivate();
                  interactiveMap.controls.draw.deactivate();
                  interactiveMap.controls.ward.activate();
                  interactiveMap.controls.info.deactivate();
              break;
              case 'line':
              case 'circle':
                  document.querySelector('input[name="measure-type"][value="' + mode + '"]').checked = true;
              case 'measure':
                  document.querySelector('input[name="mode"][value="measure"]').checked = true;
                  interactiveMap.mode = document.querySelector('input[name="measure-type"]:checked').value;
                  document.getElementById('btn-ward').classList.remove('active');
                  document.getElementById('btn-tree').classList.remove('active');
                  document.getElementById('btn-measure').classList.add('active');
                  document.getElementById('btn-measure').setAttribute('measure-type', interactiveMap.mode);
                  document.getElementById('menu-left').classList.remove('draw');
                  setQueryString('mode', interactiveMap.mode);
                  interactiveMap.controls.measure.change(interactiveMap.mode);
                  interactiveMap.controls.draw.deactivate();
                  interactiveMap.controls.ward.deactivate();
                  interactiveMap.controls.info.deactivate();
              break;
              case 'brush':
              case 'marker':
              case 'point':
              case 'linestring':
              case 'polygon':
              case 'shape':
              case 'modify':
              case 'rotate':
              case 'scale':
              case 'skew':
              case 'translate':
              case 'delete':
              case 'draw':
                  document.querySelector('input[name="mode"][value="draw"]').checked = true;
                  interactiveMap.mode = document.querySelector('input[name="draw-type"]:checked').value;
                  document.getElementById('btn-ward').classList.remove('active');
                  document.getElementById('btn-tree').classList.remove('active');
                  document.getElementById('btn-measure').classList.remove('active');
                  document.getElementById('menu-left').classList.add('draw');
                  setQueryString('mode', interactiveMap.mode);
                  interactiveMap.controls.draw.change(interactiveMap.mode);
                  interactiveMap.controls.measure.deactivate();
                  interactiveMap.controls.ward.deactivate();
                  interactiveMap.controls.info.deactivate();
                  document.getElementById('draw-options').classList.remove('brush');
                  document.getElementById('draw-options').classList.remove('marker');
                  document.getElementById('draw-options').classList.remove('point');
                  document.getElementById('draw-options').classList.remove('linestring');
                  document.getElementById('draw-options').classList.remove('polygon');
                  document.getElementById('draw-options').classList.remove('shape');
                  document.getElementById('draw-options').classList.add(interactiveMap.mode);
              break;
              default:
                  document.querySelector('input[name="mode"][value="navigate"]').checked = true;
                  interactiveMap.mode = mode || "navigate";
                  document.getElementById('btn-ward').classList.remove('active');
                  document.getElementById('btn-tree').classList.add('active');
                  document.getElementById('btn-measure').classList.remove('active');
                  document.getElementById('menu-left').classList.remove('draw');
                  setQueryString('mode', interactiveMap.mode == 'navigate' ? null : interactiveMap.mode);
                  interactiveMap.controls.measure.deactivate();
                  interactiveMap.controls.draw.deactivate();
                  interactiveMap.controls.ward.deactivate();
                  interactiveMap.controls.info.activate();
              break;
          }        interactiveMap.controls.notification.show(modeNotificationText[interactiveMap.mode]);
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
                          this.InteractiveMap.controls.ward.showVisibilityInfo(feature);
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
                              this.InteractiveMap.controls.ward.showVisibilityInfo(feature, true);
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
          this.InteractiveMap.unhighlight();
      }

      highlight(feature) {
          this.unhighlight();
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
          this.draw = new Draw__default({
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
      },
      719: {
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
              title: 'Ward',
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

      showVisibilityInfo(feature, bClicked) {
          const visionFeature = feature ? feature.get('visionFeature') : null;
          const info = this.InteractiveMap.controls.info;
          const vs = this.InteractiveMap.vs;
          let lightArea = vs.lightArea;
          let area = vs.area;
          if (feature) {
              const visionData = visionFeature ? visionFeature.get('visionData') : null;
              if (visionData) {
                  lightArea = visionData.lightArea;
                  area = visionData.area;
                  info.setContent(lightArea ? "Visibility: " + (lightArea / area * 100).toFixed() + '% ' + lightArea + "/" + area : '');
                  info.open(bClicked);
              }
              else {
                  this.clearInfo();
              }
          }
          else {
              info.setContent(lightArea ? "Visibility: " + (lightArea / area * 100).toFixed() + '% ' + lightArea + "/" + area : '');
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
                          this.addWard(evt.coordinate, this.InteractiveMap.mode);
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
          this.createStringXY = coordinate.createStringXY();
          this.mousePosition = new MousePosition({
              undefinedHTML: '<span></span>',
              coordinateFormat: (coordinate$$1) => {
                  return '<div class="coordinate">' + this.createStringXY(coordinate$$1) + '</div>';
              },
              projection: dotaProj,
              target: document.getElementById(elementId)
          });
          this.InteractiveMap.map.addControl(this.mousePosition);
      }
  }

  /*!
  Rotate vector features interaction for OpenLayers

  @package ol-rotate-feature
  @author Vladimir Vershinin <ghettovoice@gmail.com>
  @version 2.1.1
  @licence MIT
  @copyright (c) 2016-2019, Vladimir Vershinin <ghettovoice@gmail.com>
  */

  /**
   * This file is part of ol-rotate-feature package.
   * @module ol-rotate-feature
   * @license MIT
   * @author Vladimir Vershinin
   */

  /**
   * @param {boolean} condition
   * @param {string} message
   * @throws Error
   */
  function assert(condition$$1) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    message = ['Assertion failed', message].join(': ');

    if (!condition$$1) {
      throw new Error(message);
    }
  }

  /**
   * @param {*} arg
   * @returns {*}
   */
  function identity(arg) {
    return arg;
  }

  function includes(arr, value) {
    return arr.indexOf(value) !== -1;
  }

  function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  /**
   * This file is part of ol-rotate-feature package.
   * @module ol-rotate-feature
   * @license MIT
   * @author Vladimir Vershinin
   */
  /**
   * @enum {string}
   */
  var RotateFeatureEventType = {
    /**
     * Triggered upon feature rotate start.
     * @event RotateFeatureEvent#rotatestart
     */
    START: 'rotatestart',
    /**
     * Triggered upon feature rotation.
     * @event RotateFeatureEvent#rotating
     */
    ROTATING: 'rotating',
    /**
     * Triggered upon feature rotation end.
     * @event RotateFeatureEvent#rotateend
     */
    END: 'rotateend'

    /**
     * Events emitted by RotateFeatureInteraction instances are instances of this type.
     *
     * @class
     * @author Vladimir Vershinin
     */
  };
  var RotateFeatureEvent = function () {
    /**
     * @param {string} type Type.
     * @param {ol.Collection<ol.Feature>} features Rotated features.
     * @param {number} angle Angle in radians.
     * @param {ol.Coordinate} anchor Anchor position.
     */
    function RotateFeatureEvent(type, features, angle, anchor) {
      classCallCheck(this, RotateFeatureEvent);

      /**
       * @type {boolean}
       * @private
       */
      this.propagationStopped_ = false;

      /**
       * The event type.
       * @type {string}
       * @private
       */
      this.type_ = type;

      /**
       * The features being rotated.
       * @type {ol.Collection<ol.Feature>}
       * @private
       */
      this.features_ = features;
      /**
       * Current angle in radians.
       * @type {number}
       * @private
       */
      this.angle_ = angle;
      /**
       * Current rotation anchor.
       * @type {ol.Coordinate}
       * @private
       */
      this.anchor_ = anchor;
    }

    /**
     * @type {boolean}
     */


    createClass(RotateFeatureEvent, [{
      key: 'preventDefault',


      /**
       * Prevent event propagation.
       */
      value: function preventDefault() {
        this.propagationStopped_ = true;
      }

      /**
       * Stop event propagation.
       */

    }, {
      key: 'stopPropagation',
      value: function stopPropagation() {
        this.propagationStopped_ = true;
      }
    }, {
      key: 'propagationStopped',
      get: function get$$1() {
        return this.propagationStopped_;
      }

      /**
       * @type {RotateFeatureEventType}
       */

    }, {
      key: 'type',
      get: function get$$1() {
        return this.type_;
      }

      /**
       * @type {ol.Collection<ol.Feature>}
       */

    }, {
      key: 'features',
      get: function get$$1() {
        return this.features_;
      }

      /**
       * @type {number}
       */

    }, {
      key: 'angle',
      get: function get$$1() {
        return this.angle_;
      }

      /**
       * @type {ol.Coordinate}
       */

    }, {
      key: 'anchor',
      get: function get$$1() {
        return this.anchor_;
      }
    }]);
    return RotateFeatureEvent;
  }();

  var ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';

  var MAC = ua.indexOf('macintosh') !== -1;

  var WEBKIT = ua.indexOf('webkit') !== -1 && ua.indexOf('edge') == -1;

  var mouseActionButton = function mouseActionButton(mapBrowserEvent) {
    var originalEvent = /** @type {MouseEvent} */mapBrowserEvent.originalEvent;
    return originalEvent.button == 0 && !(WEBKIT && MAC && originalEvent.ctrlKey);
  };

  /**
   * This file is part of ol-rotate-feature package.
   * @module ol-rotate-feature
   * @license MIT
   * @author Vladimir Vershinin
   */

  var ANCHOR_KEY = 'rotate-anchor';
  var ARROW_KEY = 'rotate-arrow';

  var ANGLE_PROP = 'angle';
  var ANCHOR_PROP = 'anchor';

  /**
   * @todo todo добавить опцию condition - для возможности переопределения клавиш
   */

  var RotateFeatureInteraction = function (_PointerInteraction) {
    inherits(RotateFeatureInteraction, _PointerInteraction);

    /**
     * @param {InteractionOptions} options
     */
    function RotateFeatureInteraction() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, RotateFeatureInteraction);

      /**
       * @type {string}
       * @private
       */
      var _this = possibleConstructorReturn(this, (RotateFeatureInteraction.__proto__ || Object.getPrototypeOf(RotateFeatureInteraction)).call(this, {
        // handleEvent: handleEvent,
        handleDownEvent: handleDownEvent,
        handleUpEvent: handleUpEvent,
        handleDragEvent: handleDragEvent,
        handleMoveEvent: handleMoveEvent
      }));

      _this.previousCursor_ = undefined;
      /**
       * @type {Feature}
       * @private
       */
      _this.anchorFeature_ = undefined;
      /**
       * @type {Feature}
       * @private
       */
      _this.arrowFeature_ = undefined;
      /**
       * @type {Coordinate}
       * @private
       */
      _this.lastCoordinate_ = undefined;
      /**
       * @type {boolean}
       * @private
       */
      _this.anchorMoving_ = false;
      /**
       * @type {Vector}
       * @private
       */
      _this.overlay_ = new LayerVector({
        style: options.style || getDefaultStyle(),
        source: new SourceVector({
          features: new Collection()
        })
      });
      /**
       * @private
       * @type {module:ol/events/condition~Condition}
       */
      _this.condition_ = options.condition ? options.condition : condition.always;
      /**
       * @type {Collection<Feature>}
       * @private
       */
      _this.features_ = undefined;
      if (options.features) {
        if (isArray(options.features)) {
          _this.features_ = new Collection(options.features);
        } else if (options.features instanceof Collection) {
          _this.features_ = options.features;
        } else {
          throw new Error('Features option should be an array or collection of features, ' + 'got ' + _typeof(options.features));
        }
      } else {
        _this.features_ = new Collection();
      }

      _this.setAnchor(options.anchor || getFeaturesCentroid(_this.features_));
      _this.setAngle(options.angle || 0);

      _this.features_.on('add', _this.onFeatureAdd_.bind(_this));
      _this.features_.on('remove', _this.onFeatureRemove_.bind(_this));
      _this.on('change:' + ANGLE_PROP, _this.onAngleChange_.bind(_this));
      _this.on('change:' + ANCHOR_PROP, _this.onAnchorChange_.bind(_this));

      _this.createOrUpdateAnchorFeature_();
      _this.createOrUpdateArrowFeature_();
      return _this;
    }

    /**
     * @type {Collection<Feature>}
     */


    createClass(RotateFeatureInteraction, [{
      key: 'setMap',


      /**
       * @param {ol.Map} map
       */
      value: function setMap(map) {
        this.overlay_.setMap(map);
        get(RotateFeatureInteraction.prototype.__proto__ || Object.getPrototypeOf(RotateFeatureInteraction.prototype), 'setMap', this).call(this, map);
      }

      /**
       * @param {boolean} active
       */

    }, {
      key: 'setActive',
      value: function setActive(active) {
        if (this.overlay_) {
          this.overlay_.setMap(active ? this.map : undefined);
        }

        get(RotateFeatureInteraction.prototype.__proto__ || Object.getPrototypeOf(RotateFeatureInteraction.prototype), 'setActive', this).call(this, active);
      }

      /**
       * Set current angle of interaction features.
       *
       * @param {number} angle
       */

    }, {
      key: 'setAngle',
      value: function setAngle(angle) {
        assert(!isNaN(parseFloat(angle)), 'Numeric value passed');

        this.set(ANGLE_PROP, parseFloat(angle));
      }

      /**
       * Returns current angle of interaction features.
       *
       * @return {number}
       */

    }, {
      key: 'getAngle',
      value: function getAngle() {
        return this.get(ANGLE_PROP);
      }

      /**
       * Set current anchor position.
       *
       * @param {Coordinate | undefined} anchor
       */

    }, {
      key: 'setAnchor',
      value: function setAnchor(anchor) {
        assert(anchor == null || isArray(anchor) && anchor.length === 2, 'Array of two elements passed');

        this.set(ANCHOR_PROP, anchor != null ? anchor.map(parseFloat) : getFeaturesCentroid(this.features_));
      }

      /**
       * Returns current anchor position.
       *
       * @return {Coordinate | undefined}
       */

    }, {
      key: 'getAnchor',
      value: function getAnchor() {
        return this.get(ANCHOR_PROP);
      }

      /**
       * @private
       */

    }, {
      key: 'createOrUpdateAnchorFeature_',
      value: function createOrUpdateAnchorFeature_() {
        var angle = this.getAngle();
        var anchor = this.getAnchor();

        if (!anchor) return;

        if (this.anchorFeature_) {
          this.anchorFeature_.getGeometry().setCoordinates(anchor);
          this.anchorFeature_.set(ANGLE_PROP, angle);
        } else {
          var _ref;

          this.anchorFeature_ = new Feature((_ref = {
            geometry: new Point(anchor)
          }, defineProperty(_ref, ANGLE_PROP, angle), defineProperty(_ref, ANCHOR_KEY, true), _ref));
          this.overlay_.getSource().addFeature(this.anchorFeature_);
        }
      }

      /**
       * @private
       */

    }, {
      key: 'createOrUpdateArrowFeature_',
      value: function createOrUpdateArrowFeature_() {
        var angle = this.getAngle();
        var anchor = this.getAnchor();

        if (!anchor) return;

        if (this.arrowFeature_) {
          this.arrowFeature_.getGeometry().setCoordinates(anchor);
          this.arrowFeature_.set(ANGLE_PROP, angle);
        } else {
          var _ref2;

          this.arrowFeature_ = new Feature((_ref2 = {
            geometry: new Point(anchor)
          }, defineProperty(_ref2, ANGLE_PROP, angle), defineProperty(_ref2, ARROW_KEY, true), _ref2));
          this.overlay_.getSource().addFeature(this.arrowFeature_);
        }
      }

      /**
       * @private
       */

    }, {
      key: 'resetAngleAndAnchor_',
      value: function resetAngleAndAnchor_() {
        this.resetAngle_();
        this.resetAnchor_();
      }

      /**
       * @private
       */

    }, {
      key: 'resetAngle_',
      value: function resetAngle_() {
        this.set(ANGLE_PROP, 0, true);
        this.arrowFeature_ && this.arrowFeature_.set(ANGLE_PROP, this.getAngle());
        this.anchorFeature_ && this.anchorFeature_.set(ANGLE_PROP, this.getAngle());
      }

      /**
       * @private
       */

    }, {
      key: 'resetAnchor_',
      value: function resetAnchor_() {
        this.set(ANCHOR_PROP, getFeaturesCentroid(this.features_), true);

        if (this.getAnchor()) {
          this.arrowFeature_ && this.arrowFeature_.getGeometry().setCoordinates(this.getAnchor());
          this.anchorFeature_ && this.anchorFeature_.getGeometry().setCoordinates(this.getAnchor());
        }
      }

      /**
       * @private
       */

    }, {
      key: 'onFeatureAdd_',
      value: function onFeatureAdd_() {
        this.resetAngleAndAnchor_();
        this.createOrUpdateAnchorFeature_();
        this.createOrUpdateArrowFeature_();
      }

      /**
       * @private
       */

    }, {
      key: 'onFeatureRemove_',
      value: function onFeatureRemove_() {
        this.resetAngleAndAnchor_();

        if (this.features_.getLength()) {
          this.createOrUpdateAnchorFeature_();
          this.createOrUpdateArrowFeature_();
        } else {
          this.overlay_.getSource().clear();
          this.anchorFeature_ = this.arrowFeature_ = undefined;
        }
      }

      /**
       * @private
       */

    }, {
      key: 'onAngleChange_',
      value: function onAngleChange_(_ref3) {
        var _this2 = this;

        var oldValue = _ref3.oldValue;

        this.features_.forEach(function (feature) {
          return feature.getGeometry().rotate(_this2.getAngle() - oldValue, _this2.getAnchor());
        });
        this.arrowFeature_ && this.arrowFeature_.set(ANGLE_PROP, this.getAngle());
        this.anchorFeature_ && this.anchorFeature_.set(ANGLE_PROP, this.getAngle());
      }

      /**
       * @private
       */

    }, {
      key: 'onAnchorChange_',
      value: function onAnchorChange_() {
        var anchor = this.getAnchor();

        if (anchor) {
          this.anchorFeature_ && this.anchorFeature_.getGeometry().setCoordinates(anchor);
          this.arrowFeature_ && this.arrowFeature_.getGeometry().setCoordinates(anchor);
        }
      }

      /**
       * @param {Collection<Feature>} features
       * @private
       */

    }, {
      key: 'dispatchRotateStartEvent_',
      value: function dispatchRotateStartEvent_(features) {
        this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.START, features, this.getAngle(), this.getAnchor()));
      }

      /**
       * @param {Collection<Feature>} features
       * @private
       */

    }, {
      key: 'dispatchRotatingEvent_',
      value: function dispatchRotatingEvent_(features) {
        this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.ROTATING, features, this.getAngle(), this.getAnchor()));
      }

      /**
       * @param {Collection<Feature>} features
       * @private
       */

    }, {
      key: 'dispatchRotateEndEvent_',
      value: function dispatchRotateEndEvent_(features) {
        this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.END, features, this.getAngle(), this.getAnchor()));
      }
    }, {
      key: 'features',
      get: function get$$1() {
        return this.features_;
      }

      /**
       * @type {number}
       */

    }, {
      key: 'angle',
      get: function get$$1() {
        return this.getAngle();
      }

      /**
       * @param {number} angle
       */
      ,
      set: function set$$1(angle) {
        this.setAngle(angle);
      }

      /**
       * @type {Coordinate|number[]|undefined}
       */

    }, {
      key: 'anchor',
      get: function get$$1() {
        return this.getAnchor();
      }

      /**
       * @param {Coordinate|undefined} anchor
       */
      ,
      set: function set$$1(anchor) {
        this.setAnchor(anchor);
      }

      /**
       * @param {PluggableMap} map
       */

    }, {
      key: 'map',
      set: function set$$1(map) {
        this.setMap(map);
      }

      /**
       * @type {PluggableMap}
       */
      ,
      get: function get$$1() {
        return this.getMap();
      }

      /**
       * @param {boolean} active
       */

    }, {
      key: 'active',
      set: function set$$1(active) {
        this.setActive(active);
      }

      /**
       * @type {boolean}
       */
      ,
      get: function get$$1() {
        return this.getActive();
      }
    }]);
    return RotateFeatureInteraction;
  }(PointerInteraction);
  function handleDownEvent(evt) {
    if (!condition.mouseOnly(evt)) {
      return false;
    }

    if (mouseActionButton(evt) && this.condition_(evt)) {
      // disable selection of inner features
      var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, identity);
      if (includes(['click', 'singleclick', 'dblclick'], evt.type) && includes([this.anchorFeature_, this.arrowFeature_], foundFeature)) {
        return false;
      }
      // handle click & drag on features for rotation
      if (foundFeature && !this.lastCoordinate_ && (includes(this.features_.getArray(), foundFeature) || foundFeature === this.arrowFeature_)) {
        this.lastCoordinate_ = evt.coordinate;

        handleMoveEvent.call(this, evt);
        this.dispatchRotateStartEvent_(this.features_);

        return true;
      }
      // handle click & drag on rotation anchor feature
      else if (foundFeature && foundFeature === this.anchorFeature_) {
          this.anchorMoving_ = true;
          handleMoveEvent.call(this, evt);

          return true;
        }
    }
    return false;
  }

  /**
   * @param {MapBrowserEvent} evt Event.
   * @return {boolean}
   * @this {RotateFeatureInteraction}
   * @private
   */
  function handleUpEvent(evt) {
    // stop drag sequence of features
    if (this.lastCoordinate_) {
      this.lastCoordinate_ = undefined;

      handleMoveEvent.call(this, evt);
      this.dispatchRotateEndEvent_(this.features_);

      return true;
    }
    // stop drag sequence of the anchors
    else if (this.anchorMoving_) {
        this.anchorMoving_ = false;
        handleMoveEvent.call(this, evt);

        return true;
      }

    return false;
  }

  /**
   * @param {MapBrowserEvent} evt Event.
   * @return {boolean}
   * @this {RotateFeatureInteraction}
   * @private
   */
  function handleDragEvent(_ref4) {
    var coordinate$$1 = _ref4.coordinate;

    var anchorCoordinate = this.anchorFeature_.getGeometry().getCoordinates();

    // handle drag of features by angle
    if (this.lastCoordinate_) {
      // calculate vectors of last and current pointer positions
      var lastVector = [this.lastCoordinate_[0] - anchorCoordinate[0], this.lastCoordinate_[1] - anchorCoordinate[1]];
      var newVector = [coordinate$$1[0] - anchorCoordinate[0], coordinate$$1[1] - anchorCoordinate[1]];

      // calculate angle between last and current vectors (positive angle counter-clockwise)
      var angle = Math.atan2(lastVector[0] * newVector[1] - newVector[0] * lastVector[1], lastVector[0] * newVector[0] + lastVector[1] * newVector[1]);

      this.setAngle(this.getAngle() + angle);
      this.dispatchRotatingEvent_(this.features_);

      this.lastCoordinate_ = coordinate$$1;
    }
    // handle drag of the anchor
    else if (this.anchorMoving_) {
        this.setAnchor(coordinate$$1);
      }
  }

  /**
   * @param {MapBrowserEvent} evt Event.
   * @return {boolean}
   * @this {RotateFeatureInteraction}
   * @private
   */
  function handleMoveEvent(_ref5) {
    var map = _ref5.map,
        pixel = _ref5.pixel;

    var elem = map.getTargetElement();
    var foundFeature = map.forEachFeatureAtPixel(pixel, identity);

    var setCursor = function setCursor(cursor) {
      var vendor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (vendor) {
        elem.style.cursor = '-webkit-' + cursor;
        elem.style.cursor = '-moz-' + cursor;
      }

      elem.style.cursor = cursor;
    };

    if (this.lastCoordinate_) {
      this.previousCursor_ = elem.style.cursor;
      setCursor('grabbing', true);
    } else if (foundFeature && (includes(this.features_.getArray(), foundFeature) || foundFeature === this.arrowFeature_)) {
      this.previousCursor_ = elem.style.cursor;
      setCursor('grab', true);
    } else if (foundFeature && foundFeature === this.anchorFeature_ || this.anchorMoving_) {
      this.previousCursor_ = elem.style.cursor;
      setCursor('crosshair');
    } else {
      setCursor(this.previousCursor_ || '');
      this.previousCursor_ = undefined;
    }
  }

  /**
   * @returns {StyleFunction}
   * @private
   */
  function getDefaultStyle() {
    var _styles;

    var white = [255, 255, 255, 0.8];
    var blue = [0, 153, 255, 0.8];
    var transparent = [255, 255, 255, 0.01];
    var width = 2;

    var styles = (_styles = {}, defineProperty(_styles, ANCHOR_KEY, [new Style({
      image: new RegularShape({
        fill: new Fill({
          color: [0, 153, 255, 0.8]
        }),
        stroke: new Stroke({
          color: blue,
          width: 1
        }),
        radius: 4,
        points: 6
      }),
      zIndex: Infinity
    })]), defineProperty(_styles, ARROW_KEY, [new Style({
      fill: new Fill({
        color: transparent
      }),
      stroke: new Stroke({
        color: white,
        width: width + 2
      }),
      text: new Text({
        font: '12px sans-serif',
        offsetX: 20,
        offsetY: -20,
        fill: new Fill({
          color: 'blue'
        }),
        stroke: new Stroke({
          color: white,
          width: width + 1
        })
      }),
      zIndex: Infinity
    }), new Style({
      fill: new Fill({
        color: transparent
      }),
      stroke: new Stroke({
        color: blue,
        width: width
      }),
      zIndex: Infinity
    })]), _styles);

    return function (feature, resolution) {
      var style = void 0;
      var angle = feature.get(ANGLE_PROP) || 0;

      switch (true) {
        case feature.get(ANCHOR_KEY):
          style = styles[ANCHOR_KEY];
          style[0].getImage().setRotation(-angle);

          return style;
        case feature.get(ARROW_KEY):
          style = styles[ARROW_KEY];

          var coordinates = feature.getGeometry().getCoordinates();
          // generate arrow polygon
          var geom = new Polygon([[[coordinates[0], coordinates[1] - 6 * resolution], [coordinates[0] + 8 * resolution, coordinates[1] - 12 * resolution], [coordinates[0], coordinates[1] + 30 * resolution], [coordinates[0] - 8 * resolution, coordinates[1] - 12 * resolution], [coordinates[0], coordinates[1] - 6 * resolution]]]);

          // and rotate it according to current angle
          geom.rotate(angle, coordinates);
          style[0].setGeometry(geom);
          style[1].setGeometry(geom);
          style[0].getText().setText(Math.round(-angle * 180 / Math.PI) + '°');

          return style;
      }
    };
  }

  /**
   * @param {Collection<Feature>|Array<Feature>} features
   * @returns {Extent | number[] | undefined}
   * @private
   */
  function getFeaturesExtent(features) {
    features = features instanceof Collection ? features.getArray() : features;
    if (!features.length) return;

    return new GeometryCollection(features.map(function (feature) {
      return feature.getGeometry();
    })).getExtent();
  }

  /**
   * @param {Collection<ol.Feature> | Array<Feature>} features
   * @return {Coordinate | number[] | undefined}
   */
  function getFeaturesCentroid(features) {
    features = features instanceof Collection ? features.getArray() : features;
    if (!features.length) return;

    return extent.getCenter(getFeaturesExtent(features));
  }

  /**
   * This file is part of ol-rotate-feature package.
   * @module ol-rotate-feature
   * @license MIT
   * @author Vladimir Vershinin
   */

  // for backward compatibility
  if (typeof window !== 'undefined' && window.ol) {
    window.ol.interaction.RotateFeature = RotateFeatureInteraction;
  }

  var antimage = {
  	name: "Anti-Mage",
  	x: 64,
  	y: 0
  };
  var axe = {
  	name: "Axe",
  	x: 32,
  	y: 64
  };
  var bane = {
  	name: "Bane",
  	x: 64,
  	y: 64
  };
  var bloodseeker = {
  	name: "Bloodseeker",
  	x: 96,
  	y: 64
  };
  var crystal_maiden = {
  	name: "Crystal Maiden",
  	x: 96,
  	y: 128
  };
  var drow_ranger = {
  	name: "Drow Ranger",
  	x: 128,
  	y: 160
  };
  var earthshaker = {
  	name: "Earthshaker",
  	x: 160,
  	y: 160
  };
  var juggernaut = {
  	name: "Juggernaut",
  	x: 192,
  	y: 192
  };
  var mirana = {
  	name: "Mirana",
  	x: 256,
  	y: 96
  };
  var morphling = {
  	name: "Morphling",
  	x: 256,
  	y: 192
  };
  var nevermore = {
  	name: "Shadow Fiend",
  	x: 32,
  	y: 256
  };
  var phantom_lancer = {
  	name: "Phantom Lancer",
  	x: 288,
  	y: 96
  };
  var puck = {
  	name: "Puck",
  	x: 288,
  	y: 160
  };
  var pudge = {
  	name: "Pudge",
  	x: 288,
  	y: 192
  };
  var razor = {
  	name: "Razor",
  	x: 32,
  	y: 288
  };
  var sand_king = {
  	name: "Sand King",
  	x: 224,
  	y: 288
  };
  var storm_spirit = {
  	name: "Storm Spirit",
  	x: 0,
  	y: 320
  };
  var sven = {
  	name: "Sven",
  	x: 32,
  	y: 320
  };
  var tiny = {
  	name: "Tiny",
  	x: 288,
  	y: 320
  };
  var vengefulspirit = {
  	name: "Vengeful Spirit",
  	x: 352,
  	y: 128
  };
  var windrunner = {
  	name: "Windranger",
  	x: 32,
  	y: 352
  };
  var zuus = {
  	name: "Zeus",
  	x: 160,
  	y: 352
  };
  var kunkka = {
  	name: "Kunkka",
  	x: 224,
  	y: 64
  };
  var lina = {
  	name: "Lina",
  	x: 64,
  	y: 224
  };
  var lion = {
  	name: "Lion",
  	x: 128,
  	y: 224
  };
  var shadow_shaman = {
  	name: "Shadow Shaman",
  	x: 288,
  	y: 288
  };
  var slardar = {
  	name: "Slardar",
  	x: 320,
  	y: 128
  };
  var tidehunter = {
  	name: "Tidehunter",
  	x: 224,
  	y: 320
  };
  var witch_doctor = {
  	name: "Witch Doctor",
  	x: 128,
  	y: 352
  };
  var lich = {
  	name: "Lich",
  	x: 0,
  	y: 224
  };
  var riki = {
  	name: "Riki",
  	x: 64,
  	y: 288
  };
  var enigma = {
  	name: "Enigma",
  	x: 192,
  	y: 128
  };
  var tinker = {
  	name: "Tinker",
  	x: 256,
  	y: 320
  };
  var sniper = {
  	name: "Sniper",
  	x: 320,
  	y: 192
  };
  var necrolyte = {
  	name: "Necrophos",
  	x: 0,
  	y: 256
  };
  var warlock = {
  	name: "Warlock",
  	x: 352,
  	y: 320
  };
  var beastmaster = {
  	name: "Beastmaster",
  	x: 96,
  	y: 32
  };
  var queenofpain = {
  	name: "Queen of Pain",
  	x: 288,
  	y: 256
  };
  var venomancer = {
  	name: "Venomancer",
  	x: 352,
  	y: 160
  };
  var faceless_void = {
  	name: "Faceless Void",
  	x: 192,
  	y: 160
  };
  var skeleton_king = {
  	name: "Wraith King",
  	x: 320,
  	y: 64
  };
  var death_prophet = {
  	name: "Death Prophet",
  	x: 160,
  	y: 96
  };
  var phantom_assassin = {
  	name: "Phantom Assassin",
  	x: 288,
  	y: 32
  };
  var pugna = {
  	name: "Pugna",
  	x: 288,
  	y: 224
  };
  var templar_assassin = {
  	name: "Templar Assassin",
  	x: 128,
  	y: 320
  };
  var viper = {
  	name: "Viper",
  	x: 352,
  	y: 192
  };
  var luna = {
  	name: "Luna",
  	x: 192,
  	y: 224
  };
  var dragon_knight = {
  	name: "Dragon Knight",
  	x: 64,
  	y: 160
  };
  var dazzle = {
  	name: "Dazzle",
  	x: 160,
  	y: 64
  };
  var rattletrap = {
  	name: "Clockwerk",
  	x: 0,
  	y: 288
  };
  var leshrac = {
  	name: "Leshrac",
  	x: 224,
  	y: 192
  };
  var furion = {
  	name: "Nature's Prophet",
  	x: 0,
  	y: 192
  };
  var life_stealer = {
  	name: "Lifestealer",
  	x: 32,
  	y: 224
  };
  var dark_seer = {
  	name: "Dark Seer",
  	x: 160,
  	y: 0
  };
  var clinkz = {
  	name: "Clinkz",
  	x: 64,
  	y: 128
  };
  var omniknight = {
  	name: "Omniknight",
  	x: 224,
  	y: 256
  };
  var enchantress = {
  	name: "Enchantress",
  	x: 192,
  	y: 96
  };
  var huskar = {
  	name: "Huskar",
  	x: 96,
  	y: 192
  };
  var night_stalker = {
  	name: "Night Stalker",
  	x: 96,
  	y: 256
  };
  var broodmother = {
  	name: "Broodmother",
  	x: 128,
  	y: 64
  };
  var bounty_hunter = {
  	name: "Bounty Hunter",
  	x: 96,
  	y: 96
  };
  var weaver = {
  	name: "Weaver",
  	x: 0,
  	y: 352
  };
  var jakiro = {
  	name: "Jakiro",
  	x: 160,
  	y: 192
  };
  var batrider = {
  	name: "Batrider",
  	x: 96,
  	y: 0
  };
  var chen = {
  	name: "Chen",
  	x: 32,
  	y: 128
  };
  var spectre = {
  	name: "Spectre",
  	x: 320,
  	y: 224
  };
  var ancient_apparition = {
  	name: "Ancient Apparition",
  	x: 32,
  	y: 32
  };
  var doom_bringer = {
  	name: "Doom",
  	x: 32,
  	y: 160
  };
  var ursa = {
  	name: "Ursa",
  	x: 352,
  	y: 96
  };
  var spirit_breaker = {
  	name: "Spirit Breaker",
  	x: 320,
  	y: 288
  };
  var gyrocopter = {
  	name: "Gyrocopter",
  	x: 64,
  	y: 192
  };
  var alchemist = {
  	name: "Alchemist",
  	x: 0,
  	y: 32
  };
  var invoker = {
  	name: "Invoker",
  	x: 128,
  	y: 192
  };
  var silencer = {
  	name: "Silencer",
  	x: 320,
  	y: 32
  };
  var obsidian_destroyer = {
  	name: "Outworld Devourer",
  	x: 160,
  	y: 256
  };
  var lycan = {
  	name: "Lycan",
  	x: 224,
  	y: 224
  };
  var brewmaster = {
  	name: "Brewmaster",
  	x: 128,
  	y: 0
  };
  var shadow_demon = {
  	name: "Shadow Demon",
  	x: 256,
  	y: 288
  };
  var lone_druid = {
  	name: "Lone Druid",
  	x: 160,
  	y: 224
  };
  var chaos_knight = {
  	name: "Chaos Knight",
  	x: 0,
  	y: 128
  };
  var meepo = {
  	name: "Meepo",
  	x: 256,
  	y: 64
  };
  var treant = {
  	name: "Treant Protector",
  	x: 320,
  	y: 320
  };
  var ogre_magi = {
  	name: "Ogre Magi",
  	x: 192,
  	y: 256
  };
  var undying = {
  	name: "Undying",
  	x: 352,
  	y: 64
  };
  var rubick = {
  	name: "Rubick",
  	x: 160,
  	y: 288
  };
  var disruptor = {
  	name: "Disruptor",
  	x: 160,
  	y: 128
  };
  var nyx_assassin = {
  	name: "Nyx Assassin",
  	x: 128,
  	y: 256
  };
  var naga_siren = {
  	name: "Naga Siren",
  	x: 256,
  	y: 224
  };
  var keeper_of_the_light = {
  	name: "Keeper of the Light",
  	x: 224,
  	y: 32
  };
  var wisp = {
  	name: "Io",
  	x: 96,
  	y: 352
  };
  var visage = {
  	name: "Visage",
  	x: 352,
  	y: 224
  };
  var slark = {
  	name: "Slark",
  	x: 320,
  	y: 160
  };
  var medusa = {
  	name: "Medusa",
  	x: 256,
  	y: 32
  };
  var troll_warlord = {
  	name: "Troll Warlord",
  	x: 352,
  	y: 0
  };
  var centaur = {
  	name: "Centaur Warrunner",
  	x: 128,
  	y: 96
  };
  var magnataur = {
  	name: "Magnus",
  	x: 256,
  	y: 0
  };
  var shredder = {
  	name: "Timbersaw",
  	x: 320,
  	y: 0
  };
  var bristleback = {
  	name: "Bristleback",
  	x: 128,
  	y: 32
  };
  var tusk = {
  	name: "Tusk",
  	x: 352,
  	y: 32
  };
  var skywrath_mage = {
  	name: "Skywrath Mage",
  	x: 320,
  	y: 96
  };
  var abaddon = {
  	name: "Abaddon",
  	x: 32,
  	y: 0
  };
  var elder_titan = {
  	name: "Elder Titan",
  	x: 192,
  	y: 32
  };
  var legion_commander = {
  	name: "Legion Commander",
  	x: 224,
  	y: 128
  };
  var techies = {
  	name: "Techies",
  	x: 64,
  	y: 320
  };
  var ember_spirit = {
  	name: "Ember Spirit",
  	x: 192,
  	y: 64
  };
  var earth_spirit = {
  	name: "Earth Spirit",
  	x: 192,
  	y: 0
  };
  var abyssal_underlord = {
  	name: "Underlord",
  	x: 256,
  	y: 160
  };
  var terrorblade = {
  	name: "Terrorblade",
  	x: 160,
  	y: 320
  };
  var phoenix = {
  	name: "Phoenix",
  	x: 288,
  	y: 128
  };
  var oracle = {
  	name: "Oracle",
  	x: 256,
  	y: 256
  };
  var winter_wyvern = {
  	name: "Winter Wyvern",
  	x: 64,
  	y: 352
  };
  var arc_warden = {
  	name: "Arc Warden",
  	x: 0,
  	y: 64
  };
  var monkey_king = {
  	name: "Monkey King",
  	x: 256,
  	y: 128
  };
  var dark_willow = {
  	name: "Dark Willow",
  	x: 160,
  	y: 32
  };
  var pangolier = {
  	name: "Pangolier",
  	x: 288,
  	y: 0
  };
  var grimstroke = {
  	name: "Grimstroke",
  	x: 32,
  	y: 192
  };
  var heroIcons = {
  	antimage: antimage,
  	axe: axe,
  	bane: bane,
  	bloodseeker: bloodseeker,
  	crystal_maiden: crystal_maiden,
  	drow_ranger: drow_ranger,
  	earthshaker: earthshaker,
  	juggernaut: juggernaut,
  	mirana: mirana,
  	morphling: morphling,
  	nevermore: nevermore,
  	phantom_lancer: phantom_lancer,
  	puck: puck,
  	pudge: pudge,
  	razor: razor,
  	sand_king: sand_king,
  	storm_spirit: storm_spirit,
  	sven: sven,
  	tiny: tiny,
  	vengefulspirit: vengefulspirit,
  	windrunner: windrunner,
  	zuus: zuus,
  	kunkka: kunkka,
  	lina: lina,
  	lion: lion,
  	shadow_shaman: shadow_shaman,
  	slardar: slardar,
  	tidehunter: tidehunter,
  	witch_doctor: witch_doctor,
  	lich: lich,
  	riki: riki,
  	enigma: enigma,
  	tinker: tinker,
  	sniper: sniper,
  	necrolyte: necrolyte,
  	warlock: warlock,
  	beastmaster: beastmaster,
  	queenofpain: queenofpain,
  	venomancer: venomancer,
  	faceless_void: faceless_void,
  	skeleton_king: skeleton_king,
  	death_prophet: death_prophet,
  	phantom_assassin: phantom_assassin,
  	pugna: pugna,
  	templar_assassin: templar_assassin,
  	viper: viper,
  	luna: luna,
  	dragon_knight: dragon_knight,
  	dazzle: dazzle,
  	rattletrap: rattletrap,
  	leshrac: leshrac,
  	furion: furion,
  	life_stealer: life_stealer,
  	dark_seer: dark_seer,
  	clinkz: clinkz,
  	omniknight: omniknight,
  	enchantress: enchantress,
  	huskar: huskar,
  	night_stalker: night_stalker,
  	broodmother: broodmother,
  	bounty_hunter: bounty_hunter,
  	weaver: weaver,
  	jakiro: jakiro,
  	batrider: batrider,
  	chen: chen,
  	spectre: spectre,
  	ancient_apparition: ancient_apparition,
  	doom_bringer: doom_bringer,
  	ursa: ursa,
  	spirit_breaker: spirit_breaker,
  	gyrocopter: gyrocopter,
  	alchemist: alchemist,
  	invoker: invoker,
  	silencer: silencer,
  	obsidian_destroyer: obsidian_destroyer,
  	lycan: lycan,
  	brewmaster: brewmaster,
  	shadow_demon: shadow_demon,
  	lone_druid: lone_druid,
  	chaos_knight: chaos_knight,
  	meepo: meepo,
  	treant: treant,
  	ogre_magi: ogre_magi,
  	undying: undying,
  	rubick: rubick,
  	disruptor: disruptor,
  	nyx_assassin: nyx_assassin,
  	naga_siren: naga_siren,
  	keeper_of_the_light: keeper_of_the_light,
  	wisp: wisp,
  	visage: visage,
  	slark: slark,
  	medusa: medusa,
  	troll_warlord: troll_warlord,
  	centaur: centaur,
  	magnataur: magnataur,
  	shredder: shredder,
  	bristleback: bristleback,
  	tusk: tusk,
  	skywrath_mage: skywrath_mage,
  	abaddon: abaddon,
  	elder_titan: elder_titan,
  	legion_commander: legion_commander,
  	techies: techies,
  	ember_spirit: ember_spirit,
  	earth_spirit: earth_spirit,
  	abyssal_underlord: abyssal_underlord,
  	terrorblade: terrorblade,
  	phoenix: phoenix,
  	oracle: oracle,
  	winter_wyvern: winter_wyvern,
  	arc_warden: arc_warden,
  	monkey_king: monkey_king,
  	dark_willow: dark_willow,
  	pangolier: pangolier,
  	grimstroke: grimstroke
  };

  class DrawControl {
      constructor(InteractiveMap) {
          this.InteractiveMap = InteractiveMap;
          this.map = InteractiveMap.map;
          this.source = new SourceVector({
              url: (source, extent$$1, number, proj$$1) => {
                  if (this.dataId) {
                      return 'save/' + this.dataId + '.kml';
                  }
              },
              format: new format.KML()
          });
          
          this.layer =  new LayerVector({
              title: 'Draw',
              source: this.source
          });
          
          this.dataId = null;

          this.type = 'brush';
          
          this.draw = null; // global so we can remove it later
          
          this.rotate = null;
          
          this.modify = null;
          
          this.select = null;

          this.pendingModification = null;
        
          this.active = false;
          
          this.markerType = 'abaddon';
          
          this.freehandType = 'LineString';
          this.sides = 3;
          
          this.undoHistory = [];
          this.redoHistory = [];
      }
      
      getId() {
          return '_' + Math.random().toString(36).substr(2, 9);
      }
      
      setDataId(id) {
          this.dataId = id;
      }
      
      onFeatureModified(event, sourceFeature) {
          const feature = sourceFeature.clone();
          feature.setId(sourceFeature.getId());
          this.pendingModification = {
              type: 'modify',
              id: feature.getId(),
              feature: feature
          };
      }
      
      onModifyStart(event) {
          for (const feature of event.features.getArray()) {
              const geometry = feature.getGeometry();
              feature.modifiedListener = geometry.on('change', (event) => this.onFeatureModified(event, feature));
          }
      }
      
      onModifyEnd(event) {
          for (const feature of event.features.getArray()) {
              Observable.unByKey(feature.modifiedListener);
          }
          this.undoHistory.push(this.pendingModification);
          this.redoHistory.length = 0;
      }
      
      addInteraction() {
          const options = {
              source: this.source
          };
          switch (this.type) {
              case 'translate':
              case 'modify':
                  if (this.type === 'translate') {
                      this.modify = new interaction.Translate({source: this.source});
                  }
                  else {
                      this.modify = new interaction.Modify({source: this.source});
                  }
                  this.modify.on(this.type + 'start', (event) => this.onModifyStart(event));
                  this.modify.on(this.type + 'end', (event) => this.onModifyEnd(event));
                  this.map.addInteraction(this.modify);
                  return;
              break;
              case 'rotate':
                  this.select = new interaction.Select();
                  this.select.on('select', (event) => {
                      this.map.removeInteraction(this.rotate);
                      const features = event.target.getFeatures();
                      if (features.getLength()) {
                          this.rotate = new RotateFeatureInteraction({
                              features: features,
                              angle: -90 * Math.PI / 180
                          });
                          this.rotate.on('rotatestart', (event) => this.onModifyStart(event));
                          this.rotate.on('rotateend', (event) => this.onModifyEnd(event));
                          this.map.addInteraction(this.rotate);
                      }
                  });
                  this.map.addInteraction(this.select);
                  return;
              break;
              case 'delete':
                  this.select = new interaction.Select();
                  this.select.on('select', (event) => {
                      const features = event.target.getFeatures();
                      if (features.getLength()) {
                          for (const feature of features.getArray()) {
                              this.source.removeFeature(feature);
                              const clone = feature.clone();
                              clone.setId(feature.getId());
                              this.undoHistory.push({
                                  type: 'remove',
                                  id: clone.getId(),
                                  feature: clone
                              });
                              this.redoHistory.length = 0;
                          }
                          features.clear();
                      }
                  });
                  this.map.addInteraction(this.select);
                  return;
              break;
              case 'brush':
                  options.type = this.freehandType;
                  if (this.freehandType === 'Box') {
                      options.type = 'Circle';
                      options.geometryFunction = Draw.createBox();
                  }
                  else if (this.freehandType === 'Star') {
                      options.type = 'Circle';
                      options.geometryFunction = (coordinates, geometry) => {
                          const center = coordinates[0];
                          const last = coordinates[1];
                          const dx = center[0] - last[0];
                          const dy = center[1] - last[1];
                          const radius = Math.sqrt(dx * dx + dy * dy);
                          const rotation = Math.atan2(dy, dx);
                          const newCoordinates = [];
                          const numPoints = 12;
                          for (let i = 0; i < numPoints; ++i) {
                              const angle = rotation + i * 2 * Math.PI / numPoints;
                              const fraction = i % 2 === 0 ? 1 : 0.5;
                              const offsetX = radius * fraction * Math.cos(angle);
                              const offsetY = radius * fraction * Math.sin(angle);
                              newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
                          }
                          newCoordinates.push(newCoordinates[0].slice());
                          if (!geometry) {
                              geometry = new Polygon([newCoordinates]);
                          }
                          else {
                              geometry.setCoordinates([newCoordinates]);
                          }
                          return geometry;
                      };
                  }
                  else {
                      options.freehand = true;
                  }
              break;
              case 'marker':
              case 'point':
                  options.type = 'Point';
              break;
              case 'linestring':
                  options.type = 'LineString';
              break;
              case 'polygon':
                  options.type = 'Polygon';
              break;
              case 'shape':
                  options.type = 'Circle';
                  options.geometryFunction = Draw.createRegularPolygon(this.sides);
              break;
          }        this.draw = new Draw__default(options);
          this.draw.on('drawend', (event) => {
              let style = new Style({
                  fill: new Fill({
                      color: this.fillColor()
                  }),
                  stroke: new Stroke({
                      color: this.strokeColor(),
                      width: parseInt(document.getElementById('strokesize-option').value)
                  })
              });
              if (this.type === 'point') {
                  style = new Style({
                      image: new Circle({
                          radius: parseInt(document.getElementById('strokesize-option').value),
                          fill: new Fill({
                              color: this.strokeColor()
                          })
                      })
                  });
              }
              else if (this.type === 'marker') {
                  const heroIcon = heroIcons[this.markerType];
                  style = new Style({
                      image: new Icon({
                          offset: [heroIcon.x, heroIcon.y],
                          opacity: 1,
                          rotateWithView: false,
                          rotation: 0.0,
                          scale: 1.0,
                          size: [32, 32],
                          src: "img/miniheroes_sprite.png"
                      })
                  });
              }
              event.feature.setStyle(style);
              event.feature.setId(this.getId());
              const feature = event.feature.clone();
              feature.setId(event.feature.getId());
              this.undoHistory.push({
                  type: 'add',
                  id: feature.getId(),
                  feature: feature
              });
              this.redoHistory.length = 0;
          });
          this.map.addInteraction(this.draw);
      }
      
      strokeColor() {
          const color$$1 = color.asArray(document.getElementById('strokecolor-option').value).slice();        color$$1[3] = parseInt(document.getElementById('strokeopacity-option').value) / 100;
          return color$$1;
      }
      
      fillColor() {
          const color$$1 = color.asArray(document.getElementById('fillcolor-option').value).slice();        color$$1[3] = parseInt(document.getElementById('fillopacity-option').value) / 100;
          return color$$1;
      }
      
      undo() {
          if (this.select) {
              this.select.getFeatures().clear();
          }
          const action = this.undoHistory.pop();
          if (action) {
              if (action.type === 'add') {
                  this.source.removeFeature(this.source.getFeatureById(action.id));
              }
              else if (action.type === 'remove') {
                  const clone = action.feature.clone();
                  clone.setId(action.feature.getId());
                  this.source.addFeature(clone);
              }
              else if (action.type === 'modify') {
                  for (let i = this.undoHistory.length - 1; i >= 0; i--) {
                      const previousAction = this.undoHistory[i];
                      if (previousAction.id === action.id) {
                          this.source.removeFeature(this.source.getFeatureById(action.id));
                          const clone = previousAction.feature.clone();
                          clone.setId(previousAction.feature.getId());
                          this.source.addFeature(clone);
                          break;
                      }
                  }
              }
              const clone = action.feature.clone();
              clone.setId(action.feature.getId());
              action.feature = clone;
              this.redoHistory.push(action);
          }
      }
      
      redo() {
          if (this.select) {
              this.select.getFeatures().clear();
          }
          const action = this.redoHistory.pop();
          if (action) {
              if (action.type === 'add') {
                  const clone = action.feature.clone();
                  clone.setId(action.feature.getId());
                  this.source.addFeature(clone);
              }
              else if (action.type === 'remove') {
                  this.source.removeFeature(this.source.getFeatureById(action.id));
              }
              else if (action.type === 'modify') {
                  this.source.removeFeature(this.source.getFeatureById(action.id));
                  const clone = action.feature.clone();
                  clone.setId(action.feature.getId());
                  this.source.addFeature(clone);
              }
              const clone = action.feature.clone();
              clone.setId(action.feature.getId());
              action.feature = clone;
              this.undoHistory.push(action);
          }
      }
      
      change(type) {
          this.type = type;
          this.map.removeInteraction(this.draw);
          this.map.removeInteraction(this.modify);
          this.map.removeInteraction(this.select);
          this.map.removeInteraction(this.rotate);
          this.addInteraction();
          this.active = true;
      }
      
      changeFreehandType(type) {
          this.freehandType = type;
          this.change(this.type);
      }
      
      changeMarkerType(type) {
          this.markerType = type;
          this.change(this.type);
      }
      
      changeSides(value) {
          this.sides = value;
          this.change(this.type);
      }
      
      clear() {
          this.source.clear();
          this.undoHistory.length = 0;
          this.redoHistory.length = 0;
          this.pendingModification = null;
          this.dataId = null;
      }
      
      activate() {
          if (!this.active) ;
          this.active = true;
      }
      
      deactivate() {
          this.map.removeInteraction(this.draw);
          this.map.removeInteraction(this.modify);
          this.map.removeInteraction(this.select);
          this.map.removeInteraction(this.rotate);
          this.active = false;
      }
  }

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

  /*!
   * ==========================================================
   *  COLOR PICKER PLUGIN 1.3.10
   * ==========================================================
   * Author: Taufik Nurrohman <https://github.com/tovic>
   * License: MIT
   * ----------------------------------------------------------
   */

  var colorPicker = (function(win, doc, NS) {

      var instance = '__instance__',
          first = 'firstChild',
          delay = setTimeout;

      function is_set(x) {
          return typeof x !== "undefined";
      }

      function is_string(x) {
          return typeof x === "string";
      }

      function is_object(x) {
          return typeof x === "object";
      }

      function object_length(x) {
          return Object.keys(x).length;
      }

      function edge(a, b, c) {
          if (a < b) return b;
          if (a > c) return c;
          return a;
      }

      function num(i, j) {
          return parseInt(i, j || 10);
      }

      function round(i) {
          return Math.round(i);
      }

      // [h, s, v] ... 0 <= h, s, v <= 1
      function HSV2RGB(a) {
          var h = +a[0],
              s = +a[1],
              v = +a[2],
              r, g, b, i, f, p, q, t;
          i = Math.floor(h * 6);
          f = h * 6 - i;
          p = v * (1 - s);
          q = v * (1 - f * s);
          t = v * (1 - (1 - f) * s);
          i = i || 0;
          q = q || 0;
          t = t || 0;
          switch (i % 6) {
              case 0:
                  r = v, g = t, b = p;
                  break;
              case 1:
                  r = q, g = v, b = p;
                  break;
              case 2:
                  r = p, g = v, b = t;
                  break;
              case 3:
                  r = p, g = q, b = v;
                  break;
              case 4:
                  r = t, g = p, b = v;
                  break;
              case 5:
                  r = v, g = p, b = q;
                  break;
          }
          return [round(r * 255), round(g * 255), round(b * 255)];
      }

      function HSV2HEX(a) {
          return RGB2HEX(HSV2RGB(a));
      }

      // [r, g, b] ... 0 <= r, g, b <= 255
      function RGB2HSV(a) {
          var r = +a[0],
              g = +a[1],
              b = +a[2],
              max = Math.max(r, g, b),
              min = Math.min(r, g, b),
              d = max - min,
              h, s = (max === 0 ? 0 : d / max),
              v = max / 255;
          switch (max) {
              case min:
                  h = 0;
                  break;
              case r:
                  h = (g - b) + d * (g < b ? 6 : 0);
                  h /= 6 * d;
                  break;
              case g:
                  h = (b - r) + d * 2;
                  h /= 6 * d;
                  break;
              case b:
                  h = (r - g) + d * 4;
                  h /= 6 * d;
                  break;
          }
          return [h, s, v];
      }

      function RGB2HEX(a) {
          var s = +a[2] | (+a[1] << 8) | (+a[0] << 16);
          s = '000000' + s.toString(16);
          return s.slice(-6);
      }

      // rrggbb or rgb
      function HEX2HSV(s) {
          return RGB2HSV(HEX2RGB(s));
      }

      function HEX2RGB(s) {
          if (s.length === 3) {
              s = s.replace(/./g, '$&$&');
          }
          return [num(s[0] + s[1], 16), num(s[2] + s[3], 16), num(s[4] + s[5], 16)];
      }

      // convert range from `0` to `360` and `0` to `100` in color into range from `0` to `1`
      function _2HSV_pri(a) {
          return [+a[0] / 360, +a[1] / 100, +a[2] / 100];
      }

      // convert range from `0` to `1` into `0` to `360` and `0` to `100` in color
      function _2HSV_pub(a) {
          return [round(+a[0] * 360), round(+a[1] * 100), round(+a[2] * 100)];
      }

      // convert range from `0` to `255` in color into range from `0` to `1`
      function _2RGB_pri(a) {
          return [+a[0] / 255, +a[1] / 255, +a[2] / 255];
      }

      // *
      function parse(x) {
          if (is_object(x)) return x;
          var rgb = /\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i.exec(x),
              hsv = /\s*hsv\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)\s*$/i.exec(x),
              hex = x[0] === '#' && x.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
          if (hex) {
              return HEX2HSV(x.slice(1));
          } else if (hsv) {
              return _2HSV_pri([+hsv[1], +hsv[2], +hsv[3]]);
          } else if (rgb) {
              return RGB2HSV([+rgb[1], +rgb[2], +rgb[3]]);
          }
          return [0, 1, 1]; // default is red
      }

      return (function($) {

          // plugin version
          $.version = '1.3.10';

          // collect all instance(s)
          $[instance] = {};

          // plug to all instance(s)
          $.each = function(fn, t) {
              return delay(function() {
                  var ins = $[instance], i;
                  for (i in ins) {
                      fn(ins[i], i, ins);
                  }
              }, t === 0 ? 0 : (t || 1)), $;
          };

          // static method(s)
          $.parse = parse;
          $._HSV2RGB = HSV2RGB;
          $._HSV2HEX = HSV2HEX;
          $._RGB2HSV = RGB2HSV;
          $._HEX2HSV = HEX2HSV;
          $._HEX2RGB = function(a) {
              return _2RGB_pri(HEX2RGB(a));
          };
          $.HSV2RGB = function(a) {
              return HSV2RGB(_2HSV_pri(a));
          };
          $.HSV2HEX = function(a) {
              return HSV2HEX(_2HSV_pri(a));
          };
          $.RGB2HSV = function(a) {
              return _2HSV_pub(RGB2HSV(a));
          };
          $.RGB2HEX = RGB2HEX;
          $.HEX2HSV = function(s) {
              return _2HSV_pub(HEX2HSV(s));
          };
          $.HEX2RGB = HEX2RGB;
          
          return $;

      })(win[NS] = function(target, events, parent) {

          var b = doc.body,
              h = doc.documentElement,
              $ = this,
              $$ = win[NS],
              _ = false,
              hooks = {},
              picker = doc.createElement('div'),
              on_down = "touchstart mousedown",
              on_move = "touchmove mousemove",
              on_up = "touchend mouseup",
              on_resize = "orientationchange resize";

          // return a new instance if `CP` was called without the `new` operator
          if (!($ instanceof $$)) {
              return new $$(target, events);
          }

          // store color picker instance to `CP.__instance__`
          $$[instance][target.id || target.name || object_length($$[instance])] = $;

          // trigger color picker panel on click by default
          if (!is_set(events) || events === true) {
              events = on_down;
          }

          // add event
          function on(ev, el, fn) {
              ev = ev.split(/\s+/);
              for (var i = 0, ien = ev.length; i < ien; ++i) {
                  el.addEventListener(ev[i], fn, false);
              }
          }

          // remove event
          function off(ev, el, fn) {
              ev = ev.split(/\s+/);
              for (var i = 0, ien = ev.length; i < ien; ++i) {
                  el.removeEventListener(ev[i], fn);
              }
          }

          // get mouse/finger coordinate
          function point(el, e) {
              var T = 'touches',
                  X = 'clientX',
                  Y = 'clientY',
                  x = !!e[T] ? e[T][0][X] : e[X],
                  y = !!e[T] ? e[T][0][Y] : e[Y],
                  o = offset(el);
              return {
                  x: x - o.l,
                  y: y - o.t
              };
          }

          // get position
          function offset(el) {
              var left, top, rect;
              if (el === win) {
                  left = win.pageXOffset || h.scrollLeft;
                  top = win.pageYOffset || h.scrollTop;
              } else {
                  rect = el.getBoundingClientRect();
                  left = rect.left;
                  top = rect.top;
              }
              return {
                  l: left,
                  t: top
              };
          }

          // get closest parent
          function closest(a, b) {
              while ((a = a.parentElement) && a !== b);
              return a;
          }

          // prevent default
          function prevent(e) {
              if (e) e.preventDefault();
          }

          // get dimension
          function size(el) {
              return el === win ? {
                  w: win.innerWidth,
                  h: win.innerHeight
              } : {
                  w: el.offsetWidth,
                  h: el.offsetHeight
              };
          }

          // get color data
          function get_data(a) {
              return _ || (is_set(a) ? a : false);
          }

          // set color data
          function set_data(a) {
              _ = a;
          }

          // add hook
          function add(ev, fn, id) {
              if (!is_set(ev)) return hooks;
              if (!is_set(fn)) return hooks[ev];
              if (!is_set(hooks[ev])) hooks[ev] = {};
              if (!is_set(id)) id = object_length(hooks[ev]);
              return hooks[ev][id] = fn, $;
          }

          // remove hook
          function remove(ev, id) {
              if (!is_set(ev)) return hooks = {}, $;
              if (!is_set(id)) return hooks[ev] = {}, $;
              return delete hooks[ev][id], $;
          }

          // trigger hook
          function trigger(ev, a, id) {
              if (!is_set(hooks[ev])) return $;
              if (!is_set(id)) {
                  for (var i in hooks[ev]) {
                      hooks[ev][i].apply($, a);
                  }
              } else {
                  if (is_set(hooks[ev][id])) {
                      hooks[ev][id].apply($, a);
                  }
              }
              return $;
          }

          // initialize data ...
          set_data($$.parse(target.getAttribute('data-color') || target.value || [0, 1, 1]));

          // generate color picker pane ...
          picker.className = 'color-picker';
          picker.innerHTML = '<div class="color-picker-container"><span class="color-picker-h"><i></i></span><span class="color-picker-sv"><i></i></span></div>';
          var c = picker[first].children,
              HSV = get_data([0, 1, 1]), // default is red
              H = c[0],
              SV = c[1],
              H_point = H[first],
              SV_point = SV[first],
              start_H = 0,
              start_SV = 0,
              drag_H = 0,
              drag_SV = 0,
              left = 0,
              top = 0,
              P_W = 0,
              P_H = 0,
              v = HSV2HEX(HSV),
              set;

          // on update ...
          function trigger_(k, x) {
              if (!k || k === "h") {
                  trigger("change:h", x);
              }
              if (!k || k === "sv") {
                  trigger("change:sv", x);
              }
              trigger("change", x);
          }

          // is visible?
          function visible() {
              return picker.parentNode;
          }

          // create
          function create(first, bucket) {
              if (!first) {
                  (parent || bucket || b).appendChild(picker), $.visible = true;
              }
              P_W = size(picker).w;
              P_H = size(picker).h;
              var SV_size = size(SV),
                  SV_point_size = size(SV_point),
                  H_H = size(H).h,
                  SV_W = SV_size.w,
                  SV_H = SV_size.h,
                  H_point_H = size(H_point).h,
                  SV_point_W = SV_point_size.w,
                  SV_point_H = SV_point_size.h;
              if (first) {
                  picker.style.left = picker.style.top = '-9999px';
                  function click(e) {
                      var t = e.target,
                          is_target = t === target || closest(t, target) === target;
                      if (is_target) {
                          create();
                      } else {
                          $.exit();
                      }
                      trigger(is_target ? "enter" : "exit", [$]);
                  }
                  if (events !== false) {
                      on(events, target, click);
                  }
                  $.create = function() {
                      return create(1), trigger("create", [$]), $;
                  };
                  $.destroy = function() {
                      if (events !== false) {
                          off(events, target, click);
                      }
                      $.exit(), set_data(false);
                      return trigger("destroy", [$]), $;
                  };
              } else {
                  fit();
              }
              set = function() {
                  HSV = get_data(HSV), color$$1();
                  H_point.style.top = (H_H - (H_point_H / 2) - (H_H * +HSV[0])) + 'px';
                  SV_point.style.right = (SV_W - (SV_point_W / 2) - (SV_W * +HSV[1])) + 'px';
                  SV_point.style.top = (SV_H - (SV_point_H / 2) - (SV_H * +HSV[2])) + 'px';
              };
              $.exit = function(e) {
                  if (visible()) {
                      visible().removeChild(picker);
                      $.visible = false;
                  }
                  off(on_down, H, down_H);
                  off(on_down, SV, down_SV);
                  off(on_move, doc, move);
                  off(on_up, doc, stop);
                  off(on_resize, win, fit);
                  return $;
              };
              function color$$1(e) {
                  var a = HSV2RGB(HSV),
                      b = HSV2RGB([HSV[0], 1, 1]);
                  SV.style.backgroundColor = 'rgb(' + b.join(',') + ')';
                  set_data(HSV);
                  prevent(e);
              }            set();
              function do_H(e) {
                  var y = edge(point(H, e).y, 0, H_H);
                  HSV[0] = (H_H - y) / H_H;
                  H_point.style.top = (y - (H_point_H / 2)) + 'px';
                  color$$1(e);
              }
              function do_SV(e) {
                  var o = point(SV, e),
                      x = edge(o.x, 0, SV_W),
                      y = edge(o.y, 0, SV_H);
                  HSV[1] = 1 - ((SV_W - x) / SV_W);
                  HSV[2] = (SV_H - y) / SV_H;
                  SV_point.style.right = (SV_W - x - (SV_point_W / 2)) + 'px';
                  SV_point.style.top = (y - (SV_point_H / 2)) + 'px';
                  color$$1(e);
              }
              function move(e) {
                  if (drag_H) {
                      do_H(e), v = HSV2HEX(HSV);
                      if (!start_H) {
                          trigger("drag:h", [v, $]);
                          trigger("drag", [v, $]);
                          trigger_("h", [v, $]);
                      }
                  }
                  if (drag_SV) {
                      do_SV(e), v = HSV2HEX(HSV);
                      if (!start_SV) {
                          trigger("drag:sv", [v, $]);
                          trigger("drag", [v, $]);
                          trigger_("sv", [v, $]);
                      }
                  }
                  start_H = 0,
                  start_SV = 0;
              }
              function stop(e) {
                  var t = e.target,
                      k = drag_H ? "h" : "sv",
                      a = [HSV2HEX(HSV), $],
                      is_target = t === target || closest(t, target) === target,
                      is_picker = t === picker || closest(t, picker) === picker;
                  if (!is_target && !is_picker) {
                      // click outside the target or picker element to exit
                      if (visible() && events !== false) $.exit(), trigger("exit", [$]), trigger_(0, a);
                  } else {
                      if (is_picker) {
                          trigger("stop:" + k, a);
                          trigger("stop", a);
                          trigger_(k, a);
                      }
                  }
                  drag_H = 0,
                  drag_SV = 0;
              }
              function down_H(e) {
                  start_H = 1,
                  drag_H = 1,
                  move(e), prevent(e);
                  trigger("start:h", [v, $]);
                  trigger("start", [v, $]);
                  trigger_("h", [v, $]);
              }
              function down_SV(e) {
                  start_SV = 1,
                  drag_SV = 1,
                  move(e), prevent(e);
                  trigger("start:sv", [v, $]);
                  trigger("start", [v, $]);
                  trigger_("sv", [v, $]);
              }
              if (!first) {
                  on(on_down, H, down_H);
                  on(on_down, SV, down_SV);
                  on(on_move, doc, move);
                  on(on_up, doc, stop);
                  on(on_resize, win, fit);
              }
          } create(1);

          delay(function() {
              var a = [HSV2HEX(HSV), $];
              trigger("create", a);
              trigger_(0, a);
          }, 0);

          // fit to window
          $.fit = function(o) {
              var w = size(win),
                  y = size(h),
                  screen_w = w.w - y.w, // vertical scroll bar
                  screen_h = w.h - h.clientHeight, // horizontal scroll bar
                  ww = offset(win),
                  to = offset(target);
              left = to.l + ww.l;
              top = to.t + ww.t + size(target).h; // drop!
              if (is_object(o)) {
                  is_set(o[0]) && (left = o[0]);
                  is_set(o[1]) && (top = o[1]);
              } else {
                  var min_x = ww.l,
                      min_y = ww.t,
                      max_x = ww.l + w.w - P_W - screen_w,
                      max_y = ww.t + w.h - P_H - screen_h;
                  left = edge(left, min_x, max_x) >> 0;
                  top = edge(top, min_y, max_y) >> 0;
              }
              picker.style.left = left + 'px';
              picker.style.top = top + 'px';
              return trigger("fit", [$]), $;
          };

          // for event listener ID
          function fit() {
              return $.fit();
          }

          // set hidden color picker data
          $.set = function(a) {
              if (!is_set(a)) return get_data();
              if (is_string(a)) {
                  a = $$.parse(a);
              }
              return set_data(a), set(), $;
          };

          // alias for `$.set()`
          $.get = function(a) {
              return get_data(a);
          };

          // register to global ...
          $.target = target;
          $.picker = picker;
          $.visible = false;
          $.on = add;
          $.off = remove;
          $.fire = trigger;
          $.hooks = hooks;
          $.enter = function(bucket) {
              return create(0, bucket);
          };

          // return the global object
          return $;

      });

  })(window, document, 'CP');

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var FileSaver = createCommonjsModule(function (module) {
  /* FileSaver.js
   * A saveAs() FileSaver implementation.
   * 1.3.2
   * 2016-06-16 18:25:19
   *
   * By Eli Grey, http://eligrey.com
   * License: MIT
   *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
   */

  /*global self */
  /*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

  /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

  var saveAs = saveAs || (function(view) {
  	// IE <10 is explicitly unsupported
  	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
  		return;
  	}
  	var
  		  doc = view.document
  		  // only get URL when necessary in case Blob.js hasn't overridden it yet
  		, get_URL = function() {
  			return view.URL || view.webkitURL || view;
  		}
  		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
  		, can_use_save_link = "download" in save_link
  		, click = function(node) {
  			var event = new MouseEvent("click");
  			node.dispatchEvent(event);
  		}
  		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
  		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
  		, throw_outside = function(ex) {
  			(view.setImmediate || view.setTimeout)(function() {
  				throw ex;
  			}, 0);
  		}
  		, force_saveable_type = "application/octet-stream"
  		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
  		, arbitrary_revoke_timeout = 1000 * 40 // in ms
  		, revoke = function(file) {
  			var revoker = function() {
  				if (typeof file === "string") { // file is an object URL
  					get_URL().revokeObjectURL(file);
  				} else { // file is a File
  					file.remove();
  				}
  			};
  			setTimeout(revoker, arbitrary_revoke_timeout);
  		}
  		, dispatch = function(filesaver, event_types, event) {
  			event_types = [].concat(event_types);
  			var i = event_types.length;
  			while (i--) {
  				var listener = filesaver["on" + event_types[i]];
  				if (typeof listener === "function") {
  					try {
  						listener.call(filesaver, event || filesaver);
  					} catch (ex) {
  						throw_outside(ex);
  					}
  				}
  			}
  		}
  		, auto_bom = function(blob) {
  			// prepend BOM for UTF-8 XML and text/* types (including HTML)
  			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
  				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
  			}
  			return blob;
  		}
  		, FileSaver = function(blob, name, no_auto_bom) {
  			if (!no_auto_bom) {
  				blob = auto_bom(blob);
  			}
  			// First try a.download, then web filesystem, then object URLs
  			var
  				  filesaver = this
  				, type = blob.type
  				, force = type === force_saveable_type
  				, object_url
  				, dispatch_all = function() {
  					dispatch(filesaver, "writestart progress write writeend".split(" "));
  				}
  				// on any filesys errors revert to saving with object URLs
  				, fs_error = function() {
  					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
  						// Safari doesn't allow downloading of blob urls
  						var reader = new FileReader();
  						reader.onloadend = function() {
  							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
  							var popup = view.open(url, '_blank');
  							if(!popup) view.location.href = url;
  							url=undefined; // release reference before dispatching
  							filesaver.readyState = filesaver.DONE;
  							dispatch_all();
  						};
  						reader.readAsDataURL(blob);
  						filesaver.readyState = filesaver.INIT;
  						return;
  					}
  					// don't create more object URLs than needed
  					if (!object_url) {
  						object_url = get_URL().createObjectURL(blob);
  					}
  					if (force) {
  						view.location.href = object_url;
  					} else {
  						var opened = view.open(object_url, "_blank");
  						if (!opened) {
  							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
  							view.location.href = object_url;
  						}
  					}
  					filesaver.readyState = filesaver.DONE;
  					dispatch_all();
  					revoke(object_url);
  				}
  			;
  			filesaver.readyState = filesaver.INIT;

  			if (can_use_save_link) {
  				object_url = get_URL().createObjectURL(blob);
  				setTimeout(function() {
  					save_link.href = object_url;
  					save_link.download = name;
  					click(save_link);
  					dispatch_all();
  					revoke(object_url);
  					filesaver.readyState = filesaver.DONE;
  				});
  				return;
  			}

  			fs_error();
  		}
  		, FS_proto = FileSaver.prototype
  		, saveAs = function(blob, name, no_auto_bom) {
  			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
  		}
  	;
  	// IE 10+ (native saveAs)
  	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
  		return function(blob, name, no_auto_bom) {
  			name = name || blob.name || "download";

  			if (!no_auto_bom) {
  				blob = auto_bom(blob);
  			}
  			return navigator.msSaveOrOpenBlob(blob, name);
  		};
  	}

  	FS_proto.abort = function(){};
  	FS_proto.readyState = FS_proto.INIT = 0;
  	FS_proto.WRITING = 1;
  	FS_proto.DONE = 2;

  	FS_proto.error =
  	FS_proto.onwritestart =
  	FS_proto.onprogress =
  	FS_proto.onwrite =
  	FS_proto.onabort =
  	FS_proto.onerror =
  	FS_proto.onwriteend =
  		null;

  	return saveAs;
  }(
  	   typeof self !== "undefined" && self
  	|| typeof window !== "undefined" && window
  	|| commonjsGlobal.content
  ));
  // `self` is undefined in Firefox for Android content script context
  // while `this` is nsIContentFrameMessageManager
  // with an attribute `content` that corresponds to the window

  if (module.exports) {
    module.exports.saveAs = saveAs;
  }
  });
  var FileSaver_1 = FileSaver.saveAs;

  class InteractiveMap {
      constructor(map_tile_path, version, vision_data_image_path, worlddata, options) {
          this.options = options || {
              mode: 'navigate',
              zoom: 1,
              resolutions: [32,16,8,4,2,1],
              isNight: false,
              isDarkness: false,
              controls: {
                  coordinate:true
              }
          };
          this.map_tile_path = map_tile_path;
          this.vision_data_image_path = vision_data_image_path;
          this.vs = new visionSimulation(worlddata);
          this.mode = this.options.mode;
          this.layerDefs = layerDefinitions;
          this.baseLayerDefs = baseLayerDefinitions;
          this.view = new View({
              zoom: this.options.zoom,
              center: mapConstants.imgCenter,
              projection: pixelProj,
              resolutions: this.options.resolutions,
              extent: [0, 0, mapConstants.map_w, mapConstants.map_h]
          });
          this.data = {};
          this.layerIndex = {};
          this.version = version;
          this.visionRadius = mapConstants.visionRadius.observer;
          this.movementSpeed = mapConstants.defaultMovementSpeed;
          this.isNight = this.options.isNight;
          this.isDarkness = this.options.isDarkness;
          this.layerFilters = {
              marker: layer => {
                  const layerDef = layer.get('layerDef');
                  return layer.getVisible() && layerDef && (layerDef.group == 'structure' || layerDef.group == 'object');
              }
          };
          this.map = new Map({
              controls: control.defaults({ zoom: false, attribution: false, rotate: false }).extend([
                  new control.FullScreen()
              ]),
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
              coordinate: this.options.controls.coordinate && new CoordinateControl(this, 'coordinates'),
              measure: new MeasureControl(this),
              creep: new CreepControl(this, 'timer'),
              draw: new DrawControl(this)
          };
          
          this.map.on('moveend', evt => {
              const map = evt.map;
              const ext = map.getView().calculateExtent(map.getSize());
              const center = extent.getCenter(ext);
              const worldXY = proj.transform(center, pixelProj, dotaProj);
              const coordinate$$1 = [Math.round(worldXY[0]), Math.round(worldXY[1])];
              setQueryString('x', coordinate$$1[0]);
              setQueryString('y', coordinate$$1[1]);
              setQueryString('zoom', Math.round(this.view.getZoom()));
          });
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
              this.map.addLayer(this.controls.draw.layer);
              
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
            duration: duration
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
                  feature.setStyle(styles[feature.get('wardType')][this.mode == 'navigate' ? 'highlight' : 'remove']);
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

      setDefaults() {
          const x = getParameterByName('x');
          const y = getParameterByName('y');
          const zoom = getParameterByName('zoom');
          if (zoom) {
              this.view.setZoom(zoom);
          }
          if (x && y) {
              const coordinate$$1 = proj.transform([x, y], dotaProj, pixelProj);
              if (extent.containsXY([-100, -100, mapConstants.map_w+100, mapConstants.map_h+100], coordinate$$1[0], coordinate$$1[1])) {
                  this.panTo(coordinate$$1);
              }
          }
          
          document.getElementById('btn-ward').setAttribute('ward-type', 'observer');
          const mode = getParameterByName('mode');
          this.controls.menu.changeMode(mode);

          const baseLayerName = getParameterByName('BaseLayer');
          let element;
          if (baseLayerName) {
              element = document.querySelector('input[name="base-layer"][value="' + baseLayerName + '"]');
              if (element) {
                  element.checked = true;
                  this.baseLayers.filter(layer => layer.get("layerId") == baseLayerName)[0].setVisible(true);
              }
          }
          if (!element) {
              setQueryString('BaseLayer', null);
              this.baseLayers[0].setVisible(true);
              document.querySelector('input[name="base-layer"][value="' + this.baseLayers[0].get("layerId") + '"]').checked = true;
          }
          
          this.layerDefs.forEach(layerDef => {
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
          
          this.controls.draw.setDataId(getParameterByName('data'));
      }
      
      export(filename) {
          const map = document.getElementById('map');
          map.style.width = '2048px';
          map.style.height = '2048px';
          this.map.updateSize();
          const center = this.view.getCenter();
          const zoom = this.view.getZoom();
          this.view.setZoom(2);
          this.view.setCenter([mapConstants.map_w / 2, mapConstants.map_h / 2]);
          const resetExport = () => {
              map.style.width = '100%';
              map.style.height = '100%';
              this.map.updateSize();
              this.view.setZoom(zoom);
              this.view.setCenter(center);
          };
          this.map.once('rendercomplete', (event) => {
              const canvas = event.context.canvas;
              if (navigator.msSaveBlob) {
                  navigator.msSaveBlob(canvas.msToBlob(), filename);
                  resetExport();
              }
              else {
                  canvas.toBlob(function(blob) {
                      FileSaver_1(blob, filename);
                      resetExport();
                  });
              }
          });
          this.map.renderSync();
      }
      
      save() {
          const writer = new format.KML();
          const str = writer.writeFeatures(this.controls.draw.source.getFeatures());
          const xhr = new XMLHttpRequest();
          xhr.open("POST", 'save.php', true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
          xhr.onreadystatechange = () => {
              if (xhr.readyState == XMLHttpRequest.DONE) {
                  if ( xhr.status == 200 ) {
                      const data = JSON.parse(xhr.responseText);
                      if (data.file) {
                          setQueryString("data", data.file);
                          this.controls.notification.show(modeNotificationText.saveSuccess);
                          return;
                      }
                  }
              }
              this.controls.notification.show(modeNotificationText.saveFailed);
          };
          xhr.send("data=" + str);
      }
      
      share() {
          const dummy = document.createElement('input');
          const text = window.location.href;
          document.body.appendChild(dummy);
          dummy.value = text;
          dummy.select();
          document.execCommand('copy');
          document.body.removeChild(dummy);
          this.controls.notification.show(modeNotificationText.share);
      }
      
      reset() {
          if (history && history.replaceState) {
              history.replaceState(null, "", window.location.href.split("?")[0]);
          }
          this.setDefaults();
          this.controls.menu.updateOverlayMenu();
          this.controls.tree.toggleAllTrees(false, true);
          this.controls.tree.parseQueryString();
          this.controls.ward.clearWards();
          this.controls.ward.parseQueryString();
          this.controls.draw.clear();
      }

      initialize() {
          this.vs.initialize(this.vision_data_image_path, err => {
              this.controls.info.activate();
              
              this.setDefaults();

              this.setMapLayers(this.version, err => {
                  if (!err) {
                      this.controls.menu.updateOverlayMenu();
                      this.controls.tree.parseQueryString();
                      this.controls.ward.parseQueryString();
                  }
                  else {
                      throw new Error(err);
                  }
              });
              
              forEach(document.querySelectorAll('input[name="mode"], input[name="ward-type"], input[name="measure-type"], input[name="draw-type"]'), element => {
                  element.addEventListener("change", e => {
                      this.controls.menu.changeMode(e.currentTarget.value);
                  }, false);
              }, this);
              
              document.getElementById('share').addEventListener('click', () => this.share());
              
              const strokePicker = new colorPicker(document.getElementById('strokecolor-option'), false, document.getElementById('strokecolor-picker-container'));
              strokePicker.on("change", function(color$$1) {
                  this.target.value = '#' + color$$1;
                  document.getElementById('strokecolor-preview').style.backgroundColor = '#' + color$$1;
              });
              
              strokePicker.target.oncut = strokePicker.target.onpaste = strokePicker.target.onkeyup = strokePicker.target.oninput = function() {
                  strokePicker.set(this.value);
              };
              
              document.getElementById('strokecolor-option').addEventListener('blur', () => {
                  document.getElementById('strokecolor-picker-container').classList.remove('open');
              });
              
              document.getElementById('strokecolor-option').addEventListener('click', () => {
                  document.getElementById('strokecolor-picker-container').classList.add('open');
                  strokePicker.fit = function() { // do nothing ...
                      this.picker.style.left = this.picker.style.top = "";
                  };
                  strokePicker.enter();
              });
              
              const fillPicker = new colorPicker(document.getElementById('fillcolor-option'), false, document.getElementById('fillcolor-picker-container'));
              fillPicker.on("change", function(color$$1) {
                  this.target.value = '#' + color$$1;
                  document.getElementById('fillcolor-preview').style.backgroundColor = '#' + color$$1;
              });
              
              fillPicker.target.oncut = fillPicker.target.onpaste = fillPicker.target.onkeyup = fillPicker.target.oninput = function() {
                  fillPicker.set(this.value);
              };
              
              document.getElementById('fillcolor-option').addEventListener('blur', () => {
                  document.getElementById('fillcolor-picker-container').classList.remove('open');
              });
              
              document.getElementById('fillcolor-option').addEventListener('click', () => {
                  document.getElementById('fillcolor-picker-container').classList.add('open');
                  fillPicker.fit = function() { // do nothing ...
                      this.picker.style.left = this.picker.style.top = "";
                  };
                  fillPicker.enter();
              });
              
              document.getElementById('nightControl').addEventListener('change', e => {
                  this.isNight = e.currentTarget.checked;
                  if (this.isNight) {
                      this.controls.notification.show(modeNotificationText.nightOn);
                  }
                  else {
                      this.controls.notification.show(modeNotificationText.nightOff);
                  }
              });

              document.getElementById('darknessControl').addEventListener('change', e => {
                  this.isDarkness = e.currentTarget.checked;
                  if (this.isDarkness) {
                      this.controls.notification.show(modeNotificationText.darknessOn);
                  }
                  else {
                      this.controls.notification.show(modeNotificationText.darknessOff);
                  }
              });

              document.getElementById('creepControl').addEventListener('change', e => {
                  this.controls.menu.toggleLayerMenuOption('npc_dota_spawner', e.currentTarget.checked);
                  this.controls.menu.toggleLayerMenuOption('path_corner', e.currentTarget.checked);
                  if (e.currentTarget.checked) {
                      this.controls.creep.activate();
                  }
                  else {
                      this.controls.creep.deactivate();
                  }
              });

              document.getElementById('vision-radius').addEventListener('change', e => this.visionRadius = e.currentTarget.value);

              document.getElementById('movementSpeed').addEventListener('change', e => this.movementSpeed = e.currentTarget.value);
                  
              document.getElementById('option-dayVision').addEventListener('change', e => this.rangeLayers.dayVision.setVisible(e.currentTarget.checked));
                  
              document.getElementById('option-nightVision').addEventListener('change', e => this.rangeLayers.nightVision.setVisible(e.currentTarget.checked));
                  
              document.getElementById('option-trueSight').addEventListener('change', e => this.rangeLayers.trueSight.setVisible(e.currentTarget.checked));
                  
              document.getElementById('option-attackRange').addEventListener('change', e => this.rangeLayers.attackRange.setVisible(e.currentTarget.checked));
                  
              document.getElementById('version-select').addEventListener('change', e => {
                  const el = e.currentTarget;
                  this.setMapLayers(el.value, err => {
                      if (!err) {
                          this.controls.creep.deactivate();
                          this.version = el.value;
                          document.getElementById('creepControl').disabled = !this.getMapLayer('npc_dota_spawner');
                          document.getElementById('creepControl').checked = false;
                      }
                      else {
                          el.value = this.version;
                          alert('Version change failed.');
                      }
                  });
              });
              
              const heroData = Object.keys(heroIcons).map(id => {
                  heroIcons[id].id = id;
                  return heroIcons[id];
              });
              heroData.sort(function(a, b) {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
              });
              const markerSelect = document.getElementById('marker-select');
              for (const data of heroData) {
                  markerSelect.options[markerSelect.options.length] = new Option(data.name, data.id);
              }
              
              document.getElementById('marker-select').addEventListener('change', e => {
                  const el = e.currentTarget;
                  this.controls.draw.changeMarkerType(el.value);
                  document.getElementById('marker-preview').className = "";
                  document.getElementById('marker-preview').classList.add('miniheroes-sprite-' + el.value);
              });
              
              document.getElementById('freehand-select').addEventListener('change', e => {
                  const el = e.currentTarget;
                  this.controls.draw.changeFreehandType(el.value);
              });
              
              document.getElementById('sides-option').addEventListener('change', e => {
                  const el = e.currentTarget;
                  this.controls.draw.changeSides(parseInt(el.value));
              });
              
              document.getElementById('undo').addEventListener('click', () => this.controls.draw.undo());
              document.getElementById('redo').addEventListener('click', () => this.controls.draw.redo());
                  
              document.getElementById('btn-zoom-in').addEventListener('click', () => this.view.animate({zoom: this.view.getZoom() + 1}));
                  
              document.getElementById('btn-zoom-out').addEventListener('click', () => this.view.animate({zoom: this.view.getZoom() - 1}));

              document.getElementById('reset').addEventListener('click', () => this.reset());

              document.getElementById('btn-tree').addEventListener('click', e => {
                  const el = e.currentTarget;
                  if (el.classList.contains('active')) {
                      el.setAttribute('trees-enabled', el.getAttribute('trees-enabled') == "yes" ? "no" : "yes");
                  }
                  el.classList.add('active');
                  document.getElementById('btn-ward').classList.remove('active');
                  document.getElementById('btn-measure').classList.remove('active');
                  this.controls.menu.toggleLayerMenuOption("ent_dota_tree", el.getAttribute('trees-enabled') == "yes");
                  this.controls.menu.changeMode('navigate');
                  this.controls.notification.show(el.getAttribute('trees-enabled') == "yes" ? modeNotificationText.treeEnable : modeNotificationText.treeDisable);
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
                  this.controls.menu.changeMode('ward');
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
                  this.controls.menu.changeMode('measure');
              });
          });
      }
  }

  var rollbar_umd_min = createCommonjsModule(function (module, exports) {
  !function(t,e){module.exports=e();}(commonjsGlobal,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){t.exports=r(1);},function(t,e,r){var n=r(2),o="undefined"!=typeof window&&window._rollbarConfig,i=o&&o.globalAlias||"Rollbar",a="undefined"!=typeof window&&window[i]&&"function"==typeof window[i].shimId&&void 0!==window[i].shimId();if("undefined"==typeof window||window._rollbarStartTime||(window._rollbarStartTime=(new Date).getTime()),!a&&o){var s=new n(o);window[i]=s;}else"undefined"!=typeof window?(window.rollbar=n,window._rollbarDidLoad=!0):"undefined"!=typeof self&&(self.rollbar=n,self._rollbarDidLoad=!0);t.exports=n;},function(t,e,r){function n(t,e){this.options=c.handleOptions(x,t);var r=new l(this.options,h,d);this.client=e||new u(this.options,r,p,"browser");var n="undefined"!=typeof window&&window||"undefined"!=typeof self&&self,o="undefined"!=typeof document&&document;i(this.client.notifier,n),a(this.client.queue),(this.options.captureUncaught||this.options.handleUncaughtExceptions)&&(f.captureUncaughtExceptions(n,this),f.wrapGlobals(n,this)),(this.options.captureUnhandledRejections||this.options.handleUnhandledRejections)&&f.captureUnhandledRejections(n,this),this.instrumenter=new w(this.options,this.client.telemeter,this,n,o),this.instrumenter.instrument();}function o(t){var e="Rollbar is not initialized";p.error(e),t&&t(new Error(e));}function i(t,e){t.addTransform(m.handleItemWithError).addTransform(m.ensureItemHasSomethingToSay).addTransform(m.addBaseInfo).addTransform(m.addRequestInfo(e)).addTransform(m.addClientInfo(e)).addTransform(m.addPluginInfo(e)).addTransform(m.addBody).addTransform(g.addMessageWithError).addTransform(g.addTelemetryData).addTransform(g.addConfigToPayload).addTransform(m.scrubPayload).addTransform(g.userTransform(p)).addTransform(g.itemToPayload);}function a(t){t.addPredicate(y.checkLevel).addPredicate(v.checkIgnore).addPredicate(y.userCheckIgnore(p)).addPredicate(y.urlIsNotBlacklisted(p)).addPredicate(y.urlIsWhitelisted(p)).addPredicate(y.messageIsIgnored(p));}function s(t){for(var e=0,r=t.length;e<r;++e)if(c.isFunction(t[e]))return t[e]}var u=r(3),c=r(5),l=r(11),p=r(14),f=r(17),h=r(18),d=r(19),m=r(20),g=r(24),v=r(25),y=r(26),b=r(21),w=r(27),_=null;n.init=function(t,e){return _?_.global(t).configure(t):_=new n(t,e)},n.prototype.global=function(t){return this.client.global(t),this},n.global=function(t){return _?_.global(t):void o()},n.prototype.configure=function(t,e){var r=this.options,n={};return e&&(n={payload:e}),this.options=c.handleOptions(r,t,n),this.client.configure(this.options,e),this.instrumenter.configure(this.options),this},n.configure=function(t,e){return _?_.configure(t,e):void o()},n.prototype.lastError=function(){return this.client.lastError},n.lastError=function(){return _?_.lastError():void o()},n.prototype.log=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.log(t),{uuid:e}},n.log=function(){if(_)return _.log.apply(_,arguments);var t=s(arguments);o(t);},n.prototype.debug=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.debug(t),{uuid:e}},n.debug=function(){if(_)return _.debug.apply(_,arguments);var t=s(arguments);o(t);},n.prototype.info=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.info(t),{uuid:e}},n.info=function(){if(_)return _.info.apply(_,arguments);var t=s(arguments);o(t);},n.prototype.warn=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.warn(t),{uuid:e}},n.warn=function(){if(_)return _.warn.apply(_,arguments);var t=s(arguments);o(t);},n.prototype.warning=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.warning(t),{uuid:e}},n.warning=function(){if(_)return _.warning.apply(_,arguments);var t=s(arguments);o(t);},n.prototype.error=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.error(t),{uuid:e}},n.error=function(){if(_)return _.error.apply(_,arguments);var t=s(arguments);o(t);},n.prototype.critical=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.critical(t),{uuid:e}},n.critical=function(){if(_)return _.critical.apply(_,arguments);var t=s(arguments);o(t);},n.prototype.buildJsonPayload=function(t){return this.client.buildJsonPayload(t)},n.buildJsonPayload=function(){return _?_.buildJsonPayload.apply(_,arguments):void o()},n.prototype.sendJsonPayload=function(t){return this.client.sendJsonPayload(t)},n.sendJsonPayload=function(){return _?_.sendJsonPayload.apply(_,arguments):void o()},n.prototype.handleUncaughtException=function(t,e,r,n,o,i){var a,s=c.makeUnhandledStackInfo(t,e,r,n,o,"onerror","uncaught exception",b);c.isError(o)?(a=this._createItem([t,o,i]),a._unhandledStackInfo=s):c.isError(e)?(a=this._createItem([t,e,i]),a._unhandledStackInfo=s):(a=this._createItem([t,i]),a.stackInfo=s),a.level=this.options.uncaughtErrorLevel,a._isUncaught=!0,this.client.log(a);},n.prototype.handleUnhandledRejection=function(t,e){var r="unhandled rejection was null or undefined!";if(t)if(t.message)r=t.message;else{var n=c.stringify(t);n.value&&(r=n.value);}var o,i=t&&t._rollbarContext||e&&e._rollbarContext;c.isError(t)?o=this._createItem([r,t,i]):(o=this._createItem([r,t,i]),o.stackInfo=c.makeUnhandledStackInfo(r,"",0,0,null,"unhandledrejection","",b)),o.level=this.options.uncaughtErrorLevel,o._isUncaught=!0,o._originalArgs=o._originalArgs||[],o._originalArgs.push(e),this.client.log(o);},n.prototype.wrap=function(t,e,r){try{var n;if(n=c.isFunction(e)?e:function(){return e||{}},!c.isFunction(t))return t;if(t._isWrap)return t;if(!t._rollbar_wrapped&&(t._rollbar_wrapped=function(){r&&c.isFunction(r)&&r.apply(this,arguments);try{return t.apply(this,arguments)}catch(r){var e=r;throw e&&window._rollbarWrappedError!==e&&(c.isType(e,"string")&&(e=new String(e)),e._rollbarContext=n()||{},e._rollbarContext._wrappedSource=t.toString(),window._rollbarWrappedError=e),e}},t._rollbar_wrapped._isWrap=!0,t.hasOwnProperty))for(var o in t)t.hasOwnProperty(o)&&"_rollbar_wrapped"!==o&&(t._rollbar_wrapped[o]=t[o]);return t._rollbar_wrapped}catch(e){return t}},n.wrap=function(t,e){return _?_.wrap(t,e):void o()},n.prototype.captureEvent=function(){var t=c.createTelemetryEvent(arguments);return this.client.captureEvent(t.type,t.metadata,t.level)},n.captureEvent=function(){return _?_.captureEvent.apply(_,arguments):void o()},n.prototype.captureDomContentLoaded=function(t,e){return e||(e=new Date),this.client.captureDomContentLoaded(e)},n.prototype.captureLoad=function(t,e){return e||(e=new Date),this.client.captureLoad(e)},n.prototype._createItem=function(t){return c.createItem(t,p,this)};var x={version:"2.6.1",scrubFields:["pw","pass","passwd","password","secret","confirm_password","confirmPassword","password_confirmation","passwordConfirmation","access_token","accessToken","secret_key","secretKey","secretToken","cc-number","card number","cardnumber","cardnum","ccnum","ccnumber","cc num","creditcardnumber","credit card number","newcreditcardnumber","new credit card","creditcardno","credit card no","card#","card #","cc-csc","cvc2","cvv2","ccv2","security code","card verification","name on credit card","name on card","nameoncard","cardholder","card holder","name des karteninhabers","card type","cardtype","cc type","cctype","payment type","expiration date","expirationdate","expdate","cc-exp"],logLevel:"debug",reportLevel:"debug",uncaughtErrorLevel:"error",endpoint:"api.rollbar.com/api/1/item/",verbose:!1,enabled:!0,sendConfig:!1,includeItemsInTelemetry:!0,captureIp:!0};t.exports=n;},function(t,e,r){function n(t,e,r,o){this.options=c.merge(t),this.logger=r,n.rateLimiter.configureGlobal(this.options),n.rateLimiter.setPlatformOptions(o,this.options),this.api=e,this.queue=new a(n.rateLimiter,e,r,this.options),this.notifier=new s(this.queue,this.options),this.telemeter=new u(this.options),this.lastError=null,this.lastErrorHash="none";}function o(t){var e=t.message||"",r=(t.err||{}).stack||String(t.err);return e+"::"+r}var i=r(4),a=r(8),s=r(9),u=r(10),c=r(5),l={maxItems:0,itemsPerMinute:60};n.rateLimiter=new i(l),n.prototype.global=function(t){return n.rateLimiter.configureGlobal(t),this},n.prototype.configure=function(t,e){var r=this.options,n={};return e&&(n={payload:e}),this.options=c.merge(r,t,n),this.notifier&&this.notifier.configure(this.options),this.telemeter&&this.telemeter.configure(this.options),this.global(this.options),this},n.prototype.log=function(t){var e=this._defaultLogLevel();return this._log(e,t)},n.prototype.debug=function(t){this._log("debug",t);},n.prototype.info=function(t){this._log("info",t);},n.prototype.warn=function(t){this._log("warning",t);},n.prototype.warning=function(t){this._log("warning",t);},n.prototype.error=function(t){this._log("error",t);},n.prototype.critical=function(t){this._log("critical",t);},n.prototype.wait=function(t){this.queue.wait(t);},n.prototype.captureEvent=function(t,e,r){return this.telemeter.captureEvent(t,e,r)},n.prototype.captureDomContentLoaded=function(t){return this.telemeter.captureDomContentLoaded(t)},n.prototype.captureLoad=function(t){return this.telemeter.captureLoad(t)},n.prototype.buildJsonPayload=function(t){return this.api.buildJsonPayload(t)},n.prototype.sendJsonPayload=function(t){this.api.postJsonPayload(t);},n.prototype._log=function(t,e){var r;if(e.callback&&(r=e.callback,delete e.callback),this._sameAsLastError(e)){if(r){var n=new Error("ignored identical item");n.item=e,r(n);}}else try{e.level=e.level||t,this.telemeter._captureRollbarItem(e),e.telemetryEvents=this.telemeter.copyEvents(),this.notifier.log(e,r);}catch(t){this.logger.error(t);}},n.prototype._defaultLogLevel=function(){return this.options.logLevel||"debug"},n.prototype._sameAsLastError=function(t){if(!t._isUncaught)return !1;var e=o(t);return this.lastErrorHash===e||(this.lastError=t.err,this.lastErrorHash=e,!1)},t.exports=n;},function(t,e,r){function n(t){this.startTime=s.now(),this.counter=0,this.perMinCounter=0,this.platform=null,this.platformOptions={},this.configureGlobal(t);}function o(t,e,r){return !t.ignoreRateLimit&&e>=1&&r>e}function i(t,e,r,n,o,i,s){var u=null;return r&&(r=new Error(r)),r||n||(u=a(t,e,o,i,s)),{error:r,shouldSend:n,payload:u}}function a(t,e,r,n,o){var i,a=e.environment||e.payload&&e.payload.environment;i=o?"item per minute limit reached, ignoring errors until timeout":"maxItems has been hit, ignoring errors until reset.";var s={body:{message:{body:i,extra:{maxItems:r,itemsPerMinute:n}}},language:"javascript",environment:a,notifier:{version:e.notifier&&e.notifier.version||e.version}};return "browser"===t?(s.platform="browser",s.framework="browser-js",s.notifier.name="rollbar-browser-js"):"server"===t?(s.framework=e.framework||"node-js",s.notifier.name=e.notifier.name):"react-native"===t&&(s.framework=e.framework||"react-native",s.notifier.name=e.notifier.name),s}var s=r(5);n.globalSettings={startTime:s.now(),maxItems:void 0,itemsPerMinute:void 0},n.prototype.configureGlobal=function(t){void 0!==t.startTime&&(n.globalSettings.startTime=t.startTime),void 0!==t.maxItems&&(n.globalSettings.maxItems=t.maxItems),void 0!==t.itemsPerMinute&&(n.globalSettings.itemsPerMinute=t.itemsPerMinute);},n.prototype.shouldSend=function(t,e){e=e||s.now();var r=e-this.startTime;(r<0||r>=6e4)&&(this.startTime=e,this.perMinCounter=0);var a=n.globalSettings.maxItems,u=n.globalSettings.itemsPerMinute;if(o(t,a,this.counter))return i(this.platform,this.platformOptions,a+" max items reached",!1);if(o(t,u,this.perMinCounter))return i(this.platform,this.platformOptions,u+" items per minute reached",!1);this.counter++,this.perMinCounter++;var c=!o(t,a,this.counter),l=c;return c=c&&!o(t,u,this.perMinCounter),i(this.platform,this.platformOptions,null,c,a,u,l)},n.prototype.setPlatformOptions=function(t,e){this.platform=t,this.platformOptions=e;},t.exports=n;},function(t,e,r){function n(){if(!q&&(q=!0,c(JSON)&&(s(JSON.stringify)&&(F.stringify=JSON.stringify),s(JSON.parse)&&(F.parse=JSON.parse)),!a(F.stringify)||!a(F.parse))){var t=r(7);t(F);}}function o(t,e){return e===i(t)}function i(t){var e=typeof t;return "object"!==e?e:t?t instanceof Error?"error":{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase():"null"}function a(t){return o(t,"function")}function s(t){var e=/[\\^$.*+?()[\]{}|]/g,r=Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(e,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?"),n=RegExp("^"+r+"$");return u(t)&&n.test(t)}function u(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function c(t){return !o(t,"undefined")}function l(t){var e=i(t);return "object"===e||"array"===e}function p(t){return o(t,"error")||o(t,"exception")}function f(t,e,r){var n,i,a,s=o(t,"object"),u=o(t,"array"),c=[];if(s&&r.indexOf(t)!==-1)return t;if(r.push(t),s)for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&c.push(n);else if(u)for(a=0;a<t.length;++a)c.push(a);var l=s?{}:[],p=!0;for(a=0;a<c.length;++a)n=c[a],i=t[n],l[n]=e(n,i,r),p=p&&l[n]===t[n];return 0==c.length||p?t:l}function h(){return "********"}function d(){var t=P(),e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var r=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===e?r:7&r|8).toString(16)});return e}function m(t){var e=g(t);return e?(""===e.anchor&&(e.source=e.source.replace("#","")),t=e.source.replace("?"+e.query,"")):"(unknown)"}function g(t){if(o(t,"string")){for(var e=M,r=e.parser["loose"].exec(t),n={},i=0,a=e.key.length;i<a;++i)n[e.key[i]]=r[i]||"";return n[e.q.name]={},n[e.key[12]].replace(e.q.parser,function(t,r,o){r&&(n[e.q.name][r]=o);}),n}}function v(t,e,r){r=r||{},r.access_token=t;var n,o=[];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&o.push([n,r[n]].join("="));var i="?"+o.sort().join("&");e=e||{},e.path=e.path||"";var a,s=e.path.indexOf("?"),u=e.path.indexOf("#");s!==-1&&(u===-1||u>s)?(a=e.path,e.path=a.substring(0,s)+i+"&"+a.substring(s+1)):u!==-1?(a=e.path,e.path=a.substring(0,u)+i+a.substring(u)):e.path=e.path+i;}function y(t,e){if(e=e||t.protocol,!e&&t.port&&(80===t.port?e="http:":443===t.port&&(e="https:")),e=e||"https:",!t.hostname)return null;var r=e+"//"+t.hostname;return t.port&&(r=r+":"+t.port),t.path&&(r+=t.path),r}function b(t,e){var r,n;try{r=F.stringify(t);}catch(o){if(e&&a(e))try{r=e(t);}catch(t){n=t;}else n=o;}return {error:n,value:r}}function w(t){var e,r;try{e=F.parse(t);}catch(t){r=t;}return {error:r,value:e}}function _(t,e,r,n,o,i,a,s){var u={url:e||"",line:r,column:n};u.func=s.guessFunctionName(u.url,u.line),u.context=s.gatherContext(u.url,u.line);var c=document&&document.location&&document.location.href,l=window&&window.navigator&&window.navigator.userAgent;return {mode:i,message:o?String(o):t||a,url:c,stack:[u],useragent:l}}function x(t,e){return function(r,n){try{e(r,n);}catch(e){t.error(e);}}}function k(t,e,r,n,o){for(var a,s,u,c,l,p,f=[],h=0,m=t.length;h<m;++h){p=t[h];var g=i(p);switch(g){case"undefined":break;case"string":a?f.push(p):a=p;break;case"function":c=x(e,p);break;case"date":f.push(p);break;case"error":case"domexception":case"exception":s?f.push(p):s=p;break;case"object":case"array":if(p instanceof Error||"undefined"!=typeof DOMException&&p instanceof DOMException){s?f.push(p):s=p;break}if(n&&"object"===g&&!l){for(var v=0,y=n.length;v<y;++v)if(void 0!==p[n[v]]){l=p;break}if(l)break}u?f.push(p):u=p;break;default:if(p instanceof Error||"undefined"!=typeof DOMException&&p instanceof DOMException){s?f.push(p):s=p;break}f.push(p);}}f.length>0&&(u=A(u),u.extraArgs=f);var b={message:a,err:s,custom:u,timestamp:P(),callback:c,uuid:d()};return u&&void 0!==u.level&&(b.level=u.level,delete u.level),n&&l&&(b.request=l),o&&(b.lambdaContext=o),b._originalArgs=t,b}function E(t,e){for(var r=0;r<t.length;++r)if(t[r]===e)return !0;return !1}function I(t){for(var e,r,n,o,a=0,s=t.length;a<s;++a){o=t[a];var u=i(o);switch(u){case"string":E(U,o)?e=o:E(H,o)&&(n=o);break;case"object":r=o;}}var c={type:e||"manual",metadata:r||{},level:n};return c}function T(t,e){if(t){var r=e.split("."),n=t;try{for(var o=0,i=r.length;o<i;++o)n=n[r[o]];}catch(t){n=void 0;}return n}}function S(t,e,r){if(t){var n=e.split("."),o=n.length;if(!(o<1)){if(1===o)return void(t[n[0]]=r);try{for(var i=t[n[0]]||{},a=i,s=1;s<o-1;++s)i[n[s]]=i[n[s]]||{},i=i[n[s]];i[n[o-1]]=r,t[n[0]]=a;}catch(t){return}}}}function O(t,e){function r(t,e){return e+h()}function n(t){var e;if(o(t,"string"))for(e=0;e<u.length;++e)t=t.replace(u[e],r);return t}function i(t,e){var r;for(r=0;r<s.length;++r)if(s[r].test(t)){e=h();break}return e}function a(t,e,r){var s=i(t,e);return s===e?o(e,"object")||o(e,"array")?f(e,a,r):n(s):s}e=e||[];var s=L(e),u=N(e);return f(t,a,[])}function L(t){for(var e,r=[],n=0;n<t.length;++n)e="^\\[?(%5[bB])?"+t[n]+"\\[?(%5[bB])?\\]?(%5[dD])?$",r.push(new RegExp(e,"i"));return r}function N(t){for(var e,r=[],n=0;n<t.length;++n)e="\\[?(%5[bB])?"+t[n]+"\\[?(%5[bB])?\\]?(%5[dD])?",r.push(new RegExp("("+e+"=)([^&\\n]+)","igm"));return r}function C(t){var e,r,n,o=[];for(e=0,r=t.length;e<r;++e){switch(n=t[e],i(n)){case"object":n=b(n),n=n.error||n.value,n.length>500&&(n=n.substr(0,497)+"...");break;case"null":n="null";break;case"undefined":n="undefined";break;case"symbol":n=n.toString();}o.push(n);}return o.join(" ")}function P(){return Date.now?+Date.now():+new Date}function j(t,e){if(t&&t.user_ip&&e!==!0){var r=t.user_ip;if(e)try{var n;if(r.indexOf(".")!==-1)n=r.split("."),n.pop(),n.push("0"),r=n.join(".");else if(r.indexOf(":")!==-1){if(n=r.split(":"),n.length>2){var o=n.slice(0,3),i=o[2].indexOf("/");i!==-1&&(o[2]=o[2].substring(0,i));var a="0000:0000:0000:0000:0000";r=o.concat(a).join(":");}}else r=null;}catch(t){r=null;}else r=null;t.user_ip=r;}}function R(t,e,r){var n=A(t,e,r);return !e||e.overwriteScrubFields?n:(e.scrubFields&&(n.scrubFields=(t.scrubFields||[]).concat(e.scrubFields)),n)}var A=r(6),F={},q=!1;n();var D={debug:0,info:1,warning:2,error:3,critical:4},M={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},U=["log","network","dom","navigation","error","manual"],H=["critical","error","warning","info","debug"];t.exports={addParamsAndAccessTokenToPath:v,createItem:k,createTelemetryEvent:I,filterIp:j,formatArgsAsString:C,formatUrl:y,get:T,handleOptions:R,isError:p,isFunction:a,isIterable:l,isNativeFunction:s,isType:o,jsonParse:w,LEVELS:D,makeUnhandledStackInfo:_,merge:A,now:P,redact:h,sanitizeUrl:m,scrub:O,set:S,stringify:b,traverse:f,typeName:i,uuid4:d};},function(t,e){function r(){var t,e,n,o,a,s={},u=null,c=arguments.length;for(t=0;t<c;t++)if(u=arguments[t],null!=u)for(a in u)e=s[a],n=u[a],s!==n&&(n&&i(n)?(o=e&&i(e)?e:{},s[a]=r(o,n)):"undefined"!=typeof n&&(s[a]=n));return s}var n=Object.prototype.hasOwnProperty,o=Object.prototype.toString,i=function(t){if(!t||"[object Object]"!==o.call(t))return !1;var e=n.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&n.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!e&&!r)return !1;var i;for(i in t);return "undefined"==typeof i||n.call(t,i)};t.exports=r;},function(t,e){var r=function(t){function e(t){return t<10?"0"+t:t}function r(){return this.valueOf()}function n(t){return i.lastIndex=0,i.test(t)?'"'+t.replace(i,function(t){var e=u[t];return "string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function o(t,e){var r,i,u,l,p,f=a,h=e[t];switch(h&&"object"==typeof h&&"function"==typeof h.toJSON&&(h=h.toJSON(t)),"function"==typeof c&&(h=c.call(e,t,h)),typeof h){case"string":return n(h);case"number":return isFinite(h)?String(h):"null";case"boolean":case"null":return String(h);case"object":if(!h)return "null";if(a+=s,p=[],"[object Array]"===Object.prototype.toString.apply(h)){for(l=h.length,r=0;r<l;r+=1)p[r]=o(r,h)||"null";return u=0===p.length?"[]":a?"[\n"+a+p.join(",\n"+a)+"\n"+f+"]":"["+p.join(",")+"]",a=f,u}if(c&&"object"==typeof c)for(l=c.length,r=0;r<l;r+=1)"string"==typeof c[r]&&(i=c[r],u=o(i,h),u&&p.push(n(i)+(a?": ":":")+u));else for(i in h)Object.prototype.hasOwnProperty.call(h,i)&&(u=o(i,h),u&&p.push(n(i)+(a?": ":":")+u));return u=0===p.length?"{}":a?"{\n"+a+p.join(",\n"+a)+"\n"+f+"}":"{"+p.join(",")+"}",a=f,u}}var i=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+e(this.getUTCMonth()+1)+"-"+e(this.getUTCDate())+"T"+e(this.getUTCHours())+":"+e(this.getUTCMinutes())+":"+e(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=r,Number.prototype.toJSON=r,String.prototype.toJSON=r);var a,s,u,c;"function"!=typeof t.stringify&&(u={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},t.stringify=function(t,e,r){var n;if(a="",s="","number"==typeof r)for(n=0;n<r;n+=1)s+=" ";else"string"==typeof r&&(s=r);if(c=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return o("",{"":t})}),"function"!=typeof t.parse&&(t.parse=function(){function t(t){return t.replace(/\\(?:u(.{4})|([^u]))/g,function(t,e,r){return e?String.fromCharCode(parseInt(e,16)):a[r]})}var e,r,n,o,i,a={"\\":"\\",'"':'"',"/":"/",t:"\t",n:"\n",r:"\r",f:"\f",b:"\b"},s={go:function(){e="ok";},firstokey:function(){o=i,e="colon";},okey:function(){o=i,e="colon";},ovalue:function(){e="ocomma";},firstavalue:function(){e="acomma";},avalue:function(){e="acomma";}},u={go:function(){e="ok";},ovalue:function(){e="ocomma";},firstavalue:function(){e="acomma";},avalue:function(){e="acomma";}},c={"{":{go:function(){r.push({state:"ok"}),n={},e="firstokey";},ovalue:function(){r.push({container:n,state:"ocomma",key:o}),n={},e="firstokey";},firstavalue:function(){r.push({container:n,state:"acomma"}),n={},e="firstokey";},avalue:function(){r.push({container:n,state:"acomma"}),n={},e="firstokey";}},"}":{firstokey:function(){var t=r.pop();i=n,n=t.container,o=t.key,e=t.state;},ocomma:function(){var t=r.pop();n[o]=i,i=n,n=t.container,o=t.key,e=t.state;}},"[":{go:function(){r.push({state:"ok"}),n=[],e="firstavalue";},ovalue:function(){r.push({container:n,state:"ocomma",key:o}),n=[],e="firstavalue";},firstavalue:function(){r.push({container:n,state:"acomma"}),n=[],e="firstavalue";},avalue:function(){r.push({container:n,state:"acomma"}),n=[],e="firstavalue";}},"]":{firstavalue:function(){var t=r.pop();i=n,n=t.container,o=t.key,e=t.state;},acomma:function(){var t=r.pop();n.push(i),i=n,n=t.container,o=t.key,e=t.state;}},":":{colon:function(){if(Object.hasOwnProperty.call(n,o))throw new SyntaxError("Duplicate key '"+o+'"');e="ovalue";}},",":{ocomma:function(){n[o]=i,e="okey";},acomma:function(){n.push(i),e="avalue";}},true:{go:function(){i=!0,e="ok";},ovalue:function(){i=!0,e="ocomma";},firstavalue:function(){i=!0,e="acomma";},avalue:function(){i=!0,e="acomma";}},false:{go:function(){i=!1,e="ok";},ovalue:function(){i=!1,e="ocomma";},firstavalue:function(){i=!1,e="acomma";},avalue:function(){i=!1,e="acomma";}},null:{go:function(){i=null,e="ok";},ovalue:function(){i=null,e="ocomma";},firstavalue:function(){i=null,e="acomma";},avalue:function(){i=null,e="acomma";}}};return function(n,o){var a,l=/^[\u0020\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;e="go",r=[];try{for(;;){if(a=l.exec(n),!a)break;a[1]?c[a[1]][e]():a[2]?(i=+a[2],u[e]()):(i=t(a[3]),s[e]()),n=n.slice(a[0].length);}}catch(t){e=t;}if("ok"!==e||/[^\u0020\t\n\r]/.test(n))throw e instanceof SyntaxError?e:new SyntaxError("JSON");return "function"==typeof o?function t(e,r){var n,a,s=e[r];if(s&&"object"==typeof s)for(n in i)Object.prototype.hasOwnProperty.call(s,n)&&(a=t(s,n),void 0!==a?s[n]=a:delete s[n]);return o.call(e,r,s)}({"":i},""):i}}());};t.exports=r;},function(t,e,r){function n(t,e,r,n){this.rateLimiter=t,this.api=e,this.logger=r,this.options=n,this.predicates=[],this.pendingItems=[],this.pendingRequests=[],this.retryQueue=[],this.retryHandle=null,this.waitCallback=null,this.waitIntervalID=null;}var o=r(5);n.prototype.configure=function(t){this.api&&this.api.configure(t);var e=this.options;return this.options=o.merge(e,t),this},n.prototype.addPredicate=function(t){return o.isFunction(t)&&this.predicates.push(t),this},n.prototype.addPendingItem=function(t){this.pendingItems.push(t);},n.prototype.removePendingItem=function(t){var e=this.pendingItems.indexOf(t);e!==-1&&this.pendingItems.splice(e,1);},n.prototype.addItem=function(t,e,r,n){e&&o.isFunction(e)||(e=function(){});var i=this._applyPredicates(t);if(i.stop)return this.removePendingItem(n),void e(i.err);this._maybeLog(t,r),this.removePendingItem(n),this.pendingRequests.push(t);try{this._makeApiRequest(t,function(r,n){this._dequeuePendingRequest(t),e(r,n);}.bind(this));}catch(r){this._dequeuePendingRequest(t),e(r);}},n.prototype.wait=function(t){o.isFunction(t)&&(this.waitCallback=t,this._maybeCallWait()||(this.waitIntervalID&&(this.waitIntervalID=clearInterval(this.waitIntervalID)),this.waitIntervalID=setInterval(function(){this._maybeCallWait();}.bind(this),500)));},n.prototype._applyPredicates=function(t){for(var e=null,r=0,n=this.predicates.length;r<n;r++)if(e=this.predicates[r](t,this.options),!e||void 0!==e.err)return {stop:!0,err:e.err};return {stop:!1,err:null}},n.prototype._makeApiRequest=function(t,e){var r=this.rateLimiter.shouldSend(t);r.shouldSend?this.api.postItem(t,function(r,n){r?this._maybeRetry(r,t,e):e(r,n);}.bind(this)):r.error?e(r.error):this.api.postItem(r.payload,e);};var i=["ECONNRESET","ENOTFOUND","ESOCKETTIMEDOUT","ETIMEDOUT","ECONNREFUSED","EHOSTUNREACH","EPIPE","EAI_AGAIN"];n.prototype._maybeRetry=function(t,e,r){var n=!1;if(this.options.retryInterval)for(var o=0,a=i.length;o<a;o++)if(t.code===i[o]){n=!0;break}n?this._retryApiRequest(e,r):r(t);},n.prototype._retryApiRequest=function(t,e){this.retryQueue.push({item:t,callback:e}),this.retryHandle||(this.retryHandle=setInterval(function(){for(;this.retryQueue.length;){var t=this.retryQueue.shift();this._makeApiRequest(t.item,t.callback);}}.bind(this),this.options.retryInterval));},n.prototype._dequeuePendingRequest=function(t){var e=this.pendingRequests.indexOf(t);e!==-1&&(this.pendingRequests.splice(e,1),this._maybeCallWait());},n.prototype._maybeLog=function(t,e){if(this.logger&&this.options.verbose){var r=e;if(r=r||o.get(t,"body.trace.exception.message"),r=r||o.get(t,"body.trace_chain.0.exception.message"))return void this.logger.error(r);r=o.get(t,"body.message.body"),r&&this.logger.log(r);}},n.prototype._maybeCallWait=function(){return !(!o.isFunction(this.waitCallback)||0!==this.pendingItems.length||0!==this.pendingRequests.length)&&(this.waitIntervalID&&(this.waitIntervalID=clearInterval(this.waitIntervalID)),this.waitCallback(),!0)},t.exports=n;},function(t,e,r){function n(t,e){this.queue=t,this.options=e,this.transforms=[];}var o=r(5);n.prototype.configure=function(t){this.queue&&this.queue.configure(t);var e=this.options;return this.options=o.merge(e,t),this},n.prototype.addTransform=function(t){return o.isFunction(t)&&this.transforms.push(t),this},n.prototype.log=function(t,e){if(e&&o.isFunction(e)||(e=function(){}),!this.options.enabled)return e(new Error("Rollbar is not enabled"));this.queue.addPendingItem(t);var r=t.err;this._applyTransforms(t,function(n,o){return n?(this.queue.removePendingItem(t),e(n,null)):void this.queue.addItem(o,e,r,t)}.bind(this));},n.prototype._applyTransforms=function(t,e){var r=-1,n=this.transforms.length,o=this.transforms,i=this.options,a=function(t,s){return t?void e(t,null):(r++,r===n?void e(null,s):void o[r](s,i,a))};a(null,t);},t.exports=n;},function(t,e,r){function n(t){this.queue=[],this.options=i.merge(t);var e=this.options.maxTelemetryEvents||a;this.maxQueueSize=Math.max(0,Math.min(e,a));}function o(t,e){if(e)return e;var r={error:"error",manual:"info"};return r[t]||"info"}var i=r(5),a=100;n.prototype.configure=function(t){var e=this.options;this.options=i.merge(e,t);var r=this.options.maxTelemetryEvents||a,n=Math.max(0,Math.min(r,a)),o=0;this.maxQueueSize>n&&(o=this.maxQueueSize-n),this.maxQueueSize=n,this.queue.splice(0,o);},n.prototype.copyEvents=function(){var t=Array.prototype.slice.call(this.queue,0);if(i.isFunction(this.options.filterTelemetry))try{for(var e=t.length;e--;)this.options.filterTelemetry(t[e])&&t.splice(e,1);}catch(t){this.options.filterTelemetry=null;}return t},n.prototype.capture=function(t,e,r,n,a){var s={level:o(t,r),type:t,timestamp_ms:a||i.now(),body:e,source:"client"};n&&(s.uuid=n);try{if(i.isFunction(this.options.filterTelemetry)&&this.options.filterTelemetry(s))return !1}catch(t){this.options.filterTelemetry=null;}return this.push(s),s},n.prototype.captureEvent=function(t,e,r,n){return this.capture(t,e,r,n)},n.prototype.captureError=function(t,e,r,n){var o={message:t.message||String(t)};return t.stack&&(o.stack=t.stack),this.capture("error",o,e,r,n)},n.prototype.captureLog=function(t,e,r,n){return this.capture("log",{message:t},e,r,n)},n.prototype.captureNetwork=function(t,e,r,n){e=e||"xhr",t.subtype=t.subtype||e,n&&(t.request=n);var o=this.levelFromStatus(t.status_code);return this.capture("network",t,o,r)},n.prototype.levelFromStatus=function(t){return t>=200&&t<400?"info":0===t||t>=400?"error":"info"},n.prototype.captureDom=function(t,e,r,n,o){var i={subtype:t,element:e};return void 0!==r&&(i.value=r),void 0!==n&&(i.checked=n),this.capture("dom",i,"info",o)},n.prototype.captureNavigation=function(t,e,r){return this.capture("navigation",{from:t,to:e},"info",r)},n.prototype.captureDomContentLoaded=function(t){return this.capture("navigation",{subtype:"DOMContentLoaded"},"info",void 0,t&&t.getTime())},n.prototype.captureLoad=function(t){return this.capture("navigation",{subtype:"load"},"info",void 0,t&&t.getTime())},n.prototype.captureConnectivityChange=function(t,e){return this.captureNetwork({change:t},"connectivity",e)},n.prototype._captureRollbarItem=function(t){if(this.options.includeItemsInTelemetry)return t.err?this.captureError(t.err,t.level,t.uuid,t.timestamp):t.message?this.captureLog(t.message,t.level,t.uuid,t.timestamp):t.custom?this.capture("log",t.custom,t.level,t.uuid,t.timestamp):void 0},n.prototype.push=function(t){this.queue.push(t),this.queue.length>this.maxQueueSize&&this.queue.shift();},t.exports=n;},function(t,e,r){function n(t,e,r,n){this.options=t,this.transport=e,this.url=r,this.jsonBackup=n,this.accessToken=t.accessToken,this.transportOptions=o(t,r);}function o(t,e){return a.getTransportFromOptions(t,u,e)}var i=r(5),a=r(12),s=r(13),u={hostname:"api.rollbar.com",path:"/api/1/item/",search:null,version:"1",protocol:"https:",port:443};n.prototype.postItem=function(t,e){var r=a.transportOptions(this.transportOptions,"POST"),n=a.buildPayload(this.accessToken,t,this.jsonBackup);this.transport.post(this.accessToken,r,n,e);},n.prototype.buildJsonPayload=function(t,e){var r=a.buildPayload(this.accessToken,t,this.jsonBackup),n=s.truncate(r);return n.error?(e&&e(n.error),null):n.value},n.prototype.postJsonPayload=function(t,e){var r=a.transportOptions(this.transportOptions,"POST");this.transport.postJsonPayload(this.accessToken,r,t,e);},n.prototype.configure=function(t){var e=this.oldOptions;
  return this.options=i.merge(e,t),this.transportOptions=o(this.options,this.url),void 0!==this.options.accessToken&&(this.accessToken=this.options.accessToken),this},t.exports=n;},function(t,e,r){function n(t,e,r){if(!s.isType(e.context,"string")){var n=s.stringify(e.context,r);n.error?e.context="Error: could not serialize 'context'":e.context=n.value||"",e.context.length>255&&(e.context=e.context.substr(0,255));}return {access_token:t,data:e}}function o(t,e,r){var n=e.hostname,o=e.protocol,i=e.port,a=e.path,s=e.search,u=t.proxy;if(t.endpoint){var c=r.parse(t.endpoint);n=c.hostname,o=c.protocol,i=c.port,a=c.pathname,s=c.search;}return {hostname:n,protocol:o,port:i,path:a,search:s,proxy:u}}function i(t,e){var r=t.protocol||"https:",n=t.port||("http:"===r?80:"https:"===r?443:void 0),o=t.hostname,i=t.path;return t.search&&(i+=t.search),t.proxy&&(i=r+"//"+o+i,o=t.proxy.host||t.proxy.hostname,n=t.proxy.port,r=t.proxy.protocol||r),{protocol:r,hostname:o,path:i,port:n,method:e}}function a(t,e){var r=/\/$/.test(t),n=/^\//.test(e);return r&&n?e=e.substring(1):r||n||(e="/"+e),t+e}var s=r(5);t.exports={buildPayload:n,getTransportFromOptions:o,transportOptions:i,appendPathToPath:a};},function(t,e,r){function n(t,e){return [t,f.stringify(t,e)]}function o(t,e){var r=t.length;return r>2*e?t.slice(0,e).concat(t.slice(r-e)):t}function i(t,e,r){r="undefined"==typeof r?30:r;var n,i=t.data.body;if(i.trace_chain)for(var a=i.trace_chain,s=0;s<a.length;s++)n=a[s].frames,n=o(n,r),a[s].frames=n;else i.trace&&(n=i.trace.frames,n=o(n,r),i.trace.frames=n);return [t,f.stringify(t,e)]}function a(t,e){return e&&e.length>t?e.slice(0,t-3).concat("..."):e}function s(t,e,r){function n(e,r,o){switch(f.typeName(r)){case"string":return a(t,r);case"object":case"array":return f.traverse(r,n,o);default:return r}}return e=f.traverse(e,n,[]),[e,f.stringify(e,r)]}function u(t){return t.exception&&(delete t.exception.description,t.exception.message=a(255,t.exception.message)),t.frames=o(t.frames,1),t}function c(t,e){var r=t.data.body;if(r.trace_chain)for(var n=r.trace_chain,o=0;o<n.length;o++)n[o]=u(n[o]);else r.trace&&(r.trace=u(r.trace));return [t,f.stringify(t,e)]}function l(t,e){return t.length>e}function p(t,e,r){r="undefined"==typeof r?524288:r;for(var o,a,u,p=[n,i,s.bind(null,1024),s.bind(null,512),s.bind(null,256),c];o=p.shift();)if(a=o(t,e),t=a[0],u=a[1],u.error||!l(u.value,r))return u;return u}var f=r(5);t.exports={truncate:p,raw:n,truncateFrames:i,truncateStrings:s,maybeTruncateValue:a};},function(t,e,r){function n(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.error(s.formatArgsAsString(t)):console.error.apply(console,t);}function o(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.info(s.formatArgsAsString(t)):console.info.apply(console,t);}function i(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.log(s.formatArgsAsString(t)):console.log.apply(console,t);}r(15);var a=r(16),s=r(5);t.exports={error:n,info:o,log:i};},function(t,e){!function(t){t.console||(t.console={});for(var e,r,n=t.console,o=function(){},i=["memory"],a="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(",");e=i.pop();)n[e]||(n[e]={});for(;r=a.pop();)n[r]||(n[r]=o);}("undefined"==typeof window?this:window);},function(t,e){function r(){var t;if(!document)return t;for(var e=3,r=document.createElement("div"),n=r.getElementsByTagName("i");r.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->",n[0];);return e>4?e:t}var n={ieVersion:r};t.exports=n;},function(t,e){function r(t,e,r){if(t){var o;if("function"==typeof e._rollbarOldOnError)o=e._rollbarOldOnError;else if(t.onerror){for(o=t.onerror;o._rollbarOldOnError;)o=o._rollbarOldOnError;e._rollbarOldOnError=o;}var i=function(){var r=Array.prototype.slice.call(arguments,0);n(t,e,o,r);};r&&(i._rollbarOldOnError=o),t.onerror=i;}}function n(t,e,r,n){t._rollbarWrappedError&&(n[4]||(n[4]=t._rollbarWrappedError),n[5]||(n[5]=t._rollbarWrappedError._rollbarContext),t._rollbarWrappedError=null),e.handleUncaughtException.apply(e,n),r&&r.apply(t,n);}function o(t,e,r){if(t){"function"==typeof t._rollbarURH&&t._rollbarURH.belongsToShim&&t.removeEventListener("unhandledrejection",t._rollbarURH);var n=function(t){var r,n,o;try{r=t.reason;}catch(t){r=void 0;}try{n=t.promise;}catch(t){n="[unhandledrejection] error getting `promise` from event";}try{o=t.detail,!r&&o&&(r=o.reason,n=o.promise);}catch(t){}r||(r="[unhandledrejection] error getting `reason` from event"),e&&e.handleUnhandledRejection&&e.handleUnhandledRejection(r,n);};n.belongsToShim=r,t._rollbarURH=n,t.addEventListener("unhandledrejection",n);}}function i(t,e,r){if(t){var n,o,i="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(n=0;n<i.length;++n)o=i[n],t[o]&&t[o].prototype&&a(e,t[o].prototype,r);}}function a(t,e,r){if(e.hasOwnProperty&&e.hasOwnProperty("addEventListener")){for(var n=e.addEventListener;n._rollbarOldAdd&&n.belongsToShim;)n=n._rollbarOldAdd;var o=function(e,r,o){n.call(this,e,t.wrap(r),o);};o._rollbarOldAdd=n,o.belongsToShim=r,e.addEventListener=o;for(var i=e.removeEventListener;i._rollbarOldRemove&&i.belongsToShim;)i=i._rollbarOldRemove;var a=function(t,e,r){i.call(this,t,e&&e._rollbar_wrapped||e,r);};a._rollbarOldRemove=i,a.belongsToShim=r,e.removeEventListener=a;}}t.exports={captureUncaughtExceptions:r,captureUnhandledRejections:o,wrapGlobals:i};},function(t,e,r){function n(t,e,r,n,o){n&&h.isFunction(n)||(n=function(){}),h.addParamsAndAccessTokenToPath(t,e,r);var i="GET",s=h.formatUrl(e);a(t,s,i,null,n,o);}function o(t,e,r,n,o){if(n&&h.isFunction(n)||(n=function(){}),!r)return n(new Error("Cannot send empty request"));var i=d.truncate(r);if(i.error)return n(i.error);var s=i.value,u="POST",c=h.formatUrl(e);a(t,c,u,s,n,o);}function i(t,e,r,n,o){n&&h.isFunction(n)||(n=function(){});var i="POST",s=h.formatUrl(e);a(t,s,i,r,n,o);}function a(t,e,r,n,o,i){var a="undefined"!=typeof window&&window||"undefined"!=typeof self&&self,s=a&&a.Zone&&a.Zone.current;if(s&&"angular"===s._name){var c=s._parent;c.run(function(){u(t,e,r,n,o,i);});}else u(t,e,r,n,o,i);}function s(t,e){var r=new RollbarProxy;r.sendJsonPayload(t,function(t){},function(t){e(new Error(t));});}function u(t,e,r,n,o,i){if("undefined"!=typeof RollbarProxy)return s(n,o);var a;if(a=i?i():c(),!a)return o(new Error("No way to send a request"));try{try{var u=function(){try{if(u&&4===a.readyState){u=void 0;var t=h.jsonParse(a.responseText);if(l(a))return void o(t.error,t.value);if(p(a)){if(403===a.status){var e=t.value&&t.value.message;m.error(e);}o(new Error(String(a.status)));}else{var r="XHR response had no status code (likely connection failure)";o(f(r));}}}catch(t){var n;n=t&&t.stack?t:new Error(t),o(n);}};a.open(r,e,!0),a.setRequestHeader&&(a.setRequestHeader("Content-Type","application/json"),a.setRequestHeader("X-Rollbar-Access-Token",t)),a.onreadystatechange=u,a.send(n);}catch(t){if("undefined"!=typeof XDomainRequest){if(!window||!window.location)return o(new Error("No window available during request, unknown environment"));"http:"===window.location.href.substring(0,5)&&"https"===e.substring(0,5)&&(e="http"+e.substring(5));var d=new XDomainRequest;d.onprogress=function(){},d.ontimeout=function(){var t="Request timed out",e="ETIMEDOUT";o(f(t,e));},d.onerror=function(){o(new Error("Error during request"));},d.onload=function(){var t=h.jsonParse(d.responseText);o(t.error,t.value);},d.open(r,e,!0),d.send(n);}else o(new Error("Cannot find a method to transport a request"));}}catch(t){o(t);}}function c(){var t,e,r=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],n=r.length;for(e=0;e<n;e++)try{t=r[e]();break}catch(t){}return t}function l(t){return t&&t.status&&200===t.status}function p(t){return t&&h.isType(t.status,"number")&&t.status>=400&&t.status<600}function f(t,e){var r=new Error(t);return r.code=e||"ENOTFOUND",r}var h=r(5),d=r(13),m=r(14);t.exports={get:n,post:o,postJsonPayload:i};},function(t,e){function r(t){var e,r,n={protocol:null,auth:null,host:null,path:null,hash:null,href:t,hostname:null,port:null,pathname:null,search:null,query:null};if(e=t.indexOf("//"),e!==-1?(n.protocol=t.substring(0,e),r=e+2):r=0,e=t.indexOf("@",r),e!==-1&&(n.auth=t.substring(r,e),r=e+1),e=t.indexOf("/",r),e===-1){if(e=t.indexOf("?",r),e===-1)return e=t.indexOf("#",r),e===-1?n.host=t.substring(r):(n.host=t.substring(r,e),n.hash=t.substring(e)),n.hostname=n.host.split(":")[0],n.port=n.host.split(":")[1],n.port&&(n.port=parseInt(n.port,10)),n;n.host=t.substring(r,e),n.hostname=n.host.split(":")[0],n.port=n.host.split(":")[1],n.port&&(n.port=parseInt(n.port,10)),r=e;}else n.host=t.substring(r,e),n.hostname=n.host.split(":")[0],n.port=n.host.split(":")[1],n.port&&(n.port=parseInt(n.port,10)),r=e;if(e=t.indexOf("#",r),e===-1?n.path=t.substring(r):(n.path=t.substring(r,e),n.hash=t.substring(e)),n.path){var o=n.path.split("?");n.pathname=o[0],n.query=o[1],n.search=n.query?"?"+n.query:null;}return n}t.exports={parse:r};},function(t,e,r){function n(t,e,r){if(t.data=t.data||{},t.err)try{t.stackInfo=t.err._savedStackTrace||d.parse(t.err);}catch(e){m.error("Error while parsing the error object.",e);try{t.message=t.err.message||t.err.description||t.message||String(t.err);}catch(e){t.message=String(t.err)||String(e);}delete t.err;}r(null,t);}function o(t,e,r){t.message||t.stackInfo||t.custom||r(new Error("No message, stack info, or custom data"),null),r(null,t);}function i(t,e,r){var n=e.payload&&e.payload.environment||e.environment;t.data=h.merge(t.data,{environment:n,level:t.level,endpoint:e.endpoint,platform:"browser",framework:"browser-js",language:"javascript",server:{},uuid:t.uuid,notifier:{name:"rollbar-browser-js",version:e.version}}),r(null,t);}function a(t){return function(e,r,n){if(!t||!t.location)return n(null,e);var o="$remote_ip";r.captureIp?r.captureIp!==!0&&(o+="_anonymize"):o=null,h.set(e,"data.request",{url:t.location.href,query_string:t.location.search,user_ip:o}),n(null,e);}}function s(t){return function(e,r,n){if(!t)return n(null,e);var o=t.navigator||{},i=t.screen||{};h.set(e,"data.client",{runtime_ms:e.timestamp-t._rollbarStartTime,timestamp:Math.round(e.timestamp/1e3),javascript:{browser:o.userAgent,language:o.language,cookie_enabled:o.cookieEnabled,screen:{width:i.width,height:i.height}}}),n(null,e);}}function u(t){return function(e,r,n){if(!t||!t.navigator)return n(null,e);for(var o,i=[],a=t.navigator.plugins||[],s=0,u=a.length;s<u;++s)o=a[s],i.push({name:o.name,description:o.description});h.set(e,"data.client.javascript.plugins",i),n(null,e);}}function c(t,e,r){t.stackInfo?p(t,e,r):l(t,e,r);}function l(t,e,r){var n=t.message,o=t.custom;if(!n)if(o){var i=e.scrubFields,a=h.stringify(h.scrub(o,i));n=a.error||a.value||"";}else n="";var s={body:n};o&&(s.extra=h.merge(o)),h.set(t,"data.body",{message:s}),r(null,t);}function p(t,e,r){var n=t.data.description,o=t.stackInfo,i=t.custom,a=d.guessErrorClass(o.message),s=o.name||a[0],u=a[1],c={exception:{class:s,message:u}};n&&(c.exception.description=n);var p=o.stack;if(p&&0===p.length&&t._unhandledStackInfo&&t._unhandledStackInfo.stack&&(p=t._unhandledStackInfo.stack),p){0===p.length&&(c.exception.stack=o.rawStack,c.exception.raw=String(o.rawException));var f,m,g,v,y,b,w,_;for(c.frames=[],w=0;w<p.length;++w)f=p[w],m={filename:f.url?h.sanitizeUrl(f.url):"(unknown)",lineno:f.line||null,method:f.func&&"?"!==f.func?f.func:"[anonymous]",colno:f.column},e.sendFrameUrl&&(m.url=f.url),m.method&&m.method.endsWith&&m.method.endsWith("_rollbar_wrapped")||(g=v=y=null,b=f.context?f.context.length:0,b&&(_=Math.floor(b/2),v=f.context.slice(0,_),g=f.context[_],y=f.context.slice(_)),g&&(m.code=g),(v||y)&&(m.context={},v&&v.length&&(m.context.pre=v),y&&y.length&&(m.context.post=y)),f.args&&(m.args=f.args),c.frames.push(m));c.frames.reverse(),i&&(c.extra=h.merge(i)),h.set(t,"data.body",{trace:c}),r(null,t);}else t.message=s+": "+u,l(t,e,r);}function f(t,e,r){var n=e.scrubFields;t.data=h.scrub(t.data,n),r(null,t);}var h=r(5),d=r(21),m=r(14);t.exports={handleItemWithError:n,ensureItemHasSomethingToSay:o,addBaseInfo:i,addRequestInfo:a,addClientInfo:s,addPluginInfo:u,addBody:c,scrubPayload:f};},function(t,e,r){function n(){return l}function o(){return null}function i(t){var e={};return e._stackFrame=t,e.url=t.fileName,e.line=t.lineNumber,e.func=t.functionName,e.column=t.columnNumber,e.args=t.args,e.context=o(),e}function a(t){function e(){var e,r=[];if(t.stack)e=t;else try{throw t}catch(t){e=t;}try{r=c.parse(e);}catch(t){r=[];}for(var n=[],o=0;o<r.length;o++)n.push(new i(r[o]));return n}var r=t.constructor&&t.constructor.name;return (!r||!r.length||r.length<3)&&(r=t.name),{stack:e(),message:t.message,name:r,rawStack:t.stack,rawException:t}}function s(t){return new a(t)}function u(t){if(!t||!t.match)return ["Unknown error. There was no error message to display.",""];var e=t.match(p),r="(unknown)";return e&&(r=e[e.length-1],t=t.replace((e[e.length-2]||"")+r+":",""),t=t.replace(/(^[\s]+|[\s]+$)/g,"")),[r,t]}var c=r(22),l="?",p=new RegExp("^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ");t.exports={guessFunctionName:n,guessErrorClass:u,gatherContext:o,parse:s,Stack:a,Frame:i};},function(t,e,r){var n,o,i;!function(a,s){o=[r(23)],n=s,i="function"==typeof n?n.apply(e,o):n,!(void 0!==i&&(t.exports=i));}(this,function(t){function e(t,e,r){if("function"==typeof Array.prototype.map)return t.map(e,r);for(var n=new Array(t.length),o=0;o<t.length;o++)n[o]=e.call(r,t[o]);return n}function r(t,e,r){if("function"==typeof Array.prototype.filter)return t.filter(e,r);for(var n=[],o=0;o<t.length;o++)e.call(r,t[o])&&n.push(t[o]);return n}var n=/(^|@)\S+\:\d+/,o=/^\s*at .*(\S+\:\d+|\(native\))/m,i=/^(eval@)?(\[native code\])?$/;return {parse:function(t){if("undefined"!=typeof t.stacktrace||"undefined"!=typeof t["opera#sourceloc"])return this.parseOpera(t);if(t.stack&&t.stack.match(o))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},extractLocation:function(t){if(t.indexOf(":")===-1)return [t];var e=t.replace(/[\(\)\s]/g,"").split(":"),r=e.pop(),n=e[e.length-1];if(!isNaN(parseFloat(n))&&isFinite(n)){var o=e.pop();return [e.join(":"),o,r]}return [e.join(":"),r,void 0]},parseV8OrIE:function(n){var i=r(n.stack.split("\n"),function(t){return !!t.match(o)},this);return e(i,function(e){e.indexOf("(eval ")>-1&&(e=e.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var r=e.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),n=this.extractLocation(r.pop()),o=r.join(" ")||void 0,i="eval"===n[0]?void 0:n[0];return new t(o,void 0,i,n[1],n[2],e)},this)},parseFFOrSafari:function(n){var o=r(n.stack.split("\n"),function(t){return !t.match(i)},this);return e(o,function(e){if(e.indexOf(" > eval")>-1&&(e=e.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":$1")),e.indexOf("@")===-1&&e.indexOf(":")===-1)return new t(e);var r=e.split("@"),n=this.extractLocation(r.pop()),o=r.shift()||void 0;return new t(o,void 0,n[0],n[1],n[2],e)},this)},parseOpera:function(t){return !t.stacktrace||t.message.indexOf("\n")>-1&&t.message.split("\n").length>t.stacktrace.split("\n").length?this.parseOpera9(t):t.stack?this.parseOpera11(t):this.parseOpera10(t)},parseOpera9:function(e){for(var r=/Line (\d+).*script (?:in )?(\S+)/i,n=e.message.split("\n"),o=[],i=2,a=n.length;i<a;i+=2){var s=r.exec(n[i]);s&&o.push(new t(void 0,void 0,s[2],s[1],void 0,n[i]));}return o},parseOpera10:function(e){for(var r=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,n=e.stacktrace.split("\n"),o=[],i=0,a=n.length;i<a;i+=2){var s=r.exec(n[i]);s&&o.push(new t(s[3]||void 0,void 0,s[2],s[1],void 0,n[i]));}return o},parseOpera11:function(o){var i=r(o.stack.split("\n"),function(t){return !!t.match(n)&&!t.match(/^Error created at/)},this);return e(i,function(e){var r,n=e.split("@"),o=this.extractLocation(n.pop()),i=n.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(r=i.replace(/^[^\(]+\(([^\)]*)\)$/,"$1"));var s=void 0===r||"[arguments not available]"===r?void 0:r.split(",");return new t(a,s,o[0],o[1],o[2],e)},this)}}});},function(t,e,r){var n,o,i;!function(r,a){o=[],n=a,i="function"==typeof n?n.apply(e,o):n,!(void 0!==i&&(t.exports=i));}(this,function(){function t(t){return !isNaN(parseFloat(t))&&isFinite(t)}function e(t,e,r,n,o,i){void 0!==t&&this.setFunctionName(t),void 0!==e&&this.setArgs(e),void 0!==r&&this.setFileName(r),void 0!==n&&this.setLineNumber(n),void 0!==o&&this.setColumnNumber(o),void 0!==i&&this.setSource(i);}return e.prototype={getFunctionName:function(){return this.functionName},setFunctionName:function(t){this.functionName=String(t);},getArgs:function(){return this.args},setArgs:function(t){if("[object Array]"!==Object.prototype.toString.call(t))throw new TypeError("Args must be an Array");this.args=t;},getFileName:function(){return this.fileName},setFileName:function(t){this.fileName=String(t);},getLineNumber:function(){return this.lineNumber},setLineNumber:function(e){if(!t(e))throw new TypeError("Line Number must be a Number");this.lineNumber=Number(e);},getColumnNumber:function(){return this.columnNumber},setColumnNumber:function(e){if(!t(e))throw new TypeError("Column Number must be a Number");this.columnNumber=Number(e);},getSource:function(){return this.source},setSource:function(t){this.source=String(t);},toString:function(){var e=this.getFunctionName()||"{anonymous}",r="("+(this.getArgs()||[]).join(",")+")",n=this.getFileName()?"@"+this.getFileName():"",o=t(this.getLineNumber())?":"+this.getLineNumber():"",i=t(this.getColumnNumber())?":"+this.getColumnNumber():"";return e+r+n+o+i}},e});},function(t,e,r){function n(t,e,r){var n=e.payload||{};n.body&&delete n.body;var o=u.merge(t.data,n);t._isUncaught&&(o._isUncaught=!0),t._originalArgs&&(o._originalArgs=t._originalArgs),r(null,o);}function o(t,e,r){t.telemetryEvents&&u.set(t,"data.body.telemetry",t.telemetryEvents),r(null,t);}function i(t,e,r){if(!t.message)return void r(null,t);var n="data.body.trace_chain.0",o=u.get(t,n);if(o||(n="data.body.trace",o=u.get(t,n)),o){if(!o.exception||!o.exception.description)return u.set(t,n+".exception.description",t.message),void r(null,t);var i=u.get(t,n+".extra")||{},a=u.merge(i,{message:t.message});u.set(t,n+".extra",a);}r(null,t);}function a(t){return function(e,r,n){var o=u.merge(e);try{u.isFunction(r.transform)&&r.transform(o.data,e);}catch(o){return r.transform=null,t.error("Error while calling custom transform() function. Removing custom transform().",o),void n(null,e)}n(null,o);}}function s(t,e,r){if(!e.sendConfig)return r(null,t);var n="_rollbarConfig",o=u.get(t,"data.custom")||{};o[n]=e,t.data.custom=o,r(null,t);}var u=r(5);t.exports={itemToPayload:n,addTelemetryData:o,addMessageWithError:i,userTransform:a,addConfigToPayload:s};},function(t,e,r){function n(t,e){return !o.get(e,"plugins.jquery.ignoreAjaxErrors")||!o.get(t,"body.message.extra.isAjax")}var o=r(5);t.exports={checkIgnore:n};},function(t,e,r){function n(t,e){var r=t.level,n=c.LEVELS[r]||0,o=e.reportLevel,i=c.LEVELS[o]||0;return !(n<i)}function o(t){return function(e,r){var n=!!e._isUncaught;delete e._isUncaught;var o=e._originalArgs;delete e._originalArgs;try{c.isFunction(r.onSendCallback)&&r.onSendCallback(n,o,e);}catch(e){r.onSendCallback=null,t.error("Error while calling onSendCallback, removing",e);}try{if(c.isFunction(r.checkIgnore)&&r.checkIgnore(n,o,e))return !1}catch(e){r.checkIgnore=null,t.error("Error while calling custom checkIgnore(), removing",e);}return !0}}function i(t){return function(e,r){return !s(e,r,"blacklist",t)}}function a(t){return function(e,r){return s(e,r,"whitelist",t)}}function s(t,e,r,n){var o=!1;"blacklist"===r&&(o=!0);var i,a,s,u,l,p,f,h,d,m;try{if(i=o?e.hostBlackList:e.hostWhiteList,f=i&&i.length,a=c.get(t,"body.trace"),!i||0===f)return !o;if(!a||!a.frames||0===a.frames.length)return !o;for(l=a.frames.length,d=0;d<l;d++){if(s=a.frames[d],u=s.filename,!c.isType(u,"string"))return !o;for(m=0;m<f;m++)if(p=i[m],h=new RegExp(p),h.test(u))return !0}}catch(t){o?e.hostBlackList=null:e.hostWhiteList=null;var g=o?"hostBlackList":"hostWhiteList";return n.error("Error while reading your configuration's "+g+" option. Removing custom "+g+".",t),!o}return !1}function u(t){return function(e,r){var n,o,i,a,s,u,l,p,f;try{if(s=!1,i=r.ignoredMessages,!i||0===i.length)return !0;if(l=e.body,p=c.get(l,"trace.exception.message"),f=c.get(l,"message.body"),n=p||f,!n)return !0;for(a=i.length,o=0;o<a&&(u=new RegExp(i[o],"gi"),!(s=u.test(n)));o++);}catch(e){r.ignoredMessages=null,t.error("Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.");}return !s}}var c=r(5);t.exports={checkLevel:n,userCheckIgnore:o,urlIsNotBlacklisted:i,urlIsWhitelisted:a,messageIsIgnored:u};},function(t,e,r){function n(t,e,r,n,o){var i=t[e];t[e]=r(i),n&&n[o].push([t,e,i]);}function o(t,e){for(var r;t[e].length;)r=t[e].shift(),r[0][r[1]]=r[2];}function i(t){if(!t||!t.attributes)return null;for(var e=t.attributes,r=0;r<e.length;++r)if("name"===e[r].key)return e[r].value;return null}function a(t){for(var e=[],r=0;r<t.length;++r)e.push(new RegExp(t[r],"i"));return function(t){var r=i(t);if(!r)return !1;for(var n=0;n<e.length;++n)if(e[n].test(r))return !0;return !1}}function s(t,e,r,n,o){var i=t.autoInstrument;t.enabled===!1||i===!1?this.autoInstrument={}:(u.isType(i,"object")||(i=p),this.autoInstrument=u.merge(p,i)),this.scrubTelemetryInputs=!!t.scrubTelemetryInputs,this.telemetryScrubber=t.telemetryScrubber,this.defaultValueScrubber=a(t.scrubFields),this.telemeter=e,this.rollbar=r,this._window=n||{},this._document=o||{},this.replacements={network:[],log:[],navigation:[],connectivity:[]},this.eventRemovers={dom:[],connectivity:[]},this._location=this._window.location,this._lastHref=this._location&&this._location.href;}var u=r(5),c=r(19),l=r(28),p={network:!0,networkResponseHeaders:!1,networkResponseBody:!1,networkRequestBody:!1,log:!0,dom:!0,navigation:!0,connectivity:!0};s.prototype.configure=function(t){var e=t.autoInstrument,r=u.merge(this.autoInstrument);t.enabled===!1||e===!1?this.autoInstrument={}:(u.isType(e,"object")||(e=p),this.autoInstrument=u.merge(p,e)),this.instrument(r),void 0!==t.scrubTelemetryInputs&&(this.scrubTelemetryInputs=!!t.scrubTelemetryInputs),void 0!==t.telemetryScrubber&&(this.telemetryScrubber=t.telemetryScrubber);},s.prototype.instrument=function(t){!this.autoInstrument.network||t&&t.network?!this.autoInstrument.network&&t&&t.network&&this.deinstrumentNetwork():this.instrumentNetwork(),!this.autoInstrument.log||t&&t.log?!this.autoInstrument.log&&t&&t.log&&this.deinstrumentConsole():this.instrumentConsole(),!this.autoInstrument.dom||t&&t.dom?!this.autoInstrument.dom&&t&&t.dom&&this.deinstrumentDom():this.instrumentDom(),!this.autoInstrument.navigation||t&&t.navigation?!this.autoInstrument.navigation&&t&&t.navigation&&this.deinstrumentNavigation():this.instrumentNavigation(),!this.autoInstrument.connectivity||t&&t.connectivity?!this.autoInstrument.connectivity&&t&&t.connectivity&&this.deinstrumentConnectivity():this.instrumentConnectivity();},s.prototype.deinstrumentNetwork=function(){o(this.replacements,"network");},s.prototype.instrumentNetwork=function(){function t(t,r){t in r&&u.isFunction(r[t])&&n(r,t,function(t){return e.rollbar.wrap(t)});}var e=this;if("XMLHttpRequest"in this._window){var r=this._window.XMLHttpRequest.prototype;n(r,"open",function(t){return function(e,r){return u.isType(r,"string")&&(this.__rollbar_xhr={method:e,url:r,status_code:null,start_time_ms:u.now(),end_time_ms:null}),t.apply(this,arguments)}},this.replacements,"network"),n(r,"send",function(r){return function(o){function i(){if(a.__rollbar_xhr){if(null===a.__rollbar_xhr.status_code){a.__rollbar_xhr.status_code=0;var t=null;e.autoInstrument.networkRequestBody&&(t=o),a.__rollbar_event=e.telemeter.captureNetwork(a.__rollbar_xhr,"xhr",void 0,t);}if(a.readyState<2&&(a.__rollbar_xhr.start_time_ms=u.now()),a.readyState>3){a.__rollbar_xhr.end_time_ms=u.now();var r=null;if(e.autoInstrument.networkResponseHeaders){var n=e.autoInstrument.networkResponseHeaders;r={};try{var i,s;if(n===!0){var c=a.getAllResponseHeaders();if(c){var l,p,f=c.trim().split(/[\r\n]+/);for(s=0;s<f.length;s++)l=f[s].split(": "),i=l.shift(),p=l.join(": "),r[i]=p;}}else for(s=0;s<n.length;s++)i=n[s],r[i]=a.getResponseHeader(i);}catch(t){}}var h=null;if(e.autoInstrument.networkResponseBody)try{h=a.responseText;}catch(t){}var d=null;(h||r)&&(d={},h&&(d.body=h),r&&(d.headers=r)),d&&(a.__rollbar_xhr.response=d);try{var m=a.status;m=1223===m?204:m,a.__rollbar_xhr.status_code=m,a.__rollbar_event.level=e.telemeter.levelFromStatus(m);}catch(t){}}}}var a=this;return t("onload",a),t("onerror",a),t("onprogress",a),"onreadystatechange"in a&&u.isFunction(a.onreadystatechange)?n(a,"onreadystatechange",function(t){return e.rollbar.wrap(t,void 0,i)}):a.onreadystatechange=i,r.apply(this,arguments)}},this.replacements,"network");}"fetch"in this._window&&n(this._window,"fetch",function(t){return function(r,n){for(var o=new Array(arguments.length),i=0,a=o.length;i<a;i++)o[i]=arguments[i];var s,c=o[0],l="GET";u.isType(c,"string")?s=c:c&&(s=c.url,c.method&&(l=c.method)),o[1]&&o[1].method&&(l=o[1].method);var p={method:l,url:s,status_code:null,start_time_ms:u.now(),end_time_ms:null},f=null;return e.autoInstrument.networkRequestBody&&(o[1]&&o[1].body?f=o[1].body:o[0]&&!u.isType(o[0],"string")&&o[0].body&&(f=o[0].body)),e.telemeter.captureNetwork(p,"fetch",void 0,f),t.apply(this,o).then(function(t){p.end_time_ms=u.now(),p.status_code=t.status;var r=null;if(e.autoInstrument.networkResponseHeaders){var n=e.autoInstrument.networkResponseHeaders;r={};try{if(n===!0);else for(var o=0;o<n.length;o++){var i=n[o];r[i]=t.headers.get(i);}}catch(t){}}var a=null;return r&&(a={headers:r}),a&&(p.response=a),t})}},this.replacements,"network");},s.prototype.deinstrumentConsole=function(){if("console"in this._window&&this._window.console.log)for(var t;this.replacements.log.length;)t=this.replacements.log.shift(),this._window.console[t[0]]=t[1];},s.prototype.instrumentConsole=function(){function t(t){var n=r[t],o=r,i="warn"===t?"warning":t;r[t]=function(){var t=Array.prototype.slice.call(arguments),r=u.formatArgsAsString(t);e.telemeter.captureLog(r,i),n&&Function.prototype.apply.call(n,o,t);},e.replacements.log.push([t,n]);}if("console"in this._window&&this._window.console.log)for(var e=this,r=this._window.console,n=["debug","info","warn","error","log"],o=0,i=n.length;o<i;o++)t(n[o]);},s.prototype.deinstrumentDom=function(){("addEventListener"in this._window||"attachEvent"in this._window)&&this.removeListeners("dom");},s.prototype.instrumentDom=function(){if("addEventListener"in this._window||"attachEvent"in this._window){var t=this.handleClick.bind(this),e=this.handleBlur.bind(this);this.addListener("dom",this._window,"click","onclick",t,!0),this.addListener("dom",this._window,"blur","onfocusout",e,!0);}},s.prototype.handleClick=function(t){try{var e=l.getElementFromEvent(t,this._document),r=e&&e.tagName,n=l.isDescribedElement(e,"a")||l.isDescribedElement(e,"button");r&&(n||l.isDescribedElement(e,"input",["button","submit"]))?this.captureDomEvent("click",e):l.isDescribedElement(e,"input",["checkbox","radio"])&&this.captureDomEvent("input",e,e.value,e.checked);}catch(t){}},s.prototype.handleBlur=function(t){try{var e=l.getElementFromEvent(t,this._document);e&&e.tagName&&(l.isDescribedElement(e,"textarea")?this.captureDomEvent("input",e,e.value):l.isDescribedElement(e,"select")&&e.options&&e.options.length?this.handleSelectInputChanged(e):l.isDescribedElement(e,"input")&&!l.isDescribedElement(e,"input",["button","submit","hidden","checkbox","radio"])&&this.captureDomEvent("input",e,e.value));}catch(t){}},s.prototype.handleSelectInputChanged=function(t){if(t.multiple)for(var e=0;e<t.options.length;e++)t.options[e].selected&&this.captureDomEvent("input",t,t.options[e].value);else t.selectedIndex>=0&&t.options[t.selectedIndex]&&this.captureDomEvent("input",t,t.options[t.selectedIndex].value);},s.prototype.captureDomEvent=function(t,e,r,n){if(void 0!==r)if(this.scrubTelemetryInputs||"password"===l.getElementType(e))r="[scrubbed]";else{var o=l.describeElement(e);this.telemetryScrubber?this.telemetryScrubber(o)&&(r="[scrubbed]"):this.defaultValueScrubber(o)&&(r="[scrubbed]");}var i=l.elementArrayToString(l.treeToArray(e));this.telemeter.captureDom(t,i,r,n);},s.prototype.deinstrumentNavigation=function(){var t=this._window.chrome,e=t&&t.app&&t.app.runtime,r=!e&&this._window.history&&this._window.history.pushState;r&&o(this.replacements,"navigation");},s.prototype.instrumentNavigation=function(){var t=this._window.chrome,e=t&&t.app&&t.app.runtime,r=!e&&this._window.history&&this._window.history.pushState;if(r){var o=this;n(this._window,"onpopstate",function(t){return function(){var e=o._location.href;o.handleUrlChange(o._lastHref,e),t&&t.apply(this,arguments);}},this.replacements,"navigation"),n(this._window.history,"pushState",function(t){return function(){var e=arguments.length>2?arguments[2]:void 0;return e&&o.handleUrlChange(o._lastHref,e+""),t.apply(this,arguments)}},this.replacements,"navigation");}},s.prototype.handleUrlChange=function(t,e){var r=c.parse(this._location.href),n=c.parse(e),o=c.parse(t);this._lastHref=e,r.protocol===n.protocol&&r.host===n.host&&(e=n.path+(n.hash||"")),r.protocol===o.protocol&&r.host===o.host&&(t=o.path+(o.hash||"")),this.telemeter.captureNavigation(t,e);},s.prototype.deinstrumentConnectivity=function(){("addEventListener"in this._window||"body"in this._document)&&(this._window.addEventListener?this.removeListeners("connectivity"):o(this.replacements,"connectivity"));},s.prototype.instrumentConnectivity=function(){if("addEventListener"in this._window||"body"in this._document)if(this._window.addEventListener)this.addListener("connectivity",this._window,"online",void 0,function(){this.telemeter.captureConnectivityChange("online");}.bind(this),!0),this.addListener("connectivity",this._window,"offline",void 0,function(){this.telemeter.captureConnectivityChange("offline");}.bind(this),!0);else{var t=this;n(this._document.body,"ononline",function(e){return function(){t.telemeter.captureConnectivityChange("online"),e&&e.apply(this,arguments);}},this.replacements,"connectivity"),n(this._document.body,"onoffline",function(e){return function(){t.telemeter.captureConnectivityChange("offline"),e&&e.apply(this,arguments);}},this.replacements,"connectivity");}},s.prototype.addListener=function(t,e,r,n,o,i){e.addEventListener?(e.addEventListener(r,o,i),this.eventRemovers[t].push(function(){e.removeEventListener(r,o,i);})):n&&(e.attachEvent(n,o),this.eventRemovers[t].push(function(){e.detachEvent(n,o);}));},s.prototype.removeListeners=function(t){for(var e;this.eventRemovers[t].length;)(e=this.eventRemovers[t].shift())();},t.exports=s;},function(t,e){function r(t){return (t.getAttribute("type")||"").toLowerCase()}function n(t,e,n){if(t.tagName.toLowerCase()!==e.toLowerCase())return !1;if(!n)return !0;t=r(t);for(var o=0;o<n.length;o++)if(n[o]===t)return !0;return !1}function o(t,e){return t.target?t.target:e&&e.elementFromPoint?e.elementFromPoint(t.clientX,t.clientY):void 0;
  }function i(t){for(var e,r=5,n=[],o=0;t&&o<r&&(e=u(t),"html"!==e.tagName);o++)n.unshift(e),t=t.parentNode;return n}function a(t){for(var e,r,n=80,o=" > ",i=o.length,a=[],u=0,c=t.length-1;c>=0;c--){if(e=s(t[c]),r=u+a.length*i+e.length,c<t.length-1&&r>=n+3){a.unshift("...");break}a.unshift(e),u+=e.length;}return a.join(o)}function s(t){if(!t||!t.tagName)return "";var e=[t.tagName];t.id&&e.push("#"+t.id),t.classes&&e.push("."+t.classes.join("."));for(var r=0;r<t.attributes.length;r++)e.push("["+t.attributes[r].key+'="'+t.attributes[r].value+'"]');return e.join("")}function u(t){if(!t||!t.tagName)return null;var e,r,n,o,i={};i.tagName=t.tagName.toLowerCase(),t.id&&(i.id=t.id),e=t.className,e&&"string"==typeof e&&(i.classes=e.split(/\s+/));var a=["type","name","title","alt"];for(i.attributes=[],o=0;o<a.length;o++)r=a[o],n=t.getAttribute(r),n&&i.attributes.push({key:r,value:n});return i}t.exports={describeElement:u,descriptionToString:s,elementArrayToString:a,treeToArray:i,getElementFromEvent:o,isDescribedElement:n,getElementType:r};}])});

  });
  var rollbar_umd_min_1 = rollbar_umd_min.rollbar;

  const rollbarConfig = {
      accessToken: "",
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
                  code_version: "2a2fedbaa9638f940beb60736a0c759e80a37244",
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

  document.getElementById('buildDate').innerHTML = "2019-04-30 17:45:53 UTC";
  document.getElementById('releaseTag').innerHTML = "5.1.0";
  document.getElementById('codeVersion').innerHTML = "2a2fedbaa9638f940beb60736a0c759e80a37244";

  class App {
      constructor (map_tile_path, vision_data_image_path, version) {
          const interactiveMap = new InteractiveMap(map_tile_path, version, vision_data_image_path, worlddata);
          
          interactiveMap.initialize();
      }
  }

  return App;

})));
//# sourceMappingURL=bundle.js.map
