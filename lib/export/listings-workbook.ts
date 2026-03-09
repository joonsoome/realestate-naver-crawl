import ExcelJS from "exceljs";

import type { ListingRecord } from "@/types/listing";

export async function buildWorkbookBuffer(listings: ListingRecord[]) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Listings");

  worksheet.columns = [
    { header: "ID", key: "id", width: 18 },
    { header: "Title", key: "title", width: 24 },
    { header: "Deal Type", key: "dealType", width: 12 },
    { header: "Price", key: "price", width: 16 },
    { header: "Area", key: "area", width: 12 },
    { header: "Floor", key: "floor", width: 12 },
    { header: "Direction", key: "direction", width: 12 },
    { header: "Confirmed At", key: "confirmedAt", width: 14 },
    { header: "Realtor", key: "realtorName", width: 18 },
    { header: "URL", key: "url", width: 48 },
  ];

  listings.forEach((listing) => worksheet.addRow(listing));
  worksheet.getRow(1).font = { bold: true };
  worksheet.views = [{ state: "frozen", ySplit: 1 }];

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
