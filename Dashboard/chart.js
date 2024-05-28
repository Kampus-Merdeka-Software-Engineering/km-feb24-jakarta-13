/* Chart code */
// Create root
let root = am5.Root.new("chart-1");

// Set themes
root.setThemes([
    am5themes_Animated.new(root)
]);

// Create chart
let chart = root.container.children.push(am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
    projection: am5map.geoAlbersUsa(),
    layout: root.horizontalLayout
}));

// Create polygon series
let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_usaLow,
    valueField: "value",
    calculateAggregates: true
}));

polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}: {value}"
});

polygonSeries.set("heatRules", [{
    target: polygonSeries.mapPolygons.template,
    dataField: "value",
    min: am5.color(0x8DAEFF),
    max: am5.color(0x0A2053),
    key: "fill"
}]);

polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
    heatLegend.showValue(ev.target.dataItem.get("value"));
});

polygonSeries.data.setAll([
    { id: "US-AL", value: 78306 },
    { id: "US-AK", value: 0 },
    { id: "US-AZ", value: 2904571 },
    { id: "US-AR", value: 881621 },
    { id: "US-CA", value: 26396975 },
    { id: "US-CO", value: 2491590 },
    { id: "US-CT", value: 1120709 },
    { id: "US-DE", value: 1172207 },
    { id: "US-FL", value: 4621845 },
    { id: "US-GA", value: 2264049 },
    { id: "US-HI", value: 0 },
    { id: "US-ID", value: 325410 },
    { id: "US-IL", value: 5925734 },
    { id: "US-IN", value: 1984178 },
    { id: "US-IA", value: 198694 },
    { id: "US-KS", value: 291431 },
    { id: "US-KY", value: 2305830 },
    { id: "US-LA", value: 604689 },
    { id: "US-ME", value: 127053 },
    { id: "US-MD", value: 1356792 },
    { id: "US-MA", value: 1828353 },
    { id: "US-MI", value: 3908683 },
    { id: "US-MN", value: 1254627 },
    { id: "US-MS", value: 834126 },
    { id: "US-MO", value: 861126 },
    { id: "US-MT", value: 146338 },
    { id: "US-NE", value: 364853 },
    { id: "US-NV", value: 308028 },
    { id: "US-NH", value: 398945 },
    { id: "US-NJ", value: 1509342 },
    { id: "US-NM", value: 478354 },
    { id: "US-NY", value: 14667805 },
    { id: "US-NC", value: 2821734 },
    { id: "US-ND", value: 91991 },
    { id: "US-OH", value: 5263300 },
    { id: "US-OK", value: 1017054 },
    { id: "US-OR", value: 1594410 },
    { id: "US-PA", value: 7024536 },
    { id: "US-RI", value: 824976 },
    { id: "US-SC", value: 679167 },
    { id: "US-SD", value: 131556 },
    { id: "US-TN", value: 1965020 },
    { id: "US-TX", value: 11305840 },
    { id: "US-UT", value: 488593 },
    { id: "US-VT", value: 116543 },
    { id: "US-VA", value: 2942467 },
    { id: "US-WA", value: 6531736 },
    { id: "US-WV", value: 120982 },
    { id: "US-WI", value: 1796817 },
    { id: "US-WY", value: 0 }
]);

let heatLegend = chart.children.push(am5.HeatLegend.new(root, {
    orientation: "vertical",
    startColor: am5.color(0x8DAEFF),
    endColor: am5.color(0x0A2053),
    startText: "Lowest",
    endText: "Highest",
    stepCount: 5
}));

heatLegend.startLabel.setAll({
    fontSize: 12,
    fill: heatLegend.get("startColor")
});

heatLegend.endLabel.setAll({
    fontSize: 12,
    fill: heatLegend.get("endColor")
});

// change this to template when possible
polygonSeries.events.on("datavalidated", function () {
    heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
    heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
});

