interface JQuery {
    flexmonster(params: Flexmonster.Params): Flexmonster.Pivot;
}

declare namespace Flexmonster {
    interface Params {
        // params
        toolbar?: boolean;
        licenseKey?: string;
        width?: string | number;
        height?: string | number;
        componentFolder?: string;
        report?: Report | string;
        global?: Report;
        customizeCell?: (html:string, data:Cell) => string;
        // events
        cellclick?: Function;
        celldoubleclick?: Function;
        dataerror?: Function;
        datafilecancelled?: Function;
        dataloaded?: Function;
        datachanged?: Function;
        fieldslistclose?: Function;
        fieldslistopen?: Function;
        filteropen?: Function;
        fullscreen?: Function;
        loadingdata?: Function;
        loadinglocalization?: Function;
        loadingolapstructure?: Function;
        loadingreportfile?: Function;
        localizationerror?: Function;
        localizationloaded?: Function;
        olapstructureerror?: Function;
        olapstructureloaded?: Function;
        openingreportfile?: Function;
        querycomplete?: Function;
        queryerror?: Function;
        ready?: Function;
        reportchange?: Function;
        reportcomplete?: Function;
        reportfilecancelled?: Function;
        reportfileerror?: Function;
        reportfileloaded?: Function;
        runningquery?: Function;
        update?: Function;
        beforetoolbarcreated?: Function;
        // other
        container?: Element;
    }

    interface Pivot {
        addCalculatedMeasure(measure: Measure): void;
        addCondition(condition: ConditionalFormat): void;
        addJSON(json: Object[]): void;
        clear(): void;
        clearFilter(hierarchyName: string): void;
        clearXMLACache(proxyUrl: string, databaseId: string, callbackHandler: any, cubeId: string, measuresGroupId: string, username?: string, password?: string): void;
        closeFieldsList(): void;
        collapseAllData(): void;
        collapseData(hierarchyName: string): void;
        connectTo(object: DataSourceParams, callbackHandler: Function | string): void;
        dispose(): void;
        expandAllData(withAllChildren?: boolean): void;
        expandData(hierarchyName: string): void;
        exportTo(type: string, exportOptions?: ExportOptions, callbackHandler?: Function | string): void;
        fullScreen(): void;
        getAllConditions(): ConditionalFormat[];
        getAllMeasures(): Measure[];
        getAllHierarchies(): Hierarchy[];
        getCell(rowIdx: number, colIdx: number): Cell;
        getColumns(): Hierarchy[];
        getCondition(id: string): ConditionalFormat;
        getData(options: { slice?: Slice }, callbackHandler: Function | string, updateHandler: Function | string): void;
        getFilter(hierarchyName: string): FilterItem[];
        getFilterProperties(hierarchyName: string): FilterProperties;
        getFormat(measureName: string): Format;
        getMeasures(): Measure[];
        getMembers(hierarchyName: string, memberName: string, callbackHandler: Function | string): Member[];
        getOptions(): Options;
        getPages(): Hierarchy[];
        getReport(format?: string): Report | string;
        getRows(): Hierarchy[];
        getSelectedCell(): Cell;
        getSort(hierarchyName: string): string;
        getXMLACatalogs(proxyURL: string, dataSource: string, callbackHandler: Function | string, username?: string, password?: string): void;
        getXMLACubes(proxyURL: string, dataSource: string, catalog: string, callbackHandler: Function | string, username?: string, password?: string): void;
        getXMLADataSources(proxyURL: string, callbackHandler: Function | string, username?: string, password?: string): void;
        getXMLAProviderName(proxyURL: string, callbackHandler: Function | string, username?: string, password?: string): string;
        load(url: string, componentFolder?: string): void;
        on(eventType: string, handler: Function | string): void;
        off(eventType: string, handler: Function | string): void;
        open(): void;
        openFieldsList(): void;
        print(options?: PrintOptions): void;
        refresh(): void;
        removeAllCalculatedMeasures(): void;
        removeAllConditions(): void;
        removeCondition(id: string): void;
        removeCalculatedMeasure(uniqueName: string): void;
        removeSelection(): void;
        runQuery(slice: Slice): void;
        save(filename: string, destination: string, callbackHandler?: Function | string, url?: string, embedData?: boolean): string;
        setBottomX(hierarchyName: string, num: number, measureName: string): void;
        setFilter(hierarchyName: string, items: string[], negation?: boolean): void;
        setFormat(format: Format, measureName: string): void;
        setOptions(options: Options): void;
        setReport(report: Report): void;
        setSort(hierarchyName: string, sortName: string, customSorting?: string[]): void;
        setTopX(hierarchyName: string, num: number, measureName: string): void;
        showCharts(type?: string, multiple?: boolean): void;
        showGrid(): void;
        showGridAndCharts(type?: string, position?: string, multiple?: boolean): void;
        sortValues(axisName: string, type: string, tuple: number[], measureName: string): void;
        updateData(object: DataSourceParams | Object[]): void;
        customizeCell(customizeCellFunction: (html:string, data:Cell) => string): void;
    }

    interface Report {
        dataSource?: DataSourceParams;
        slice?: Slice;
        options?: Options;
        conditions?: ConditionalFormat[];
        formats?: Format[];
        tableSizes?: {
            columns?: ColumnSize[],
            rows?: RowSize[]
        }
        localization?: Object | string;
    }

