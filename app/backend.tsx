import { FlagDefinition, FlagRequest, FlagResponse } from "./models";

const LOCAL = true;

export async function getFlags(): Promise<FlagDefinition[]> {
    if (LOCAL) {
        return LOCAL_FLAGS;
    }
    const response = await fetch("/api/flags");
    if (response.status == 200) {
        const flags = await response.json() as FlagDefinition[];
        return flags;
    } else {
        throw new Error("Couldn't retrieve flags");
    }
}

export async function makeGuess(request: FlagRequest): Promise<FlagResponse> {
    if (LOCAL) {
        return structuredClone(LOCAL_RESPONSE);
    }
    const response = await fetch("/api/guess", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });
    if (response.status == 200) {
        const result = await response.json() as FlagResponse;
        return result;
    } else {
        throw new Error("Couldn't make guess");
    }
}

const LOCAL_RESPONSE: FlagResponse = {
    "individualFlagResults": [
        {
            "code": "HK",
            "name": "Hong Kong",
            "emoji": "🇭🇰",
            "distance": undefined,
            "colors": {
                "RED": true,
                "WHITE": true
            },
            "charges": {
                "STAR": {
                    "present": 0,
                    "absent": 5,
                    "allFound": true
                },
                "PLANT": {
                    "present": 0,
                    "absent": 1,
                    "allFound": true
                }
            },
            "patterns": {
                "FIELD": {
                    "present": 0,
                    "absent": 1,
                    "allFound": true
                }
            }
        },
        {
            "code": "GW",
            "name": "Guinea-Bissau",
            "emoji": "🇬🇼",
            "distance": undefined,
            "colors": {
                "RED": true,
                "YELLOW": false,
                "GREEN": true,
                "BLACK": true
            },
            "charges": {
                "STAR": {
                    "present": 0,
                    "absent": 1,
                    "allFound": true
                }
            },
            "patterns": {
                "HORIZONTAL_STRIPE": {
                    "present": 2,
                    "absent": 0,
                    "allFound": false
                },
                "VERTICAL_STRIPE": {
                    "present": 0,
                    "absent": 1,
                    "allFound": true
                }
            }
        },
        {
            "code": "KW",
            "name": "Kuwait",
            "emoji": "🇰🇼",
            "distance": undefined,
            "colors": {
                "RED": true,
                "GREEN": true,
                "BLACK": true,
                "WHITE": true
            },
            "charges": {},
            "patterns": {
                "HORIZONTAL_STRIPE": {
                    "present": 3,
                    "absent": 0,
                    "allFound": true
                }
            }
        }
    ],
    "status": "WON",
    "answer": {
        "code": "KW",
        "name": "Kuwait",
        "emoji": "🇰🇼"
    }
}

