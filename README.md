Strength.js
===========

The ultimate jQuery password input plugin. Featuring secure strength indicator and hide/show password

### Documentation

Strength.js provides a toggle feature for password input fields that allows the user to view or asterisk the password. It also features a strength indicator to show how secure a users password is.

#### ..:: Demo
For a demo visit http://git.aaronlumsden.com/strength.js/


The password security indicator is marked on 4 scores. These are calculated by the following algorithm:

1. Calculate bit strength by counting all unique characters and apply binary logarithm on it
2. Amplify that bit strength according to different password guidelines
  1. Containing uppercase characters: +50%
  2. Containing lowercase characters: +20%
  3. Containing numbers: +20%
  4. Containing special chars: +50%
3. As a final step the binary logarithm of the length of the password is calculated and multiplied with the bit strength
4. Now we've got this four scores:
  1. &gt;= 40.0: Strong password
  2. &gt;= 20.0: Medium password
  3. &gt;= 15.0: Weak password
  4. &gt; 0.0: Very weak password


#### ..:: Getting Started

##### Include the relevant files directly

Firstly include jQuery and the strength.css and strength.js files. Place these before `&lt;/head&gt;` section

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script type="text/javascript" src="strength.min.js"></script>


##### Installation with bower

	bower install strength.js

##### Installation with rails

This package is distributed via rails-assets.org

	source 'https://rails-assets.org'
	gem 'rails-assets-strength.js'

And include the javascript file in application.js like this:

	//= require strength.js

application.css:

	*= require strength.js/src/strength

##### Create a password input field

You must give your password input a unique ID.

	<input id="myPassword" type="password" name="" value="">

##### Initiate the plugin

Once you have created your password input field you will need to initiate the plugin.

At its most basic level you can initiate the plugin like:


	$(document).ready(function() {
        $("#myPassword").strength();
    });


If you want to initiate the plugin with options then you can do so like:


	$('#myPassword').strength({
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter',
            strengthButtonClass: 'button_strength',
            strengthButtonText: 'Show password',
            strengthButtonTextToggle: 'Hide Password'
        });

#### ..:: Options

<table>
							<thead>
								<tr>
									<th>Variable</th>
									<th>Default Value</th>
									<th>Description</th>
									<th>Valid Options</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>strengthClass</td>
									<td>strength</td>
									<td>The CSS class that you want your input field to have</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthMeterClass</td>
									<td>strength_meter</td>
									<td>The CSS class that you want your input field to have</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthButtonClass</td>
									<td>button_strength</td>
									<td>The CSS class that you want the toggle button to have</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthButtonText</td>
									<td>Show Password</td>
									<td>The text that you want to show for the toggle button</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthButtonTextToggle</td>
									<td>Hide Password</td>
									<td>The toggled text that you want to show for the toggle button</td>
									<td></td>
								</tr>

							</tbody>
						</table>
