import {
    createContext,
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
  
    // useEffect(() => {
    //   const func = () => {
    //     dispatch({
    //       type: "hideColumnDropdowns",
    //     });
    //   };
  
    //   window.addEventListener("click", func);
  
    //   return () => {
    //     window.removeEventListener("click", func);
    //   };
    // }, [dispatch]);
  
    const orderingDirection = state.ordering.find(
      (o) => o.column === column
    )?.dir;
  
    return (
      <th
        // onMouseOver={() => {
        //   setShowColumnControls(true);
        // }}
        // onMouseLeave={() => {
        //   setShowColumnControls(false);
        // }}
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
      </th>
    );
  }
  
  function Td({ cellValue }) {
    return (
      <Box as="td" sx={{ p: 4 }}>
        {cellValue}
      </Box>
    );
  }
  
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
        return {
          ...state,
          columns: state.columns.map((column, i) => {
            return {
              ...column,
              dropdownShowing: false,
            };
          }),
        };
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
  
  function ColumnControls() {
    /**
     *
     *       <Box sx={{ bg: "white", borderRadius: 10, my: 2, p: 4 }}>
          <Flex sx={{ justifyContent: "space-between" }}>
            <DropdownMenu>
              <Button
                variant="white-primary-hover"
              >
                <Flex sx={{ alignItems: "center" }}>
                  <Columns width={30} height={30} />
                  <Box
                    sx={{ color: "primary", ml: 2, textTransform: "uppercase" }}
                  >
                    columns
                  </Box>
                </Flex>
              </Button>
              <Dropdown show={showDropdown === "columns" ? true : false}>
                <Card
                  variant="dropdown"
                  sx={{ bg: "white", minWidth: 300, zIndex: 1 }}
                >
                  <Box
                    sx={{
                      px: 4,
                      py: 2,
                      textAlign: "left",
                      "&:hover": { bg: "haze" },
                    }}
                  >
                    Option 1
                  </Box>
                </Card>
              </Dropdown>
            </DropdownMenu>
          </Flex>
        </Box>
     *
     *
     */
  
    return null;
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
  
  export function FilterControls() {
    /**
     * A form with a single field filters which is an array of objects
     *
     *
     * <input name={`filters.0.columnName`} value={filters[1].columnName} />
     * <input name={`filters.1.columnName`} value={filters[1].columnName} />
     *
     *
     *
     */
  
    return (
      <Accordion
        Button={
          <Flex sx={{ alignItems: "center" }}>
            <Filter width={30} height={30} />
            <Box sx={{ ml: 2, textTransform: "uppercase" }}>filters</Box>
          </Flex>
        }
        dropdownProps={{
          p: 2,
        }}
      >
        <Grid columns={3}>
          <Select variant="bootstrap">
            <option>Name</option>
          </Select>
          <Select variant="bootstrap">
            <option>icontains</option>
          </Select>
          <Input
            name="field_1"
            value=""
            variant="bootstrap"
            sx={{ flexShrink: 1 }}
          />
        </Grid>
        <Box mt={4}>
          <Button variant="white-primary-hover">Add filter</Button>
        </Box>
      </Accordion>
    );
  }
  
  function getInitialState({ userDefinedColumns, ordering }) {
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
    };
  }
  
  export default function Table({ columns, ordering, rows }) {
    const [state, dispatch] = useReducer(
      tableReducer,
      getInitialState({ userDefinedColumns: columns, ordering })
    );
  
    return (
      <TableContext.Provider value={{ state, dispatch }}>
        <Box
          sx={{
            bg: "white",
            borderStyle: "solid",
            borderColor: "haze",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Box
            as="table"
            sx={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <Box
                as="tr"
                sx={{
                  borderBottomStyle: "solid",
                  borderBottomColor: "haze",
                  borderBottomWidth: 1,
                }}
              >
                {columns.map((column, index) => (
                  <Th key={column} column={column} columnIndex={index} />
                ))}
              </Box>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <Box as="tr" key={row.id} sx={getTbodyRowProps(rows, index)}>
                  {columns.map((column) => (
                    <Td
                      key={`row${row.id}:column${column}`}
                      cellValue={row[column]}
                    />
                  ))}
                </Box>
              ))}
            </tbody>
          </Box>
        </Box>
      </TableContext.Provider>
    );
  }
  
  Table.defaultProps = {
    ordering: [],
  };