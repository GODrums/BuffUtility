/**
 * Author: Felix Vogel
 */
/** */
module Adjust_Settings {

    export function init(): void {
        // if it's not the settings page we don't execute
        // if (!(/https:\/\/buff\.163\.com\/user-center\/profile/i.test(window.location.href))) return;
        console.log('[BuffUtility] Adjust_Settings');

        const originalSettings = document.getElementById('user-prefer-buff-price-currency');
        originalSettings.style['display'] = 'none';

        const parentElement = originalSettings.parentElement;
        const keys = Object.keys(CurrencyHelper.getData().rates);

        let div = document.createElement('div');
        let select = document.createElement('select');

        select.setAttribute('style', 'font-size: 12px; width: 120px; height: 32px; max-height: 300px; overflow: auto;');

        select.innerHTML = keys.map(x => `<option value="${x}" style="width: 101px;" ${(x == ExtensionSettings.settings.selected_currency) ? 'selected' : ''}>${x}</option>`).join('');

        div.append(select);

        parentElement.append(div);

        select.onchange = () => {
            ExtensionSettings.settings.selected_currency = select?.selectedOptions?.item(0)?.innerText ?? 'USD';
            ExtensionSettings.save();

            console.log(`[BuffUtility] Changed Currency -> ${ExtensionSettings.settings.selected_currency}`);
        };
    }

    window.addEventListener(BUFF_UTILITY_LOADED_EVENT, () => init());

}

