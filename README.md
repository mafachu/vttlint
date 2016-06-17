# VTTlint

A linter for the WebVTT specification with hinting based on common closed captioning standards.

## Use

1. Clone or download to local directory:

 ```shell
 $ git clone https://github.com/mafachu/vttlint.git
 ```

2. Install dependencies:

 ```shell
 $ npm install
 ```

## API

`vttlint` is a function that takes a string and returns an array of errors.

```javascript
var vttlint = require('vttlint'),
    errors = vttlint(string);

// errors:
//
// [{ reason: 'Captions should have a minimum duration of 1.333 seconds.',
//    cue: 
//     { identifier: '',
//       start: 32.5,
//       end: 33.5,
//       text: '<v Neil deGrasse Tyson><i>Laughs</i>',
//       styles: 'align:left size:50%',
//       index: 12 } }]
```

`vttlint` takes an optional second argument that allows you to disable or override certain checks.

You can disable checking for minimum duration like this:

```javascript
var errors = vttlint(string, { mindur: false });
```

## CLI

You can use `vttlint` as a command-line tool by installing it globally:

```shell
$ npm install -g
```

`vttlint` takes a file and prints errors to stdout:

```shell
$ vttlint file.vtt
cue 12: Captions should have a minimum duration of 1.333 seconds.

1 error
```

You can override specific checks like this:

```
$ vttlint file.vtt --mindur 1
```

Or exclude checks like this:

```
$ vttlint file.vtt --mindur false
```

## Options

### `mindur`
Captions should have a minimum duration of `X` seconds. Default is `1.333`.

### `maxdur`
Captions should have a maximum duration of `X` seconds. Default is `6`.

## Planned Options

### `maxlines`
*See Issue [#8](/../../issues/8).* It is preferred that there are no more than `X` lines per caption. Default is `2`.

### `rate`
*See Issue [#17](/../../issues/17).* Presentation rate should not to exceed `X` words per minute (wpm). Accepts any `positive integer`. Default is `140`. Also accepts:

* `"lower"`: 130 wpm
* `"middle"`: 140 wpm
* `"upper"`: 160 wpm

### `sync`
*See Issue [#50](/../../issues/50).* Simultaneous captions should be synchronized.

### `clear`
*See Issue [#51](/../../issues/51).* Captions should start at least 0.001 seconds after preceding caption.

### `maxwords`
*See Issue [#52](/../../issues/52).* Captions should have no more than `X` words before manual line break. Default TBD.

## Resources

* [Captioning Key](http://captioningkey.com/)
* [CBC Captioning Style Guide](https://www.dcmp.org/caai/nadh218.pdf)
* [WGBH Captioning FAQ](http://main.wgbh.org/wgbh/pages/mag/services/captioning/faq/sugg-styles-conv-faq.html)
* [3PlayMedia Transcription, Captioning, and Subtitling Standards](http://www.3playmedia.com/2014/05/06/transcription-captioning-subtitling-standards/)

## License
MIT