import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import { parse } from "csv-parse/sync";

export function readFileByType(filePath: string, sheetName?: string) {
  const fullPath = path.resolve(filePath);
  const ext = path.extname(fullPath).toLowerCase();

  switch (ext) {
    case ".csv":
      // Reads and parses CSV file into JSON objects
      return parse(fs.readFileSync(fullPath), {
        columns: true,
        skip_empty_lines: true,
      });

    case ".xlsx":
    case ".xls":
      // Reads Excel file and converts sheet data to JSON
      const workBook = XLSX.readFile(fullPath);
      const sheet = workBook.Sheets[sheetName || "Sheet1"];
      return XLSX.utils.sheet_to_json(sheet);

    case ".json":
      // Reads JSON file and parses it into an object
      return JSON.parse(fs.readFileSync(fullPath, "utf8"));

    case ".txt":
      // Reads plain text file as a string
      return fs.readFileSync(fullPath, "utf8");

    case ".tsv":
      // Reads TSV file and parses it into JSON objects
      return parse(fs.readFileSync(fullPath), {
        columns: true,
        skip_empty_lines: true,
        delimiter: "\t",
      });

    default:
      throw new Error(`Unsupported file type - ${ext}`);
  }
}
