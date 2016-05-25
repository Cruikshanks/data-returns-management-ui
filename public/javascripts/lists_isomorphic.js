var metadata = {
    parameter: {
        description: "Parameters",
        fields: [
            {name: "id", title: "Id", primaryKey: true, width:50, canEdit: false},
            {name: "parameter", title: "Parameter"}
        ]
    },
    units: {
        description: "Units",
        fields: [
            {name: "id", title: "Id", primaryKey: true, width:50, canEdit: false},
            {name: "measureType", title: "Measure Type"},
            {name: "units", title: "Title"},
            {name: "description", title: "Description"}
        ]
    },
    refperiod: {
        description: "Ref-Period",
        fields: [
            {name: "id", title: "Id", primaryKey: true, width:50, canEdit: false},
            {name: "refPeriod", title: "Reference Period"}
        ]
    },
    rtntype: {
        description: "Return Type",
        fields: [
            {name: "id", title: "Id", primaryKey: true, width:50, canEdit: false},
            {name: "rtnType", title: "Return Type"}
        ]
    }
};

isc.DataSource.create({
    ID: "controlledListsListDS",
    fields:[
        { name: "name", title: "Name"},
        { name: "description", title: "Description" }
    ],
    clientOnly: true,
    testData: controlledLists
});

isc.RestDataSource.create({
    ID: "controlledListsDS",
    dataURL: '/lists/edit',
    fetchDataURL:"/lists/fetch",
    addDataURL:"/lists/add",
    updateDataURL:"/lists/update",
    removeDataURL:"/lists/delete",
    dataFormat: "json"
});

isc.ListGrid.create({
    ID: "controlledListSelectorGrid",
    dataSource: controlledListsListDS,
    autoFetchData: true,
    showOpenIcons:false,
    showDropIcons:false,
    autoDraw: false,
    selectionType: "single",
    selectionUpdated : function (select) {
        console.log(metadata[select.name].fields);
        var cloneFields = Object.assign([], metadata[select.name].fields);
        controlledListBrowser.setFields(cloneFields);
        cloneFields.push({name:"savebtn", editorType:"button", align:"center", title:"Save Item", click:"editForm.saveData()"});
        editForm.setFields(cloneFields);
        editForm.setData();
        controlledListBrowser.fetchData({list: select});
    }
});

isc.ListGrid.create({
    ID: "controlledListBrowser",
    dataSource: controlledListsDS,
    autoFetchData: false,
    showOpenIcons:false,
    showDropIcons:false,
    autoDraw: false,
    align: "center",
    overflow: "hidden",
    height: "30%",
    showResizeBar: true,
    border: "1px solid blue",
    fields: [],
    selectionUpdated : function (select) {
        editForm.setData(select);
    }
});

isc.DynamicForm.create({
    ID:"editForm",
    autoDraw:false,
    dataSource:"controlledListsDS",
    useAllDataSourceFields:true,
    height: "70%",
    margin:5,
    cellPadding:5,
    autoFocus:false
});

isc.HLayout.create({
    width: "100%",
    height: "100%",
    autoDraw: true,
    members: [
        isc.HLayout.create({
            overflow: "hidden",
            width: "30%",
            showResizeBar: true,
            autoDraw: false,
            members: [controlledListSelectorGrid]
        }),
        isc.VLayout.create({
            width: "70%",
            autoDraw: false,
            members: [controlledListBrowser, editForm]
        })
    ]
});
