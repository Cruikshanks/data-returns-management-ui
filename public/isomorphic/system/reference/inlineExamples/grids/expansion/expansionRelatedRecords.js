isc.ListGrid.create({
    ID: "categoryList",
    width:650, height:300, 
    alternateRecordStyles:true,
    dataSource: supplyCategory,
    autoFetchData: true,
    canExpandRecords: true,
    expansionMode: "related",
    detailDS:"supplyItem"
});

