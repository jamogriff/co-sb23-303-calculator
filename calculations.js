import ColoradoTaxAssessmentYears from "./ColoradoTaxAssessmentYears.js";

export const calculatePropertyTaxes = (actualValue, year, taxRate) => {
    const assessmentYears = ColoradoTaxAssessmentYears.filter((tax) => tax.year === year);
    const preBillAssessment = assessmentYears.find((year) => year.type === 'PRE-BILL');
    const postBillAssessment = assessmentYears.find((year) => year.type === 'POST-BILL');

    // TODO: change arguments to pass in assessment object instead of properties on that object
    const preBillValuation = assessPropertyValue(
      actualValue,
      preBillAssessment.assessmentRate,
      preBillAssessment.offsetApplied,
      preBillAssessment.assessmentOffset
    );
    
    // TODO: change arguments to pass in assessment object instead of properties on that object
    const postBillValuation = assessPropertyValue(
      actualValue,
      postBillAssessment.assessmentRate,
      postBillAssessment.offsetApplied,
      postBillAssessment.assessmentOffset
    );

    const preBillTaxes = preBillValuation * taxRate;
    const postBillTaxes = postBillValuation * taxRate;

    return {
        year: year,
        preBillTax: preBillTaxes,
        postBillTax: postBillTaxes,
        difference: preBillTaxes - postBillTaxes
    }
}

// TODO: change arguments to pass in assessment object instead of properties on that object
const assessPropertyValue = (actualValue, assessmentRate, offsetApplied, assessmentOffset) => {
    if (offsetApplied) {
        return actualValue * assessmentRate - getValuationOffset(assessmentRate, assessmentOffset);
    } else {
        return actualValue * assessmentRate;
    }
}

const getValuationOffset = (assessmentRate, assessmentOffset) => {
    // TODO: this was how I understood the wording of the bill, may need a different calculation
    const alternateAmount = 1000 / assessmentRate;

    if (assessmentOffset < alternateAmount) {
        return assessmentOffset;
    } else {
        return alternateAmount;
    }
}
