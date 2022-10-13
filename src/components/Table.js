import "./Table.scss";
import React, { useState } from "react";
import { kaReducer, Table } from "ka-table";
import {
  closeRowEditors,
  openRowEditors,
  saveRowEditors,
  deleteRow,
  search,
  loadData,
} from "ka-table/actionCreators";
import { DataType } from "ka-table/enums";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { red, grey } from "@mui/material/colors";

const EditButton = ({ dispatch, rowKeyValue }) => {
  return (
    <CreateIcon
      className="edit icon-button"
      onClick={() => dispatch(openRowEditors(rowKeyValue))}
      sx={{ color: grey[500] }}
    />
  );
};
const DeleteRow = ({ dispatch, rowKeyValue }) => {
  return (
    <DeleteIcon
      className="delete icon-button"
      onClick={() => dispatch(deleteRow(rowKeyValue))}
      sx={{ color: red[500] }}
    />
  );
};

const SaveButton = ({ dispatch, rowKeyValue }) => {
  return (
    <div
      className="buttons"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/save.svg"
        className="save-cell-button"
        alt="Save"
        title="Save"
        onClick={() => {
          dispatch(
            saveRowEditors(rowKeyValue, {
              validate: true,
            })
          );
        }}
      />
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/close.svg"
        className="close-cell-button"
        alt="Cancel"
        title="Cancel"
        onClick={() => {
          dispatch(closeRowEditors(rowKeyValue));
        }}
      />
    </div>
  );
};

const EditingTable = ({ contacts }) => {
  const tablePropsInit = {
    columns: [
      { key: "name", title: "Ism", dataType: DataType.String },
      { key: "email", title: "Elektron pochta", dataType: DataType.String },
      { key: "phone", title: "Telefon raqam", dataType: DataType.String },
      { key: "region", title: "Viloyat", dataType: DataType.String },
      { key: "bdate", title: "Tug'ilgan sana", dataType: DataType.Date },
      {
        key: "wkExpereince",
        title: "Ish tajribasi",
        dataType: DataType.String,
      },
      {
        key: "martialStatus",
        title: "Oilaviy holat",
        dataType: DataType.String,
      },
      {
        key: "education",
        title: "Ta`lim darajasi",
        dataType: DataType.String,
      },
      {
        key: "gender",
        title: "Jinsi",
        dataType: DataType.String,
      },
      {
        key: "linkedIn",
        title: "LinkedIn",
        dataType: DataType.String,
      },
      {
        key: "university",
        title: "Universitet",
        dataType: DataType.String,
      },
      {
        key: "universityStartDate",
        title: "Universitet boshlanish sanasi",
        dataType: DataType.Date,
      },
      {
        key: "universityEndDate",
        title: "Universitet tamomlangan sanasi",
        dataType: DataType.Date,
      },
      { key: "editColumn", style: { width: 50 } },
    ],
    format: ({ column, value }) => {
      if (column.dataType === DataType.Date) {
        return (
          value &&
          value?.toLocaleDateString("en", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
        );
      }
      if (value?.includes("www.linkedin.com")) {
        return (
          <a href={value} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        );
      }
    },
    data: contacts,
    loading: {
      enabled: true,
    },
    singleAction: loadData(),
    search: ({ searchText, rowData, column }) => {
      if (column.key === "passed") {
        return (
          (searchText === "false" && !rowData.passed) ||
          (searchText === "true" && rowData.passed)
        );
      }
    },
    rowKeyField: "id",
    validation: ({ column, value }) => {
      if (column.key === "name") {
        return value ? "" : "value must be specified";
      }
    },
  };

  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch = async (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action));
  };

  return (
    <div className="editing-row-demo">
      {contacts.length > 0 ? (
        <div>
          <input
            placeholder="Ma'lumotlarni filtrlash..."
            type="search"
            defaultValue={tableProps.searchText}
            onChange={(event) => {
              dispatch(search(event.currentTarget.value));
            }}
            className="top-element"
          />
          <div className="material-demo" style={{ overflowX: "auto" }}>
            <Table
              {...tableProps}
              childComponents={{
                cellText: {
                  content: (props) => {
                    if (props.column.key === "editColumn") {
                      return (
                        <div>
                          <EditButton {...props} />
                          <DeleteRow {...props} />
                        </div>
                      );
                    }
                  },
                },

                cellEditor: {
                  content: (props) => {
                    if (props.column.key === "editColumn") {
                      return <SaveButton {...props} />;
                    }
                  },
                },
              }}
              dispatch={dispatch}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EditingTable;