const LOCAL_FLAGS: FlagDefinition[] = [
    {
        "code": "PR",
        "name": "Puerto Rico",
        "emoji": "🇵🇷"
    },
    {
        "code": "HK",
        "name": "Hong Kong",
        "emoji": "🇭🇰"
    },
    {
        "code": "PS",
        "name": "Palestine",
        "emoji": "🇵🇸"
    },
    {
        "code": "PT",
        "name": "Portugal",
        "emoji": "🇵🇹"
    },
    {
        "code": "HN",
        "name": "Honduras",
        "emoji": "🇭🇳"
    },
    {
        "code": "PW",
        "name": "Palau",
        "emoji": "🇵🇼"
    },
    {
        "code": "PY",
        "name": "Paraguay",
        "emoji": "🇵🇾"
    },
    {
        "code": "HR",
        "name": "Croatia",
        "emoji": "🇭🇷"
    },
    {
        "code": "HT",
        "name": "Haiti",
        "emoji": "🇭🇹"
    },
    {
        "code": "HU",
        "name": "Hungary",
        "emoji": "🇭🇺"
    },
    {
        "code": "QA",
        "name": "Qatar",
        "emoji": "🇶🇦"
    },
    {
        "code": "ID",
        "name": "Indonesia",
        "emoji": "🇮🇩"
    },
    {
        "code": "IE",
        "name": "Ireland",
        "emoji": "🇮🇪"
    },
    {
        "code": "AD",
        "name": "Andorra",
        "emoji": "🇦🇩"
    },
    {
        "code": "IM",
        "name": "Isle of Man",
        "emoji": "🇮🇲"
    },
    {
        "code": "AF",
        "name": "Afghanistan",
        "emoji": "🇦🇫"
    },
    {
        "code": "IN",
        "name": "India",
        "emoji": "🇮🇳"
    },
    {
        "code": "AG",
        "name": "Antigua and Barbuda",
        "emoji": "🇦🇬"
    },
    {
        "code": "IO",
        "name": "British Indian Ocean Territory",
        "emoji": "🇮🇴"
    },
    {
        "code": "AI",
        "name": "Anguilla",
        "emoji": "🇦🇮"
    },
    {
        "code": "IQ",
        "name": "Iraq",
        "emoji": "🇮🇶"
    },
    {
        "code": "IR",
        "name": "Iran",
        "emoji": "🇮🇷"
    },
    {
        "code": "IS",
        "name": "Iceland",
        "emoji": "🇮🇸"
    },
    {
        "code": "AL",
        "name": "Albania",
        "emoji": "🇦🇱"
    },
    {
        "code": "IT",
        "name": "Italy",
        "emoji": "🇮🇹"
    },
    {
        "code": "AM",
        "name": "Armenia",
        "emoji": "🇦🇲"
    },
    {
        "code": "AO",
        "name": "Angola",
        "emoji": "🇦🇴"
    },
    {
        "code": "AQ",
        "name": "Antarctica",
        "emoji": "🇦🇶"
    },
    {
        "code": "AR",
        "name": "Argentina",
        "emoji": "🇦🇷"
    },
    {
        "code": "AS",
        "name": "American Samoa",
        "emoji": "🇦🇸"
    },
    {
        "code": "AT",
        "name": "Austria",
        "emoji": "🇦🇹"
    },
    {
        "code": "AU",
        "name": "Australia",
        "emoji": "🇦🇺"
    },
    {
        "code": "AW",
        "name": "Aruba",
        "emoji": "🇦🇼"
    },
    {
        "code": "AX",
        "name": "Åland Islands",
        "emoji": "🇦🇽"
    },
    {
        "code": "AZ",
        "name": "Azerbaijan",
        "emoji": "🇦🇿"
    },
    {
        "code": "JE",
        "name": "Jersey",
        "emoji": "🇯🇪"
    },
    {
        "code": "RO",
        "name": "Romania",
        "emoji": "🇷🇴"
    },
    {
        "code": "BA",
        "name": "Bosnia and Herzegovina",
        "emoji": "🇧🇦"
    },
    {
        "code": "BB",
        "name": "Barbados",
        "emoji": "🇧🇧"
    },
    {
        "code": "BD",
        "name": "Bangladesh",
        "emoji": "🇧🇩"
    },
    {
        "code": "BE",
        "name": "Belgium",
        "emoji": "🇧🇪"
    },
    {
        "code": "JM",
        "name": "Jamaica",
        "emoji": "🇯🇲"
    },
    {
        "code": "BF",
        "name": "Burkina Faso",
        "emoji": "🇧🇫"
    },
    {
        "code": "BG",
        "name": "Bulgaria",
        "emoji": "🇧🇬"
    },
    {
        "code": "JO",
        "name": "Jordan",
        "emoji": "🇯🇴"
    },
    {
        "code": "RW",
        "name": "Rwanda",
        "emoji": "🇷🇼"
    },
    {
        "code": "BH",
        "name": "Bahrain",
        "emoji": "🇧🇭"
    },
    {
        "code": "JP",
        "name": "Japan",
        "emoji": "🇯🇵"
    },
    {
        "code": "BI",
        "name": "Burundi",
        "emoji": "🇧🇮"
    },
    {
        "code": "BJ",
        "name": "Benin",
        "emoji": "🇧🇯"
    },
    {
        "code": "BM",
        "name": "Bermuda",
        "emoji": "🇧🇲"
    },
    {
        "code": "BN",
        "name": "Brunei",
        "emoji": "🇧🇳"
    },
    {
        "code": "BO",
        "name": "Bolivia",
        "emoji": "🇧🇴"
    },
    {
        "code": "BR",
        "name": "Brazil",
        "emoji": "🇧🇷"
    },
    {
        "code": "BS",
        "name": "The Bahamas",
        "emoji": "🇧🇸"
    },
    {
        "code": "BT",
        "name": "Bhutan",
        "emoji": "🇧🇹"
    },
    {
        "code": "BV",
        "name": "Bouvet Island",
        "emoji": "🇧🇻"
    },
    {
        "code": "BW",
        "name": "Botswana",
        "emoji": "🇧🇼"
    },
    {
        "code": "BY",
        "name": "Belarus",
        "emoji": "🇧🇾"
    },
    {
        "code": "BZ",
        "name": "Belize",
        "emoji": "🇧🇿"
    },
    {
        "code": "KE",
        "name": "Kenya",
        "emoji": "🇰🇪"
    },
    {
        "code": "KG",
        "name": "Kyrgyzstan",
        "emoji": "🇰🇬"
    },
    {
        "code": "KH",
        "name": "Cambodia",
        "emoji": "🇰🇭"
    },
    {
        "code": "CA",
        "name": "Canada",
        "emoji": "🇨🇦"
    },
    {
        "code": "KI",
        "name": "Kiribati",
        "emoji": "🇰🇮"
    },
    {
        "code": "CC",
        "name": "Cocos (Keeling) Islands",
        "emoji": "🇨🇨"
    },
    {
        "code": "CD",
        "name": "Democratic Republic of the Congo",
        "emoji": "🇨🇩"
    },
    {
        "code": "KM",
        "name": "The Comoros",
        "emoji": "🇰🇲"
    },
    {
        "code": "CF",
        "name": "Central African Republic",
        "emoji": "🇨🇫"
    },
    {
        "code": "SV",
        "name": "El Salvador",
        "emoji": "🇸🇻"
    },
    {
        "code": "CG",
        "name": "Republic of the Congo",
        "emoji": "🇨🇬"
    },
    {
        "code": "KP",
        "name": "Democratic Republic of Korea",
        "emoji": "🇰🇵"
    },
    {
        "code": "CI",
        "name": "Côte d'Ivoire",
        "emoji": "🇨🇮"
    },
    {
        "code": "SZ",
        "name": "Eswatini",
        "emoji": "🇸🇿"
    },
    {
        "code": "KR",
        "name": "Republic of Korea",
        "emoji": "🇰🇷"
    },
    {
        "code": "CK",
        "name": "Cook Islands",
        "emoji": "🇨🇰"
    },
    {
        "code": "CL",
        "name": "Chile",
        "emoji": "🇨🇱"
    },
    {
        "code": "CM",
        "name": "Cameroon",
        "emoji": "🇨🇲"
    },
    {
        "code": "CN",
        "name": "China",
        "emoji": "🇨🇳"
    },
    {
        "code": "CO",
        "name": "Colombia",
        "emoji": "🇨🇴"
    },
    {
        "code": "KW",
        "name": "Kuwait",
        "emoji": "🇰🇼"
    },
    {
        "code": "KY",
        "name": "Cayman Islands",
        "emoji": "🇰🇾"
    },
    {
        "code": "CR",
        "name": "Costa Rica",
        "emoji": "🇨🇷"
    },
    {
        "code": "KZ",
        "name": "Kazakhstan",
        "emoji": "🇰🇿"
    },
    {
        "code": "TD",
        "name": "Chad",
        "emoji": "🇹🇩"
    },
    {
        "code": "CU",
        "name": "Cuba",
        "emoji": "🇨🇺"
    },
    {
        "code": "TF",
        "name": "French Southern Territories",
        "emoji": "🇹🇫"
    },
    {
        "code": "CW",
        "name": "Curaçao",
        "emoji": "🇨🇼"
    },
    {
        "code": "CX",
        "name": "Christmas Island",
        "emoji": "🇨🇽"
    },
    {
        "code": "LA",
        "name": "Laos",
        "emoji": "🇱🇦"
    },
    {
        "code": "CY",
        "name": "Cyprus",
        "emoji": "🇨🇾"
    },
    {
        "code": "LB",
        "name": "Lebanon",
        "emoji": "🇱🇧"
    },
    {
        "code": "CZ",
        "name": "Czechia",
        "emoji": "🇨🇿"
    },
    {
        "code": "LI",
        "name": "Liechtenstein",
        "emoji": "🇱🇮"
    },
    {
        "code": "DE",
        "name": "Germany",
        "emoji": "🇩🇪"
    },
    {
        "code": "DJ",
        "name": "Djibouti",
        "emoji": "🇩🇯"
    },
    {
        "code": "LR",
        "name": "Liberia",
        "emoji": "🇱🇷"
    },
    {
        "code": "DK",
        "name": "Denmark",
        "emoji": "🇩🇰"
    },
    {
        "code": "LS",
        "name": "Lesotho",
        "emoji": "🇱🇸"
    },
    {
        "code": "LT",
        "name": "Lithuania",
        "emoji": "🇱🇹"
    },
    {
        "code": "DM",
        "name": "Dominica",
        "emoji": "🇩🇲"
    },
    {
        "code": "LU",
        "name": "Luxembourg",
        "emoji": "🇱🇺"
    },
    {
        "code": "LV",
        "name": "Latvia",
        "emoji": "🇱🇻"
    },
    {
        "code": "DO",
        "name": "Dominican Republic",
        "emoji": "🇩🇴"
    },
    {
        "code": "LY",
        "name": "Libya",
        "emoji": "🇱🇾"
    },
    {
        "code": "MA",
        "name": "Morocco",
        "emoji": "🇲🇦"
    },
    {
        "code": "DZ",
        "name": "Algeria",
        "emoji": "🇩🇿"
    },
    {
        "code": "MC",
        "name": "Monaco",
        "emoji": "🇲🇨"
    },
    {
        "code": "MD",
        "name": "Moldova",
        "emoji": "🇲🇩"
    },
    {
        "code": "ME",
        "name": "Montenegro",
        "emoji": "🇲🇪"
    },
    {
        "code": "MG",
        "name": "Madagascar",
        "emoji": "🇲🇬"
    },
    {
        "code": "MH",
        "name": "The Marshall Islands",
        "emoji": "🇲🇭"
    },
    {
        "code": "EC",
        "name": "Ecuador",
        "emoji": "🇪🇨"
    },
    {
        "code": "MK",
        "name": "North Macedonia",
        "emoji": "🇲🇰"
    },
    {
        "code": "ML",
        "name": "Mali",
        "emoji": "🇲🇱"
    },
    {
        "code": "EE",
        "name": "Estonia",
        "emoji": "🇪🇪"
    },
    {
        "code": "MM",
        "name": "Myanmar",
        "emoji": "🇲🇲"
    },
    {
        "code": "MN",
        "name": "Mongolia",
        "emoji": "🇲🇳"
    },
    {
        "code": "EG",
        "name": "Egypt",
        "emoji": "🇪🇬"
    },
    {
        "code": "MO",
        "name": "Macao",
        "emoji": "🇲🇴"
    },
    {
        "code": "MP",
        "name": "Northern Mariana Islands",
        "emoji": "🇲🇵"
    },
    {
        "code": "MR",
        "name": "Mauritania",
        "emoji": "🇲🇷"
    },
    {
        "code": "MS",
        "name": "Montserrat",
        "emoji": "🇲🇸"
    },
    {
        "code": "MT",
        "name": "Malta",
        "emoji": "🇲🇹"
    },
    {
        "code": "MU",
        "name": "Mauritius",
        "emoji": "🇲🇺"
    },
    {
        "code": "MV",
        "name": "Maldives",
        "emoji": "🇲🇻"
    },
    {
        "code": "MW",
        "name": "Malawi",
        "emoji": "🇲🇼"
    },
    {
        "code": "MX",
        "name": "Mexico",
        "emoji": "🇲🇽"
    },
    {
        "code": "MY",
        "name": "Malaysia",
        "emoji": "🇲🇾"
    },
    {
        "code": "ER",
        "name": "Eritrea",
        "emoji": "🇪🇷"
    },
    {
        "code": "MZ",
        "name": "Mozambique",
        "emoji": "🇲🇿"
    },
    {
        "code": "ET",
        "name": "Ethiopia",
        "emoji": "🇪🇹"
    },
    {
        "code": "NA",
        "name": "Namibia",
        "emoji": "🇳🇦"
    },
    {
        "code": "NE",
        "name": "Niger",
        "emoji": "🇳🇪"
    },
    {
        "code": "NF",
        "name": "Norfolk Island",
        "emoji": "🇳🇫"
    },
    {
        "code": "NG",
        "name": "Nigeria",
        "emoji": "🇳🇬"
    },
    {
        "code": "NI",
        "name": "Nicaragua",
        "emoji": "🇳🇮"
    },
    {
        "code": "NL",
        "name": "The Netherlands",
        "emoji": "🇳🇱"
    },
    {
        "code": "NO",
        "name": "Norway",
        "emoji": "🇳🇴"
    },
    {
        "code": "NP",
        "name": "Nepal",
        "emoji": "🇳🇵"
    },
    {
        "code": "FI",
        "name": "Finland",
        "emoji": "🇫🇮"
    },
    {
        "code": "FJ",
        "name": "Fiji",
        "emoji": "🇫🇯"
    },
    {
        "code": "NR",
        "name": "Nauru",
        "emoji": "🇳🇷"
    },
    {
        "code": "FK",
        "name": "Falkland Islands",
        "emoji": "🇫🇰"
    },
    {
        "code": "FM",
        "name": "Micronesia",
        "emoji": "🇫🇲"
    },
    {
        "code": "NU",
        "name": "Niue",
        "emoji": "🇳🇺"
    },
    {
        "code": "FO",
        "name": "Faroe Islands",
        "emoji": "🇫🇴"
    },
    {
        "code": "FR",
        "name": "France",
        "emoji": "🇫🇷"
    },
    {
        "code": "NZ",
        "name": "New Zealand",
        "emoji": "🇳🇿"
    },
    {
        "code": "GA",
        "name": "Gabon",
        "emoji": "🇬🇦"
    },
    {
        "code": "GD",
        "name": "Grenada",
        "emoji": "🇬🇩"
    },
    {
        "code": "GE",
        "name": "Georgia",
        "emoji": "🇬🇪"
    },
    {
        "code": "OM",
        "name": "Oman",
        "emoji": "🇴🇲"
    },
    {
        "code": "GF",
        "name": "French Guiana",
        "emoji": "🇬🇫"
    },
    {
        "code": "GG",
        "name": "Guernsey",
        "emoji": "🇬🇬"
    },
    {
        "code": "GH",
        "name": "Ghana",
        "emoji": "🇬🇭"
    },
    {
        "code": "GI",
        "name": "Gibraltar",
        "emoji": "🇬🇮"
    },
    {
        "code": "GL",
        "name": "Greenland",
        "emoji": "🇬🇱"
    },
    {
        "code": "GM",
        "name": "The Gambia",
        "emoji": "🇬🇲"
    },
    {
        "code": "GN",
        "name": "Guinea",
        "emoji": "🇬🇳"
    },
    {
        "code": "GQ",
        "name": "Equatorial Guinea",
        "emoji": "🇬🇶"
    },
    {
        "code": "GR",
        "name": "Greece",
        "emoji": "🇬🇷"
    },
    {
        "code": "GT",
        "name": "Guatemala",
        "emoji": "🇬🇹"
    },
    {
        "code": "GU",
        "name": "Guam",
        "emoji": "🇬🇺"
    },
    {
        "code": "GW",
        "name": "Guinea-Bissau",
        "emoji": "🇬🇼"
    },
    {
        "code": "PA",
        "name": "Panama",
        "emoji": "🇵🇦"
    },
    {
        "code": "GY",
        "name": "Guyana",
        "emoji": "🇬🇾"
    },
    {
        "code": "XK",
        "name": "Kosovo",
        "emoji": "🇽🇰"
    },
    {
        "code": "PE",
        "name": "Peru",
        "emoji": "🇵🇪"
    },
    {
        "code": "PF",
        "name": "French Polynesia",
        "emoji": "🇵🇫"
    },
    {
        "code": "PG",
        "name": "Papau New Guinea",
        "emoji": "🇵🇬"
    },
    {
        "code": "PH",
        "name": "The Philippines",
        "emoji": "🇵🇭"
    },
    {
        "code": "PK",
        "name": "Pakistan",
        "emoji": "🇵🇰"
    },
    {
        "code": "PL",
        "name": "Poland",
        "emoji": "🇵🇱"
    },
    {
        "code": "PN",
        "name": "Pitcairn",
        "emoji": "🇵🇳"
    }
];