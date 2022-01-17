module Adjust_Market {

    // imports
    import Settings = ExtensionSettings.Settings;

    // module

    function init(): void {
        window.addEventListener(GlobalConstants.BUFF_UTILITY_INJECTION_SERVICE, (e: CustomEvent<InjectionService.TransferData<unknown>>) => process(e.detail));
    }

    function process(transferData: InjectionService.TransferData<unknown>): void {
        if (transferData.url.indexOf('/market/') > -1) {
            if ((<InjectionService.TransferData<BuffTypes.TopBookmarked.Data>>transferData)?.data?.goods_infos) {
                console.debug('[BuffUtility] Adjust_Market (MISSING)');
            } else {
                console.debug('[BuffUtility] Adjust_Market (/goods | /buying)');

                adjustMarketGoodsOrBuying(<InjectionService.TransferData<BuffTypes.GoodsOrBuying.Data>>transferData);
            }
        }
    }

    function adjustMarketGoodsOrBuying(transferData: InjectionService.TransferData<BuffTypes.GoodsOrBuying.Data>): void {
        const liList = <NodeListOf<HTMLElement>>document.querySelectorAll('#j_list_card li');

        let info: string[] = [];

        let data = transferData.data;

        // if we have no items don't adjust anything
        if (!data?.items?.length) return;

        for (let i = 0, l = liList.length; i < l; i ++) {
            const dataRow = data.items[i];
            const li = liList.item(i);
            const h3 = <HTMLElement>li.querySelector('h3');
            const p = <HTMLElement>document.createElement('p');

            const schemaData = SchemaHelper.find(dataRow.short_name, true, dataRow.goods_info.info?.tags?.exterior?.internal_name == 'wearcategoryna')[0];
            // console.log(schemaData);

            let aHrefList = li.querySelectorAll('a[href]');
            for (let x = 0, y = aHrefList.length; x < y; x ++) {
                let aHref = aHrefList.item(x);

                aHref.setAttribute('href', `${aHref.getAttribute('href')}&sort_by=${storedSettings[Settings.DEFAULT_SORT_BY]}${schemaData && schemaData.sticker_amount > 0 ? storedSettings[Settings.DEFAULT_STICKER_SEARCH] : ''}`);
            }

            let buffPrice = +dataRow.sell_min_price;
            let steamPriceCNY = +dataRow.goods_info.steam_price_cny;

            if (storedSettings[Settings.APPLY_STEAM_TAX]) {
                let steam = Util.calculateSellerPrice(~~(steamPriceCNY * 100));
                let f_steamPriceCNY = (steam.amount - steam.fees) / 100;

                info.push(`Reference price (> ${dataRow.market_hash_name} <) was adjusted with fees: ${steamPriceCNY} -> ${f_steamPriceCNY}`);

                steamPriceCNY = f_steamPriceCNY;
            }

            let priceDiff;
            switch (storedSettings[Settings.DIFFERENCE_DOMINATOR]) {
                case ExtensionSettings.DifferenceDominator.STEAM:
                    priceDiff = ((steamPriceCNY - buffPrice) / steamPriceCNY) * -1 * 100;
                    break;
                case ExtensionSettings.DifferenceDominator.BUFF:
                    priceDiff = ((steamPriceCNY - buffPrice) / buffPrice) * -1 * 100;
                    break;
            }

            h3.setAttribute('style', 'margin-bottom: 14px;');
            p.setAttribute('style', 'display: grid; grid-template-columns: auto 25%; grid-template-rows: 20px 20px; margin: 2px;');

            let newHTML: string[] = [];

            if (dataRow.sell_num > 0) {
                newHTML.push(Util.buildHTML('span', {
                    class: 'f_12px',
                    style: {
                        'grid-column': '1',
                        'overflow': 'hidden'
                    },
                    attributes: {
                        'title': `${GlobalConstants.SYMBOL_YUAN} ${dataRow.sell_min_price} selling (${dataRow.sell_num})`
                    },
                    content: [
                        Util.buildHTML('span', {
                            style: {
                                'color': GlobalConstants.COLOR_ORANGE,
                                'font-weight': '700'
                            },
                            content: [ `${GlobalConstants.SYMBOL_YUAN} ${dataRow.sell_min_price}` ]
                        }),
                        ` selling <small>(${dataRow.sell_num})</small>`
                    ]
                }));
            } else {
                newHTML.push(Util.buildHTML('span', {
                    class: 'c_Gray f_12px',
                    style: {
                        'grid-column': '1'
                    },
                    content: [ 'None selling.' ]
                }));
            }

            if (dataRow.buy_num > 0) {
                newHTML.push(Util.buildHTML('span', {
                    class: 'f_12px',
                    style: {
                        'grid-column': '1'
                    },
                    attributes: {
                        'title': `${GlobalConstants.SYMBOL_YUAN} ${dataRow.buy_max_price} buying (${dataRow.buy_num})`
                    },
                    content: [
                        Util.buildHTML('span', {
                            style: {
                                'color': GlobalConstants.COLOR_BLUE,
                                'font-weight': '700'
                            },
                            content: [ `${GlobalConstants.SYMBOL_YUAN} ${dataRow.buy_max_price}` ]
                        }),
                        ` buying <small>(${dataRow.buy_num})</small>`
                    ]
                }));
            } else {
                newHTML.push(Util.buildHTML('span', {
                    class: 'c_Gray f_12px',
                    style: {
                        'grid-column': '1'
                    },
                    content: [ 'None buying.' ]
                }));
            }

            if (dataRow.sell_num > 0) {
                let priceDiffStr = `${priceDiff.toFixed(1)}%`;

                newHTML.push(Util.buildHTML('span', {
                    style: {
                        'grid-column': '2',
                        'grid-row': '1',
                        'margin-top': '12px',
                        'font-size': priceDiffStr.length >= 4 ? '10px' : '12px',
                        'font-weight': '700',
                        'text-align': 'center',
                        'color': priceDiff < 0 ? GlobalConstants.COLOR_GOOD : GlobalConstants.COLOR_BAD
                    },
                    content: [ priceDiffStr ]
                }));
            }

            p.innerHTML = newHTML.join('');

            let liP = li.querySelector('p');
            if (liP) {
                liP.style['display'] = 'none';
            }

            li.append(p);
        }

        if (info.length > 0) {
            console.debug('[BuffUtility] Market Info:\n', info.join('\n '));
        }
    }

    init();

}
