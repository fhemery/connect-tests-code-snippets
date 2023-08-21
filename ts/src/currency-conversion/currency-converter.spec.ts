import {
  ConversionRateApi,
  ConversionRateApiInterface,
} from "./external/conversion-rate-api";
import { CurrencyConverter } from "./currency-converter";
import { Currency } from "./model/currency";
import { Money } from "./model/money";
import { CurrencyIsoCode } from "./external/currency-iso-code";

interface GetRateCall {
  from: CurrencyIsoCode;
  to: CurrencyIsoCode;
}

describe("CurrencyConverter", function () {
  it("is initialized", () => {
    const converter = new CurrencyConverter(new ConversionRateApi());
    expect(converter).toBeTruthy();
  });
});
