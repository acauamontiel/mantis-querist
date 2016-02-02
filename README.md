Mantis Querist
==============

> A smart and practical way to handle breakpoints in Stylus

[![npm version](https://badge.fury.io/js/mantis-querist.svg)](http://badge.fury.io/js/mantis-querist)

<p align="center">
  <img title="Mantis Querist" src="mantis-querist.png" width="200" />
</p>

---

Why?
----

Why use Mantis Querist if already exists [Rupture](http://jenius.github.io/rupture/)? Let me explain.

First of all, [Rupture](http://jenius.github.io/rupture/) is a great tool, but didn't work for me. I'll list here some points I tried to improve creating the Mantis Querist:

- Rupture works with [block mixins](http://stylus-lang.com/docs/mixins.html#block-mixins), which eliminates the need to write the [@media at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@media), but affect readability, especially when you need to use a media query that Rupture doesn't support. In Mantis Querist, the way to use media queries is more consistent and really much more clearer to read. Compare for yourself:


	**This is worse...**

	```styl
	header
	footer
		some-property value

		@media print
			display none

	.element
		some-property value

		+from-width(3)
			another-property value
	```

	**...than this**

	```styl
	header
	footer
		some-property value

		+media(print)
			display none

	.element
		some-property value

		+media(from('lg'))
			another-property value
	```

	Mantis Querist uses [functions](http://stylus-lang.com/docs/functions.html), then you can do whatever you want with the return.

	```styl
	$mobile = to('md')
	$mobile-portrait = join-media-query($mobile, $feature: '(orientation: portrait)')

	.element
		@media $mobile
			some-property value

		@media $mobile-portrait
			another-property value
	```

- Rupture uses [scale indices](http://jenius.github.io/rupture/#measure) to identify a breakpoint, making difficult to know which breakpoint is at stake, and if a breakpoint is added or removed, it can completely change the index of each breakpoint. You also can pass the [scale name](https://github.com/jenius/rupture#rupturescale-names), but you've to keep two variables in sync to avoid problems with indices. With Mantis Querist you name each breakpoint with the name you feel convenient in the same variable. See the [configuration](#configuration) section.


Installation
------------

The installation can be done in 3 steps:

- **Step 1**

	Install via NPM:

	```sh
	$ npm i --save mantis-querist
	```

- **Step 2**

	You can use this plugin in different ways, but all consist of passing the plugin to the [`.use`](http://stylus-lang.com/docs/js.html#usefn) method of Stylus.
	For this example, I'll use it with [Gulp](http://gulpjs.com/) in a ES6 enviornment.

	```javascript
	import gulp from 'gulp';
	import stylus from 'gulp-stylus';
	import querist from 'mantis-querist';

	gulp.task('css', () =>
		gulp.src('path-to-source.styl')
			.pipe(stylus({
				use: [
					querist()
				]
			}))
			.pipe(gulp.dest('path-to-dest/'))
	);
	```

- **Step 3**

	Now just import the plugin into your `.styl` file as you already know.

	```styl
	@import 'mantis-querist'
	```


Configuration
-------------

Mantis Querist has a [hash](http://stylus-lang.com/docs/hashes.html) named `$mantis.querist.breakpoints` that comes with some predefined breakpoints:

```styl
$mantis.querist.breakpoints ?= {
	sm: 0, // small
	md: 640, // medium
	lg: 960, // large
}
```

You can add, remove or modify breakpoints just changing the `$mantis.querist.breakpoints` variable. Examples:

**Adding or changing**
```styl
$mantis.querist.breakpoints.xl = 1440 // extra large
$mantis.querist.breakpoints.fl = 1920 // fucking large

// or

$my-breakpoints = {
	xl: 1440,
	fl: 1920
}
merge($mantis.querist.breakpoints, $my-breakpoints)
// => {"sm":"(0)","md":"(640)","lg":"(960)","xl":"(1440)","fl":"(1920)"}
```

**Removing existing**
```styl
remove($mantis.querist.breakpoints, 'lg')
// => {"lg", "(960)"}
```

**Or simply replace**
```styl
$mantis.querist.breakpoints = {
	foo: 123,
	bar: 456,
	baz: 789
}
```

Something **very important** is that breakpoints must be in ascending order, otherwise the media queries will not work as expected.


Functions
---------

Mantis Querist has 4 main handy functions, they are: `from`, `to`, `at` and `between`.

```
│        sm                md                lg                xl
├─────────────────┼─────────────────┼─────────────────┼─────────────────>
│
│                                         from(lg)
│                                   ├───────────────────────────────────>
│
│                                          to(lg)
├─────────────────────────────────────────────────────┤
│
│                                          at(lg)
│                                   ├─────────────────┤
│
│                                     between(md, lg)
│                 ├───────────────────────────────────┤
```

#### `from(breakpoint[, $type])`

The `from()` is like `(min-width: breakpoint)`


#### `to(breakpoint[, $type])`

The `to()` is like `(max-width: breakpoint)`


#### `at(breakpoint[, $type])`

The `at()` is like `(min-width: breakpoint) and (max-width: next-breakpoint)`


#### `between(min-breakpoint, max-breakpoint[, $type])`

The `between()` is like `(min-width: min-breakpoint) and (max-width: max-breakpoint)`

The `$type` parameter is the `media type`, it's set to `'screen'` by default, but you can change specifically in each function or directly in the configuration variable `$mantis.querist.type`. Set to false, will omit the media type from the media query.

There are other configuration variables in the `$mantis.querist` hash, like `$mantis.querist.unit`, that's defined as `'px'`, but you can change to the unit you want.


Usage
-----

Once properly set up Mantis Querist, is very simple to use. See some examples:

```styl
.element-a
	background black

	+media(from('md'))
		background red

	+media(from('lg'))
		background green

.element-b
	float left

	+media(to('sm'))
		float none
		display block

.element-c
	position relative

	+media(between('md', 'lg', $type: 'tv'))
		position absolute
```

You also can use this way, without `+media()`:

```styl
.element-a
	background black

	@media $from.md
		background red

	@media $from.lg
		background green

.element-b
	float left

	@media $to.sm
		float none
		display block

.element-c
	position relative

	@media $between.md.lg
		position absolute
```

All you need to do is run `querist-init()`, and this will generate a hash for each of the 4 main functions with all possible combinations. Example:

```styl
$from.sm = from('sm')
$from.md = from('md')
$from.lg = from('lg')
$to.sm = to('sm')
$to.md = to('md')
$to.lg = to('lg')
$at.sm = at('sm')
$at.md = at('md')
$at.lg = at('lg')
$between.sm.md = between('sm', 'md')
$between.sm.lg = between('sm', 'lg')
$between.md.lg = between('md', 'lg')
```


Questions?
----------

If you've questions, issues or ideas, feel free to [tweet me](https://twitter.com/acauamontiel) or talk to me through some of my contacts on my [website](http://acauamontiel.com.br/).


License
-------

© 2016 [Acauã Montiel](http://acauamontiel.com.br)

[MIT License](http://acaua.mit-license.org/)
