module CurrencyHelper {

    DEBUG && console.debug('Module.CurrencyHelper');

    export interface Data {
        'date': string,
        'rates': {
            [name: string]: [number, number]
        },
        'symbols': {
            [name: string]: string
        }
    }

    const raw = `{"date":"2022-11-28","rates":{"AED":[0.510194570086097,2],"AFN":[12.443463397310442,2],"ALL":[15.678798382592504,2],"AMD":[55.161717867888875,2],"ANG":[0.2513684242641098,2],"AOA":[71.10091615445819,2],"ARS":[22.99985227200043,2],"AUD":[0.20779374923225596,2],"AWG":[0.25002415299268294,2],"AZN":[0.23601648772934303,2],"BAM":[0.262540755666185,2],"BBD":[0.28161426024802777,2],"BDT":[14.20524343406581,2],"BGN":[0.262240348638079,2],"BHD":[0.052364491006121346,3],"BIF":[288.7219088652054,2],"BMD":[0.13890232208611203,2],"BND":[0.19190054480052304,2],"BOB":[0.9637442839032413,2],"BRL":[0.7516142361619408,2],"BSD":[0.1394715566061847,2],"BTC":[0.00000857190834334021,7],"BTN":[11.384713818482432,2],"BWP":[1.7996483163691455,2],"BYN":[0.35218234666462556,2],"BYR":[2722.4858898350562,2],"BZD":[0.2811310665827757,2],"CAD":[0.18675495377210866,2],"CDF":[285.16656439000514,2],"CHF":[0.13129459773157234,2],"CLF":[0.004642459435684395,4],"CLP":[128.09990855315678,2],"COP":[675.9474086983423,2],"CRC":[84.66387517840431,2],"CUC":[0.13890232208611203,2],"CUP":[3.6809120705283442,2],"CVE":[14.801564230769332,2],"CZK":[3.2576622525790175,2],"DJF":[24.82968620913628,2],"DKK":[0.9951712748257304,2],"DOP":[7.616554046368929,2],"DZD":[19.243115192781023,2],"EGP":[3.407065974735836,2],"ERN":[2.083535098914868,2],"ETB":[7.452184835560271,2],"EUR":[0.13381159381116026,2],"FJD":[0.30895357460277356,2],"FKP":[0.11485343482318269,2],"GBP":[0.11510138770651478,2],"GEL":[0.37850857344262706,2],"GGP":[0.11485343482318269,2],"GHS":[2.022344127557775,2],"GIP":[0.11485343482318269,2],"GMD":[8.543621776712873,2],"GNF":[1201.8211043363788,2],"GTQ":[1.0892872578980286,2],"GYD":[29.179861248082144,2],"HKD":[1.0858383978791397,2],"HNL":[3.446047432998528,2],"HRK":[1.0099442085940764,2],"HTG":[19.17434352701134,2],"HUF":[54.645568414255,2],"IDR":[2184.3782195404,2],"ILS":[0.4773788824430357,2],"IMP":[0.11485343482318269,2],"INR":[11.350474107858032,2],"IQD":[203.55805964625029,2],"IRR":[5889.459325423641,2],"ISK":[19.60331499490044,2],"JEP":[0.11485343482318269,2],"JMD":[21.490619272027462,2],"JOD":[0.09848145250879344,3],"JPY":[19.182343988393715,2],"KES":[16.98826151174451,2],"KGS":[11.730283329992503,2],"KHR":[576.7082172629266,2],"KMF":[65.78478104542717,2],"KPW":[125.01210713919644,2],"KRW":[186.00281887503525,2],"KWD":[0.04270142057064222,3],"KYD":[0.11621844689165034,2],"KZT":[64.91612916779626,2],"LAK":[2421.045418598794,2],"LBP":[210.91205567525745,2],"LKR":[51.25505653941273,2],"LRD":[21.390968172377168,2],"LSL":[2.3600039019460755,2],"LTL":[0.4101425709007421,2],"LVL":[0.08402070118880896,3],"LYD":[0.6805511806598358,2],"MAD":[1.4889470285396045,2],"MDL":[2.6775038892339733,2],"MGA":[605.1702661539363,2],"MKD":[8.260590853121169,2],"MMK":[292.89441194755545,2],"MNT":[475.3866293314478,2],"MOP":[1.1226660247278473,2],"MRO":[49.58811199066959,2],"MUR":[6.06266865278755,2],"MVR":[2.1363564227022604,2],"MWK":[143.15504000029975,2],"MXN":[2.6875518018132545,2],"MYR":[0.6223112901926539,2],"MZN":[8.866132205319438,2],"NAD":[2.3599736605258745,2],"NGN":[61.56988136531716,2],"NIO":[5.020205952100267,2],"NOK":[1.3802101216695297,2],"NPR":[18.21524370971769,2],"NZD":[0.2236584517945071,2],"OMR":[0.053411432916099864,3],"PAB":[0.1394702184902466,2],"PEN":[0.5375738941073924,2],"PGK":[0.4914430161989638,2],"PHP":[7.8726373221409744,2],"PKR":[31.304828564600356,2],"PLN":[0.6269929564253249,2],"PYG":[1005.2955605059897,2],"QAR":[0.505742524548406,2],"RON":[0.6585082629997294,2],"RSD":[15.698720118867517,2],"RUB":[8.433459508745523,2],"RWF":[150.81032728442483,2],"SAR":[0.5218973306460397,2],"SBD":[1.1432485226530986,2],"SCR":[1.84131617618919,2],"SDG":[79.10532979606846,2],"SEK":[1.452957463702936,2],"SGD":[0.19121021078805128,2],"SHP":[0.19132368301960315,2],"SLE":[2.5356483452724494,2],"SLL":[2531.4951801063908,2],"SOS":[78.96587536734627,2],"SRD":[4.315487059482198,2],"STD":[2874.998022532266,2],"SVC":[1.2203067389927251,2],"SYP":[348.99751699206524,2],"SZL":[2.390788597218271,2],"THB":[4.964383368075284,2],"TJS":[1.4017086937660124,2],"TMT":[0.48615826111298593,2],"TND":[0.45039082352204424,2],"TOP":[0.32796927257608993,2],"TRY":[2.588084559292854,2],"TTD":[0.9469826422276738,2],"TWD":[4.306181132190599,2],"TZS":[323.9202766581464,2],"UAH":[5.151012672760803,2],"UGX":[521.6212298248914,2],"USD":[0.13890232208611203,2],"UYU":[5.480599192259694,2],"UZS":[1568.4894422652485,2],"VEF":[144300.78002096558,2],"VND":[3444.7780646400984,2],"VUV":[16.368351336791203,2],"WST":[0.370800490392729,2],"XAF":[88.05238175270172,2],"XAG":[0.006528400038858887,4],"XAU":[0.00007935027513001803,6],"XCD":[0.3753904956836394,2],"XDR":[0.10655577789095264,2],"XOF":[88.05323279443836,2],"XPF":[16.060581459547283,2],"YER":[34.75310556637496,2],"ZAR":[2.3849388895832226,2],"ZMK":[1250.2881423926638,2],"ZMW":[2.3605854471327787,2],"ZWL":[44.726497264757214,2]},"symbols":{"AED":"د.إ","AFN":"؋","ALL":"L","AMD":"֏","ANG":"f","AOA":"Kz","ARS":"$","AUD":"A$","AWG":"ƒ","AZN":"₼","BAM":"KM","BBD":"Bds$","BDT":"৳","BGN":"Лв.","BHD":".د.ب","BIF":"FBu","BMD":"BD$","BND":"B$","BOB":"Bs","BRL":"R$","BSD":"B$","BTC":"₿","BTN":"Nu.","BWP":"P","BYN":"Rbl","BYR":"BYR","BZD":"BZ$","CAD":"C$","CDF":"FC","CHF":"Fr","CLF":"UF","CLP":"CLP$","COP":"Col$","CRC":"₡","CUC":"CUC$","CUP":"$MN","CVE":"Esc","CZK":"Kč","DJF":"Fdj","DKK":"Kr","DOP":"RD$","DZD":"دج","EGP":"ج.م","ERN":"ናቕፋ","ETB":"ብር","EUR":"€","FJD":"FJ$","FKP":"FK£","GBP":"£","GEL":"ლ","GGP":"G£","GHS":"GH₵","GIP":"Gi£","GMD":"D","GNF":"GFr","GTQ":"Q","GYD":"GY$","HKD":"港元","HNL":"L","HRK":"kn","HTG":"G","HUF":"Ft","IDR":"Rp","ILS":"₪","IMP":"I£","INR":"₹","IQD":"ع.د","IRR":"﷼","ISK":"Íkr","JEP":"J£","JMD":"J$","JOD":"د.ا","JPY":"¥","KES":"/-","KGS":"Лв","KHR":"៛","KMF":"CF","KPW":"₩","KRW":"₩","KWD":"د.ك","KYD":"CI$","KZT":"₸","LAK":"₭","LBP":"ل.ل.","LKR":"ரூ","LRD":"L$","LSL":"M","LTL":"Lt","LVL":"ℒ𝓈","LYD":"ل.د","MAD":"درهم","MDL":"L","MGA":"Ar","MKD":"Ден","MMK":"K","MNT":"₮","MOP":"MOP$","MRO":"UM","MUR":"₨","MVR":".ރ","MWK":"MK","MXN":"M$","MYR":"RM","MZN":"MT","NAD":"N$","NGN":"₦","NIO":"C$","NOK":"kr","NPR":"रू","NZD":"NZ$","OMR":"ر.ع.","PAB":"B/.","PEN":"S/","PGK":"K","PHP":"₱","PKR":"₨","PLN":"zł","PYG":"₲","QAR":"ر.ق","RON":"lei","RSD":"din","RUB":"₽","RWF":"R₣","SAR":"SR","SBD":"Si$","SCR":"SR","SDG":"ج.س.","SEK":"kr","SGD":"S$","SHP":"St.£","SLL":"Le","SOS":"Sh.so.","SRD":"Sr$","STD":"Db","SVC":"₡","SYP":"س","SZL":"E","THB":"฿","TJS":"ЅM","TMT":"T","TND":"د.ت","TOP":"","TRY":"₺","TTD":"TT$","TWD":"圓","TZS":"TSh","UAH":"₴","UGX":"USh","USD":"$","UYU":"$U","UZS":"лв","VEF":"Bs.F.","VND":"₫","VUV":"VT","WST":"ST","XAF":"FCFA","XAG":"","XAU":"","XCD":"","XDR":"","XOF":"CFA","XPF":"₣","YER":"﷼","ZAR":"R","ZMK":"ZK","ZMW":"ZK","ZWL":"Z$","SLE":""}}`;

