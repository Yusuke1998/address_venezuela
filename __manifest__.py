# -*- coding: utf-8 -*-

{
    "name": "Localización Venezolana: Municipios y Parroquias",
    'version': '12.0.1.0.0',
    'summary': "",
    'description': "",
    'category': 'Localizacion',
    'author': '',
    'license': '',
    'website': "",
    'depends': ['base','website'],
    'data': [
        'data/res.country.state.xml',
        'data/res.country.state.municipality.xml',
        'data/res.country.state.municipality.parish.xml',
        'views/assets.xml',
        'views/l10n_ve_dpt_view.xml',
        'views/res_partner.xml',
        'views/res_company.xml',
        'security/ir.model.access.csv',
    ],
    'installable': True,
    'auto_install': False,
    'application': False,
}
