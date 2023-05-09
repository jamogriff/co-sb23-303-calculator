## Colorado SB23-303 Residential Property Tax Calculator

A tax calculator to compare the impact of Colorado's SB23-303 bill on single family residential property.

### Demo
*The following assume you're using a Unix terminal.* Using at least Node 18, run `npm install`. Execute `node demo.js 445999 .0531` and replace with your own house value and mill levy in that order.

### Library
#### Functions
Currently the only exported function is `calculatePropertyTaxes` from `calculations.js` which takes in your house value, the tax year and mill levy. The function returns an object with the following interface:
```
  {
    year: number,
    preBillTax: number,
    postBillTax: number,
    difference: number
  }
```

### Future Improvements
Current limitations of this functionality are that tax assessment projections are only based on non-multi-family residential property. Other property types could be expanded by creating a TaxPropertyAssessmentYearBuilder or similar to create instances of the now hard-coded values used in `ColoradoTaxAssessmentYears`.
