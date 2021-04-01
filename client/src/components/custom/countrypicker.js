
import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import { useField, useFormikContext } from "formik";

const getFieldCSSClasses = (touched, errors) => {
    const classes = [];
    if (touched && errors) {
      classes.push("is-invalid-select");
    }
  
    if (touched && !errors) {
      classes.push("is-valid-select");
    }
  
    return classes.join(" ");
};

const countryList = [
	{"code": "AF", "code3": "AFG", "name": "Afghanistan", "label": "Afghanistan", "number": "004"},
	{"code": "AL", "code3": "ALB", "name": "Albania", "label": "Albania", "number": "008"},
	{"code": "DZ", "code3": "DZA", "name": "Algeria", "label": "Algeria", "number": "012"},
	{"code": "AS", "code3": "ASM", "name": "American Samoa", "label": "American Samoa", "number": "016"},
	{"code": "AD", "code3": "AND", "name": "Andorra", "label": "Andorra", "number": "020"},
	{"code": "AO", "code3": "AGO", "name": "Angola", "label": "Angola", "number": "024"},
	{"code": "AI", "code3": "AIA", "name": "Anguilla", "label": "Anguilla", "number": "660"},
	{"code": "AQ", "code3": "ATA", "name": "Antarctica", "label": "Antarctica", "number": "010"},
	{"code": "AG", "code3": "ATG", "name": "Antigua and Barbuda", "label": "Antigua and Barbuda", "number": "028"},
	{"code": "AR", "code3": "ARG", "name": "Argentina", "label": "Argentina", "number": "032"},
	{"code": "AM", "code3": "ARM", "name": "Armenia", "label": "Armenia", "number": "051"},
	{"code": "AW", "code3": "ABW", "name": "Aruba", "label": "Aruba", "number": "533"},
	{"code": "AU", "code3": "AUS", "name": "Australia", "label": "Australia", "number": "036"},
	{"code": "AT", "code3": "AUT", "name": "Austria", "label": "Austria", "number": "040"},
	{"code": "AZ", "code3": "AZE", "name": "Azerbaijan", "label": "Azerbaijan", "number": "031"},
	{"code": "BS", "code3": "BHS", "name": "Bahamas (the)", "label": "Bahamas (the)", "number": "044"},
	{"code": "BH", "code3": "BHR", "name": "Bahrain", "label": "Bahrain", "number": "048"},
	{"code": "BD", "code3": "BGD", "name": "Bangladesh", "label": "Bangladesh", "number": "050"},
	{"code": "BB", "code3": "BRB", "name": "Barbados", "label": "Barbados", "number": "052"},
	{"code": "BY", "code3": "BLR", "name": "Belarus", "label": "Belarus", "number": "112"},
	{"code": "BE", "code3": "BEL", "name": "Belgium", "label": "Belgium", "number": "056", "hide": "1"},
	{"code": "BZ", "code3": "BLZ", "name": "Belize", "label": "Belize", "number": "084"},
	{"code": "BJ", "code3": "BEN", "name": "Benin", "label": "Benin", "number": "204"},
	{"code": "BM", "code3": "BMU", "name": "Bermuda", "label": "Bermuda", "number": "060"},
	{"code": "BT", "code3": "BTN", "name": "Bhutan", "label": "Bhutan", "number": "064"},
	{"code": "BO", "code3": "BOL", "name": "Bolivia (Plurinational State of)", "label": "Bolivia (Plurinational State of)", "number": "068"},
	{"code": "BA", "code3": "BIH", "name": "Bosnia and Herzegovina", "label": "Bosnia and Herzegovina", "number": "070"},
	{"code": "BW", "code3": "BWA", "name": "Botswana", "label": "Botswana", "number": "072"},
	{"code": "BR", "code3": "BRA", "name": "Brazil", "label": "Brazil", "number": "076"},
	{"code": "IO", "code3": "IOT", "name": "British Indian Ocean Territory (the)", "label": "British Indian Ocean Territory (the)", "number": "086"},
	{"code": "BG", "code3": "BGR", "name": "Bulgaria", "label": "Bulgaria", "number": "100"},
	{"code": "BF", "code3": "BFA", "name": "Burkina Faso", "label": "Burkina Faso", "number": "854"},
	{"code": "BI", "code3": "BDI", "name": "Burundi", "label": "Burundi", "number": "108"},
	{"code": "CV", "code3": "CPV", "name": "Cabo Verde", "label": "Cabo Verde", "number": "132"},
	{"code": "KH", "code3": "KHM", "name": "Cambodia", "label": "Cambodia", "number": "116"},
	{"code": "CM", "code3": "CMR", "name": "Cameroon", "label": "Cameroon", "number": "120"},
	{"code": "CA", "code3": "CAN", "name": "Canada", "label": "Canada", "number": "124", "hide": "1"},
	{"code": "KY", "code3": "CYM", "name": "Cayman Islands (the)", "label": "Cayman Islands (the)", "number": "136"},
	{"code": "CF", "code3": "CAF", "name": "Central African Republic (the)", "label": "Central African Republic (the)", "number": "140"},
	{"code": "TD", "code3": "TCD", "name": "Chad", "label": "Chad", "number": "148"},
	{"code": "CL", "code3": "CHL", "name": "Chile", "label": "Chile", "number": "152"},
	{"code": "CN", "code3": "CHN", "name": "China", "label": "China", "number": "156"},
	{"code": "CO", "code3": "COL", "name": "Colombia", "label": "Colombia", "number": "170"},
	{"code": "KM", "code3": "COM", "name": "Comoros (the)", "label": "Comoros (the)", "number": "174"},
	{"code": "CD", "code3": "COD", "name": "Congo (the Democratic Republic of the)", "label": "Congo (the Democratic Republic of the)", "number": "180"},
	{"code": "CG", "code3": "COG", "name": "Congo (the)", "label": "Congo (the)", "number": "178"},
	{"code": "CK", "code3": "COK", "name": "Cook Islands (the)", "label": "Cook Islands (the)", "number": "184"},
	{"code": "CR", "code3": "CRI", "name": "Costa Rica", "label": "Costa Rica", "number": "188"},
	{"code": "HR", "code3": "HRV", "name": "Croatia", "label": "Croatia", "number": "191"},
	{"code": "CU", "code3": "CUB", "name": "Cuba", "label": "Cuba", "number": "192"},
	{"code": "CW", "code3": "CUW", "name": "Curaçao", "label": "Curaçao", "number": "531"},
	{"code": "CY", "code3": "CYP", "name": "Cyprus", "label": "Cyprus", "number": "196"},
	{"code": "CZ", "code3": "CZE", "name": "Czechia", "label": "Czechia", "number": "203"},
	{"code": "CI", "code3": "CIV", "name": "Côte d'Ivoire", "label": "Côte d'Ivoire", "number": "384"},
	{"code": "DK", "code3": "DNK", "name": "Denmark", "label": "Denmark", "number": "208"},
	{"code": "DJ", "code3": "DJI", "name": "Djibouti", "label": "Djibouti", "number": "262"},
	{"code": "DM", "code3": "DMA", "name": "Dominica", "label": "Dominica", "number": "212"},
	{"code": "DO", "code3": "DOM", "name": "Dominican Republic (the)", "label": "Dominican Republic (the)", "number": "214"},
	{"code": "EC", "code3": "ECU", "name": "Ecuador", "label": "Ecuador", "number": "218"},
	{"code": "EG", "code3": "EGY", "name": "Egypt", "label": "Egypt", "number": "818"},
	{"code": "SV", "code3": "SLV", "name": "El Salvador", "label": "El Salvador", "number": "222"},
	{"code": "GQ", "code3": "GNQ", "name": "Equatorial Guinea", "label": "Equatorial Guinea", "number": "226"},
	{"code": "ER", "code3": "ERI", "name": "Eritrea", "label": "Eritrea", "number": "232"},
	{"code": "EE", "code3": "EST", "name": "Estonia", "label": "Estonia", "number": "233"},
	{"code": "SZ", "code3": "SWZ", "name": "Eswatini", "label": "Eswatini", "number": "748"},
	{"code": "ET", "code3": "ETH", "name": "Ethiopia", "label": "Ethiopia", "number": "231"},
	{"code": "FK", "code3": "FLK", "name": "Falkland Islands (the) [Malvinas]", "label": "Falkland Islands (the) [Malvinas]", "number": "238"},
	{"code": "FO", "code3": "FRO", "name": "Faroe Islands (the)", "label": "Faroe Islands (the)", "number": "234"},
	{"code": "FJ", "code3": "FJI", "name": "Fiji", "label": "Fiji", "number": "242"},
	{"code": "FI", "code3": "FIN", "name": "Finland", "label": "Finland", "number": "246"},
	{"code": "FR", "code3": "FRA", "name": "France", "label": "France", "number": "250"},
	{"code": "PF", "code3": "PYF", "name": "French Polynesia", "label": "French Polynesia", "number": "258"},
	{"code": "GA", "code3": "GAB", "name": "Gabon", "label": "Gabon", "number": "266"},
	{"code": "GM", "code3": "GMB", "name": "Gambia (the)", "label": "Gambia (the)", "number": "270"},
	{"code": "GE", "code3": "GEO", "name": "Georgia", "label": "Georgia", "number": "268"},
	{"code": "DE", "code3": "DEU", "name": "Germany", "label": "Germany", "number": "276"},
	{"code": "GH", "code3": "GHA", "name": "Ghana", "label": "Ghana", "number": "288"},
	{"code": "GI", "code3": "GIB", "name": "Gibraltar", "label": "Gibraltar", "number": "292"},
	{"code": "GR", "code3": "GRC", "name": "Greece", "label": "Greece", "number": "300"},
	{"code": "GL", "code3": "GRL", "name": "Greenland", "label": "Greenland", "number": "304"},
	{"code": "GD", "code3": "GRD", "name": "Grenada", "label": "Grenada", "number": "308"},
	{"code": "GU", "code3": "GUM", "name": "Guam", "label": "Guam", "number": "316"},
	{"code": "GT", "code3": "GTM", "name": "Guatemala", "label": "Guatemala", "number": "320"},
	{"code": "GG", "code3": "GGY", "name": "Guernsey", "label": "Guernsey", "number": "831"},
	{"code": "GN", "code3": "GIN", "name": "Guinea", "label": "Guinea", "number": "324"},
	{"code": "GW", "code3": "GNB", "name": "Guinea-Bissau", "label": "Guinea-Bissau", "number": "624"},
	{"code": "HT", "code3": "HTI", "name": "Haiti", "label": "Haiti", "number": "332"},
	{"code": "HN", "code3": "HND", "name": "Honduras", "label": "Honduras", "number": "340"},
	{"code": "HK", "code3": "HKG", "name": "Hong Kong", "label": "Hong Kong", "number": "344"},
	{"code": "HU", "code3": "HUN", "name": "Hungary", "label": "Hungary", "number": "348"},
	{"code": "IS", "code3": "ISL", "name": "Iceland", "label": "Iceland", "number": "352"},
	{"code": "IN", "code3": "IND", "name": "India", "label": "India", "number": "356"},
	{"code": "ID", "code3": "IDN", "name": "Indonesia", "label": "Indonesia", "number": "360"},
	{"code": "IR", "code3": "IRN", "name": "Iran (Islamic Republic of)", "label": "Iran (Islamic Republic of)", "number": "364", "hide": "1"},
	{"code": "IQ", "code3": "IRQ", "name": "Iraq", "label": "Iraq", "number": "368"},
	{"code": "IE", "code3": "IRL", "name": "Ireland", "label": "Ireland", "number": "372"},
	{"code": "IM", "code3": "IMN", "name": "Isle of Man", "label": "Isle of Man", "number": "833"},
	{"code": "IL", "code3": "ISR", "name": "Israel", "label": "Israel", "number": "376"},
	{"code": "IT", "code3": "ITA", "name": "Italy", "label": "Italy", "number": "380"},
	{"code": "JM", "code3": "JAM", "name": "Jamaica", "label": "Jamaica", "number": "388"},
	{"code": "JP", "code3": "JPN", "name": "Japan", "label": "Japan", "number": "392", "hide": "1"},
	{"code": "JE", "code3": "JEY", "name": "Jersey", "label": "Jersey", "number": "832"},
	{"code": "JO", "code3": "JOR", "name": "Jordan", "label": "Jordan", "number": "400"},
	{"code": "KZ", "code3": "KAZ", "name": "Kazakhstan", "label": "Kazakhstan", "number": "398"},
	{"code": "KE", "code3": "KEN", "name": "Kenya", "label": "Kenya", "number": "404"},
	{"code": "KI", "code3": "KIR", "name": "Kiribati", "label": "Kiribati", "number": "296"},
	{"code": "KP", "code3": "PRK", "name": "Korea (the Democratic People's Republic of)", "label": "Korea (the Democratic People's Republic of)", "number": "408", "hide": "1"},
	{"code": "KR", "code3": "KOR", "name": "Korea (the Republic of)", "label": "Korea (the Republic of)", "number": "410"},
	{"code": "KW", "code3": "KWT", "name": "Kuwait", "label": "Kuwait", "number": "414"},
	{"code": "KG", "code3": "KGZ", "name": "Kyrgyzstan", "label": "Kyrgyzstan", "number": "417"},
	{"code": "LA", "code3": "LAO", "name": "Lao People's Democratic Republic (the)", "label": "Lao People's Democratic Republic (the)", "number": "418"},
	{"code": "LV", "code3": "LVA", "name": "Latvia", "label": "Latvia", "number": "428"},
	{"code": "LB", "code3": "LBN", "name": "Lebanon", "label": "Lebanon", "number": "422"},
	{"code": "LS", "code3": "LSO", "name": "Lesotho", "label": "Lesotho", "number": "426"},
	{"code": "LR", "code3": "LBR", "name": "Liberia", "label": "Liberia", "number": "430"},
	{"code": "LY", "code3": "LBY", "name": "Libya", "label": "Libya", "number": "434"},
	{"code": "LI", "code3": "LIE", "name": "Liechtenstein", "label": "Liechtenstein", "number": "438"},
	{"code": "LT", "code3": "LTU", "name": "Lithuania", "label": "Lithuania", "number": "440"},
	{"code": "LU", "code3": "LUX", "name": "Luxembourg", "label": "Luxembourg", "number": "442"},
	{"code": "MO", "code3": "MAC", "name": "Macao", "label": "Macao", "number": "446"},
	{"code": "MG", "code3": "MDG", "name": "Madagascar", "label": "Madagascar", "number": "450"},
	{"code": "MW", "code3": "MWI", "name": "Malawi", "label": "Malawi", "number": "454"},
	{"code": "MY", "code3": "MYS", "name": "Malaysia", "label": "Malaysia", "number": "458"},
	{"code": "MV", "code3": "MDV", "name": "Maldives", "label": "Maldives", "number": "462"},
	{"code": "ML", "code3": "MLI", "name": "Mali", "label": "Mali", "number": "466"},
	{"code": "MT", "code3": "MLT", "name": "Malta", "label": "Malta", "number": "470"},
	{"code": "MH", "code3": "MHL", "name": "Marshall Islands (the)", "label": "Marshall Islands (the)", "number": "584"},
	{"code": "MQ", "code3": "MTQ", "name": "Martinique", "label": "Martinique", "number": "474"},
	{"code": "MR", "code3": "MRT", "name": "Mauritania", "label": "Mauritania", "number": "478"},
	{"code": "MU", "code3": "MUS", "name": "Mauritius", "label": "Mauritius", "number": "480"},
	{"code": "MX", "code3": "MEX", "name": "Mexico", "label": "Mexico", "number": "484"},
	{"code": "FM", "code3": "FSM", "name": "Micronesia (Federated States of)", "label": "Micronesia (Federated States of)", "number": "583"},
	{"code": "MD", "code3": "MDA", "name": "Moldova (the Republic of)", "label": "Moldova (the Republic of)", "number": "498"},
	{"code": "MC", "code3": "MCO", "name": "Monaco", "label": "Monaco", "number": "492"},
	{"code": "MN", "code3": "MNG", "name": "Mongolia", "label": "Mongolia", "number": "496"},
	{"code": "ME", "code3": "MNE", "name": "Montenegro", "label": "Montenegro", "number": "499"},
	{"code": "MS", "code3": "MSR", "name": "Montserrat", "label": "Montserrat", "number": "500"},
	{"code": "MA", "code3": "MAR", "name": "Morocco", "label": "Morocco", "number": "504"},
	{"code": "MZ", "code3": "MOZ", "name": "Mozambique", "label": "Mozambique", "number": "508"},
	{"code": "MM", "code3": "MMR", "name": "Myanmar", "label": "Myanmar", "number": "104"},
	{"code": "NA", "code3": "NAM", "name": "Namibia", "label": "Namibia", "number": "516"},
	{"code": "NR", "code3": "NRU", "name": "Nauru", "label": "Nauru", "number": "520"},
	{"code": "NP", "code3": "NPL", "name": "Nepal", "label": "Nepal", "number": "524"},
	{"code": "NL", "code3": "NLD", "name": "Netherlands (the)", "label": "Netherlands (the)", "number": "528"},
	{"code": "NZ", "code3": "NZL", "name": "New Zealand", "label": "New Zealand", "number": "554"},
	{"code": "NI", "code3": "NIC", "name": "Nicaragua", "label": "Nicaragua", "number": "558"},
	{"code": "NE", "code3": "NER", "name": "Niger (the)", "label": "Niger (the)", "number": "562"},
	{"code": "NG", "code3": "NGA", "name": "Nigeria", "label": "Nigeria", "number": "566"},
	{"code": "NU", "code3": "NIU", "name": "Niue", "label": "Niue", "number": "570"},
	{"code": "NF", "code3": "NFK", "name": "Norfolk Island", "label": "Norfolk Island", "number": "574"},
	{"code": "MP", "code3": "MNP", "name": "Northern Mariana Islands (the)", "label": "Northern Mariana Islands (the)", "number": "580"},
	{"code": "NO", "code3": "NOR", "name": "Norway", "label": "Norway", "number": "578"},
	{"code": "OM", "code3": "OMN", "name": "Oman", "label": "Oman", "number": "512"},
	{"code": "PK", "code3": "PAK", "name": "Pakistan", "label": "Pakistan", "number": "586"},
	{"code": "PW", "code3": "PLW", "name": "Palau", "label": "Palau", "number": "585"},
	{"code": "PS", "code3": "PSE", "name": "Palestine, State of", "label": "Palestine, State of", "number": "275"},
	{"code": "PA", "code3": "PAN", "name": "Panama", "label": "Panama", "number": "591"},
	{"code": "PG", "code3": "PNG", "name": "Papua New Guinea", "label": "Papua New Guinea", "number": "598"},
	{"code": "PY", "code3": "PRY", "name": "Paraguay", "label": "Paraguay", "number": "600"},
	{"code": "PE", "code3": "PER", "name": "Peru", "label": "Peru", "number": "604"},
	{"code": "PH", "code3": "PHL", "name": "Philippines (the)", "label": "Philippines (the)", "number": "608"},
	{"code": "PN", "code3": "PCN", "name": "Pitcairn", "label": "Pitcairn", "number": "612"},
	{"code": "PL", "code3": "POL", "name": "Poland", "label": "Poland", "number": "616"},
	{"code": "PT", "code3": "PRT", "name": "Portugal", "label": "Portugal", "number": "620"},
	{"code": "PR", "code3": "PRI", "name": "Puerto Rico", "label": "Puerto Rico", "number": "630"},
	{"code": "QA", "code3": "QAT", "name": "Qatar", "label": "Qatar", "number": "634"},
	{"code": "MK", "code3": "MKD", "name": "Republic of North Macedonia", "label": "Republic of North Macedonia", "number": "807"},
	{"code": "RO", "code3": "ROU", "name": "Romania", "label": "Romania", "number": "642"},
	{"code": "RU", "code3": "RUS", "name": "Russian Federation (the)", "label": "Russian Federation (the)", "number": "643"},
	{"code": "RW", "code3": "RWA", "name": "Rwanda", "label": "Rwanda", "number": "646"},
	{"code": "KN", "code3": "KNA", "name": "Saint Kitts and Nevis", "label": "Saint Kitts and Nevis", "number": "659"},
	{"code": "WS", "code3": "WSM", "name": "Samoa", "label": "Samoa", "number": "882"},
	{"code": "SM", "code3": "SMR", "name": "San Marino", "label": "San Marino", "number": "674"},
	{"code": "ST", "code3": "STP", "name": "Sao Tome and Principe", "label": "Sao Tome and Principe", "number": "678"},
	{"code": "SA", "code3": "SAU", "name": "Saudi Arabia", "label": "Saudi Arabia", "number": "682"},
	{"code": "SN", "code3": "SEN", "name": "Senegal", "label": "Senegal", "number": "686"},
	{"code": "RS", "code3": "SRB", "name": "Serbia", "label": "Serbia", "number": "688"},
	{"code": "SC", "code3": "SYC", "name": "Seychelles", "label": "Seychelles", "number": "690"},
	{"code": "SL", "code3": "SLE", "name": "Sierra Leone", "label": "Sierra Leone", "number": "694"},
	{"code": "SG", "code3": "SGP", "name": "Singapore", "label": "Singapore", "number": "702"},
	{"code": "SX", "code3": "SXM", "name": "Sint Maarten (Dutch part)", "label": "Sint Maarten (Dutch part)", "number": "534"},
	{"code": "SK", "code3": "SVK", "name": "Slovakia", "label": "Slovakia", "number": "703"},
	{"code": "SI", "code3": "SVN", "name": "Slovenia", "label": "Slovenia", "number": "705"},
	{"code": "SB", "code3": "SLB", "name": "Solomon Islands", "label": "Solomon Islands", "number": "090"},
	{"code": "SO", "code3": "SOM", "name": "Somalia", "label": "Somalia", "number": "706"},
	{"code": "ZA", "code3": "ZAF", "name": "South Africa", "label": "South Africa", "number": "710"},
	{"code": "SS", "code3": "SSD", "name": "South Sudan", "label": "South Sudan", "number": "728"},
	{"code": "ES", "code3": "ESP", "name": "Spain", "label": "Spain", "number": "724"},
	{"code": "LK", "code3": "LKA", "name": "Sri Lanka", "label": "Sri Lanka", "number": "144"},
	{"code": "SD", "code3": "SDN", "name": "Sudan (the)", "label": "Sudan (the)", "number": "729"},
	{"code": "SR", "code3": "SUR", "name": "Suriname", "label": "Suriname", "number": "740"},
	{"code": "SE", "code3": "SWE", "name": "Sweden", "label": "Sweden", "number": "752"},
	{"code": "CH", "code3": "CHE", "name": "Switzerland", "label": "Switzerland", "number": "756"},
	{"code": "SY", "code3": "SYR", "name": "Syrian Arab Republic", "label": "Syrian Arab Republic", "number": "760"},
	{"code": "TW", "code3": "TWN", "name": "Taiwan", "label": "Taiwan", "number": "158"},
	{"code": "TJ", "code3": "TJK", "name": "Tajikistan", "label": "Tajikistan", "number": "762"},
	{"code": "TZ", "code3": "TZA", "name": "Tanzania, United Republic of", "label": "Tanzania, United Republic of", "number": "834"},
	{"code": "TH", "code3": "THA", "name": "Thailand", "label": "Thailand", "number": "764"},
	{"code": "TG", "code3": "TGO", "name": "Togo", "label": "Togo", "number": "768"},
	{"code": "TK", "code3": "TKL", "name": "Tokelau", "label": "Tokelau", "number": "772"},
	{"code": "TO", "code3": "TON", "name": "Tonga", "label": "Tonga", "number": "776"},
	{"code": "TT", "code3": "TTO", "name": "Trinidad and Tobago", "label": "Trinidad and Tobago", "number": "780"},
	{"code": "TN", "code3": "TUN", "name": "Tunisia", "label": "Tunisia", "number": "788"},
	{"code": "TR", "code3": "TUR", "name": "Turkey", "label": "Turkey", "number": "792"},
	{"code": "TM", "code3": "TKM", "name": "Turkmenistan", "label": "Turkmenistan", "number": "795"},
	{"code": "TC", "code3": "TCA", "name": "Turks and Caicos Islands (the)", "label": "Turks and Caicos Islands (the)", "number": "796"},
	{"code": "TV", "code3": "TUV", "name": "Tuvalu", "label": "Tuvalu", "number": "798"},
	{"code": "UG", "code3": "UGA", "name": "Uganda", "label": "Uganda", "number": "800"},
	{"code": "UA", "code3": "UKR", "name": "Ukraine", "label": "Ukraine", "number": "804"},
	{"code": "AE", "code3": "ARE", "name": "United Arab Emirates (the)", "label": "United Arab Emirates (the)", "number": "784"},
	{"code": "GB", "code3": "GBR", "name": "United Kingdom of Great Britain and Northern Ireland (the)", "label": "United Kingdom of Great Britain and Northern Ireland (the)", "number": "826"},
	{"code": "US", "code3": "USA", "name": "United States of America (the)", "label": "United States of America (the)", "number": "840", "hide": "1"},
	{"code": "UY", "code3": "URY", "name": "Uruguay", "label": "Uruguay", "number": "858"},
	{"code": "UZ", "code3": "UZB", "name": "Uzbekistan", "label": "Uzbekistan", "number": "860"},
	{"code": "VU", "code3": "VUT", "name": "Vanuatu", "label": "Vanuatu", "number": "548"},
	{"code": "VE", "code3": "VEN", "name": "Venezuela (Bolivarian Republic of)", "label": "Venezuela (Bolivarian Republic of)", "number": "862"},
	{"code": "VN", "code3": "VNM", "name": "Viet Nam", "label": "Viet Nam", "number": "704"},
	{"code": "VI", "code3": "VIR", "name": "Virgin Islands (U.S.)", "label": "Virgin Islands (U.S.)", "number": "850"},
	{"code": "YE", "code3": "YEM", "name": "Yemen", "label": "Yemen", "number": "887"},
	{"code": "ZM", "code3": "ZMB", "name": "Zambia", "label": "Zambia", "number": "894"},
	{"code": "ZW", "code3": "ZWE", "name": "Zimbabwe", "label": "Zimbabwe", "number": "716"},
];

