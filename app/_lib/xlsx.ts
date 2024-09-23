import xlsx, { IJsonSheet } from "json-as-xlsx";

// TODO: Add new types
function downloadKeywordsToExcel(data: any) {
  // @ts-ignore
  let columns: IJsonSheet = [
    {
      sheet: "data",
      columns: [
        { label: "Keyword", value: "keywordName" },
        { label: "Position", value: "position" },
        { label: "URL", value: "url" },
        { label: "Meta Title", value: "metaTitle" },
        { label: "Meta Description", value: "metaDescription" },
        { label: "First Position", value: "firstPosition" },
        { label: "Best Position", value: "bestPosition" },
        { label: "Latest Change", value: "latestChange" },
        { label: "Created At", value: "createdAt" },
        { label: "Tags", value: "tags" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: "keywords",
    // extraLength: 5,
    // writeOptions: {}
  };

  // @ts-ignore
  xlsx(columns, settings);
}

export default downloadKeywordsToExcel;
