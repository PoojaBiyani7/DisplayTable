import React from 'react';
import { Component } from 'react';
import './TableSearch.css';

class TableSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = () => {
        let propsDataList = [];
        this.props.rowData.map((rowItem) => {
            rowItem.data.map((rowDataItem) => {
                propsDataList.push(rowDataItem.value);
            })
        })

        this.setState({ totalListOfWords: propsDataList });
    }

    renderDynamicHeader = () => {
        return (
            this.props.columnHeaders.map((headerItem, index) => {
                return <th key={index} id={headerItem.label} className="TableHeader">{headerItem.label}</th>
            })
        );
    }

    renderRowData = (index) => {
        return (
            this.props.rowData[index].data.map((rowDataItem, index) => {
                return <td key={index} id={rowDataItem.value}>{rowDataItem.value}</td>
            })
        );
    }

    renderDynamicData = () => {
        return this.props.rowData.map((rowItem, index) => {
            return (
                <tr key={index}>
                    <td id={rowItem.id}>{rowItem.id}</td>
                    {this.renderRowData(index)}
                </tr>
            )
        });
    }

    renderWholeTable = () => {
        return (
            <div>
                <table className="Table">
                    {this.renderDynamicHeader()}
                    <tbody>
                        {this.renderDynamicData()}
                    </tbody>
                </table>
            </div>
        );
    }

    searchForTheWord = (event) => {
        event.preventDefault();
        console.log("Onchange done");

        let enteredSearchText = event.target.value.toString().toLowerCase();
        if (enteredSearchText !== "") {
            this.props.rowData.map((rowItem) => {
                rowItem.data.map((rowDataItem) => {
                    if (rowDataItem.value.toString().toLowerCase().includes(enteredSearchText)) {
                        console.log("found");
                        document.getElementById(rowDataItem.value).style.backgroundColor = "red";
                    } else {
                        document.getElementById(rowDataItem.value).style.backgroundColor = "cyan"
                    }
                });
                if (rowItem.id.toString().toLowerCase().includes(enteredSearchText)) {
                    document.getElementById(rowItem.id).style.backgroundColor = "red";
                } else {
                    document.getElementById(rowItem.id).style.backgroundColor = "cyan"
                }
            });
            this.props.columnHeaders.map((headerItem) => {
                if (headerItem.label.toString().toLowerCase().includes(enteredSearchText)) {
                    document.getElementById(headerItem.label).style.backgroundColor = "red";
                } else {
                    document.getElementById(headerItem.label).style.backgroundColor = "rgb(177, 135, 214)"
                }
            })
        } else {
            this.props.rowData.map((rowItem) => {
                rowItem.data.map((rowDataItem) => {
                    document.getElementById(rowDataItem.value).style.backgroundColor = "cyan"
                });
                document.getElementById(rowItem.id).style.backgroundColor = "cyan"
            });
            this.props.columnHeaders.map((headerItem) => {
                document.getElementById(headerItem.label).style.backgroundColor = "rgb(177, 135, 214)"
            });
        }
    }

    render() {
        return (
            <div>
                <input type="text" className="searchBar" placeholder="Search and Highlight Table Data..." onChange={(event) => this.searchForTheWord(event)} />
                {this.renderWholeTable()}
            </div>
        )
    }
}

export default TableSearch;