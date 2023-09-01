import fetch from 'node-fetch'
import cheerio from 'cheerio'
import axios from 'axios'
import { JSDOM } from 'jsdom'
let handler = async (m, { conn, text, usedPrefix, command }) => {
const country = text.toLowerCase();
const countryAbbr = countryAbbreviationsLowerCase[country];
const apiUrl = `https://www.who.int/countries/${countryAbbr}`;
const response = await axios.get(apiUrl);
const htmlContent = response.data;        
const datos = cheerio.load(htmlContent);
//axios.get(apiUrl).then(response => {
   const $ = cheerio.load(response.data);  
let metatitle = $('title').text();
let metadescription = $('meta[name="description"]').attr('content');
//let robotsDirectives = $('meta[name="robots"]').attr('content').split(',');
let charset = $('meta[charset]').attr('charset');
let htmlLanguage = $('html').attr('lang'); 
let canonical = $('link[rel="canonical"]').attr('href'); 
let hreflangs = []; $('link[hreflang]').each((index, element) => {   hreflangs.push([$(element).attr('href'), $(element).attr('hreflang')]); }); 
let paragraphs = []; $('p').each((index, element) => {   paragraphs.push($(element).text()); }); 
let textLength = paragraphs.join('').length;
let headers = []; $('h1, h2, h3, h4, h5, h6').each((index, element) => {   
    headers.push([$(element).prop('tagName'), $(element).text()]); 
});
let images = []; $('img').each((index, element) => {   images.push({     src: $(element).attr('src'),     alt: $(element).attr('alt'),   }); }); 
let links = []; $('a').each((index, element) => {   
links.push({     
text: $(element).text(),     
//href: $(element).attr('href'),     
//nofollow: $(element).attr('rel') === 'nofollow' ? true : false,   
//target: $(element).attr('target') === '_blank' ? true : false,  
heading1:  $(element).attr('heading1'),
content: $(element).attr('content')

});
})
var categories = ["Confirmed cases", "New cases", "Confirmed deaths"];

var data = {};

$("div").each(function(index, element) {
    var contentText = $(element).text().trim();
    
    if (categories.includes(contentText)) {
        var numberElement = $(element).next(".heading1");
        
        if (numberElement.length === 0) {
            numberElement = $(element).next(".heading1[id]");
        }
        
        if (numberElement.length > 0) {
            var number = numberElement.text().trim();
            data[contentText] = number;
        }
    }
});

console.log('datos: ',data); 
if (!text) {
let resp = `*[❗] INGRESE EL NOMBRE DE UN PAIS, EJEMPLO ${usedPrefix + command} Mexico*`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );

}

    if (countryAbbreviationsLowerCase.hasOwnProperty(country)) {
// Ahora podemos usar $ para seleccionar elementos como en jQuery
        const totalCases = cheerio('.total_cases').text().trim();
        const totalDeaths = cheerio('.total_deaths').text().trim();
        const newCases = cheerio('.new_cases').text().trim();

        const resp = `
🌏 País: ${text}
✅ Confirmado: ${totalCases}
☠️ Muertes: ${totalDeaths}
💌 Info Actualizada: ${newCases}
${headers}
`.trim();

let txt = '';
let count = 0;
for (const c of resp) {
    new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
} else {
let resp =  `Hay un error ${json}`
let txt = '';
let count = 0;
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    return conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}

}
handler.help = ['covid'].map(v => v + ' <país>')
handler.tags = ['info']
handler.command = /^(corona|covid|covid19)$/i
export default handler