    interface DataSourceParams {
        browseForFile?: boolean;
        catalog?: string;
        cube?: string;
        data?: Object[];
        dataSourceInfo?: string;
        dataSourceType?: string;
        fieldSeparator?: string;
        filename?: string;
        ignoreQuotedLineBreaks?: boolean;
        proxyUrl?: string;
        recordsetDelimiter?: string;
        binary?: boolean;
        roles?: string;
        localeIdentifier?: string;
        effectiveUserName?: string;
        customData?: string;
        hash?: string;
        username?: string;
        password?: string;
    }

    interface Slice {
        columns?: Hierarchy[];
        measures?: Measure[];
        pages?: Hierarchy[];
        rows?: Hierarchy[];
        drills?: {
            drillAll?: boolean,
            columns?: Object[],
            rows?: Object[],
        };
        expands?: {
            expandAll?: boolean,
            columns?: Object[],
            rows?: Object[]
        };
        sorting?: {
            column?: Object,
            row?: Object
        };
        useOlapFormatting?: boolean;
    }

    interface Options {
        chart?: {
            activeMeasure?: string,
            activeTupleIndex?: number,
            autoRange?: boolean,
            labelsHierarchy?: string,
            multipleMeasures?: boolean,
            oneLevel?: boolean,
            showFilter?: boolean,
            showLegendButton?: boolean,
            showMeasures?: boolean,
            showWarning?: boolean,
            title?: string,
            type?: string
        };
        grid?: {
            fitGridlines?: boolean,
            pagesFilterLayout?: string,
            showFilter?: boolean,
            showGrandTotals?: string,
            showHeaders?: boolean,
            showHierarchies?: boolean,
            showHierarchyCaptions?: boolean,
            showReportFiltersArea?: boolean,
            showTotals?: boolean,
            title?: string,
            type?: string
        };
        configuratorActive?: boolean;
        configuratorButton?: boolean;
        configuratorMatchHeight?: boolean;
        datePattern?: string;
        dateTimePattern?: string;
        defaultHierarchySortName?: string;
        drillThrough?: boolean;
        editing?: boolean;
        selectEmptyCells?: boolean;
        showAggregations?: boolean;
        showCalculatedValuesButton?: boolean;
        showDefaultSlice?: boolean;
        showMemberProperties?: boolean;
        sorting?: string;
        viewType?: string;
        showAggregationLabels?: boolean;
    }

    interface PrintOptions {
        header?: string;
        footer?: string;
    }

    interface Member {
        caption?: string;
        uniqueName?: string;
        hierarchyName?: string;
        children?: Member[];
        isLeaf?: boolean;
        parentMember?: string;
    }

    interface FilterProperties {
        type?: string;
        members?: FilterItem[];
        quantity?: number;
        measure?: string;
    }

    interface FilterItem {
        caption?: string;
        uniqueName?: string;
        hierarchyName?: string;
    }

    interface Cell {
        columnIndex?: number;
        columns?: any[];
        isTotal?: boolean;
        label?: string;
        measure?: string;
        rowIndex?: number;
        rows?: any[];
        type?: string;
        value?: number;
    }

    interface ExportOptions {
        filename?: string;
        destinationType?: string;
        excelSheetName?: string;
        footer?: string;
        header?: string;
        pageOrientation?: string;
        showFilters?: boolean;
        url?: string;
        useOlapFormattingInExcel?: boolean;
    }

    interface Hierarchy {
        caption?: string;
        dimensionName?: string;
        filter?: {
            members?: string[],
            negation?: boolean,
            measure?: string,
            quantity?: number,
            type?: string
        };
        sortName?: string;
        uniqueName?: string;
    }

    interface Measure {
        uniqueName?: string;
        active?: boolean;
        aggregation?: string;
        availableAggregations?: string[];
        caption?: string;
        formula?: string;
        format?: string;
        grandTotalCaption?: string;
    }

    interface ConditionalFormat {
        formula?: string;
        trueStyle?: Style;
        falseStyle?: Style;
        row?: number;
        column?: number;
        measure?: string;
        hierarchy?: string;
        member?: string;
        isTotal?: number;
    }

    interface Style {
        color?: string;
        backgroundColor?: string;
        backgroundImage?: string;
        borderColor?: string;
        fontSize?: number;
        fontWeight?: string;
        fill?: string;
        textAlign?: string;
        fontFamily?: string;
        width?: number;
        maxWidth?: number;
        height?: number;
        maxHeight?: number;
    }

    interface Format {
        name?: string;
        thousandsSeparator?: string;
        decimalSeparator?: string;
        decimalPlaces?: number;
        maxDecimalPlaces?: number;
        maxSymbols?: number;
        currencySymbol?: string;
        currencySymbolAlign?: string;
        nullValue?: string;
        infinityValue?: string;
        divideByZeroValue?: string;
        textAlign?: string;
    }

    interface ColumnSize {
        width?: number;
        idx?: number;
        tuple?: string[];
        measure?: string;
    }

    interface RowSize {
        height?: number;
        idx?: number;
        tuple?: string[];
        measure?: string;
    }

    
}