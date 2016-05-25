isc.VStack.create({
    membersMargin: 30,
    members: [
        isc.HStack.create({
            membersMargin: 30,
            members: [
                isc.DynamicForm.create({
                    ID: "filterForm",
                    width: 300,
                    operator: "and",
                    saveOnEnter: true,
                    dataSource: worldDS,
                    submit: function () {
                        filterGrid.filterData(filterForm.getValuesAsCriteria());
                    },
                    fields: [
                        {name: "countryName",
                         title: "Country Name contains",
                         type: "text"
                        },
                        {type: "blurb",
                         defaultValue: "<b>AND</b>"
                        },
                        {name: "population",
                         title: "Population smaller than",
                         type: "number",
                         operator: "lessThan"
                        },
                        {type: "blurb",
                         defaultValue: "<b>AND</b>"
                        },
                        {name: "independence",
                         title: "Nationhood later than",
                         type: "date",
                         useTextField: true,
                         operator: "greaterThan"
                        }
                    ]
                }),
                isc.IButton.create({
                    title: "Filter",
                    click: function () {
                        filterForm.submit();
                    }
                })
            ]
        }),
        isc.ListGrid.create({
            ID: "filterGrid",
            width:780, height:300, alternateRecordStyles:true,
            dataSource: worldDS,
            autoFetchData: true,
            useAllDataSourceFields: true,
            fields: [ 
                {name:"countryCode", width:50}, 
                {name:"independence", width:100} 
            ]
        })
    ]
});