/*
//var flagImageLibraryUrl = "";
//var isNotDesignMode = window.location.href.toString().indexOf("Action/Edit") == -1;
//var isNotPreviewMode = window.location.href.toString().indexOf("Action/Preview") == -1;

// Country variables
var countryTimeline = [];
var countryNewCases = 0;
var countryCumCases = 0;
var countryCumDeaths = 0;
var countryLastChange7days = 0;
var countryCasesPop = 0;
var countryLastUpdate = "";
var countryTransmissionType = 0;
var neighbourCountriesCasesPop = 0;
var neighbourCountriesString = "";
var countryName = "";
var firstReportedCasesNumber = 0;
var firstReportedDate = "";

async function ready() {
    loadGhoStats(countryISOCode);
    loadGhoPopulation(countryISOCode);
    loadCountryTimelineAndBoxes(countryISOCode);
    setGhoCountryLink(countryISOCode);
};

function loadCountryTimelineAndBoxes(iso3Code) {

 var dateTimeStampServiceUrl = "https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/rest/services/Time_stmaps_v3_view/FeatureServer/0/query?where=1%3D1&objectIds=&time=&resultType=none&outFields=object_id%2Ctimestamp_txt%2Ctimestamp_num%2Ctimezone%2CFID&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";
  
  var countryDataTimelineCrudUrl = "https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/rest/services/COVID_19_Historic_cases_by_country_pt_v7_view/FeatureServer/0/query?where=ISO_3_CODE%3D%27" + iso3Code + "%27+and+CumCase+>+0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=date_epicrv%2CADM0_NAME%2CISO_3_CODE%2CNewCase%2CCaseLast7Days%2CCaseLast7DaysChange%2CCumCase%2CCumCasePop%2CNewDeath%2CDeathLast7Days%2CDeathLast7DaysChange%2CCumDeath%2CCumDeathPop%2CISO_2_CODE%2CWHO_REGION&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=date_epicrv+desc&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";  
  
  
    countryTimeline = [];
    countryNewCases = 0;
    countryCumCases = 0;
    countryCumDeaths = 0;
    countryLastChange7days = 0;
    countryLastUpdate = new Date();
    countryCasesPop = 0;
    firstReportedCasesNumber = 0;
    firstReportedDate = "";
    //countryName = "";
    $.getJSON(countryDataTimelineCrudUrl, function (data) {

        if(data.features.length) {

            // build summary for current country
            countryNewCases = data.features[0].attributes.NewCase;
            countryCumCases = data.features[0].attributes.CumCase;
            countryCumDeaths = data.features[0].attributes.CumDeath;
            countryLastChange7days = data.features[0].attributes.CaseLast7DaysChange;
            //countryLastUpdate = data.features[0].attributes.date_epicrv;
            countryCasesPop = data.features[0].attributes.CumCasePop;
            //countryName = data.features[0].attributes[countryindexname_viz_name[cultureIndex]];
            
            var lastIndex = data.features.length - 1;
            firstReportedCasesNumber = data.features[lastIndex].attributes.NewCase;
            firstReportedDate = data.features[lastIndex].attributes.date_epicrv;
            
            $.each(data.features, function (key, val) {
                countryTimeline.push(val.attributes);
            });    
        }    
        
    }).done(function() {
        $.getJSON(dateTimeStampServiceUrl, function (data) { 
            countryLastUpdate = data.features[0].attributes.timestamp_num;
            $("#last-updated-date").text(whoDateFormat(countryLastUpdate));
            
        }).done(function() {

            if (countryCumCases != 0 && countryTimeline.length != 0) {
                buildTotalCasesBox(countryCumCases, countryLastUpdate);
                buildNewConfirmedCasesBox(countryNewCases, countryLastUpdate);
                buildTotalDeathsBox(countryCumDeaths, countryLastUpdate);
                buildFirstReportedCases(firstReportedCasesNumber, firstReportedDate);
                //buildLast7DaysCases(countryLast7days, countryLastChange7days);
                populateCasesPerCapita(countryCasesPop);
                buildStockChart(countryTimeline, countryLastUpdate);
            } else {
                var isNotDesignMode = window.location.href.toString().indexOf("Action/Edit") == -1;
                //var isNotPreviewMode = window.location.href.toString().indexOf("Action/Preview") == -1;
    
                // hide the boxes if no cases reported yet - if not in edit mode
                if(isNotDesignMode) {
                    //$("#viz-box-new-confirmed-cases, #viz-box-first-case-reported").parent().parent().css("display", "none");
                    $(".section-outbreak").css("display", "none");
                }
            }
        });
    })
}
function buildTotalCasesBox(totalConfirmedCases, lastUpdate) {
    if (totalConfirmedCases && lastUpdate || (totalConfirmedCases == 0 && lastUpdate))
    {
        $("#viz-box-total-cases-reported .heading1").text(whoNumberFormat(totalConfirmedCases));
        //$(".metadata").text(updated_viz_name[cultureIndex] + whoDateFormat(lastUpdate));
        $("#viz-box-total-cases-reported .content .content").text(confcases_viz_name[cultureIndex]);
        $("#viz-box-total-cases-reported .heading1").addClass(numberPosition);
    }
}

function buildNewConfirmedCasesBox(newConfirmed, lastUpdate) {
    if ((newConfirmed && lastUpdate) || (newConfirmed == 0 && lastUpdate))
    {			
        $("#viz-box-new-confirmed-cases .heading1").text(whoNumberFormat(newConfirmed));
        //$(".metadata").text( updated_viz_name[cultureIndex] + whoDateFormat(lastUpdate));
        $("#viz-box-new-confirmed-cases .content .content").text(newcases_viz_name_bis[cultureIndex]);
        $("#viz-box-new-confirmed-cases .heading1").addClass(numberPosition);
    }    
}

function buildTotalDeathsBox(totalConfirmedDeaths, lastUpdate) {
    if (totalConfirmedDeaths && lastUpdate || (totalConfirmedDeaths == 0 && lastUpdate))
    {        
        $("#viz-box-total-deaths-reported .heading1").text(whoNumberFormat(totalConfirmedDeaths));     
        //$(".metadata").text(updated_viz_name[cultureIndex] + whoDateFormat(lastUpdate));
        $("#viz-box-total-deaths-reported .content .content").text(confdeaths_viz_name[cultureIndex]);
        $("#viz-box-total-deaths-reported .heading1").addClass(numberPosition);
    }
}

function buildFirstReportedCases(firstReportedCasesNumber, lastUpdate) {
    $("#viz-box-first-case-reported .content .content").text(firstcases_viz_name[cultureIndex]);
    $("#first-cases-number-value").text(firstcasesnumber_viz_name[cultureIndex]);   
    $("#viz-box-first-case-reported .heading1").addClass(numberPosition);

    if (firstReportedCasesNumber && lastUpdate || (firstReportedCasesNumber == 0 && lastUpdate))
    {    
        $("#viz-box-first-case-reported .heading1").text(whoShortDateFormat(lastUpdate));
        $("#first-cases-value").text(firstReportedCasesNumber);		
    }
    // if (firstReportedCasesNumber == 0) {
    //     $("#viz-box-first-case-reported .heading1").text("No cases reported");
    //     $("#viz-box-first-case-reported .heading1").addClass(numberPosition); 
    //     $("#first-cases-value").text(not_available[cultureIndex]);		
    // }
}   

function populateCasesPerCapita(casesPerMln) {
	if(casesPerMln || casesPerMln == 0)	{
		$("#viz-box-cases-per-1-mln .heading1").text(whoNumberFormat(casesPerMln));
        $("#viz-box-cases-per-1-mln .content .content").text(casesper1mpeople_viz_name[cultureIndex]);
	}
};

function loadGhoPopulation(countryISOCode) {
    var countryPopulation = 0;
    var ghoPopulationYear = 0;

    var countriesPopulationServiceUrl = "https://apps.who.int/gho/athena/data/GHO/WHS9_86?filter=COUNTRY:" + countryISOCode.toUpperCase() + "&format=json&profile=flat&callback=?";

    $.getJSON(countriesPopulationServiceUrl, function(data){
        if(data.fact.length > 0) {
            countryPopulation = data.fact[0].ValueNumeric * 1000;  
            ghoPopulationYear = data.fact[0].YEAR_CODE; 
        }
         
    }).done(function() {
        buildGhoPopulation(countryPopulation, ghoPopulationYear);        
    }).fail(function() {
        //buildGhoPopulation(not_available[cultureIndex], not_available[cultureIndex]);
    });    
}

function buildGhoPopulation(countryPopulation, ghoPopulationYear) {

    if(countryPopulation != 0) {
        countryPopulation = whoNumberFormat(countryPopulation);        
    } else {
        countryPopulation = not_available[cultureIndex];     
    }

    if(ghoPopulationYear == 0) {
        ghoPopulationYear = not_available[cultureIndex];    
    }

    $("#viz-box-gho-population .heading1, #gho-population").text(countryPopulation);
    $("#gho-population-year").text(ghoPopulationYear);
    $("#viz-box-gho-population .content .content").text(population_viz_name[cultureIndex]);   
    $("#gho-population-label").text(gho_total_population[cultureIndex]);      
    $("#viz-box-gho-population .heading1").addClass(numberPosition);
}

function loadGhoStats(countryISOCode) {
    ghoLifeExpectancy(countryISOCode);
    ghoTotalExpenditureOnHealthPercentageGDP(countryISOCode);
}

function ghoLifeExpectancy(countryISOCode) {

    var femaleLifeExpectancyServiceUrl = "https://apps.who.int/gho/athena/data/GHO/WHOSIS_000001?filter=COUNTRY:" + countryISOCode.toUpperCase() + ";SEX:FMLE&format=json&profile=flat&callback=?";

    var maleLifeExpectancyServiceUrl = "https://apps.who.int/gho/athena/data/GHO/WHOSIS_000001?filter=COUNTRY:" + countryISOCode.toUpperCase() + ";SEX:MLE&format=json&profile=flat&callback=?";

    var femaleLifeExpectancy = 0;
    var maleLifeExpectancy = 0;
    var lifeExpectancyYear = 0;

    $.getJSON(femaleLifeExpectancyServiceUrl, function(data){
        if(data.fact.length > 0) {
            var length = data.fact.length;
            if(length) {
                femaleLifeExpectancy = data.fact[length -1].ValueNumeric;
                lifeExpectancyYear = data.fact[length -1].YEAR_CODE;
            }
        }

    }).done(function() {

        $.getJSON(maleLifeExpectancyServiceUrl, function(data){
            if(data.fact.length > 0) {
                var length = data.fact.length;
                if(length) {
                    maleLifeExpectancy = data.fact[length - 1].ValueNumeric;
                    if(lifeExpectancyYear == 0) {
                        lifeExpectancyYear = data.fact[length - 1].YEAR_CODE;
                    }
                }              
            }            

        }).done(function() {
          
            buildGhoLifeExpectancy(lifeExpectancyYear, maleLifeExpectancy, femaleLifeExpectancy);
        });
    })    
}

function buildGhoLifeExpectancy(lifeExpectancyYear, maleLifeExpectancy, femaleLifeExpectancy) {

    if(maleLifeExpectancy != 0) {
        maleLifeExpectancy = whoNumberWhole(maleLifeExpectancy);
    } else {
        maleLifeExpectancy = not_available[cultureIndex];
    }

    if(femaleLifeExpectancy != 0) {
        femaleLifeExpectancy = whoNumberWhole(femaleLifeExpectancy);
    } else {
        femaleLifeExpectancy = not_available[cultureIndex];
    }

    if(lifeExpectancyYear != 0) {
        $("#gho-life-expectancy-year").text(lifeExpectancyYear);   
    } else {
        $("#gho-life-expectancy-year").text(not_available[cultureIndex]);   
    }
    
    $("#gho-life-expectancy-label").text(gho_life_expectancy[cultureIndex]);
    $("#gho-life-expectancy").text(maleLifeExpectancy + " / " + femaleLifeExpectancy);
}

function ghoTotalExpenditureOnHealthPercentageGDP(countryISOCode) {

    var totalExpenditureOnHealthGDPServiceUrl = "https://apps.who.int/gho/athena/data/GHO/WHS7_143?filter=COUNTRY:" + countryISOCode.toUpperCase() + "&format=json&profile=flat&callback=?";

    var totalExpenditureOnHealthGDP = 0;
    var totalExpenditureOnHealthGDPYear = 0;

    $.getJSON(totalExpenditureOnHealthGDPServiceUrl, function(data) {
        if(data.fact.length > 0) {
            if (data.fact.length) {
                var length = data.fact.length;
                totalExpenditureOnHealthGDP = data.fact[length - 1].ValueNumeric;
                totalExpenditureOnHealthGDPYear = data.fact[length - 1].YEAR_CODE;
            }            
        }
        
    }).done(function() {

        if(totalExpenditureOnHealthGDP != 0) {
            totalExpenditureOnHealthGDP = whoNumberRound(totalExpenditureOnHealthGDP);
        } else {
            totalExpenditureOnHealthGDP = not_available[cultureIndex];
        }

        if(totalExpenditureOnHealthGDPYear != 0) {
            $("#gho-expenditure-on-health-gdp-year").text(totalExpenditureOnHealthGDPYear);   
        } else {
            $("#gho-expenditure-on-health-gdp-year").text(not_available[cultureIndex]);   
        }

        $("#gho-expenditure-on-health-gdp-label").text(gho_expenditure_on_health_gdp[cultureIndex]);
        $("#gho-expenditure-on-health-gdp").text(totalExpenditureOnHealthGDP);
    }); 
}

function setGhoCountryLink(countryISOCode) {
    $(".gho-country-link .arrowed-link a").attr("href", "/countries/" + countryISOCode.toLowerCase() + "/gho-profile");

    // var countryServiceUrl = "https://www.who.int/api/multimedias/countries?$filter=Code%20eq%20%27" + countryISOCode +"%27";
    // var countryUrlName = "";

    // $.getJSON(countryServiceUrl, function(data){
    //     countryUrlName = data.value[0].UrlName;        
    // }).done(function() {
    //     var baseUrl = "/data/gho/data/countries";
    //     var ghoLink = "";

    //     if(countryUrlName) {
    //         ghoLink = baseUrl + "/country-details/GHO/" + countryUrlName;
    //     }
    //     else {
    //         ghoLink = baseUrl;
    //     }

    //     $(".gho-country-link .arrowed-link a").attr("href", ghoLink);
    // });
}
*/

