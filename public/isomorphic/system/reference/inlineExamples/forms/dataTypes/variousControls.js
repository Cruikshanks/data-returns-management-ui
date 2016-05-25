isc.DynamicForm.create({
    ID: "form1",
    width: 400,
    fields: [
        {title:"Text", type:"text", hint: "A plain text field", wrapHintText: false},
        {title:"Color Picker", type:"color"},
        {title:"TextArea", type:"textArea"},
        {title: "Stacked Spinner", editorType: "spinner", writeStackedIcons: true,
         defaultValue: 5, min: 0, max: 10, step: 0.5, wrapTitle: false},
        {title: "Unstacked Spinner", editorType: "spinner", writeStackedIcons: false,
         defaultValue: 5, min: 0, max: 10, step: 0.5},
        {title: "Slider", name: "slider", editorType: "slider", width: 180,
         minValue: 1, maxValue: 5, numValues: 5, height: isc.Browser.isTouch ? 52 : 36},
        {title: "LinkItem", type: "link", name: "link", height: 36, target: "javascript",
         click: "isc.say('Hello world!')", linkTitle: "<br>Click Me<br>"},
        {title: "Checkbox", type: "checkbox", height: 25},
        {title: "Radio Group", type: "radioGroup",
         valueMap: ["Option 1", "Option 2"]}
    ],
    values: { slider: 4 }
});

var valueMap = {
    "US" : "<b>United States</b>",
    "CH" : "China",
    "JA" : "<b>Japan</b>",
    "IN" : "India",
    "GM" : "Germany",
    "FR" : "France",
    "IT" : "Italy",
    "RS" : "Russia",
    "BR" : "<b>Brazil</b>",
    "CA" : "Canada",
    "MX" : "Mexico",
    "SP" : "Spain"
}

var valueIcons = {
    "US" : "US",
    "CH" : "CH",
    "JA" : "JA",
    "IN" : "IN",
    "GM" : "GM",
    "FR" : "FR",
    "IT" : "IT",
    "RS" : "RS",
    "BR" : "BR",
    "CA" : "CA",
    "MX" : "MX",
    "SP" : "SP"
}

isc.DynamicForm.create({
    ID: "form2",
    width: 480,
    colWidths: [220, "*"],
    isGroup: true,
    groupTitle: "Select / Combo Controls",
    fields : [{
        name: "bugStatus", title: "Select", hint: "<nobr>A simple combobox</nobr>", 
        editorType: "ComboBoxItem",
        valueMap : {
            "cat" : "Cat",
            "dog" : "Dog",
            "giraffe" : "Giraffe",
            "goat" : "Goat",
            "marmoset" : "Marmoset",
            "mouse" : "Mouse"
        }
    },
    {
        name: "itemName", title: "Item Name", editorType: "ComboBoxItem", 
        optionDataSource: "supplyItem", pickListWidth: 250
    },
    {
        name: "selectItem", title: "Select", hint: "<nobr>A combobox with icons</nobr>",
        editorType: "SelectItem",
        valueMap : valueMap,
        valueIcons : valueIcons,
        imageURLPrefix : "flags/16/",
        imageURLSuffix : ".png"
    },
    {
        name: "selectItem2", title: "Select", hint: "<nobr>A combobox with styled entries</nobr>",
        editorType: "SelectItem",
        valueMap : {
            "red" : "<span style='color:#FF0000;'>Red</span>",
            "green" : "<span style='color:#00FF00;'>Green</span>",
            "blue" : "<span style='color:#0000FF;'>Blue</span>"
        }
    },
    {
        name: "selectItemMultipleGrid", title: "Select Multiple (Grid)",
        editorType: "SelectItem",
        multiple: true,
        multipleAppearance: "grid",
        valueMap : {
            "cat" : "Cat",
            "dog" : "Dog",
            "giraffe" : "Giraffe",
            "goat" : "Goat",
            "marmoset" : "Marmoset",
            "mouse" : "Mouse"
        }
    },
    {
        name: "selectItemMultiplePickList", title: "Select Multiple (PickList)",
        editorType: "SelectItem",
        multiple: true,
        multipleAppearance: "picklist",
        valueMap : {
            "cat" : "Cat",
            "dog" : "Dog",
            "giraffe" : "Giraffe",
            "goat" : "Goat",
            "marmoset" : "Marmoset",
            "mouse" : "Mouse"
        }
    }
    ]
});

isc.DynamicForm.create({
    ID: "dateForm",
    width: 480,
    colWidths: [250, "*"],
    isGroup: true,
    groupTitle: "Date Controls",
    fields : [{
        name: "dateItem", title: "Date", hint: "<nobr>Picklist based date input</nobr>", 
        editorType: "DateItem"
    },
    {
        name: "dateItem2", title: "Date", hint: "<nobr>Direct date input</nobr>", 
        editorType: "DateItem",
        useTextField: true
    },
    {
        name: "timeItem", title: "Time", 
        editorType: "TimeItem"
    },
    {
        name: "timeItem", title: "Time", hint: "Picklist based time input",
        editorType: "TimeItem",
        useTextField: false
    },
    {
        name: "dri", title: "Date Range",
        editorType: "DateRangeItem",
        allowRelativeDates: true,
        fromDate: "$today",
        toDate: "-1m"
    },
    {
        name: "mdri", title: "Mini Date Range", 
        editorType: "MiniDateRangeItem"
    },
    {
        name: "rdi", title: "Relative Date", 
        editorType: "RelativeDateItem"
    }
    ]
});

isc.VStack.create({
    membersMargin: 10,
    members: [ form1, form2, dateForm]
});
