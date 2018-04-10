# WordPress Starter Theme

Built to work within the needs of 40Digits, our theme functions as a starting point for our projects. Now that 40D is Barkley Digital, we still use this theme for WordPress development.

Comes included with:

- Manageable WordPress Functions
- Core necessities to get the site running, up to you on what is and isn't needed.
- Environment Management

## Installation

* Download theme and place into your WordPress install. `/wp-content/themes/`
* or clone repo

## Build Script Documentation

***NPM Scripts***

Since the deprecation of Eta, an older custom project starter framework, Barkley Digital hwe still use this theme for WordPress development.as since moved to using NPM Scripts as our build tools and task runner.

***Now Included***

While the project includes a base `package.json`, the WordPress Starter Theme also comes with a `package-wp-ready.json` for a jump-start on development with our Polaris Sass framework and custom JS framework of choice. To use this one instead of the base JSON file, delete the other `package.json`, change the name of the `package-wp-ready.json` to `package.json`, change the names of your local site (located twice within the code), the dev site, and production site, and then proceed with your `npm install`.

### Installing Base Frameworks

*With `package.json`:*

*With `package-wp-ready.json`:*
* `nvm use` at least 6.2.2
* Prep JSON file for use, as written above
* `cd _src/js`
* `npm install`
* In `package.json` here, rename `build` task to `build:js` and do the same for `watch` task
* `cd ../sass`
* `npm install`
* In `package.json` here, rename `build` task to `build:sass` and do the same for `watch` task
* Back out to theme root
* `npm start`

## Stylesheet Declaration

To setup the WordPress theme, make sure to add the necessary theme declarations to `_src/sass/style.scss`

```scss
/*!
 *  Theme Name: Project Name
 *  Theme URL: http://www.project-url.com/
 *  Description: Project or website descriptions.
 *  Author: 40Digits
 *  Author URI: http://www.barkleyus.com
 *  Version: 0.01 */
```

## Project README

```md

# Project Name

## Getting Started

### Installation -- (What has to happen to get this running on your local?)

* What version of Node/NPM/WP do you need to have?
* Is there a database? Is there something special about it?
* Is there a specific order you have to activate plugins in?
* Do any sitewide functions rely on a specific URL for local development?

### Environment

WordPress, Static HTML, Express, etc.

### Build Script

**Which set of build tools is it using? Is there any special configuration?**

## URLs

* [Dropbox]()
* [LiquidPlanner]()
* [Invision]()
* [Repository]()

### Environment URLs:

* Live - [LIVE]()
* Development - [DEV]()

## Git Branches

* `origin/development` -- Autobuilds DEV
* `origin/master` -- Bitbucket Main Branch
* `production/master` -- Git Push for WPE

## Deployment Instructions

* Does it auto-build on push? Which branch?
* Do we manually push the code somewhere?
* Who hosts it and where?

## Development Notes

### Naming Conventions and Standards

* Partial Naming: partials/name_of_module.php
* SASS Naming: _src/sass/matching-name-of-module.scss
* Template Naming: templates/name-of-template.php
* ACF Styles:
   * Seamless
   * field name: name_here
   *  repeater layout: block
   * image field: medium preview, image array return value
* CSS Units: all sizes will be in rem(00px) format, unless percentage

### !Importants

**We all do them at times to help speed up development and get things out the door. To reduce technical debt in the future and help aid in future fixes, why did you put an !important where you did and what can be done to fix it?**

### Critical Functions

**Is there anything that was made unique for this project that it's critical to know how to work with before developing? (examples: TailorPress, any auto-populating ACF fields, any use of the WP API, custom-built gallery fields, etc)**

```
