# Forty Sass Template

There is no fancy magic behind the Forty Sass Template. The template exists to give you a light and base level structure to build off of.  We're versed and familiar with [OOCSS](http://oocss.org/) and [SMACSS] (http://smacss.com/), and we have hints of that sprinkled throughout the template.

sass/
|
|– app/
|   |- global               # Styles that apply globally on application
|   |– ie                   # Styles specific to Internet Explorer
|   ...                     # Application css
|
|– helpers/
|   |– fonts                # Contains all your @imports, @font-face, and third-party fonts
|   |– functions            # Application *mixins* & *functions*
|   |– js-breakpoints       # Syncs up our CSS Media Queries to work with [MQ Sync](https://github.com/40Digits/jquery-mq-sync)
|   |– media-queries        # Media query mixin
|   |– reset                # Browser reset stylesheet
|   |– utilities            # Utilities, *%placeholders* and *%extends* to dev faster & easier
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
`– style.scss               # primary Sass file