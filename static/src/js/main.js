odoo.define('address_venezuela.address', function (require) {

	'use strict';

	var utils = require('web.utils');
    var ajax = require('web.ajax');
	var core = require('web.core');
	var config = require('web.config');
	var website_form = require('website_form.animation');
	var sAnimations = require('website.content.snippets.animation');
	//require("website.content.zoomodoo");

	//Traductor
	var _t = core._t;
    var qweb = core.qweb;

sAnimations.registry.WebsiteAddresVenezuela = sAnimations.Class.extend({
		selector: '.oe_website_address_venezuela',
		read_events: {
			'change select[name="state_id"]': '_onChangeState',
			'change select[name="municipality_id"]': '_onChangeMunicipality',
		},

		_onChangeState: function (ev) {
			//Si el formulario no existe retorna vacío
			if (!this.$('.checkout_autoformat').length) {
				return;
			}

			this._changeState();
		},
		_changeState: function () {
            var state_id=$("#state_id")
            var municipality_id=$("#municipality_id")
            var municipality_id=$("#parish_id")
            
			if (!state_id.val()) {
				$('#municipality_id').prop('disabled',true);
				$('#parish_id').prop('disabled',true);
				return;
			}
            $('option', municipality_id).remove();
            $('option', parish_id).remove();
			this._rpc({

				route: "/address_venezuela/municipality_infos/" + $("#state_id").val()

			}).then(function (data) {

				var selectMunicipalities = $("select[name='municipality_id']");

				//selectMunicipalities.find('option').length===1
				if (selectMunicipalities.data('init')===0 || selectMunicipalities.data('init')===1) {

					if (data.states.length) {

						selectMunicipalities.html('');
						var opt = $('<option>').text('Seleccione Municipio');
						selectMunicipalities.append(opt);

						_.each(data.states, function (x) {
							var opt = $('<option>').text(x[1])
							.attr('value', x[0])
							.attr('data-code', x[2]);
							selectMunicipalities.append(opt);
						});
				}else{

					selectMunicipalities.val('').parent('div').hide();
				}
				selectMunicipalities.data('init', 0);

				}else {
					selectMunicipalities.data('init', 0);
				}

			$('#municipality_id').removeAttr('disabled');
			$('#parish_id').removeAttr('disabled');
			});
		},

		_onChangeMunicipality: function (ev) {
			if (!this.$('.checkout_autoformat').length) {
				return;
			}
			this._changeMunicipality();
		},
		_changeMunicipality: function () {
			if (!$("#municipality_id").val()) {
				$('#municipality_id').prop('disabled',true);
				$('#parish_id').prop('disabled',true);
			}
			this._rpc({
				route: "/address_venezuela/parish_infos/" + $("#municipality_id").val()

			}).then(function (data) {
				var selectParish = $("select[name='parish_id']");

				//selectParish.find('option').length===1
				if (selectParish.data('init')===0 || selectParish.data('init')===1) {

					if (data.parishes.length) {
						
						selectParish.html('');
						var opt = $('<option>').text('Seleccione Parroquia')
						selectParish.append(opt);

						_.each(data.parishes, function (x) {
							var opt = $('<option>').text(x[1])
							.attr('value', x[0])
							.attr('data-code', x[2]);
							selectParish.append(opt);
						});
				}else{
					selectParish.val('').parent('div').hide();
				}
				selectParish.data('init', 0);

				}else {
					selectParish.data('init', 0);
				}
			});
		}

    });
});
