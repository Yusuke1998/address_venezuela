# -*- coding: utf-8 -*-


from odoo import api, fields, models

class CountryState(models.Model):
    """ Add Municipalities reference in State """
    _inherit = 'res.country.state'

    # country_id = fields.Many2one('res.country')
    municipality_id = fields.One2many('res.country.state.municipality', 'state_id', 'Municipalities in this state')
    
class StateMunicipality(models.Model):
    """States Municipalities"""
    _name = 'res.country.state.municipality'
    _description="State municipalities"

    state_id = fields.Many2one('res.country.state', 'State', required=True, help='Name of the State to which the municipality belongs')
    name = fields.Char('Municipality', required=True, help='Municipality name')
    code = fields.Char('Code', size=3, required=True, help='Municipality code in max. three chars.')
    parish_id = fields.One2many('res.country.state.municipality.parish', 'municipality_id', 'Parishes in this municipality')


class MunicipalityParish(models.Model):
    """States Parishes"""
    _name = 'res.country.state.municipality.parish'
    _description="Municipality parishes"

    municipality_id = fields.Many2one('res.country.state.municipality', 'Municipality', help='Name of the Municipality to which the parish belongs')
    name = fields.Char('Parish', required=True, help='Parish name')
    code = fields.Char('Name',size=3, required=True, help='Parish Code in max. three chars.')
