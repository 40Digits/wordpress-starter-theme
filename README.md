# WordPress Starter Theme

Built to work within the needs of 40Digits, our theme functions as a starting point for our projects.

Comes included with:

- Manageable WordPress Functions
- Core necessities to get the site running, up to you on what is and isn't needed.
- Environment Management

## Installation

* Download theme and place into your WordPress install. `/wp-content/themes/`
* or clone repo

## Build Script Documentation

***NPM Scripts***

Since the deprecation of Eta, we have since moved to using npm scripts as our build tools and task runner. (For more information on using npm as a build tool feel free to check this How to use npm as a build tool. ) If you're interested in which npm packages we currently use and care to use some of our recipes feel free to check out our 40D-tools-list repo.

## Stylesheet Declaration

To setup the WordPress theme, make sure to add the necessary theme declarations to `_src/sass/style.scss`

```scss
/*!
 *  Theme Name: Project Name
 *  Theme URL: http://www.project-url.com/
 *  Description: Project or website descriptions.
 *  Author: 40Digits
 *  Author URI: http://www.40digits.com
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

Laravel, WordPress, Tumblr, Static HTML, Express, etc.

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
