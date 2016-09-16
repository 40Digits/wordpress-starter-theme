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

All new projects should contain the following information in their `README.md` repo root repository. Yes, you can remove this readme if you start a new theme.

* Active and development URLs
* Git branch information
* Project Manager
* Developers and their respective roles + major contributions to the project
* Notes

Here is a project sample:

```md
# Project X

***

## URLs
* Live - http://www.site-name.com
* Staging - http://staging.site-name.com
* Development - http://project.test.site-name.com

## Git Branches

* Development
* Master

Master needs to be pushed to the WPE origin.

***

## Project Manager(s)
* John Macklin

## Developer(s)

#### Leslie Knoppe
* Front-End
* Content Modules
* Blog

#### Andy Dwyer
* Act-On Integration with Forms
* Member Registration
* Event Registration

#### Tom Haverford
* ONE DAY to Feed the World

***

## Notes
```
