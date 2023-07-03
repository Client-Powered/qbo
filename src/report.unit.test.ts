import { ReportQuery } from "./report-query";
import { createReportOpts } from "./report";
import { format } from "date-fns";


describe("createReportOpts", () => {
  it("should handle the commas separated value queries correctly", () => {
    const opts: ReportQuery<"transaction_list"> = {
      term: [
        "hello",
        "world"
      ],
      department: "some-department"
    };
    const result = createReportOpts({
      opts
    });
    expect(result).toStrictEqual({
      term: "hello,world",
      department: "some-department"
    });
  });

  it("should convert date properties correctly", () => {
    const now = format(new Date(), "yyyy-MM-dd");
    const opts: ReportQuery<"transaction_list"> = {
      end_date: new Date()
    };
    const result = createReportOpts({
      opts
    });
    expect(result).toStrictEqual({
      end_date: now
    });
  });

  it("should leave other property types unchanged", () => {
    const opts: ReportQuery<"transaction_list"> = {
      source_account_type: "Bank",
      transaction_type: "Check"
    };
    const result = createReportOpts({
      opts
    });
    expect(result).toStrictEqual({
      source_account_type: "Bank",
      transaction_type: "Check"
    });
  });
});