# Forty Sass Framework Template

Simply put, there's no fancy magic behind the Forty Sass Framework Template. We've certainly worked with existing popular frameworks in the past. But they felt cumbersome, bloated, and produced a lot of overhead. More importantly, you're locked into their pattern and thought process.

Our template exists to give you a light and base level toolkit to build off of. We're not here to tell you how to write or handle your project. After all, no two are the same.

We're certainly versed and familiar with [OOCSS](http://oocss.org/) and [SMACSS](http://smacss.com/), and we have hints of that sprinkled throughout the template. So if you want to take the [BEM](http://bem.info/method/), [OOCSS](http://oocss.org/), or [SMACSS](http://smacss.com/) approach, the choice is yours.

Do what works best for you and your team.

##**Template Structure**
```
sass/
|
|– app/
|   |- global               # Styles that apply globally on application
|   |– ie                   # Styles specific to Internet Explorer
|   ...                     # Application css
|
|– helpers/
|   |– fonts                # Contains all your @imports, @font-face, and third-party fonts
|   |– functions            # Application mixins & functions
|   |– js-breakpoints       # Syncs up our CSS Media Queries to work with [MQ Sync](https://github.com/40Digits/jquery-mq-sync)
|   |– media-queries        # Media query mixin
|   |– reset                # Browser reset stylesheet
|   |– utilities            # Utilities, %placeholders and %extends to dev faster & easier
|
|– layout/
|   |– footer               # Stypes that apply to the footer of application
|   |– header               # Styles that apply to the header of application
|   |– nav                  # Styles that apply to the navigation of application
|   |– sidebar              # Styles that apply to the sidebars of application
|   |– wysiwyg              # Styles that apply to wysiwyg content specific areas
|
|– modules/
|   |– cms-wordpress        # Styles used within the Wordpress Wysiwyg editor
|   |– forms                # Base styles for all form elements
|   |– keyframes            # CSS keyframes for CSS animations
|   |– print                # Print specific styles, although most will be inline with Sass
|   |– responsive-grid      # Starter grid system to get you started
|   |– typography           # Base styles for headings, paragraphs, lists, global styles, etc.
|
|- variables/
|   |– color                # Color values used throughout the application
|   |– settings             # Font variables, Media Query definitions
|
|- vendor/
|   |– gravity-forms        # Stripped down version for Gravity Forms
|   ...                     # Vendor css
|
`– style                    # primary Sass file
```

##**Recommended Usage**

####app/

The [app/](https://github.com/40Digits/forty-sass/tree/master/app) folder contains all of your application styles. These styles vary anywhere from small partials to templates to pages. In order to keep consistency going, especially in Wordpress projects. Please use the following prefix method.

| Prefix        | Usage                                                  |
| ------------- | ------------------------------------------------------ |
| page-         | pages                                                  |
| temp-         | template specific files                                |
| block-        | modular blocks that get re-used throughout application |
| cpt-          | anything that is a custom post type                    |

Your [global.scss](https://github.com/40Digits/forty-sass/blob/master/app/_global.scss) file should contain any and all global layout styles that do not fit in a specific style-sheet. Any and all IE styles that can't be written inline, should reside inside the [ie.scss](https://github.com/40Digits/forty-sass/blob/master/app/_global.scss) style-sheet.

####helpers/

The [helpers/](https://github.com/40Digits/forty-sass/tree/master/helpers) folder generally contains tools which help with formatting of your application. They either give you ways to sync with javascript, give you functions, or help with resets. In most cases you won't be making many edits here, unless you are adding mixins and functions that are project specific. In that case, you would be making modifications to [functions.scss](https://github.com/40Digits/forty-sass/blob/master/helpers/_functions.scss) and [utilities.scss](https://github.com/40Digits/forty-sass/blob/master/helpers/_utilities.scss).

| File          | Usage                                                  |
| ------------- | ------------------------------------------------------ |
| fonts         | When using third-party fonts, it's recommended that you utilize the font mixin. For services such as typekit, you do not need to add in a @font-face. Where as for services such as fonts.com, which have an odd font-weight association, it's recommended you utilize an @font-face for best results.                                                |
| functions     | You should place all of your project specific mixins in here. |
| js-breakpoints| Syncs up our CSS Media Queries to work with [MQ Sync](https://github.com/40Digits/jquery-mq-sync) |
| media-queries | Should not be edited as it contains the mixin necessary to make all of the media queries work. |



##**Styleguide**

####General Rules
* When possible, avoid using ID's, use classes as much as possible.
* Don't over-qualify selectors.
* Don't get crazy with nesting of rules.
* Media queries belong right after pseudo-classes.
  - Min-Width - smallest to largest
  - Max-Width - largest to smallest
* Use auto prefixer, check for settings in the gruntfile.js
* Break into as many small files as it makes sense:
  - Produces easier to maintain styles.
  - Easier to find rules.
* Be generous with comments and as descriptive as possible.

####Properties
* CSS rules should be comma seperated and reside on new lines.
* Order of CSS properties:
  - Positioning
  - Display & Box Model
  - Color
  - Text
  - Transform
  - Animations
  - Z-index
* Order of Sass extends and properties:
  - @extend(s)
  - @include(s)
  - "regular" styles
* Nest all pseduo-classes directly beneath base properties and values.
* Use z-index scale found in utilities.scss

####Naming Conventions
* Classes and IDs are lowercase with words separated by a dash.
* Variablize all colors, numbers, etc.
  - $color-blue
  - $color-azure
  - $color-purple
* Images
  - Image file names are lowercase with words separated by a dash.
  - Image file names are prefixed with their usage.
    - icon-home.png
    - bg-home.png
    - hero-about.png
* .js- prefixed class names for elements relying upon javascript
* .is- prefixed class names for stateful classes
  - .is-active
  - .is-enabled

####Style Scoping
All of your styles should be reusing general component level styles defined below. Page level name-spaces however can be helpful for overriding generic components in very specific contexts.

Page level overrides should be minimal and under a single page level class nest.

Component level name-spacing:

* nav
* nav-bar
* header-global
* header-about
* section-hero
* section-welcome
* module-wysiwyg
* module-accordion

####Comments
Use comments to seperate logical groups of styles within a document. This also allows us to convert from .scss <-> .sass without any hikcups. To get uniforminity with comments, please use the following three.

* The top level of your sass file should contain the name in all uppercaps
* Inside your sass file, divide sections up with a comment header
* And for single properties, use //

```
//=================================
// GLOBAL STYLES
//=================================

//---------------------------------
// Section Comment Header
//---------------------------------

// Property commments
```