const formatOptionLabel = (option) => (
    <div style={{ display: "flex", alignItems: "center" }}>
	  <div className={`flag ${option.code.toLowerCase()}`}>
	  </div>
      <div style={{marginTop: '0.3rem'}}>{option.label}</div>
    </div>
);

const CountryPicker = ({
	label,
	children,
	defaultCountry,
	hide,
	...props
}) => {
	
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props)
	const { touched, error } = meta;
	const [state, updateState] = useState({
		selectedOption: hide === true? countryList.filter(item => item.hide !== "1").find((c) => c.code.toLowerCase() === defaultCountry) : countryList.find((c) => c.code.toLowerCase() === defaultCountry)
	});

    const selectRef = useRef(null);
	
	useEffect(() => {
		if (defaultCountry)
			setFieldValue(field.name, state.selectedOption.code.toLowerCase());
	}, [defaultCountry])

    const handleChange = selectedOption => {
      updateState({ ...state, selectedOption: selectedOption });
	  setFieldValue(field.name, selectedOption.code.toLowerCase());
    }

    const handleFocus = (e) => {
        e.preventDefault();
        selectRef.current.onMenuOpen();
        selectRef.current.focus();
    }

    const customStyles = {
        menu: base => ({
          ...base,
          // override border radius to match the box
          borderRadius: "0.5rem",
        }),
        menuList: base => ({
          ...base,
          // kill the white space on first and last option
          padding: "0",
          textAlign: "left",
          " li": {
            // Overwrittes the different states of border
            backgroundColor: "red"
          }
        })
	};

	const customFilter = (candidate, searchText) => {
		if (searchText) {
			return candidate.data.name.toLowerCase().includes(searchText.toLowerCase());
		}
		return true;
	  }

    return (
        <div className={`select-wrapper country-picker ${getFieldCSSClasses(touched, error)}`}>
          <span className={`select-label ${state.selectedOption != null ? 'active' : ''}`} onClick={handleFocus}>
              {label}
          </span>
          <Select
            formatOptionLabel={formatOptionLabel}
			ref={selectRef}
            getOptionLabel={label => label}
			getOptionValue={code => code}
			filterOption={customFilter}
            value={state.selectedOption}
            onChange={handleChange}
            options={hide === true ? countryList.filter(item => item.hide !== "1") : countryList}
            placeholder=""
            styles={customStyles}
          />
        </div>
    )
}

export default CountryPicker;
