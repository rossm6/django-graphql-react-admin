import {
    createContext,
    memo,
    useContext,
    useEffect,
    useReducer,
    useState,
  } from "react";
  import { Button, Flex, Grid, Heading, Select, Input } from "theme-ui";
  import { Dropdown, DropdownMenu } from "./Dropdown";
  import { ReactComponent as Columns } from "../icons/columns.svg";
  import { ReactComponent as ThreeDots } from "../icons/threeDots.svg";
  import { ReactComponent as Filter } from "../icons/filter.svg";
  import { ReactComponent as ArrowUp } from "../icons/arrowUp.svg";
  import { ReactComponent as ArrowDown } from "../icons/arrowDown.svg";
  import { ReactComponent as ChevronDown } from "../icons/chevronDown.svg";
  import { ReactComponent as ChevronUp } from "../icons/chevronUp.svg";
  
  import { Box, Card, IconButton } from "theme-ui";
  import clone from "lodash.clone";
  
  const TableContext = createContext();
  
function Th({ column, columnIndex }) {
  const { dispatch, state } = useContext(TableContext);
  const [showColumnControls, setShowColumnControls] = useState(false);

  const dropdownShowing = state.columns[columnIndex].dropdownShowing;

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (dropdownShowing) {
      dispatch({
        type: "hideColumnDropdowns",
      });
    } else {
      dispatch({
        type: "showColumnDropdown",
        payload: columnIndex,
      });
    }
  };

  useEffect(() => {
    const func = () => {
      dispatch({
        type: "hideColumnDropdowns",
      });
    };

    window.addEventListener("click", func);

    return () => {
      window.removeEventListener("click", func);
    };
  }, [dispatch]);

  const orderingDirection = state.ordering.find(
    (o) => o.column === column
  )?.dir;

  return (
    <div
      className="th"
      onMouseOver={() => {
        setShowColumnControls(true);
      }}
      onMouseLeave={() => {
        setShowColumnControls(false);
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 4,
        }}
      >
        <Box sx={{ mt: "-4px", mr: 2 }}>{column}</Box>
        <Box sx={{ display: "flex" }}>
          {
            <IconButton
              onClick={() =>
                dispatch({
                  type: "setColumnOrdering",
                  payload: { column },
                })
              }
              sx={{
                color: orderingDirection ? "primary" : "#c8c3c3",
                visibility: showColumnControls
                  ? "visible"
                  : orderingDirection
                  ? "visible"
                  : "hidden",
              }}
            >
              {orderingDirection !== "desc" ? (
                <ArrowUp height={20} width={20} />
              ) : (
                <ArrowDown height={20} width={20} />
              )}
            </IconButton>
          }
          <DropdownMenu show={showColumnControls} showProp="visibility">
            <IconButton onClick={toggleDropdown}>
              <ThreeDots height={20} width={20} />
            </IconButton>
            <Dropdown show={state.columns[columnIndex].dropdownShowing}>
              <Card
                variant="dropdown"
                sx={{ bg: "white", minWidth: 200, zIndex: 1 }}
              >
                {orderingDirection !== undefined && (
                  <Box
                    onClick={() => {
                      dispatch({
                        type: "setColumnOrdering",
                        payload: {
                          column,
                          unset: true,
                        },
                      });
                    }}
                    sx={{
                      px: 4,
                      py: 2,
                      textAlign: "left",
                      "&:hover": { bg: "haze" },
                    }}
                  >
                    Unsort
                  </Box>
                )}
                {orderingDirection !== "asc" && (
                  <Box
                    onClick={() => {
                      dispatch({
                        type: "setColumnOrdering",
                        payload: {
                          column,
                          dir: "asc",
                        },
                      });
                    }}
                    sx={{
                      px: 4,
                      py: 2,
                      textAlign: "left",
                      "&:hover": { bg: "haze" },
                    }}
                  >
                    Sort Asc
                  </Box>
                )}
                {orderingDirection !== "desc" && (
                  <Box
                    onClick={() => {
                      dispatch({
                        type: "setColumnOrdering",
                        payload: {
                          column,
                          dir: "desc",
                        },
                      });
                    }}
                    sx={{
                      px: 4,
                      py: 2,
                      textAlign: "left",
                      "&:hover": { bg: "haze" },
                    }}
                  >
                    Sort Desc
                  </Box>
                )}
              </Card>
            </Dropdown>
          </DropdownMenu>
        </Box>
      </Box>
    </div>
  );
}
  
const Td = memo(function Td({ cellValue, column }) {
  return (
    <div className={column} style={{ padding: 4 }}>
      {cellValue}
    </div>
  );
});