const countryAbbreviations = {
'AFG': 'Afganistán',
'ALA': 'Islas de Åland',
'ALB': 'Albania',
'DZA': 'Argelia',
'ASM': 'Samoa Americana',
'AND': 'Andorra',
'AGO': 'Angola',
'AIA': 'Anguila',
'ATA': 'Antártida',
'ATG': 'Antigua y Barbuda',
'ARG': 'Argentina',
'ARM': 'Armenia',
'ABW': 'Aruba',
'AUS': 'Australia',
'AUT': 'Austria',
'AZE': 'Azerbaiyán',
'BHS': 'Bahamas',
'BHR': 'Baréin',
'BGD': 'Bangladesh',
'BRB': 'Barbados',
'BLR': 'Bielorrusia',
'BEL': 'Bélgica',
'BLZ': 'Belice',
'BEN': 'Benín',
'BMU': 'Bermuda',
'BTN': 'Bután',
'BOL': 'Bolivia',
'BES': 'Bonaire, San Eustaquio y Saba',
'BIH': 'Bosnia y Herzegovina',
'BWA': 'Botsuana',
'BVT': 'Isla Bouvet',
'BRA': 'Brasil',
'IOT': 'Territorio Británico del Océano Índico',
'VGB': 'Islas Vírgenes Británicas',
'BRN': 'Brunei',
'BGR': 'Bulgaria',
'BFA': 'Burkina Faso',
'BDI': 'Burundi',
'KHM': 'Camboya',
'CMR': 'Camerún',
'CAN': 'Canadá',
'CPV': 'Cabo Verde',
'CYM': 'Islas Caimán',
'CAF': 'República de África Central',
'TCD': 'Chad',
'CHL': 'Chile',
'CHN': 'China',
'CXR': 'Isla de Pascua',
'CCK': 'Islas Cocos',
'COL': 'Colombia',
'COM': 'Comoras',
'COK': 'Islas Cook',
'CRI': 'Costa Rica',
'HRV': 'Croacia',
'CUB': 'Cuba',
'CUW': 'Curazao',
'CYP': 'Chipre',
'CZE': 'República Checa',
'COD': 'República Democrática del Congo',
'DNK': 'Dinamarca',
'DJI': 'Yibuti',
'DMA': 'Dominica',
'DOM': 'República Dominicana',
'TLS': 'Timor Oriental',
'ECU': 'Ecuador',
'EGY': 'Egipto',
'SLV': 'El Salvador',
'GNQ': 'Guinea Ecuatorial',
'ERI': 'Eritrea',
'EST': 'Estonia',
'ETH': 'Etiopía',
'FLK': 'Islas Malvinas',
'FRO': 'Islas Faroe',
'FJI': 'Fiji',
'FIN': 'Finlandia',
'FRA': 'Francia',
'GUF': 'Guayana Francesa',
'PYF': 'Polinesia Francesa',
'ATF': 'Territorios del sur Franceses',
'GAB': 'Gabón',
'GMB': 'Gambia',
'GEO': 'Georgia',
'DEU': 'Alemania',
'GHA': 'Ghana',
'GIB': 'Gibraltar',
'GRC': 'Grecia',
'GRL': 'Groenlandia',
'GRD': 'Granada',
'GLP': 'Guadalupe',
'GUM': 'Guam',
'GTM': 'Guatemala',
'GGY': 'Guernsey',
'GIN': 'Guinea',
'GNB': 'Guinea Bissau',
'GUY': 'Guyana',
'HTI': 'Haití',
'HMD': 'Islas Heard y McDonald',
'HND': 'Honduras',
'HKG': 'Hong Kong',
'HUN': 'Hungría',
'ISL': 'Islandia',
'IND': 'India',
'IDN': 'Indonesia',
'IRN': 'Irán',
'IRQ': 'Irak',
'IRL': 'Irlanda',
'IMN': 'Isla de Man',
'ISR': 'Israel',
'ITA': 'Italia',
'CIV': 'Costa de Marfil',
'JAM': 'Jamaica',
'JPN': 'Japón',
'JEY': 'Jersey',
'JOR': 'Jordania',
'KAZ': 'Kazajistán',
'KEN': 'Kenia',
'KIR': 'Kiribati',
'XXK': 'Kosovo',
'KWT': 'Kuwait',
'KGZ': 'Kirguistán',
'LAO': 'Laos',
'LVA': 'Letonia',
'LBN': 'Líbano',
'LSO': 'Lesoto',
'LBR': 'Liberia',
'LBY': 'Libia',
'LIE': 'Liechtenstein',
'LTU': 'Lituania',
'LUX': 'Luxemburgo',
'MAC': 'Macao',
'MKD': 'Macedonia',
'MDG': 'Madagascar',
'MWI': 'Malaui',
'MYS': 'Malasia',
'MDV': 'Maldivas',
'MLI': 'Malí',
'MLT': 'Malta',
'MHL': 'Islas Marshall',
'MTQ': 'Martinica',
'MRT': 'Mauritania',
'MUS': 'Mauricio',
'MYT': 'Mayotte',
'MEX': 'México',
'FSM': 'Micronesia',
'MDA': 'Moldavia',
'MCO': 'Mónaco',
'MNG': 'Mongolia',
'MNE': 'Montenegro',
'MSR': 'Montserrat',
'MAR': 'Marruecos',
'MOZ': 'Mozambique',
'MMR': 'Myanmar',
'NAM': 'Namibia',
'NRU': 'Nauru',
'NPL': 'Nepal',
'NLD': 'Países Bajos',
'ANT': 'Antillas Holandesas',
'NCL': 'Nueva Caledonia',
'NZL': 'Nueva Zelanda',
'NIC': 'Nicaragua',
'NER': 'Níger',
'NGA': 'Nigeria',
'NIU': 'Niue',
'NFK': 'Isla Norfolk',
'PRK': 'Corea del Norte',
'MNP': 'Islas Marianas del Norte',
'NOR': 'Noruega',
'OMN': 'Omán',
'PAK': 'Pakistán',
'PLW': 'Palaos',
'PSE': 'Territorios Palestinos',
'PAN': 'Panamá',
'PNG': 'Papúa Nueva Guinea',
'PRY': 'Paraguay',
'PER': 'Perú',
'PHL': 'Filipinas',
'PCN': 'Islas Pitcairn',
'POL': 'Polonia',
'PRT': 'Portugal',
'PRI': 'Puerto Rico',
'QAT': 'Catar',
'COG': 'República del Congo',
'REU': 'Reunión',
'ROU': 'Rumanía',
'RUS': 'Rusia',
'RWA': 'Ruanda',
'BLM': 'San Bartolomé',
'SHN': 'Santa Elena',
'KNA': 'San Cristóbal y Nieves',
'LCA': 'Santa Lucía',
'MAF': 'San Martín',
'SPM': 'San Pedro y Miguelón',
'VCT': 'San Vicente y las Granadinas',
'WSM': 'Samoa Occidental',
'SMR': 'San Marino',
'STP': 'Santo Tomé y Príncipe',
'SAU': 'Arabia Saudita',
'SEN': 'Senegal',
'SRB': 'Serbia',
'SCG': 'Serbia y Montenegro',
'SYC': 'Seychelles',
'SLE': 'Sierra Leona',
'SGP': 'Singapur',
'SXM': 'San Martín',
'SVK': 'Eslovaquia',
'SVN': 'Eslovenia',
'SLB': 'Islas Salomón',
'SOM': 'Somalia',
'ZAF': 'Sudáfrica',
'SGS': 'Islas Georgia del Sur y Sandwich del Sur',
'KOR': 'Corea del Sur',
'SSD': 'Sudán del Sur',
'ESP': 'España',
'LKA': 'Sri Lanka',
'SDN': 'Sudán',
'SUR': 'Surinam',
'SJM': 'Islas Svalbard y Jan Mayen',
'SWZ': 'Suazilandia',
'SWE': 'Suecia',
'CHE': 'Suiza',
'SYR': 'Siria',
'TWN': 'Taiwán',
'TJK': 'Tayikistán',
'TZA': 'Tanzania',
'THA': 'Tailandia',
'TGO': 'República Togolesa',
'TKL': 'Islas Tokelau',
'TON': 'Tonga',
'TTO': 'Trinidad y Tobago',
'TUN': 'Túnez',
'TUR': 'Turquía',
'TKM': 'Turkmenistán',
'TCA': 'Islas Turcos y Caicos',
'TUV': 'Tuvalu',
'VIR': 'Islas Vírgenes de los EE.UU.',
'UGA': 'Uganda',
'UKR': 'Ucrania',
'ARE': 'Emiratos Árabes Unidos',
'GBR': 'Reino Unido',
'USA': 'Estados Unidos (USA)',
'UMI': 'Islas menores alejadas de los Estados Unidos',
'URY': 'Uruguay',
'UZB': 'Uzbekistán',
'VUT': 'Vanuatu',
'VAT': 'Vaticano',
'VEN': 'Venezuela',
'VNM': 'Vietnam',
'WLF': 'Wallis y Futuna',
'ESH': 'Sahara Occidental',
'YEM': 'Yemen',
'ZMB': 'Zambia',
'ZWE': 'Zimbabue'
};

const countryAbbreviationsLowerCase = {};
for (const abbreviation in countryAbbreviations) {
    const countryName = countryAbbreviations[abbreviation].toLowerCase();
    countryAbbreviationsLowerCase[countryName] = abbreviation;
}