    let data: Data;

    let fetchDone: boolean = false;
    let recursionBreak: number = 0;

    /**
     * Initialize the CurrencyHelper, this function call should happen <b>ONCE</b>
     *
     * @param fetchNew If we should fetch current active rates
     * @param onFetch callback when the response was received, only will happen if <code>fetchNew</code> is true
     */
    export function initialize(fetchNew: boolean = true, onFetch: (data: Data) => void = null): void {
        // If fetchNew is false, we don't plan on loading anything, so we can just set fetchDone to true
        fetchDone = !fetchNew;

        // shouldn't be necessary, but to prevent getting stuck, we kill it after 5 calls
        if (recursionBreak > 5) {
            return;
        } else {
            recursionBreak ++;
        }

        // pre-parse raw to avoid timing errors
        try {
            data = JSON.parse(raw);
        } catch (e) { }

        if (fetchNew) {
            try {
                fetch('https://penguinivogel.github.io/currency-repository/rates.json')
                    .then(r => r.json().then(_pdata => {
                        data = _pdata;

                        console.debug('[CurrencyHelper] Fetched current rates.', _pdata);

                        if (typeof onFetch == 'function') {
                            onFetch(_pdata);
                        }
                    }));
            } catch (_e) {
                console.warn('[CurrencyHelper] Failed to fetch json, using STATIC.', _e);
                initialize(false, null);
            }
        } else {
            try {
                data = JSON.parse(raw);
            } catch (e) {
                console.warn('[CurrencyHelper] Error reading STATIC.', e);
                initialize(true);
            }

            console.debug(`[CurrencyHelper] Read from STATIC.`, data);
        }
    }

    export function getData(): Data {
        if (!fetchDone) {
            console.debug('[CurrencyHelper] Accessed data before fetch was complete.');
        }

        return data;
    }

}
