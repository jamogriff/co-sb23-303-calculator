import _ from "lodash";
import { calculatePropertyTaxes } from "./calculations.js";

// User should enter house value and then tax rate in that order
const actualValue = parseFloat(process.argv.at(-2));
const taxRate = parseFloat(process.argv.at(-1));

if (isNaN(actualValue) || isNaN(taxRate)) {
    console.log("Execute node demo.js 480000 .0462 and replace with your own house value and mill levy in that order.")
} else {
    console.log('Tax Breakdown for SB23-303');
    console.log('House value: ' + actualValue + ' and assuming static mill levy of ' + taxRate);
    console.log('Year | PreBill | PostBill | Relief');

    const taxYears = _.range(2023, 2033);
    let totalTaxPreBill = 0;
    let totalTaxPostBill = 0;

    taxYears.forEach((year) => {
        // TODO: these objects should be dedicated objects/interfaces
        const taxes = calculatePropertyTaxes(actualValue, year, taxRate);
        totalTaxPreBill += taxes.preBillTax;
        totalTaxPostBill += taxes.postBillTax;

        console.log(taxes.year + ' | ' +
            _.round(taxes.preBillTax, 2) + ' | ' +
            _.round(taxes.postBillTax, 2) + ' | ' +
            _.round(taxes.difference, 2)
        );
    });

    console.log('Total Tax Pre Bill: ' + _.round(totalTaxPreBill, 2));
    console.log('Total Tax Post Bill: ' + _.round(totalTaxPostBill, 2));
    console.log('Tax Relief: ' + _.round(totalTaxPreBill - totalTaxPostBill));
}


