# Angular experiment

Simple "hello world" application from _angular-cli_ generated application.

This documentation explains step by step how to obtain improved performances based on two different concepts: ahead of time compilation and compression.

This work is an assignement given to Nicolas Picavet during his traineeship at [LIG](https://www.liglab.fr/), integrated in [IIHM team](http://iihm.imag.fr/en/) with Alexandre Demeure as tutor.

## Environment

- [npm](https://www.npmjs.com/)
- [angular](https://www.npmjs.com/package/angular)
- [angular-cli](https://www.npmjs.com/package/angular-cli)
- [webpack](https://webpack.js.org/)

## How to reproduce the test code

`ng new angular-experiment` or git clone this repo

## Experiments

There are several bundles built during compilation:

* _polyfills.bundle.js_: browser compatibility
* _styles.bundle.js_: stylesheets
* _main.bundle.js_: application
* _vendor.bundle.js_: Angular librairies
* _inline.bundle.js_: Webpack loader utilities

To simplify the comparison we will be dealing only with the _main_ and _vendor_ bundles here.

### Developement compilation

`ng serve`

Command from _angular-cli_ allowing to start a webserver containing the developed application, default http://localhost:4200/.

```
Generated
main        3.7 kB
vendor  2 460.0 kB

Downloaded
main        6.3 kB
vendor  2 400.0 kB
```

### Production : AOT & tree-shaking

`ng serve --prod`

Specifying production arguments allows developers to test and debug further in a production-like environment.

It uses ahead-of-time (AOT) compilation and also includes the tree-shaking concept removing never imported unused modules.
AOT compilation allows
- smaller angular framework download size, because the compiler is not packaged
- faster rendering, since the client does not have to wait for the application to compile
- inlining html template and CSS style sheets, reducing request to those files
- [other things](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)

```
Generated
main       21.7 kB
vendor  1 390.0 kB

Downloaded
main        2.5 kB
vendor    111.0 kB
```

### Nginx & compression

Gzip compression is activated by default during production compilation, but using an [Nginx webserver](https://nginx.org/en/) we can achieve even better performances than using angular-cli server solution.

* `ng build --prod`
* copy content of your application _dist/_ folder inside _html/_ Nginx folder
* edit Nginx configuration file _conf/nginx.conf_
* add
```
gzip  on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_types *;
```
* start Nginx
* got to http://localhost

```
Generated
main       21.6 kB
vendor  1 100.0 kB

Downloaded
main        2.4 kB
vendor     70.4 kB
```

