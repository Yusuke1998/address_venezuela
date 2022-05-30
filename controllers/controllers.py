# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request

# from odoo.addons.portal.controllers.portal import CustomerPortal
# from odoo.addons.website_form.controllers.main import WebsiteForm
# from odoo.addons.portal.controllers.web import Home
# from odoo.exceptions import UserError
import logging
import json

class AddressVenezuela(http.Controller):

    @http.route(['/address_venezuela/municipality_infos/<model("res.country.state"):state>'], type='json', auth="user", methods=['POST'], website=True)
    def municipality_infos(self, state, **kw): 
        return dict(
            states=[(st.id, st.name, st.code) for st in state.sudo().municipality_id],
        )
        

    @http.route(['/address_venezuela/parish_infos/<model("res.country.state.municipality"):municipality>'], type='json', auth="user", methods=['POST'], website=True)
    def parish_infos(self, municipality, **kw): 
        return dict(
            parishes=[(pa.id, pa.name, pa.code) for pa in municipality.sudo().parish_id],
        )