function setOrdering(ordering, payload) {
  /**
   * User either specially sets a direction of ordering, or unsets it
   * Or, they click the ordering button and we change the ordering for them in the following
   * order: asc, desc, unset
   */

  const oldOrdering = clone(ordering);

  const columnOrderingPriority = oldOrdering
    .map((o) => o.column)
    .indexOf(payload.column);

  if (columnOrderingPriority !== -1) {
    if (payload.unset) {
      oldOrdering.splice(columnOrderingPriority, 1);
    } else if (payload.dir) {
      oldOrdering[columnOrderingPriority].dir = payload.dir;
    } else {
      const currentDir = oldOrdering[columnOrderingPriority].dir;
      if (currentDir === "asc") {
        oldOrdering[columnOrderingPriority].dir = "desc";
      } else if (currentDir === "desc") {
        oldOrdering.splice(columnOrderingPriority, 1);
      }
    }
  } else {
    if (payload.dir) {
      oldOrdering.push({
        column: payload.column,
        dir: payload.dir,
      });
    } else {
      oldOrdering.push({
        column: payload.column,
        dir: "asc",
      });
    }
  }

  return oldOrdering; // which has been mutated
}
  
function tableReducer(state, action) {
  switch (action.type) {
    case "hideColumnDropdowns":
      if(state.columns.find(column => column.dropdownShowing)){
        return {
          ...state,
          columns: state.columns.map((column, i) => {
            return {
              ...column,
              dropdownShowing: false,
            };
          }),
        };
      }
      return state;
    case "setColumnOrdering":
      return {
        ...state,
        ordering: setOrdering(state.ordering, action.payload),
      };
    case "showColumnDropdown":
      return {
        ...state,
        columns: state.columns.map((column, i) => {
          return {
            ...column,
            dropdownShowing: i === action.payload ? true : false,
          };
        }),
      };
    default:
      throw new Error("No action found for table reducer");
  }
}
  
function getTbodyRowProps(rows, index) {
  const borderBottom = {
    borderBottomStyle: "solid",
    borderBottomColor: "haze",
    borderBottomWidth: 1,
  };

  let props = {};

  if (index !== rows.length - 1) {
    props = {
      ...props,
      ...borderBottom,
    };
  }

  return props;
}
  
  
function Accordion({ children, Button, dropdownProps }) {
  const [openAccordion, setOpenAccordion] = useState(false);

  return (
    <>
      <Box sx={{ bg: "white", borderRadius: 10, my: 2, p: 4 }}>
        <Flex
          onClick={() => setOpenAccordion(!openAccordion)}
          sx={{
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "space-between",
          }}
        >
          {Button}
          {openAccordion ? (
            <ChevronUp height={20} width={20} />
          ) : (
            <ChevronDown height={20} width={20} />
          )}
        </Flex>
        {openAccordion && (
          <Box
            sx={{ mt: 5, overflow: "auto", maxWidth: "100%", ...dropdownProps }}
          >
            {children}
          </Box>
        )}
      </Box>
    </>
  );
}
    
function getInitialState({ userDefinedColumns, rows, ordering }) {
  let columns = userDefinedColumns.map((column, i) => {
    return {
      name: column,
      index: i,
      dropdownShowing: false,
    };
  });

  return {
    columns,
    ordering,
    rows
  };
}
  
const Rows = memo(function Rows ({ columns, rows }) {

  return (
      rows.map(row => (
        <div key={row.id} style={{ display: "flex" }}>
          {columns.map((column) => (
            <Td
              key={`row${row.id}:column${column.name}`}
              cellValue={row[column.name]}
              column={column.name}
            />
          ))}
        </div>
      ))
  );

});


/**
 * 
 * 
 */

export default function Table({ columns, ordering, rows }) {

  const [state, dispatch] = useReducer(
    tableReducer,
    getInitialState({ userDefinedColumns: columns, rows, ordering })
  );
  const [columnWidths, setColumnWidths] = useState();  

  useEffect(() => {
    const widths = [];
    const thCollection = document.querySelectorAll("div.th");
    for(let th of thCollection){
      widths.push(th.offsetWidth);
    }
    setColumnWidths(widths);
  }, [setColumnWidths]);

  const columnCssWidths = {};
  for(let i = 0; i < state.columns.length && columnWidths; i++){
    columnCssWidths[`.${state.columns[i].name}`] = {
      minWidth: columnWidths[i],
      width: columnWidths[i]
    };
  }

  // return (
  //   <TableContext.Provider value={{ state, dispatch }}>
  //     <Box
  //       as="div"
  //       className="table"
  //       sx={{
  //         // width: "100%",
  //         // maxWidth: "100%"
  //         overflowX: "auto"
  //       }}
  //       css={{ ...columnCssWidths }}
  //     >
  //       <div
  //         style={{
  //           display: "flex",
  //         }}
  //       >
  //         {state.columns.map((column, index) => (
  //           <Th key={column.name} column={column.name} columnIndex={index} />
  //         ))}
  //       </div>
  //       <div style={{ height: 400, maxHeight: 400 }}>
  //         <Rows columns={state.columns} rows={state.rows} />
  //       </div>
  //     </Box>
  //   </TableContext.Provider>
  // );



  /**
   * 
   * So my efforts so far have been naive.
   * 
   * We need to use "virtualisation".  In other words
   * create the effect of a huge number of rows whilst in fact
   * only showing enough to fill the container height.
   * 
   * TODO -
   * 
   * Define a row height, and a height for the columns row.
   * 
   * We'll then have to re-render the table whenever the user
   * scrolls vertically or horizontally.
   * 
   * 
   * 
   */


  return <Box>TODO</Box>


}

Table.defaultProps = {
  ordering: [],
};