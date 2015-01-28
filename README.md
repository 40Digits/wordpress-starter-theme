# Wordpress Starter Theme

Built to work within the needs of 40Digits, our theme functions as a starting point for our projects.

Comes included with:

- [gulp powered](https://github.com/40Digits/gulp-starter) - comes with sass, browserify, sprite sheet generation, image optimization, and custom icon font generation.
- Manageable Wordpress Functions
- Core necessities to get the site running, up to you on what is and isn't needed.

For additional [useful functions](http://wiki.40digits.net/resources/wp-functions-to-take-advantage-of/) to take advantage of, read our Wiki article.

## Installation

* Download theme and place into your HelperPress theme folder.
* or clone repo for new non HelperPress projects.

## Build Script Documentation

* [Wiki](https://github.com/40Digits/gulp-starter/wiki)

## Stylesheet Declaration

To setup the wordpress theme, make sure to add the necessary theme declarations to `_src/sass/style.scss`

```scss
/*!
    Theme Name: Project Name
    Theme URL: http://www.project-url.com/
    Description: Project or website descriptions.
    Author: 40Digits
    Author URI: http://www.40digits.com
    Version: 0.01
*/
```

## Project README

All new projects should contain the following information in their `README.md` repo root repository. Yes, you can remove this readme if you start a new theme.

* Active and development URLs
* Git branch information
* Project Manager
* Developers and their respective roles + major contributions to the project
* Notes

Here is a sample for Convoy of Hope

```md
# Convoy of Hope

***

## URLs
* Live - http://www.convoyofhope.org
* Staging - N/A
* Development - http://coh.dev01.40digits.net

## Git Branches

* Development
* Master

Master needs to be pushed to the WPE origin.

***

## Project Manager(s)
* Aaron Hardinger

## Developer(s)

#### Besim Huskic
* Front-End
* Convoy of Hope
* Blog

#### David Harris
* Act-On Integration with Forms
* Member Registration
* Event Registration

#### CK Hicks
* ONE DAY to Feed the World

***

## Notes
```