#knockout-textbox.io

##What does this do?

###tl;dr
`knockout-textbox.io` provides a Knockout Binding that allows the Textbox.io WYSIWYG Rich Text Editor to be part of your `<form>` and participate
in data binding like a normal `<form>` element would participate.

##Requirements
* Knockout **3.x**
* Textbox.io **1.2+**

If you need to use this with earlier releases of Knockout please contact us at <mailto:support@ephox.com>.

##Usage
Implementing this custom binding is straightforward and simple.

####Add the Textbox.io files to your project
Textbox.io itself has a set of files that need to be available in your application in order for the directive to function properly.  When you download Textbox.io you need to place the `textboxio` folder somewhere that is accessible to the user's browser at runtime.  You need to make sure you have a `<script>` tag in your page that loads the `textboxio.js` JavaScript file.  The remainder of this document assumes the Textbox.io files are in a web-accessible location and you already have a `<script>` tag in place loading the `textboxio.js` JavaScript file

####Add the files from knockout-textbox.io to your project
The 2 files provided need to be available to your application.  Where you place them is up to you and there seems to be a multitude of "best practices" for how to organize your files in a web application that uses Knockout.  The provided files are built for apps that use `require.js` for organizing their JavaScript files.  This format is not required but is used (for example) in Durandal which is a popular SPA framework for use with Knockout.

**If you are using require.js** please make sure that you include the two provided JavaScript files in your `requirejs.config` and that you make them available as dependencies in any page that needs Textbox.io.

**If you are not using require.js** you should be able to take the `bindingHandler` and `configurations` from these files and add them to your project as normal JavaScript.  If you are unclear how to re-organize the files provided please contact us at <mailto:support@ephox.com>.

####Data bind a `<textarea>` or `<div>` to the `bindingHandler`
The `bindingHandler` needs to be bound to a `<textarea>` or `<div>` within your form that uses Knockout.  For example:

```
<textarea data-bind="textboxio:teaserContent, configuration:'simple'" rows="10" class="form-control" id="teaserContent" name="teaserContent"></textarea>
```

The `textboxio:teaserContent` portion of the data-bind tells Knockout to use this `bindingHandler` for the `<textarea>` - this is what causes Textbox.io to appear.  The `configuration:'simple'` portion of the data-bind tells the binding handler to load a Textbox.io configuration property named "simple" from the `configurations` object.  The configuration data-bind is purely optional but we expect that most people will want to provide a configuration file for Textbox.io that meets their specific needs.


##The complete details on what this does
####(when tl;dr is not enough!)
Knockout provides a built in two-way data binding between form (view) elements and the underlying (data) model.  While this works well for standard form elements, Knockout does not know how to interact with Textbox.io.

This is primarily due to the fact that Textbox.io “hides” the form field (`<textarea>`) and superimposes an iFrame over the form field.  This means that when you are typing into Textbox.io you are not updating a Knockout aware view so the underlying model is not updated.  When the form is submitted, the content of Textbox.io would not be included.

This Knockout binding handler solves this issue by managing the process of...

* Deploying Textbox.io to the page
* Managing the sync of data between Textbox.io and the Knockout model object
