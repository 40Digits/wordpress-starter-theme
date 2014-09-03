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
|   |– functions            # Application _mixins_ & _functions_
|   |– js-breakpoints       # Syncs up our CSS Media Queries to work with [MQ Sync](https://github.com/40Digits/jquery-mq-sync)
|   |– media-queries        # Media query mixin
|   |– reset                # Browser reset stylesheet
|   |– utilities            # Utilities, _%placeholders_ and _%extends_ to dev faster & easier
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

##**Styleguide**

####General Styling
* Avoid using ID's.  Use classes instead
* Try not to over-qualify selectors.
* Use one comma separated selector per line in multi-selector rule sets.
* Order of CSS properties:
  1. Positioning
  2. Display & Box Model
  3. Color
  4. Text
  5. Transform
  6. Animations
  7. Z-index
* Order of Sass extends and properties:
  1. @extend(s)
  2. "regular" styles
  3. @include(s)
* Nest all pseduo-classes directly beneath base properties and values.
* Media queries belong right after pseudo-classes.
  - Min-Width - smallest to largest
  - Max-Width - largest to smallest
* Keep it OOCSS and use un-nested class names
* List any class modifiers after all module children
* Use auto prefixer, check for settings in the gruntfile.js
* Break into as many small files as makes sense
* Be generous with comments & use same comment block style => "// Comment Text"
* Variablize all colors, numbers, etc.