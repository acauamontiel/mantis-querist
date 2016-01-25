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

		@media print
			display none

	.element
		some-property value

		@media from('lg')
			another-property value
	```

	Mantis Querist uses [functions](http://stylus-lang.com/docs/functions.html), then you can do whatever you want with the return.

	```styl
	$mobile = to('md')
	$mobile-portrait = $mobile + ' and (orientation: portrait)'

	.element
		@media $mobile
			some-property value

		@media $mobile-portrait
			another-property value
	```

- Rupture uses [scale indices](http://jenius.github.io/rupture/#measure) to identify a breakpoint, making difficult to know which breakpoint is at stake, and if a breakpoint is added or removed, it can completely change the index of each breakpoint. With Mantis Querist you name each breakpoint with the name you feel convenient. See the [configuration](#configuring) section.


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


Configuring
-----------

Mantis Querist has a variable named `$breakpoints`...


Functions
---------

Mantis Querist has 4 handy functions, they are: `from`, `to`, `at` and `between`.

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

#### `from(breakpoint)`

The `from(breakpoint)` is like `(min-width: breakpoint)`


#### `to(breakpoint)`

The `to(breakpoint)` is like `(max-width: breakpoint)`


#### `at(breakpoint)`

The `at(breakpoint)` is like `(min-width: breakpoint) and (max-width: next-breakpoint)`


#### `between(min-breakpoint, max-breakpoint)`

The `between(min-breakpoint, max-breakpoint)` is like `(min-width: min-breakpoint) and (max-width: max-breakpoint)`


Usage
-----

...


License
-------

© 2016 [Acauã Montiel](http://acauamontiel.com.br)

[MIT License](http://acaua.mit-license.org/)
